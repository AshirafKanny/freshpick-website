import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Reserved for future private routes (e.g. an admin dashboard).
        // Add disallow entries here once those routes exist — none do yet.
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
