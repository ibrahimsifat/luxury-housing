import { blogs } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all published blogs (public API)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const tag = searchParams.get("tag");
    const limit = searchParams.get("limit");

    let allBlogs;

    if (search) {
      allBlogs = await blogs.searchBlogs(search);
    } else if (tag) {
      allBlogs = await blogs.findByTag(tag);
    } else {
      allBlogs = await blogs.getPublishedBlogs();
    }

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit, 10);
      allBlogs = allBlogs.slice(0, limitNum);
    }

    return NextResponse.json(allBlogs);
  } catch (error) {
    console.error("Error reading blogs:", error);
    return NextResponse.json(
      { error: "Failed to read blogs" },
      { status: 500 }
    );
  }
}

