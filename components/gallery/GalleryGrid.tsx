import Image from "next/image";
import type { GalleryImage } from "@/lib/data/gallery";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) {
    return (
      <p className="text-sm text-muted">Gallery photos are coming soon.</p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={600}
          height={450}
          className="h-64 w-full rounded-lg object-cover"
        />
      ))}
    </div>
  );
}
