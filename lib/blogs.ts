import { blogs as blogService } from "./database";
import { Blog } from "./types";

// Re-export the database service functions
export const blogs = blogService;

export async function getBlogById(id: string): Promise<Blog | null> {
  return await blogService.findById(id);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  // Decode URL-encoded slug to handle Arabic characters properly
  // Next.js may already decode it, but we decode it explicitly to be safe
  let decodedSlug = slug;
  try {
    // Try to decode - if it's already decoded, this will still work
    decodedSlug = decodeURIComponent(slug);
  } catch (e) {
    // If decoding fails, use the original slug (it might already be decoded)
    decodedSlug = slug;
  }
  return await blogService.findBySlug(decodedSlug);
}

export async function getAllBlogs(): Promise<Blog[]> {
  return await blogService.getPublishedBlogs();
}

export async function getFeaturedBlogs(limit: number = 6): Promise<Blog[]> {
  return await blogService.getFeaturedBlogs(limit);
}

export async function getRecentBlogs(limit: number = 6): Promise<Blog[]> {
  return await blogService.getRecentBlogs(limit);
}

export async function searchBlogs(query: string): Promise<Blog[]> {
  return await blogService.searchBlogs(query);
}

export async function getBlogsByTag(tag: string): Promise<Blog[]> {
  return await blogService.findByTag(tag);
}

export async function incrementBlogViews(slug: string): Promise<void> {
  return await blogService.incrementViews(slug);
}
