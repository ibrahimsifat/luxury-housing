import { CacheInvalidator } from "@/lib/cache";
import { clients } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

// GET - Get all clients
export async function GET() {
  try {
    const allClients = await clients.findAll();
    return NextResponse.json(allClients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

// POST - Add new client
export async function POST(request: NextRequest) {
  try {
    const clientData = await request.json();

    // Add new client
    const newClient = {
      id: clientData.id || `client-${Date.now()}`,
      ...clientData,
    };

    const createdClient = await clients.create(newClient);

    // Invalidate cache after creating client
    CacheInvalidator.onClientCreate();

    return NextResponse.json(createdClient);
  } catch (error) {
    console.error("Error adding client:", error);
    return NextResponse.json(
      { error: "Failed to add client" },
      { status: 500 }
    );
  }
}

// PUT - Update client
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    const updatedClient = await clients.update(id, updateData);

    if (!updatedClient) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Invalidate cache after updating client
    CacheInvalidator.onClientUpdate();

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
}

// DELETE - Delete client
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    const deleted = await clients.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Invalidate cache after deleting client
    CacheInvalidator.onClientDelete();

    return NextResponse.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }
}
