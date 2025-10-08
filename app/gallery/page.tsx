import { getAllGalleryImages } from "@/lib/cms-data";
import GalleryPage from "./gallery-content";

// Force dynamic rendering to avoid build-time data fetching
export const dynamic = "force-dynamic";

export default async function GalleryPageWrapper() {
  const galleryData = await getAllGalleryImages();

  return <GalleryPage galleryData={galleryData} />;
}
