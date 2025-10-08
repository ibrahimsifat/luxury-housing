import { Client } from "./types";

// Get all clients from API
export async function getAllClients(): Promise<Client[]> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/cms/clients`,
      {
        next: {
          revalidate: 300, // 5 minutes cache
          tags: ["clients"],
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch clients");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}

// Get featured clients
export async function getFeaturedClients(): Promise<Client[]> {
  try {
    const clients = await getAllClients();
    return clients
      .filter((client) => client.featured)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error fetching featured clients:", error);
    return [];
  }
}

// Get clients by category
export async function getClientsByCategory(
  category: string
): Promise<Client[]> {
  try {
    const clients = await getAllClients();
    return clients
      .filter((client) => client.category === category)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error fetching clients by category:", error);
    return [];
  }
}
