import { CacheInvalidator } from "@/lib/cache";
import { services } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all services
export async function GET() {
  try {
    const allServices = await services.findAll();
    console.log("Loaded services count:", allServices.length);
    return NextResponse.json(allServices);
  } catch (error) {
    console.error("Error reading services:", error);
    return NextResponse.json(
      { error: "Failed to read services" },
      { status: 500 }
    );
  }
}

// POST - Add new service
export async function POST(request: NextRequest) {
  try {
    const serviceData = await request.json();

    // Add new service
    const newService = {
      id: serviceData.id || `service-${Date.now()}`,
      slug:
        serviceData.slug ||
        serviceData.title.toLowerCase().replace(/\s+/g, "-"),
      ...serviceData,
    };

    const createdService = await services.create(newService);

    // Invalidate cache after creating service
    CacheInvalidator.onServiceCreate();

    return NextResponse.json(createdService);
  } catch (error) {
    console.error("Error adding service:", error);
    return NextResponse.json(
      { error: "Failed to add service" },
      { status: 500 }
    );
  }
}

// PUT - Update service
export async function PUT(request: NextRequest) {
  try {
    const serviceData = await request.json();
    const { id, ...updateData } = serviceData;

    if (!id) {
      return NextResponse.json(
        { error: "Service ID is required" },
        { status: 400 }
      );
    }

    const updatedService = await services.update(id, updateData);

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Invalidate cache after updating service
    CacheInvalidator.onServiceUpdate();

    return NextResponse.json(
      { message: "Service updated successfully", service: updatedService },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE - Delete service
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Service ID is required" },
        { status: 400 }
      );
    }

    const deleted = await services.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Invalidate cache after deleting service
    CacheInvalidator.onServiceDelete();

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
