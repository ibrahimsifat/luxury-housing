import { CacheInvalidator } from "@/lib/cache";
import { deleteImagesFromUrls } from "@/lib/cloudinary";
import { services } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch single service
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await services.findById(params.id);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error reading service:", error);
    return NextResponse.json(
      { error: "Failed to read service" },
      { status: 500 }
    );
  }
}

// PUT - Update service
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serviceData = await request.json();

    const updatedService = await services.update(params.id, serviceData);

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Invalidate cache after updating service
    CacheInvalidator.onServiceUpdate();

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE - Delete service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First, get the service to collect image URLs for deletion
    const service = await services.findById(params.id);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Collect all image URLs from the service
    const imageUrls: string[] = [];

    // Add icon if it's a Cloudinary URL
    if (
      service.icon &&
      service.icon.startsWith("https://res.cloudinary.com/")
    ) {
      imageUrls.push(service.icon);
    }

    // Delete the service from database
    const deleted = await services.delete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Delete associated images from Cloudinary
    if (imageUrls.length > 0) {
      const cloudinaryResult = await deleteImagesFromUrls(imageUrls);

      if (!cloudinaryResult.success) {
        console.warn(
          "Some Cloudinary images failed to delete:",
          cloudinaryResult.errors
        );
        // Don't fail the entire operation if Cloudinary deletion fails
      } else {
        console.log(
          `Successfully deleted ${cloudinaryResult.deleted.length} images from Cloudinary`
        );
      }
    }

    // Invalidate cache after deleting service
    CacheInvalidator.onServiceDelete();

    return NextResponse.json({
      message: "Service deleted successfully",
      cloudinaryDeleted: imageUrls.length > 0 ? imageUrls.length : 0,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
