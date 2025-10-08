import { services as serviceService } from "./database";
import { Service } from "./types";

// Re-export the database service functions
export const services = serviceService;

export async function getServiceById(id: string): Promise<Service | null> {
  return await serviceService.findById(id);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return await serviceService.findBySlug(slug);
}

export async function getServicesByCategory(
  category: string
): Promise<Service[]> {
  return await serviceService.findByCategory(category);
}

export async function getAllServices(): Promise<Service[]> {
  return await serviceService.findAll();
}

export async function getFeaturedServices(): Promise<Service[]> {
  return await serviceService.findFeatured();
}
