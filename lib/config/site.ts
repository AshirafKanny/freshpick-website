import type { SiteConfig } from "@/types/site";

/**
 * Single source of truth for FreshPick's business information.
 * Every placeholder below is unconfirmed real-world data — replace with
 * verified values before launch. Nothing here should be duplicated
 * elsewhere in the app; import `siteConfig` instead.
 */
export const siteConfig: SiteConfig = {
  name: "FreshPick",
  shortName: "FreshPick",
  description:
    "FreshPick is a Uganda-based restaurant and fresh-food business serving fresh fruit juices, juice blends, smoothies, fruit cocktails, shawarma and chips.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.freshpick.example",
  phone: "[FRESHPICK_PHONE]",
  whatsapp: "[FRESHPICK_WHATSAPP]",
  email: "[FRESHPICK_EMAIL]",
  address: "[FRESHPICK_ADDRESS]",
  city: "Kampala",
  country: "Uganda",
  // geo: intentionally omitted until real coordinates are confirmed.
  openingHours: [
    {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "[FRESHPICK_OPENING_TIME]",
      closes: "[FRESHPICK_CLOSING_TIME]",
    },
  ],
  socialLinks: {
    facebook: "[FRESHPICK_FACEBOOK_URL]",
    instagram: "[FRESHPICK_INSTAGRAM_URL]",
    tiktok: "[FRESHPICK_TIKTOK_URL]",
  },
  logo: "/logo.svg",
};
