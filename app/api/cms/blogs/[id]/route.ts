import { CacheInvalidator } from "@/lib/cache";
import { deleteImagesFromUrls } from "@/lib/cloudinary";
import { blogs } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch single blog (for CMS)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await blogs.findById(params.id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error reading blog:", error);
    return NextResponse.json(
      { error: "Failed to read blog" },
      { status: 500 }
    );
  }
}

// PUT - Update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogData = await request.json();

    // Handle tags if string
    if (blogData.tags && typeof blogData.tags === "string") {
      blogData.tags = blogData.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean);
    }

    // Update publishedAt if status changed to published
    if (blogData.status === "published") {
      const existingBlog = await blogs.findById(params.id);
      if (existingBlog && existingBlog.status !== "published") {
        blogData.publishedAt = new Date().toISOString();
      }
    }

    blogData.updatedAt = new Date().toISOString();

    const updatedBlog = await blogs.update(params.id, blogData);

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Invalidate cache after updating blog
    CacheInvalidator.onBlogUpdate();

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First, get the blog to collect image URLs for deletion
    const blog = await blogs.findById(params.id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Collect all image URLs from the blog
    const imageUrls: string[] = [];

    // Add featured image if it's a Cloudinary URL
    if (
      blog.featuredImage &&
      blog.featuredImage.startsWith("https://res.cloudinary.com/")
    ) {
      imageUrls.push(blog.featuredImage);
    }

    // Delete the blog from database
    const deleted = await blogs.delete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
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

    // Invalidate cache after deleting blog
    CacheInvalidator.onBlogDelete();

    return NextResponse.json({
      message: "Blog deleted successfully",
      cloudinaryDeleted: imageUrls.length > 0 ? imageUrls.length : 0,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}

