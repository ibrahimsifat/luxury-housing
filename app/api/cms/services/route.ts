import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const SERVICES_FILE = path.join(process.cwd(), "lib", "services.ts");

// GET - Fetch all services
export async function GET() {
  try {
    // Import the services directly from the module
    const { services } = await import("../../../../lib/services");
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
    const servicesMatch = fileContent.match(
      /export const services: Service\[\] = \[([\s\S]*?)\]/
    );

    let services = [];
    if (servicesMatch) {
      const servicesString = `[${servicesMatch[1]}]`;
      services = JSON.parse(servicesString);
    }

    // Add new service
    const newService = {
      id: serviceData.id || `service-${Date.now()}`,
      slug:
        serviceData.slug ||
        serviceData.title.toLowerCase().replace(/\s+/g, "-"),
      ...serviceData,
    };

    services.push(newService);

    // Update the file
    const updatedContent = fileContent.replace(
      /export const services: Service\[\] = \[[\s\S]*?\]/,
      `export const services: Service[] = ${JSON.stringify(services, null, 2)}`
    );

    await fs.writeFile(SERVICES_FILE, updatedContent, "utf8");

    return NextResponse.json(newService);
  } catch (error) {
    console.error("Error adding service:", error);
    return NextResponse.json(
      { error: "Failed to add service" },
      { status: 500 }
    );
  }
}
