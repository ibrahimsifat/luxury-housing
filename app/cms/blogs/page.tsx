"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog } from "@/lib/types";
import { ArrowLeft, Edit, Eye, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CMSBlogsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("cms_logged_in");
    if (!loggedIn) {
      router.push("/cms/login");
      return;
    }

    setIsLoggedIn(true);
    loadBlogs();
  }, [router]);

  const loadBlogs = async () => {
    try {
      const response = await fetch("/api/cms/blogs");
      const blogsData = await response.json();
      setBlogs(Array.isArray(blogsData) ? blogsData : []);
    } catch (error) {
      console.error("Error loading blogs:", error);
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه المقالة؟")) {
      return;
    }

    try {
      const response = await fetch(`/api/cms/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadBlogs();
      } else {
        alert("فشل حذف المقالة");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("حدث خطأ أثناء حذف المقالة");
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-0 sm:h-16 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link href="/cms/dashboard">
                <Button variant="ghost" size="sm" className="mr-2">
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  العودة
                </Button>
              </Link>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-white"
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
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 font-cairo">
                  إدارة المدونة
                </h1>
                <p className="text-xs sm:text-sm text-slate-600">
                  إدارة مقالات المدونة
                </p>
              </div>
            </div>
            <Link href="/cms/blogs/add">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm">
                <Plus className="w-4 h-4 mr-2" />
                إضافة مقالة جديدة
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-slate-600">جاري التحميل...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <p className="text-slate-500 mb-4">لم يتم العثور على مقالات. أضف مقالتك الأولى!</p>
                  <Link href="/cms/blogs/add">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Plus className="w-4 h-4 mr-2" />
                      إضافة مقالة جديدة
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              blogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Image */}
                      <div className="lg:w-48 flex-shrink-0">
                        {blog.featuredImage ? (
                          <div className="relative w-full h-32 lg:h-40 rounded-lg overflow-hidden">
                            <Image
                              src={blog.featuredImage}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-32 lg:h-40 bg-slate-200 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-slate-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                              {blog.title}
                            </h3>
                            <p className="text-sm sm:text-base text-slate-600 mb-3 line-clamp-2">
                              {blog.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                blog.status === "published"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {blog.status === "published" ? "منشور" : "مسودة"}
                            </span>
                            {blog.featured && (
                              <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                مميز
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 mb-4">
                          <span>المؤلف: {blog.author}</span>
                          {blog.publishedAt && (
                            <span>
                              • {new Date(blog.publishedAt).toLocaleDateString("ar-SA")}
                            </span>
                          )}
                          <span>• المشاهدات: {blog.views || 0}</span>
                          {blog.tags && blog.tags.length > 0 && (
                            <span>• العلامات: {blog.tags.join(", ")}</span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Link href={`/blog/${blog.slug}`} target="_blank">
                            <Button variant="outline" size="sm" className="text-xs">
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              عرض
                            </Button>
                          </Link>
                          <Link href={`/cms/blogs/${blog.id}/edit`}>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              تعديل
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300 text-xs"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            حذف
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

