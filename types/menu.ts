export type MenuCategorySlug =
  | "juices"
  | "juice-blends"
  | "smoothies"
  | "fruit-cocktails"
  | "shawarma"
  | "chips"
  | "food";

export interface MenuCategory {
  slug: MenuCategorySlug;
  name: string;
  description: string;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: MenuCategorySlug;
  /** Price in the smallest sensible display unit for `currency`. Omit until real pricing is confirmed. */
  price?: number;
  currency?: "UGX";
  image?: string;
  alt?: string;
  featured?: boolean;
  available: boolean;
  ingredients?: string[];
  tags?: string[];
}
