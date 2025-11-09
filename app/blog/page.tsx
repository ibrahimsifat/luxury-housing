"use client";

import { BlogCard } from "@/components/blog-card";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ScrollAnimation } from "@/components/scroll-animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Blog } from "@/lib/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const blogsData = await response.json();
        const blogsArray = Array.isArray(blogsData) ? blogsData : [];
        setBlogs(blogsArray);
        setFilteredBlogs(blogsArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setFilteredBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get all unique tags
  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags || [])));

  // Filter blogs based on search and tag
  useEffect(() => {
    let filtered = blogs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt.toLowerCase().includes(query) ||
          (blog.tags &&
            blog.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(
        (blog) => blog.tags && blog.tags.includes(selectedTag)
      );
    }

    setFilteredBlogs(filtered);
  }, [searchQuery, selectedTag, blogs]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      dir="rtl"
    >
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 md:pt-24 pt-16">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <svg
                  className="w-10 h-10 text-white"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-cairo">
                المدونة
              </h1>
              <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto font-cairo">
                اكتشف آخر الأخبار والمقالات حول التمويل العقاري والحلول السكنية
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="ابحث في المقالات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 pl-4 py-2 border border-slate-200 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                />
              </div>
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                  className={
                    selectedTag === null
                      ? "bg-purple-600 hover:bg-purple-700"
                      : ""
                  }
                >
                  الكل
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className={
                      selectedTag === tag
                        ? "bg-purple-600 hover:bg-purple-700"
                        : ""
                    }
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">جاري التحميل...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                لم يتم العثور على مقالات
              </h3>
              <p className="text-slate-500">
                {searchQuery || selectedTag
                  ? "جرب البحث بكلمات مختلفة أو اختر علامة أخرى"
                  : "لا توجد مقالات متاحة حالياً"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog, index) => (
                <ScrollAnimation
                  key={blog.id}
                  animation="fadeInUp"
                  delay={index * 100}
                >
                  <BlogCard blog={blog} index={index} />
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>
      </section>

      <MobileNavigation />
    </div>
  );
}
