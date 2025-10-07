import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = (formData.get("type") as string) || "general"; // "services", "products", "gallery", or "general"

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB" }, { status: 400 });
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(file, type);

    if (!uploadResult.success) {
      return NextResponse.json(
        { error: uploadResult.error || "Failed to upload file" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: uploadResult.data!.fileUrl,
      fileName: uploadResult.data!.publicId.split('/').pop(), // Extract filename from public ID
      publicId: uploadResult.data!.publicId,
      width: uploadResult.data!.width,
      height: uploadResult.data!.height,
      format: uploadResult.data!.format,
      bytes: uploadResult.data!.bytes,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove images from Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ error: "Public ID is required" }, { status: 400 });
    }

    const deleteResult = await deleteFromCloudinary(publicId);

    if (!deleteResult.success) {
      return NextResponse.json(
        { error: deleteResult.error || "Failed to delete image" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
