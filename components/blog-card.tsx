"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Blog } from "@/lib/types";
import { Calendar, Eye, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
  index?: number;
}

export function BlogCard({ blog, index = 0 }: BlogCardProps) {
  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Link href={`/blog/${encodeURIComponent(blog.slug)}`}>
      <Card className="group hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border-0 bg-white/80 backdrop-blur-md hover:bg-white/95 overflow-hidden relative w-full h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-100 to-pink-100">
          {blog.featuredImage ? (
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              priority={index < 4}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-purple-300"
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
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-2 right-2 flex gap-2">
            {blog.featured && (
              <Badge className="bg-purple-600 text-white border-0 shadow-xl backdrop-blur-sm font-semibold text-xs px-2 py-1 rounded-full">
                مميز
              </Badge>
            )}
          </div>
        </div>

        {/* Gradient line */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 shadow-sm"></div>

        {/* Content */}
        <CardContent className="space-y-3 pt-4 px-4 pb-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 font-cairo leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors">
            {blog.title}
          </h3>

          <p className="text-slate-600 leading-relaxed text-sm font-cairo line-clamp-3 flex-1">
            {blog.excerpt}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
            {blog.author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{blog.author}</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{blog.views || 0}</span>
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {blog.tags.slice(0, 3).map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

