import { CacheInvalidator } from "@/lib/cache";
import { products } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all products
export async function GET() {
  try {
    const allProducts = await products.findAll();
    console.log("Loaded products count:", allProducts.length);
    return NextResponse.json(allProducts);
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

    // Add new product
    const newProduct = {
      id: productData.id || `product-${Date.now()}`,
      slug:
        productData.slug ||
        productData.title.toLowerCase().replace(/\s+/g, "-"),
      ...productData,
    };

    const createdProduct = await products.create(newProduct);

    // Invalidate cache after creating product
    CacheInvalidator.onProductCreate();

    return NextResponse.json(createdProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
  try {
    const productData = await request.json();
    const { id, ...updateData } = productData;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const updatedProduct = await products.update(id, updateData);

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Invalidate cache after updating product
    CacheInvalidator.onProductUpdate();

    return NextResponse.json(
      { message: "Product updated successfully", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const deleted = await products.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Invalidate cache after deleting product
    CacheInvalidator.onProductDelete();

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
