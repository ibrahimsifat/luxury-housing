import { GalleryImage } from "@/lib/types";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const galleryFilePath = path.join(process.cwd(), "lib", "gallery.json");

// GET - Fetch specific gallery image
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!fs.existsSync(galleryFilePath)) {
      return NextResponse.json(
        { error: "Gallery data not found" },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(galleryFilePath, "utf8");
    const images: GalleryImage[] = JSON.parse(fileContent);

    const image = images.find((img) => img.id === id);
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

// DELETE - Delete specific gallery image
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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
