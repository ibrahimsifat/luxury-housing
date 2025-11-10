import { blogs } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch single blog by slug (public API)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Decode URL-encoded slug to handle Arabic characters properly
    // Next.js may already decode it, but we decode it explicitly to be safe
    let decodedSlug = params.slug;
    try {
      decodedSlug = decodeURIComponent(params.slug);
    } catch (e) {
      decodedSlug = params.slug;
    }
    const blog = await blogs.findBySlug(decodedSlug);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Only return published blogs
    if (blog.status !== "published") {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Increment views (async, don't wait for it)
    blogs.incrementViews(decodedSlug).catch((error) => {
      console.error("Error incrementing views:", error);
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error reading blog:", error);
    return NextResponse.json(
      { error: "Failed to read blog" },
      { status: 500 }
    );
  }
}

