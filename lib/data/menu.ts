import type { MenuCategory, MenuItem } from "@/types/menu";

/**
 * Fixed category taxonomy for FreshPick's menu. These are architectural
 * placeholders reflecting the product lines described by the business,
 * not a promise that every category currently has published items.
 */
export const MENU_CATEGORIES: MenuCategory[] = [
  { slug: "juices", name: "Fresh Juices", description: "Pure, single-fruit juices" },
  { slug: "juice-blends", name: "Juice Blends", description: "Blended fruit combinations" },
  { slug: "smoothies", name: "Smoothies", description: "Thick, blended fruit smoothies" },
  { slug: "fruit-cocktails", name: "Fruit Cocktails", description: "Mixed fruit cocktails" },
  { slug: "shawarma", name: "Shawarma", description: "Wrapped and grilled" },
  { slug: "chips", name: "Chips", description: "Golden and crispy" },
  { slug: "food", name: "Food", description: "Restaurant favourites" },
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
