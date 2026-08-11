import { siteConfig } from "@/lib/config/site";
import { absoluteUrl } from "@/lib/seo/metadata";
import { isPlaceholder } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";
import type { MenuItem } from "@/types/menu";
import type { BreadcrumbItem } from "@/types/seo";

/**
 * JSON-LD builders. Every field here must be backed by real, confirmed data —
 * never fabricate ratings, reviews, prices, or awards. Fields sourced from
 * unfilled siteConfig placeholders are omitted rather than emitted as-is.
 */

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function getRestaurantSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.logo),
    servesCuisine: ["Juice Bar", "Fast Food"],
  };

  if (!isPlaceholder(siteConfig.phone)) schema.telephone = siteConfig.phone;
  if (!isPlaceholder(siteConfig.email)) schema.email = siteConfig.email;

  if (!isPlaceholder(siteConfig.address)) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressCountry: siteConfig.country,
    };
  }

  if (siteConfig.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    };
  }

  const openingHours = siteConfig.openingHours.filter(
    (range) => !isPlaceholder(range.opens) && !isPlaceholder(range.closes)
  );
  if (openingHours.length > 0) {
    schema.openingHoursSpecification = openingHours.map((range) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: range.days,
      opens: range.opens,
      closes: range.closes,
    }));
  }

  const sameAs = Object.values(siteConfig.socialLinks).filter(
    (link): link is string => !isPlaceholder(link)
  );
  if (sameAs.length > 0) schema.sameAs = sameAs;

  return schema;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getBlogPostingSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    image: post.featuredImage ? absoluteUrl(post.featuredImage) : undefined,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function getProductSchema(item: MenuItem) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    image: item.image ? absoluteUrl(item.image) : undefined,
  };

  if (item.price !== undefined && item.currency) {
    schema.offers = {
      "@type": "Offer",
      price: item.price,
      priceCurrency: item.currency,
      availability: item.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: absoluteUrl(`/menu/${item.slug}`),
    };
  }

  return schema;
}

export function getFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
