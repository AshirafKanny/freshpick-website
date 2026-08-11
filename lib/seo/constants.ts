import { siteConfig } from "@/lib/config/site";

export const DEFAULT_TITLE = "FreshPick | Fresh Juices & Food in Uganda";

export const DEFAULT_DESCRIPTION = siteConfig.description;

export const TITLE_TEMPLATE = `%s | ${siteConfig.name}`;

/** Falls back to the logo until real storefront/hero photography is provided. */
export const DEFAULT_OG_IMAGE = {
  url: siteConfig.logo,
  width: 1200,
  height: 1200,
  alt: `${siteConfig.name} logo`,
};

export const TWITTER_HANDLE = "[FRESHPICK_TWITTER_HANDLE]";
