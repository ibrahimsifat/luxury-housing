import { revalidatePath, revalidateTag } from "next/cache";

// Cache tags for different data types
export const CACHE_TAGS = {
  PRODUCTS: "products",
  SERVICES: "services",
  GALLERY: "gallery",
  CLIENTS: "clients",
  BLOGS: "blogs",
  CMS_DATA: "cms-data",
} as const;

// Cache keys for different operations
export const CACHE_KEYS = {
  ALL_PRODUCTS: "all-products",
  ALL_SERVICES: "all-services",
  ALL_GALLERY: "all-gallery",
  ALL_CLIENTS: "all-clients",
  ALL_BLOGS: "all-blogs",
  FEATURED_PRODUCTS: "featured-products",
  FEATURED_SERVICES: "featured-services",
  FEATURED_GALLERY: "featured-gallery",
  FEATURED_CLIENTS: "featured-clients",
  FEATURED_BLOGS: "featured-blogs",
} as const;

// Cache duration in seconds
export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 1800, // 30 minutes
  VERY_LONG: 3600, // 1 hour
} as const;

/**
 * Invalidate cache for specific data type
 */
export function invalidateCache(type: keyof typeof CACHE_TAGS) {
  const tag = CACHE_TAGS[type];
  revalidateTag(tag);
  console.log(`Cache invalidated for: ${tag}`);
}

/**
 * Invalidate cache for specific paths
 */
export function invalidatePaths(paths: string[]) {
  paths.forEach((path) => {
    revalidatePath(path);
    console.log(`Path invalidated: ${path}`);
  });
}

/**
 * Invalidate all CMS cache
 */
export function invalidateAllCMSCache() {
  Object.values(CACHE_TAGS).forEach((tag) => {
    revalidateTag(tag);
  });

  // Also invalidate common paths
  const commonPaths = [
    "/",
    "/products",
    "/services",
    "/gallery",
    "/clients",
    "/blog",
    "/cms/dashboard",
  ];

  invalidatePaths(commonPaths);

  console.log("All CMS cache invalidated");
}

/**
 * Get cache configuration for Next.js fetch
 */
export function getCacheConfig(
  duration: keyof typeof CACHE_DURATION = "MEDIUM",
  tags: string[] = []
) {
  return {
    next: {
      revalidate: CACHE_DURATION[duration],
      tags: tags,
    },
  };
}

/**
 * Cache invalidation helper for CRUD operations
 */
export class CacheInvalidator {
  static onProductCreate() {
    invalidateCache("PRODUCTS");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/products", "/"]);
  }

  static onProductUpdate() {
    invalidateCache("PRODUCTS");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/products", "/"]);
  }

  static onProductDelete() {
    invalidateCache("PRODUCTS");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/products", "/"]);
  }

  static onServiceCreate() {
    invalidateCache("SERVICES");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/services", "/"]);
  }

  static onServiceUpdate() {
    invalidateCache("SERVICES");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/services", "/"]);
  }

  static onServiceDelete() {
    invalidateCache("SERVICES");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/services", "/"]);
  }

  static onGalleryCreate() {
    invalidateCache("GALLERY");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/gallery"]);
  }

  static onGalleryUpdate() {
    invalidateCache("GALLERY");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/gallery"]);
  }

  static onGalleryDelete() {
    invalidateCache("GALLERY");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/gallery"]);
  }

  static onClientCreate() {
    invalidateCache("CLIENTS");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/clients", "/"]);
  }

  static onClientUpdate() {
    invalidateCache("CLIENTS");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/clients", "/"]);
  }

  static onClientDelete() {
    invalidateCache("CLIENTS");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/clients", "/"]);
  }

  static onBlogCreate() {
    invalidateCache("BLOGS");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/blog", "/"]);
  }

  static onBlogUpdate() {
    invalidateCache("BLOGS");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/blog", "/"]);
  }

  static onBlogDelete() {
    invalidateCache("BLOGS");
    invalidateCache("CMS_DATA");
    invalidatePaths(["/blog", "/"]);
  }

  static onBulkUpdate() {
    invalidateAllCMSCache();
  }
}
