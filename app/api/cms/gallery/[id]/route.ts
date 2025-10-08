import { CacheInvalidator } from "@/lib/cache";
import { deleteImagesFromUrls } from "@/lib/cloudinary";
import { gallery } from "@/lib/database";
import { GalleryImage } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch specific gallery image
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const image = await gallery.findById(id);
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ image }, { status: 200 });
  } catch (error) {
    console.error("Error fetching gallery image:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery image" },
      { status: 500 }
    );
  }
}

// PUT - Update specific gallery image
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, category, image, alt, featured } = body;

    // Validate category if provided
    if (category && !["business", "offers", "branch"].includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Prepare update data
    const updateData: Partial<GalleryImage> = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (image) updateData.image = image;
    if (alt) updateData.alt = alt;
    if (featured !== undefined) updateData.featured = Boolean(featured);

    const updatedImage = await gallery.update(id, updateData);

    if (!updatedImage) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Invalidate cache after updating gallery image
    CacheInvalidator.onGalleryUpdate();

    return NextResponse.json(
      { message: "Gallery image updated successfully", image: updatedImage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating gallery image:", error);
    return NextResponse.json(
      { error: "Failed to update gallery image" },
      { status: 500 }
    );
  }
}

// DELETE - Delete specific gallery image
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // First, get the gallery image to collect image URL for deletion
    const galleryImage = await gallery.findById(id);

    if (!galleryImage) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Collect image URL from the gallery image
    const imageUrls: string[] = [];

    // Add image if it's a Cloudinary URL
    if (
      galleryImage.image &&
      galleryImage.image.startsWith("https://res.cloudinary.com/")
    ) {
      imageUrls.push(galleryImage.image);
    }

    // Delete the gallery image from database
    const deleted = await gallery.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Delete associated image from Cloudinary
    if (imageUrls.length > 0) {
      const cloudinaryResult = await deleteImagesFromUrls(imageUrls);

      if (!cloudinaryResult.success) {
        console.warn(
          "Cloudinary image failed to delete:",
          cloudinaryResult.errors
        );
        // Don't fail the entire operation if Cloudinary deletion fails
      } else {
        console.log(
          `Successfully deleted ${cloudinaryResult.deleted.length} images from Cloudinary`
        );
      }
    }

    // Invalidate cache after deleting gallery image
    CacheInvalidator.onGalleryDelete();

    return NextResponse.json(
      {
        message: "Gallery image deleted successfully",
        cloudinaryDeleted: imageUrls.length > 0 ? imageUrls.length : 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery image" },
      { status: 500 }
    );
  }
}
