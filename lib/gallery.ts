import { gallery as galleryService } from "./database";
import { GalleryImage } from "./types";

// Re-export the database service functions
export const gallery = galleryService;

export async function getGalleryImageById(
  id: string
): Promise<GalleryImage | null> {
  return await galleryService.findById(id);
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  return await galleryService.findAll();
}

export async function getGalleryImagesByCategory(
  category: "business" | "offers" | "branch"
): Promise<GalleryImage[]> {
  return await galleryService.findByCategory(category);
}

export async function getFeaturedGalleryImages(): Promise<GalleryImage[]> {
  return await galleryService.findFeatured();
}
