import type { MenuCategory, MenuItem } from "@/types/menu";

/**
 * Fixed category taxonomy for FreshPick's menu. These are architectural
 * placeholders reflecting the product lines described by the business,
 * not a promise that every category currently has published items.
 */
export const MENU_CATEGORIES: MenuCategory[] = [
  { slug: "juices", name: "Fresh Juices", description: "" },
  { slug: "juice-blends", name: "Juice Blends", description: "" },
  { slug: "smoothies", name: "Smoothies", description: "" },
  { slug: "fruit-cocktails", name: "Fruit Cocktails", description: "" },
  { slug: "shawarma", name: "Shawarma", description: "" },
  { slug: "chips", name: "Chips", description: "" },
  { slug: "food", name: "Food", description: "" },
];

/**
 * Intentionally empty: no real FreshPick menu items, descriptions or prices
 * have been provided yet. Populate this array (or replace it with a CMS/API
 * fetch of the same MenuItem shape) once real product data is available —
 * never fill it with placeholder/fake products.
 */
export const MENU_ITEMS: MenuItem[] = [];

export function getMenuItemsByCategory(category: string): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.category === category);
}

export function getMenuItemsByCategories(categories: string[]): MenuItem[] {
  return MENU_ITEMS.filter((item) => categories.includes(item.category));
}

export function getFeaturedMenuItems(): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.featured);
}

export function getMenuItemBySlug(slug: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.slug === slug);
}
