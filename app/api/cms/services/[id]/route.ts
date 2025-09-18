import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const SERVICES_FILE = path.join(process.cwd(), "lib", "services.ts");

// Helper function to get services from module
async function getServicesFromModule() {
  const { services } = await import("../../../../../lib/services");
  return services;
}

// GET - Fetch single service
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const services = await getServicesFromModule();
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
    const services = await getServicesFromModule();

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

    // Read the file content to update it
    const fileContent = await fs.readFile(SERVICES_FILE, "utf8");

    // Find the start of the services array
    const arrayStart = fileContent.indexOf(
      "export const services: Service[] = ["
    );

    if (arrayStart === -1) {
      return NextResponse.json(
        { error: "Could not find services array in file" },
        { status: 500 }
      );
    }

    // Find the matching closing bracket by counting brackets
    let bracketCount = 0;
    let arrayEnd = -1;
    let inString = false;
    let escapeNext = false;

    for (
      let i = arrayStart + "export const services: Service[] = [".length;
      i < fileContent.length;
      i++
    ) {
      const char = fileContent[i];

      if (escapeNext) {
        escapeNext = false;
        continue;
      }

      if (char === "\\") {
        escapeNext = true;
        continue;
      }

      if (char === '"' || char === "'") {
        inString = !inString;
        continue;
      }

      if (!inString) {
        if (char === "[") {
          bracketCount++;
        } else if (char === "]") {
          bracketCount--;
          if (bracketCount === 0) {
            arrayEnd = i;
            break;
          }
        }
      }
    }

    if (arrayEnd === -1) {
      return NextResponse.json(
        { error: "Could not find matching closing bracket" },
        { status: 500 }
      );
    }

    // Update the file
    const updatedContent =
      fileContent.substring(0, arrayStart) +
      `export const services: Service[] = ${JSON.stringify(
        services,
        null,
        2
      )}` +
      fileContent.substring(arrayEnd + 1);

    await fs.writeFile(SERVICES_FILE, updatedContent, "utf8");

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
    const services = await getServicesFromModule();

    const serviceIndex = services.findIndex((s: any) => s.id === params.id);
    if (serviceIndex === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Remove service
    services.splice(serviceIndex, 1);

    // Read the file content to update it
    const fileContent = await fs.readFile(SERVICES_FILE, "utf8");

    // Find the start of the services array
    const arrayStart = fileContent.indexOf(
      "export const services: Service[] = ["
    );

    if (arrayStart === -1) {
      return NextResponse.json(
        { error: "Could not find services array in file" },
        { status: 500 }
      );
    }

    // Find the matching closing bracket by counting brackets
    let bracketCount = 0;
    let arrayEnd = -1;
    let inString = false;
    let escapeNext = false;

    for (
      let i = arrayStart + "export const services: Service[] = [".length;
      i < fileContent.length;
      i++
    ) {
      const char = fileContent[i];

      if (escapeNext) {
        escapeNext = false;
        continue;
      }

      if (char === "\\") {
        escapeNext = true;
        continue;
      }

      if (char === '"' || char === "'") {
        inString = !inString;
        continue;
      }

      if (!inString) {
        if (char === "[") {
          bracketCount++;
        } else if (char === "]") {
          bracketCount--;
          if (bracketCount === 0) {
            arrayEnd = i;
            break;
          }
        }
      }
    }

    if (arrayEnd === -1) {
      return NextResponse.json(
        { error: "Could not find matching closing bracket" },
        { status: 500 }
      );
    }

    // Update the file
    const updatedContent =
      fileContent.substring(0, arrayStart) +
      `export const services: Service[] = ${JSON.stringify(
        services,
        null,
        2
      )}` +
      fileContent.substring(arrayEnd + 1);

    await fs.writeFile(SERVICES_FILE, updatedContent, "utf8");

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
