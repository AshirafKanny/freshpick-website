import type { BlogPost } from "@/types/blog";

/** Editorial category taxonomy the blog is architected around. */
export const BLOG_CATEGORIES = [
  "Fresh Juice",
  "Food",
  "Restaurant Life",
  "Nutrition & Ingredients",
  "FreshPick News",
  "Food Guides",
  "Kampala Food",
  "Behind the Scenes",
];

/**
 * Intentionally empty: no real FreshPick articles have been written yet.
 * Populate this array (or swap it for a Markdown/MDX/CMS-backed fetch
 * returning the same BlogPost shape) once real content exists — never
 * fill it with placeholder posts.
 */
export const BLOG_POSTS: BlogPost[] = [];

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function searchPosts(query: string, category?: string): BlogPost[] {
  const posts = category ? getPostsByCategory(category) : getAllPosts();
  const q = query.trim().toLowerCase();
  if (!q) return posts;
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q)
  );
}
