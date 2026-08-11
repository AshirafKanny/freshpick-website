import { Blend, Cherry, Citrus, Flame, GlassWater, Sandwich, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MenuCategorySlug } from "@/types/menu";

export const CATEGORY_ICONS: Record<MenuCategorySlug, LucideIcon> = {
  juices: Citrus,
  "juice-blends": Blend,
  smoothies: GlassWater,
  "fruit-cocktails": Cherry,
  shawarma: Sandwich,
  chips: Flame,
  food: UtensilsCrossed,
};
