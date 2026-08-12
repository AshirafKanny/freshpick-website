export interface GalleryCategory {
  slug: string;
  name: string;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { slug: "juices", name: "Juices" },
  { slug: "food", name: "Food" },
  { slug: "shawarma", name: "Shawarma" },
  { slug: "chips", name: "Chips" },
  { slug: "fruits", name: "Fruits" },
  { slug: "restaurant", name: "Restaurant" },
  { slug: "behind-the-scenes", name: "Behind the Scenes" },
];

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

/**
 * Intentionally empty: no real FreshPick photography has been provided yet.
 * Populate with real, licensed FreshPick photos only — never unrelated
 * stock or competitor imagery presented as FreshPick's own.
 */
export const GALLERY_IMAGES: GalleryImage[] = [];
