import { products as productService } from "./database";
import { Product } from "./types";

// Re-export the database service functions
export const products = productService;

export async function getProductById(id: string): Promise<Product | null> {
  return await productService.findById(id);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await productService.findBySlug(slug);
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  return await productService.findByCategory(category);
}

export async function getAllProducts(): Promise<Product[]> {
  return await productService.findAll();
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return await productService.findFeatured();
}
