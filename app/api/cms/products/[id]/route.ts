import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const PRODUCTS_FILE = path.join(process.cwd(), "lib", "products.ts");

// Helper function to get products from module
async function getProductsFromModule() {
  const { products } = await import("../../../../../lib/products");
  return products;
}

// GET - Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const products = await getProductsFromModule();
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
    const products = await getProductsFromModule();

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

    // Read the file content to update it
    const fileContent = await fs.readFile(PRODUCTS_FILE, "utf8");

    // Find the start of the products array
    const arrayStart = fileContent.indexOf(
      "export const products: Product[] = ["
    );

    if (arrayStart === -1) {
      return NextResponse.json(
        { error: "Could not find products array in file" },
        { status: 500 }
      );
    }

    // Find the matching closing bracket by counting brackets
    let bracketCount = 0;
    let arrayEnd = -1;
    let inString = false;
    let escapeNext = false;

    for (
      let i = arrayStart + "export const products: Product[] = [".length;
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
      `export const products: Product[] = ${JSON.stringify(
        products,
        null,
        2
      )}` +
      fileContent.substring(arrayEnd + 1);

    await fs.writeFile(PRODUCTS_FILE, updatedContent, "utf8");

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
    const products = await getProductsFromModule();

    const productIndex = products.findIndex((p: any) => p.id === params.id);
    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Remove product
    products.splice(productIndex, 1);

    // Read the file content to update it
    const fileContent = await fs.readFile(PRODUCTS_FILE, "utf8");

    // Find the start of the products array
    const arrayStart = fileContent.indexOf(
      "export const products: Product[] = ["
    );

    if (arrayStart === -1) {
      return NextResponse.json(
        { error: "Could not find products array in file" },
        { status: 500 }
      );
    }

    // Find the matching closing bracket by counting brackets
    let bracketCount = 0;
    let arrayEnd = -1;
    let inString = false;
    let escapeNext = false;

    for (
      let i = arrayStart + "export const products: Product[] = [".length;
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
      `export const products: Product[] = ${JSON.stringify(
        products,
        null,
        2
      )}` +
      fileContent.substring(arrayEnd + 1);

    await fs.writeFile(PRODUCTS_FILE, updatedContent, "utf8");

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
