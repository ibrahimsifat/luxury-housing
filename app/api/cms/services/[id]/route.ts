import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const SERVICES_FILE = path.join(process.cwd(), "lib", "services.json");

// Helper function to get services from JSON file
async function getServicesFromFile() {
  const fileContent = await fs.readFile(SERVICES_FILE, "utf8");
  return JSON.parse(fileContent);
}

// GET - Fetch single service
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const services = await getServicesFromFile();
    const service = services.find((s: any) => s.id === params.id);

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
    const services = await getServicesFromFile();

    const serviceIndex = services.findIndex((s: any) => s.id === params.id);
    if (serviceIndex === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Update service
    services[serviceIndex] = {
      ...services[serviceIndex],
      ...serviceData,
      id: params.id, // Ensure ID doesn't change
    };

    // Update the JSON file
    await fs.writeFile(
      SERVICES_FILE,
      JSON.stringify(services, null, 2),
      "utf8"
    );

    return NextResponse.json(services[serviceIndex]);
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
    const services = await getServicesFromFile();

    const serviceIndex = services.findIndex((s: any) => s.id === params.id);
    if (serviceIndex === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Remove service
    services.splice(serviceIndex, 1);

    // Update the JSON file
    await fs.writeFile(
      SERVICES_FILE,
      JSON.stringify(services, null, 2),
      "utf8"
    );

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
