import { CacheInvalidator } from "@/lib/cache";
import { blogs } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

// GET - Fetch all blogs (for CMS)
export async function GET() {
  try {
    const allBlogs = await blogs.findAll();
    console.log("Loaded blogs count:", allBlogs.length);
    return NextResponse.json(allBlogs);
  } catch (error) {
    console.error("Error reading blogs:", error);
    return NextResponse.json(
      { error: "Failed to read blogs" },
      { status: 500 }
    );
  }
}

// POST - Add new blog
export async function POST(request: NextRequest) {
  try {
    const blogData = await request.json();

    // Generate slug if not provided
    const slug = blogData.slug || generateSlug(blogData.title);

    // Check if slug already exists
    const existingBlog = await blogs.findBySlug(slug);
    if (existingBlog) {
      // Append timestamp to make it unique
      const uniqueSlug = `${slug}-${Date.now()}`;
      blogData.slug = uniqueSlug;
    } else {
      blogData.slug = slug;
    }

    // Set timestamps
    const now = new Date().toISOString();
    if (blogData.status === "published" && !blogData.publishedAt) {
      blogData.publishedAt = now;
    }
    blogData.updatedAt = now;

    // Set default values
    if (!blogData.views) blogData.views = 0;
    if (!blogData.tags) blogData.tags = [];
    if (typeof blogData.tags === "string") {
      blogData.tags = blogData.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean);
    }

    // Add new blog
    const newBlog = {
      id: blogData.id || `blog-${Date.now()}`,
      ...blogData,
    };

    const createdBlog = await blogs.create(newBlog);

    // Invalidate cache after creating blog
    CacheInvalidator.onBlogCreate();

    return NextResponse.json(createdBlog);
  } catch (error) {
    console.error("Error adding blog:", error);
    return NextResponse.json(
      { error: "Failed to add blog" },
      { status: 500 }
    );
  }
}

// PUT - Update blog
export async function PUT(request: NextRequest) {
  try {
    const blogData = await request.json();
    const { id, ...updateData } = blogData;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    // Update slug if title changed
    if (updateData.title) {
      const existingBlog = await blogs.findById(id);
      if (existingBlog && existingBlog.title !== updateData.title) {
        const newSlug = generateSlug(updateData.title);
        const slugExists = await blogs.findBySlug(newSlug);
        if (!slugExists || slugExists.id === id) {
          updateData.slug = newSlug;
        }
      }
    }

    // Handle tags if string
    if (updateData.tags && typeof updateData.tags === "string") {
      updateData.tags = updateData.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean);
    }

    // Update publishedAt if status changed to published
    if (updateData.status === "published") {
      const existingBlog = await blogs.findById(id);
      if (existingBlog && existingBlog.status !== "published") {
        updateData.publishedAt = new Date().toISOString();
      }
    }

    updateData.updatedAt = new Date().toISOString();

    const updatedBlog = await blogs.update(id, updateData);

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Invalidate cache after updating blog
    CacheInvalidator.onBlogUpdate();

    return NextResponse.json(
      { message: "Blog updated successfully", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const deleted = await blogs.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Invalidate cache after deleting blog
    CacheInvalidator.onBlogDelete();

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}

