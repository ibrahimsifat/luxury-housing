import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const SERVICES_FILE = path.join(process.cwd(), "lib", "services.json");

// GET - Fetch all services
export async function GET() {
  try {
    const fileContent = await fs.readFile(SERVICES_FILE, "utf8");
    const services = JSON.parse(fileContent);
    console.log("Loaded services count:", services.length);
    return NextResponse.json(services);
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

    // Read current services
    const fileContent = await fs.readFile(SERVICES_FILE, "utf8");
    const services = JSON.parse(fileContent);

    // Add new service
    const newService = {
      id: serviceData.id || `service-${Date.now()}`,
      slug:
        serviceData.slug ||
        serviceData.title.toLowerCase().replace(/\s+/g, "-"),
      ...serviceData,
    };

    services.push(newService);

    // Update the JSON file
    await fs.writeFile(
      SERVICES_FILE,
      JSON.stringify(services, null, 2),
      "utf8"
    );

    return NextResponse.json(newService);
  } catch (error) {
    console.error("Error adding service:", error);
    return NextResponse.json(
      { error: "Failed to add service" },
      { status: 500 }
    );
  }
}
