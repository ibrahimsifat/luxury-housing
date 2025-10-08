import { CacheInvalidator } from "@/lib/cache";
import { gallery } from "@/lib/database";
import { GalleryImage } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all gallery images
export async function GET() {
  try {
    const images = await gallery.findAll();
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error("Error reading gallery data:", error);
    return NextResponse.json(
      { error: "Failed to read gallery data" },
      { status: 500 }
    );
  }
}

// POST - Add new gallery image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, image, alt, featured = false } = body;

    // Validate required fields
    if (!title || !description || !category || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate category
    if (!["business", "offers", "branch"].includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Create new image
    const newImage: Omit<GalleryImage, "_id"> = {
      id: `gallery-${Date.now()}`,
      title,
      description,
      category,
      image,
      alt: alt || title,
      uploadDate: new Date().toISOString().split("T")[0],
      featured: Boolean(featured),
    };

    const createdImage = await gallery.create(newImage);

    // Invalidate cache after creating gallery image
    CacheInvalidator.onGalleryCreate();

    return NextResponse.json(
      { message: "Gallery image added successfully", image: createdImage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding gallery image:", error);
    return NextResponse.json(
      { error: "Failed to add gallery image" },
      { status: 500 }
    );
  }
}

// PUT - Update gallery image
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, category, image, alt, featured } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

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

// DELETE - Delete gallery image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    const deleted = await gallery.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Invalidate cache after deleting gallery image
    CacheInvalidator.onGalleryDelete();

    return NextResponse.json(
      { message: "Gallery image deleted successfully" },
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
