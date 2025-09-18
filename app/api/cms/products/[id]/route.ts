import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const PRODUCTS_FILE = path.join(process.cwd(), "lib", "products.json");

// Helper function to get products from JSON file
async function getProductsFromFile() {
  const fileContent = await fs.readFile(PRODUCTS_FILE, "utf8");
  return JSON.parse(fileContent);
}

// GET - Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const products = await getProductsFromFile();
    const product = products.find((p: any) => p.id === params.id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error reading product:", error);
    return NextResponse.json(
      { error: "Failed to read product" },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productData = await request.json();
    const products = await getProductsFromFile();

    const productIndex = products.findIndex((p: any) => p.id === params.id);
    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update product
    products[productIndex] = {
      ...products[productIndex],
      ...productData,
      id: params.id, // Ensure ID doesn't change
    };

    // Update the JSON file
    await fs.writeFile(
      PRODUCTS_FILE,
      JSON.stringify(products, null, 2),
      "utf8"
    );

    return NextResponse.json(products[productIndex]);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const products = await getProductsFromFile();

    const productIndex = products.findIndex((p: any) => p.id === params.id);
    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Remove product
    products.splice(productIndex, 1);

    // Update the JSON file
    await fs.writeFile(
      PRODUCTS_FILE,
      JSON.stringify(products, null, 2),
      "utf8"
    );

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
