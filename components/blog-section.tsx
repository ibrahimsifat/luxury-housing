"use client";

import { Button } from "@/components/ui/button";
import { Blog } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BlogCard } from "./blog-card";

export function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs?limit=6");
        const blogsData = await response.json();
        setBlogs(Array.isArray(blogsData) ? blogsData : []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-slate-600">جاري التحميل...</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_50%)] opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)] opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-cairo">
            آخر المقالات
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-cairo">
            اكتشف آخر الأخبار والمقالات حول التمويل العقاري والحلول السكنية
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
            >
              عرض جميع المقالات
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

