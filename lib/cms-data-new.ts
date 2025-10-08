import {
  getAllGalleryImages,
  getFeaturedGalleryImages,
  getGalleryImageById,
  getGalleryImagesByCategory,
} from "./gallery";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
} from "./products";
import {
  getAllServices,
  getFeaturedServices,
  getServiceById,
  getServiceBySlug,
  getServicesByCategory,
} from "./services";
import { GalleryImage, Product, Service } from "./types";

interface CMSData {
  products: Product[];
  services: Service[];
  gallery: GalleryImage[];
}

/**
 * Get all CMS data with caching
 */
export async function getCMSData(forceRefresh = false): Promise<CMSData> {
  console.log("Fetching fresh CMS data...");

  const [products, services, gallery] = await Promise.all([
    getAllProducts(),
    getAllServices(),
    getAllGalleryImages(),
  ]);

  return { products, services, gallery };
}

/**
 * Get products with caching
 */
export async function getCachedProducts(): Promise<Product[]> {
  return getAllProducts();
}

/**
 * Get services with caching
 */
export async function getCachedServices(): Promise<Service[]> {
  return getAllServices();
}

/**
 * Get gallery images with caching
 */
export async function getCachedGalleryImages(): Promise<GalleryImage[]> {
  return getAllGalleryImages();
}

// Re-export individual data fetching functions for direct use
export {
  getAllGalleryImages,
  getAllProducts,
  getAllServices,
  getFeaturedGalleryImages,
  getFeaturedProducts,
  getFeaturedServices,
  getGalleryImageById,
  getGalleryImagesByCategory,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getServiceById,
  getServiceBySlug,
  getServicesByCategory,
};
