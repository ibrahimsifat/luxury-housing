import { getAllGalleryImages } from "@/lib/cms-data";
import GalleryPage from "./page";

export default async function GalleryPageWrapper() {
  const galleryData = await getAllGalleryImages();

  return <GalleryPage galleryData={galleryData} />;
}
