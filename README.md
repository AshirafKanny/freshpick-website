# FreshPick

FreshPick is a Uganda-based restaurant and fresh-food business — fresh fruit juices, juice blends, smoothies, fruit cocktails, shawarma, chips and other food. This repository is the foundation for FreshPick's website: a professional digital storefront intended to grow into online ordering, a CMS-backed blog/menu, customer accounts and payments.

**Status:** architecture and SEO foundation only. There is no final visual design, no real menu/blog content, and no confirmed business information yet — see [Missing information](#missing-information) below.

## Tech stack

- **Next.js** (App Router, React Server Components by default)
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **lucide-react** for icons (used only where interactivity/iconography is genuinely needed, e.g. the mobile nav toggle)
- **npm** as the package manager (pnpm was unavailable in this environment and corepack could not be enabled without admin rights; the project has no npm-specific dependency and works with pnpm too)

## Folder structure

```
app/
  (site)/            route group for all public pages — adds no segment to the URL
    page.tsx          /
    menu/              /menu, /menu/juices, /menu/food, /menu/shawarma, /menu/chips
    about/             /about
    gallery/           /gallery
    blog/              /blog, /blog/[slug]
    contact/           /contact
    faq/               /faq
    layout.tsx         wraps site pages with Header + Footer
  layout.tsx           root layout: fonts, global <html>/<body>, sitewide JSON-LD
  sitemap.ts / robots.ts / manifest.ts
  not-found.tsx / error.tsx / loading.tsx
  globals.css

components/
  layout/       Container, Section — generic layout primitives
  navigation/    Header (client, mobile menu), Footer, nav link list
  ui/            Button / LinkButton
  menu/          MenuGrid, MenuItemCard
  blog/          BlogCard
  gallery/       GalleryGrid
  contact/       ContactInfo
  seo/           JsonLd (renders a JSON-LD <script> tag)

lib/
  config/site.ts   central business config (name, contact info, hours, socials, logo)
  data/            menu.ts, blog.ts, faq.ts — typed content, no data in components
  seo/             metadata.ts (Metadata builder), schema.ts (JSON-LD builders), constants.ts
  utils/           small shared helpers (cn, formatCurrency, formatDate, isPlaceholder, ...)

types/            MenuItem, BlogPost, SiteConfig, SEO/breadcrumb types

public/
  logo.svg         FreshPick's real logo (source of the brand color tokens in globals.css)
  images/, icons/, fonts/
```

Why a `(site)` route group: it lets the public site share one Header/Footer layout while leaving room to add e.g. an `(admin)` group later with a completely different layout, without restructuring the URL space.

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

- **Metadata**: `lib/seo/metadata.ts` exports `rootMetadata` (used by the root layout) and `buildMetadata(input)`, which every page calls with a `path` to get a correct canonical URL, Open Graph and Twitter metadata derived from `siteConfig.url` — no page hardcodes its own URL.
- **Structured data**: `lib/seo/schema.ts` builds JSON-LD for `WebSite`, `Restaurant`, `BreadcrumbList`, `BlogPosting` and `FAQPage`. Fields backed by an unfilled `siteConfig` placeholder (e.g. `[FRESHPICK_PHONE]`) are omitted from the output rather than emitted literally — schema.org data should only ever reflect confirmed facts. Ratings, reviews and prices are never fabricated.
- **Sitemap** (`app/sitemap.ts`) is generated from the same route list plus `getAllPosts()` — adding a blog post automatically adds it to the sitemap.
- **Robots** (`app/robots.ts`) allows all crawling and points at the sitemap; it has a marked spot to add `disallow` rules once private routes (e.g. an admin dashboard) exist.

## How menu data is structured

`lib/data/menu.ts` exports `MENU_CATEGORIES` (the fixed taxonomy: juices, juice blends, smoothies, fruit cocktails, shawarma, chips, food) and `MENU_ITEMS`, typed by `MenuItem` (`types/menu.ts`). **`MENU_ITEMS` is intentionally empty** — no real products, descriptions or prices have been provided. Populate it directly, or replace `lib/data/menu.ts` with a fetch from a future CMS/API returning the same shape; nothing in the UI (`components/menu/*`, the menu pages) needs to change either way. Each category-listing page groups the taxonomy into the four routed sections (`/menu/juices` covers juices + juice blends + smoothies + fruit cocktails; `/menu/food`, `/menu/shawarma`, `/menu/chips` are one category each). `MenuItem.slug` is ready to back an individual `/menu/[slug]` product page later.

## How blog data is structured

`lib/data/blog.ts` exports `BLOG_POSTS`, typed by `BlogPost` (`types/blog.ts`), plus `getAllPosts`, `getPostBySlug`, `getPostsByCategory`. **`BLOG_POSTS` is intentionally empty.** `content` is stored as plain text/markdown-ready string so it can later be swapped for real Markdown/MDX rendering or a CMS fetch without changing the type. `readingTime` is expected to be precomputed (see `estimateReadingTime` in `lib/utils`) rather than calculated at render time.

## How to replace the logo

The real FreshPick logo is at `public/logo.svg` (inspected, not redesigned — it's an SVG with a `4489x4016` viewBox, greens `rgb(43,180,74)` / `rgb(19,153,44)` and reds `rgb(237,28,36)` / `rgb(255,1,3)`). To replace it, overwrite `public/logo.svg` with the new file and update the design tokens at the top of `app/globals.css` (`--color-primary`, `--color-primary-dark`, `--color-secondary`, `--color-secondary-dark`) to match. `favicon.ico` and `public/icons/` still need real generated assets (see below).

## How to update business information

Everything business-specific lives in `lib/config/site.ts` (`siteConfig`). Unconfirmed fields are filled with bracketed placeholders such as `[FRESHPICK_PHONE]`, `[FRESHPICK_ADDRESS]`, `[FRESHPICK_OPENING_TIME]` — replace them with real values there. Nothing else in the app should hardcode phone numbers, addresses, hours or social links; components that display this data (`Footer`, `ContactInfo`, JSON-LD builders) already skip any field still holding a placeholder, so the site degrades gracefully until real data is added.

## Missing information / assets

- Real menu items, descriptions, prices — `lib/data/menu.ts`
- Real blog posts — `lib/data/blog.ts`
- Real FAQ content — `lib/data/faq.ts`
- Phone, WhatsApp, email, address, opening hours, social profile URLs, geo coordinates — `lib/config/site.ts`
- `public/favicon.ico` and `public/icons/` — a proper multi-size favicon/app-icon set generated from `public/logo.svg` (not auto-generated in this pass — no favicon tooling was run against the real logo)
- Gallery photography and any real product/hero imagery
- Final visual design — this pass intentionally ships unstyled/minimal pages

## Future roadmap (not built yet, architecture allows for it)

- Individual product pages at `/menu/[slug]`
- CMS-backed menu/blog content (Sanity, WordPress, or a custom admin dashboard) behind the same `lib/data` shapes
- Online ordering: cart, quantities, item options, order status — `MenuItem` already has the fields (`available`, `price`) an ordering flow would need
- Payments
- Customer accounts, admin dashboard
- Analytics
