import { GalleryImage } from "@/lib/types";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const galleryFilePath = path.join(process.cwd(), "lib", "gallery.json");

// GET - Fetch all gallery images
export async function GET() {
  try {
    if (!fs.existsSync(galleryFilePath)) {
      return NextResponse.json({ images: [] }, { status: 200 });
    }

    const fileContent = fs.readFileSync(galleryFilePath, "utf8");
    const images = JSON.parse(fileContent);

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

    // Read existing data
    let images: GalleryImage[] = [];
    if (fs.existsSync(galleryFilePath)) {
      const fileContent = fs.readFileSync(galleryFilePath, "utf8");
      images = JSON.parse(fileContent);
    }

    // Create new image
    const newImage: GalleryImage = {
      id: `gallery-${Date.now()}`,
      title,
      description,
      category,
      image,
      alt: alt || title,
      uploadDate: new Date().toISOString().split("T")[0],
      featured: Boolean(featured),
    };

    // Add to array
    images.push(newImage);

    // Write back to file
    fs.writeFileSync(galleryFilePath, JSON.stringify(images, null, 2));

    return NextResponse.json(
      { message: "Gallery image added successfully", image: newImage },
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

    // Read existing data
    if (!fs.existsSync(galleryFilePath)) {
      return NextResponse.json(
        { error: "Gallery data not found" },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(galleryFilePath, "utf8");
    const images: GalleryImage[] = JSON.parse(fileContent);

    // Find image index
    const imageIndex = images.findIndex((img) => img.id === id);
    if (imageIndex === -1) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Update image
    const updatedImage = {
      ...images[imageIndex],
      ...(title && { title }),
      ...(description && { description }),
      ...(category && { category }),
      ...(image && { image }),
      ...(alt && { alt }),
      ...(featured !== undefined && { featured: Boolean(featured) }),
    };

    // Validate category if provided
    if (category && !["business", "offers", "branch"].includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    images[imageIndex] = updatedImage;

    // Write back to file
    fs.writeFileSync(galleryFilePath, JSON.stringify(images, null, 2));

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

    // Read existing data
    if (!fs.existsSync(galleryFilePath)) {
      return NextResponse.json(
        { error: "Gallery data not found" },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(galleryFilePath, "utf8");
    const images: GalleryImage[] = JSON.parse(fileContent);

    // Find image index
    const imageIndex = images.findIndex((img) => img.id === id);
    if (imageIndex === -1) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Remove image
    const deletedImage = images.splice(imageIndex, 1)[0];

    // Write back to file
    fs.writeFileSync(galleryFilePath, JSON.stringify(images, null, 2));

    return NextResponse.json(
      { message: "Gallery image deleted successfully", image: deletedImage },
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
