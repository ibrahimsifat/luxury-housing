import { CacheInvalidator } from "@/lib/cache";
import { deleteImagesFromUrls } from "@/lib/cloudinary";
import { products } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await products.findById(params.id);

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

    const updatedProduct = await products.update(params.id, productData);

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Invalidate cache after updating product
    CacheInvalidator.onProductUpdate();

    return NextResponse.json(updatedProduct);
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
    // First, get the product to collect image URLs for deletion
    const product = await products.findById(params.id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Collect all image URLs from the product
    const imageUrls: string[] = [];

    // Add main image if it's a Cloudinary URL
    if (
      product.image &&
      product.image.startsWith("https://res.cloudinary.com/")
    ) {
      imageUrls.push(product.image);
    }

    // Delete the product from database
    const deleted = await products.delete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete associated images from Cloudinary
    if (imageUrls.length > 0) {
      const cloudinaryResult = await deleteImagesFromUrls(imageUrls);

      if (!cloudinaryResult.success) {
        console.warn(
          "Some Cloudinary images failed to delete:",
          cloudinaryResult.errors
        );
        // Don't fail the entire operation if Cloudinary deletion fails
      } else {
        console.log(
          `Successfully deleted ${cloudinaryResult.deleted.length} images from Cloudinary`
        );
      }
    }

    // Invalidate cache after deleting product
    CacheInvalidator.onProductDelete();

    return NextResponse.json({
      message: "Product deleted successfully",
      cloudinaryDeleted: imageUrls.length > 0 ? imageUrls.length : 0,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
