# FreshPick

FreshPick is a Uganda-based restaurant and fresh-food business — fresh fruit juices, juice blends, smoothies, fruit cocktails, shawarma, chips and other food. This repository is FreshPick's website: a professional digital storefront intended to grow into online ordering, a CMS-backed blog/menu, customer accounts and payments.

**Status:** first production-quality visual implementation. The architecture, SEO foundation, design system and all primary pages are built. There is no real menu/blog content and no confirmed business information yet — see [Missing information](#missing-information) below. Every page degrades gracefully in the absence of that data (empty states, hidden sections) rather than showing fabricated content.

## Tech stack

- **Next.js** (App Router, React Server Components by default, Turbopack)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (theme tokens defined once in `app/globals.css`, consumed as canonical utilities like `bg-primary`, `text-muted` via `@theme inline`)
- **Framer Motion** — used sparingly, only for scroll-reveal (`components/ui/FadeIn.tsx`); no heavy animation
- **lucide-react** for icons (note: it dropped brand/trademarked icons like Facebook/Instagram — social links are plain text, not icons)
- **clsx** + **tailwind-merge** (via `cn()` in `lib/utils`) for conflict-safe conditional class names
- **npm** as the package manager (pnpm was unavailable in this environment and corepack could not be enabled without admin rights; nothing here is npm-specific)

## Brand & design system

The palette in `app/globals.css` is derived directly from `public/logo.svg` (green `rgb(43,180,74)`, red `rgb(237,28,36)`), extended into a warm, editorial neutral scale (`--color-background`, `--color-surface`, `--color-foreground`, `--color-muted`, `--color-border`) rather than stark black/white, with light/dark variants. Fonts are **Fraunces** (display/headings, warm serif) paired with **Inter** (body), loaded via `next/font/google` — self-hosted at build time, no runtime request. There is intentionally no real photography yet (see [Missing information](#missing-information)); category and product imagery falls back to a solid `bg-primary-light` panel plus icons rather than stock/unrelated photos.

## Folder structure

```
app/
  (site)/                route group for all public pages — adds no segment to the URL
    page.tsx               / — Hero, QuickInfo, FeaturedProducts, FoodShowcase,
                              WhyFreshPick, FreshnessStory, Testimonials, GalleryPreview,
                              BlogPreview, ContactCTA
    menu/
      page.tsx              /menu — interactive category filter (server-rendered via ?category=)
      [slug]/page.tsx        /menu/[slug] — product detail (Product JSON-LD, related items)
      juices|food|shawarma|chips/page.tsx   SEO landing pages per category group
    about/page.tsx          /about
    gallery/page.tsx        /gallery — category filter via ?category=
    blog/
      page.tsx               /blog — featured post, search (native GET form), category filter
      [slug]/page.tsx         /blog/[slug]
    contact/page.tsx        /contact — info, hours, location/map, form
    faq/page.tsx             /faq — accordion
    privacy-policy/page.tsx  /privacy-policy — draft template, noIndex until reviewed
    terms/page.tsx           /terms — draft template, noIndex until reviewed
    layout.tsx               wraps site pages with Header + Footer
  layout.tsx                 root layout: fonts, global <html>/<body>, sitewide JSON-LD
  sitemap.ts / robots.ts / manifest.ts
  not-found.tsx / error.tsx / loading.tsx
  globals.css

components/
  layout/       Container, Section
  navigation/    Header (client, mobile menu + OrderButton), Footer, SocialLinks, nav link list
  ui/            Button/LinkButton, SectionHeading, Badge, FadeIn, OrderButton, FAQAccordion
  home/          Hero, QuickInfo, FeaturedProducts, FoodShowcase, WhyFreshPick, FreshnessStory,
                 Testimonials, TestimonialCard, GalleryPreview, BlogPreview, ContactCTA
  menu/          MenuGrid, MenuItemCard, CategoryTile, CategoryFilter, category-icons
  blog/          BlogCard (supports a `featured` hero variant)
  gallery/       GalleryGrid, GalleryFilter
  contact/       ContactInfo, OpeningHours, LocationCard, ContactForm
  seo/           JsonLd, Breadcrumbs (renders trail + BreadcrumbList JSON-LD together)

lib/
  config/site.ts   central business config (name, contact info, hours, socials, logo)
  data/            menu.ts, blog.ts, faq.ts, gallery.ts, testimonials.ts — typed content,
                   no data hardcoded in components
  seo/             metadata.ts (Metadata builder), schema.ts (JSON-LD builders incl. Product), constants.ts
  utils/           cn, formatCurrency, formatDate, estimateReadingTime, isPlaceholder

types/            MenuItem, BlogPost, SiteConfig, SEO/breadcrumb types

public/
  logo.svg         FreshPick's real logo (source of the brand color tokens in globals.css)
  images/, icons/, fonts/
```

Why a `(site)` route group: it lets the public site share one Header/Footer layout while leaving room to add e.g. an `(admin)` group later with a completely different layout, without restructuring the URL space.

Why query-param filtering (`/menu?category=`, `/gallery?category=`) instead of client-side state: filtering happens server-side by reading `searchParams`, so browsing the menu or gallery ships zero extra client JavaScript — the filter pills are plain `<Link>`s.

## Development commands

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # ESLint (flat config, next/core-web-vitals + next/typescript)
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values. Currently only `NEXT_PUBLIC_SITE_URL` is used (it drives canonical URLs, the sitemap and Open Graph tags); everything else in the example file is reserved for future phases (CMS, payments, analytics) and is not read by any code yet.

## SEO architecture

- **Metadata**: `lib/seo/metadata.ts` exports `rootMetadata` (root layout default) and `buildMetadata(input)`, which every page calls with a `path` to get a correct canonical URL, Open Graph and Twitter metadata derived from `siteConfig.url`. Pass `absoluteTitle: true` for a page whose title should NOT go through the `"%s | FreshPick"` template (used once, on the homepage).
- **Structured data**: `lib/seo/schema.ts` builds JSON-LD for `WebSite`, `Restaurant`, `BreadcrumbList`, `BlogPosting`, `Product` and `FAQPage`. Fields backed by an unfilled `siteConfig` placeholder (e.g. `[FRESHPICK_PHONE]`) are omitted rather than emitted literally, and `Product` only emits an `offers` block when the item actually has a `price` — schema.org data should only ever reflect confirmed facts. Ratings, reviews and prices are never fabricated.
- **Breadcrumbs**: `components/seo/Breadcrumbs.tsx` renders the visible trail and its `BreadcrumbList` JSON-LD from one `items` prop, used on product and blog post pages.
- **Sitemap** (`app/sitemap.ts`) is generated from the route list plus `getAllPosts()` and `MENU_ITEMS` — adding a blog post or menu item automatically adds it. `/privacy-policy` and `/terms` are deliberately excluded (they're `noIndex`).
- **Robots** (`app/robots.ts`) allows all crawling and points at the sitemap; it has a marked spot to add `disallow` rules once private routes (e.g. an admin dashboard) exist.

## How menu data is structured

`lib/data/menu.ts` exports `MENU_CATEGORIES` (juices, juice blends, smoothies, fruit cocktails, shawarma, chips, food) and `MENU_ITEMS`, typed by `MenuItem` (`types/menu.ts`). **`MENU_ITEMS` is intentionally empty** — no real products, descriptions or prices have been provided. Populate it directly, or replace `lib/data/menu.ts` with a fetch from a future CMS/API returning the same shape; nothing in the UI needs to change either way. `/menu` filters across all 7 categories via `?category=`; `/menu/juices|food|shawarma|chips` are separate SEO landing pages grouping related categories; `/menu/[slug]` is a live product detail page (currently renders nothing statically since `MENU_ITEMS` is empty, but the route, metadata, Product schema and "related items" logic are all wired and will activate the moment items are added).

Until real items exist, the homepage's "Fresh Picks" / "More Than Juice" sections and the About page's "What We Offer" section fall back to **category-level** tiles (name + one-line description of the category, e.g. "Pure, single-fruit juices") rather than inventing specific products — see `components/home/FeaturedProducts.tsx` / `FoodShowcase.tsx`. Once `getFeaturedMenuItems()` returns real items, those sections automatically switch to showing actual products instead.

## How blog data is structured

`lib/data/blog.ts` exports `BLOG_POSTS` (typed by `BlogPost`, `types/blog.ts`), `BLOG_CATEGORIES` (the editorial taxonomy), and `getAllPosts` / `getPostBySlug` / `getPostsByCategory` / `searchPosts`. **`BLOG_POSTS` is intentionally empty** — no draft or demo articles were added to the live data, specifically to avoid ever showing fabricated content to a real visitor; `/blog` shows a clean empty state instead. `content` is stored as plain text/markdown-ready string so it can later be swapped for real Markdown/MDX rendering or a CMS fetch without changing the type. `readingTime` is expected to be precomputed (see `estimateReadingTime` in `lib/utils`).

## How the contact form works

There is no backend yet, so `components/contact/ContactForm.tsx` is honest about that: it validates client-side, then opens a pre-filled `mailto:` draft to `siteConfig.email` on submit. If email isn't configured yet, the submit button is disabled and the form tells the visitor to use the phone/WhatsApp details above instead — it never shows a fake "message sent" success state. Swap the `handleSubmit` body for a real API call once a backend exists.

## How "Order Now" works

`components/ui/OrderButton.tsx` centralizes ordering: it links to WhatsApp with a pre-filled message if `siteConfig.whatsapp` is set, falls back to `tel:` if only `siteConfig.phone` is set, and falls back to `/contact` if neither is configured yet — it never links to an invented number.

## How to replace the logo

The real FreshPick logo is at `public/logo.svg` (inspected, not redesigned — it's an SVG with a `4489x4016` viewBox, greens `rgb(43,180,74)` / `rgb(19,153,44)` and reds `rgb(237,28,36)` / `rgb(255,1,3)`). To replace it, overwrite `public/logo.svg` and update the tokens at the top of `app/globals.css` (`--color-primary`, `--color-primary-dark`, `--color-secondary`, `--color-secondary-dark`) to match. `favicon.ico` and `public/icons/` still need a real generated set (see below).

## How to update business information

Everything business-specific lives in `lib/config/site.ts` (`siteConfig`). Unconfirmed fields are filled with bracketed placeholders such as `[FRESHPICK_PHONE]`, `[FRESHPICK_ADDRESS]`, `[FRESHPICK_OPENING_TIME]` — replace them there. Nothing else in the app should hardcode phone numbers, addresses, hours or social links; every component that displays this data (`Footer`, `ContactInfo`, `OpeningHours`, `LocationCard`, `OrderButton`, JSON-LD builders) already skips any field still holding a placeholder, so the site degrades gracefully until real data is added.

## Missing information / assets

- Real menu items, descriptions, prices, photos — `lib/data/menu.ts`
- Real blog posts — `lib/data/blog.ts`
- Real FAQ content — `lib/data/faq.ts`
- Real customer testimonials, if/when available — `lib/data/testimonials.ts` (stays empty until then; the section it powers renders nothing when empty)
- Phone, WhatsApp, email, address, opening hours, social profile URLs, geo coordinates — `lib/config/site.ts`
- `public/favicon.ico` and `public/icons/` — a proper multi-size favicon/app-icon set generated from `public/logo.svg`
- Gallery, hero and product photography (`lib/data/gallery.ts` is empty; sections that would use photography currently use solid color panels instead of stock images)
- `/privacy-policy` and `/terms` are structurally-complete draft templates flagged `noIndex` and with an on-page notice — they need real legal review before publishing, and the `noIndex` + notice should be removed once approved

## Future roadmap (not built yet, architecture allows for it)

- CMS-backed menu/blog content (Sanity, WordPress, or a custom admin dashboard) behind the same `lib/data` shapes
- Online ordering: cart, quantities, item options, order status — `MenuItem` already has the fields (`available`, `price`) an ordering flow would need
- Payments
- Customer accounts, admin dashboard
- Analytics
