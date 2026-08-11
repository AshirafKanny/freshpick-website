export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Plain text / markdown-ready body. Swap for MDX or CMS-fetched content later without changing this shape. */
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featuredImage?: string;
  imageAlt?: string;
  /** Minutes, precomputed at data-authoring time to avoid a runtime dependency for word counting. */
  readingTime: number;
  seoTitle?: string;
  seoDescription?: string;
}
