import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";
import { DEFAULT_OG_IMAGE, TITLE_TEMPLATE, TWITTER_HANDLE } from "@/lib/seo/constants";
import type { PageSeoInput } from "@/types/seo";

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

/**
 * Builds page-level Metadata on top of the root layout's defaults.
 * Pass a path (not a full URL) — canonical and OG URLs are derived from siteConfig.url
 * so every page stays correct if the domain ever changes.
 */
export function buildMetadata(input: PageSeoInput): Metadata {
  const url = absoluteUrl(input.path);
  const image = input.image
    ? { url: absoluteUrl(input.image), alt: input.imageAlt ?? input.title }
    : DEFAULT_OG_IMAGE;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: siteConfig.name,
      images: [image],
      locale: "en_UG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image.url],
      site: TWITTER_HANDLE.startsWith("[") ? undefined : TWITTER_HANDLE,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "FreshPick | Fresh Juices & Food in Uganda",
    template: TITLE_TEMPLATE,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    title: "FreshPick | Fresh Juices & Food in Uganda",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [DEFAULT_OG_IMAGE],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreshPick | Fresh Juices & Food in Uganda",
    description: siteConfig.description,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};
