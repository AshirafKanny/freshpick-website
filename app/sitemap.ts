import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { getAllPosts } from "@/lib/data/blog";
import { MENU_ITEMS } from "@/lib/data/menu";

/** Category slugs that currently have a real route under app/(site)/menu/[slug]. */
const ROUTED_MENU_CATEGORIES = ["juices", "food", "shawarma", "chips"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/menu`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/gallery`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteConfig.url}/faq`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const menuCategoryRoutes: MetadataRoute.Sitemap = ROUTED_MENU_CATEGORIES.map((slug) => ({
    url: `${siteConfig.url}/menu/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const menuItemRoutes: MetadataRoute.Sitemap = MENU_ITEMS.map((item) => ({
    url: `${siteConfig.url}/menu/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...menuCategoryRoutes, ...menuItemRoutes, ...blogRoutes];
}
