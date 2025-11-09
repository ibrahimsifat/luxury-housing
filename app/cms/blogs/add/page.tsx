"use client";

import { ScrollAnimation } from "@/components/scroll-animations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function AddBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    author: "",
    tags: "",
    status: "draft" as "draft" | "published",
    featured: false,
    metaTitle: "",
    metaDescription: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageInfo, setImageInfo] = useState<{
    width?: number;
    height?: number;
    recommendation?: string;
  } | null>(null);
  const [quillLoaded, setQuillLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("cms_logged_in");
    if (!loggedIn) {
      router.push("/cms/login");
      return;
    }
    setQuillLoaded(true);
  }, [router]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create preview immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload image immediately
      try {
        setIsUploading(true);
        const imageUrl = await uploadImage(file);
        handleInputChange("featuredImage", imageUrl);
        // Update preview with uploaded image URL
        setImagePreview(imageUrl);
        setIsUploading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("فشل تحميل الصورة. يرجى المحاولة مرة أخرى.");
        setIsUploading(false);
        // Reset on error
        setImageFile(null);
        setImagePreview("");
        setImageInfo(null);
      }
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "blogs");

    const response = await fetch("/api/cms/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const result = await response.json();
    
    // Set image info and recommendation
    if (result.recommendation) {
      setImageInfo({
        width: result.width,
        height: result.height,
        recommendation: result.recommendation.message,
      });
    } else {
      setImageInfo({
        width: result.width,
        height: result.height,
      });
    }

    return result.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Image should already be uploaded, but use formData.featuredImage
      const imageUrl = formData.featuredImage;

      // Process tags
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const blogData = {
        ...formData,
        featuredImage: imageUrl,
        tags: tagsArray,
        views: 0,
      };

      const response = await fetch("/api/cms/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create blog");
      }

      router.push("/cms/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create blog"
      );
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  if (!quillLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-slate-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/cms/blogs">
              <Button variant="ghost" size="sm" className="mr-2">
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة
              </Button>
            </Link>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center ml-4">
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
                إضافة مقالة جديدة
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات المقالة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">العنوان *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                      placeholder="أدخل عنوان المقالة"
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">الملخص *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange("excerpt", e.target.value)}
                      required
                      placeholder="أدخل ملخص قصير للمقالة"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">المحتوى *</Label>
                    <div className="mt-2">
                      <ReactQuill
                        theme="snow"
                        value={formData.content}
                        onChange={(value) => handleInputChange("content", value)}
                        placeholder="اكتب محتوى المقالة هنا..."
                        style={{ minHeight: "300px" }}
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            ["bold", "italic", "underline", "strike"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            [{ align: [] }],
                            ["link", "image"],
                            ["clean"],
                          ],
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>تحسين محركات البحث (SEO)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">عنوان SEO</Label>
                    <Input
                      id="metaTitle"
                      value={formData.metaTitle}
                      onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                      placeholder="عنوان SEO (اختياري)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">وصف SEO</Label>
                    <Textarea
                      id="metaDescription"
                      value={formData.metaDescription}
                      onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                      placeholder="وصف SEO (اختياري)"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>الإعدادات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="status">الحالة</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="draft">مسودة</option>
                      <option value="published">منشور</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="author">المؤلف *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange("author", e.target.value)}
                      required
                      placeholder="اسم المؤلف"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">العلامات</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => handleInputChange("tags", e.target.value)}
                      placeholder="علامات مفصولة بفواصل (مثال: تمويل، عقار، سكن)"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      افصل بين العلامات بفواصل
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) =>
                        handleInputChange("featured", e.target.checked)
                      }
                      className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                    />
                    <Label htmlFor="featured" className="cursor-pointer">
                      مقالة مميزة
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الصورة المميزة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isUploading ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                      <p className="text-sm text-slate-600">جاري رفع الصورة...</p>
                    </div>
                  ) : imagePreview ? (
                    <div className="space-y-2">
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setImageFile(null);
                            setImageInfo(null);
                            handleInputChange("featuredImage", "");
                          }}
                          className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {imageInfo?.recommendation && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-xs text-blue-800">
                            {imageInfo.recommendation}
                          </p>
                        </div>
                      )}
                      {imageInfo && (
                        <p className="text-xs text-slate-500">
                          الحجم الفعلي: {imageInfo.width} × {imageInfo.height} بكسل
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-sm text-slate-600 mb-2">
                        الصورة المميزة
                      </p>
                      <p className="text-xs text-slate-500 mb-3">
                        الحجم الموصى به: 1200 × 630 بكسل
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        اختر صورة
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-4">
            <Link href="/cms/blogs">
              <Button type="button" variant="outline">
                إلغاء
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isLoading || isUploading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isLoading || isUploading ? "جاري الحفظ..." : "حفظ المقالة"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

