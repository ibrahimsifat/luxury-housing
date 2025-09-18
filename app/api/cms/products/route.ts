import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const PRODUCTS_FILE = path.join(process.cwd(), "lib", "products.json");

// GET - Fetch all products
export async function GET() {
  try {
    const fileContent = await fs.readFile(PRODUCTS_FILE, "utf8");
    const products = JSON.parse(fileContent);
    console.log("Loaded products count:", products.length);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error reading products:", error);
    return NextResponse.json(
      { error: "Failed to read products" },
      { status: 500 }
    );
  }
}

// POST - Add new product
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();

    // Read current products
    const fileContent = await fs.readFile(PRODUCTS_FILE, "utf8");
    const products = JSON.parse(fileContent);

    // Add new product
    const newProduct = {
      id: productData.id || `product-${Date.now()}`,
      slug:
        productData.slug ||
        productData.title.toLowerCase().replace(/\s+/g, "-"),
      ...productData,
    };

    products.push(newProduct);

    // Update the JSON file
    await fs.writeFile(
      PRODUCTS_FILE,
      JSON.stringify(products, null, 2),
      "utf8"
    );

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
