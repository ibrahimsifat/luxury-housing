"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { GalleryImage } from "@/lib/types";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Edit,
  Filter,
  Grid3X3,
  Image as ImageIcon,
  List,
  MapPin,
  Plus,
  Search,
  Star,
  Target,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CMSGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);

  // Form states
  const [isAdding, setIsAdding] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "business",
    image: "",
    alt: "",
    featured: false,
  });

  const categoryIcons = {
    business: Building2,
    offers: Target,
    branch: MapPin,
  };

  const categoryLabels = {
    business: "صور الاعمال",
    offers: "العروض",
    branch: "صور الفرع",
  };

  const categoryColors = {
    business: "bg-blue-100 text-blue-800 border-blue-200",
    offers: "bg-green-100 text-green-800 border-green-200",
    branch: "bg-purple-100 text-purple-800 border-purple-200",
  };

  // Fetch images
  useEffect(() => {
    fetchImages();
  }, []);

  // Filter images
  useEffect(() => {
    let filtered = images;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (image) => image.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (image) =>
          image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          image.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredImages(filtered);
  }, [images, selectedCategory, searchTerm]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cms/gallery");
      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingImage
        ? `/api/cms/gallery/${editingImage.id}`
        : "/api/cms/gallery";
      const method = editingImage ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchImages();
        resetForm();
        setIsAdding(false);
        setEditingImage(null);
      } else {
        const error = await response.json();
        alert(error.error || "حدث خطأ");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      alert("حدث خطأ في الحفظ");
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description,
      category: image.category,
      image: image.image,
      alt: image.alt,
      featured: image.featured,
    });
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;

    try {
      const response = await fetch(`/api/cms/gallery/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchImages();
      } else {
        const error = await response.json();
        alert(error.error || "حدث خطأ في الحذف");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("حدث خطأ في الحذف");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "business",
      image: "",
      alt: "",
      featured: false,
    });
  };

  const handleImageUpload = async () => {
    // Create a file input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "gallery");

        const response = await fetch("/api/cms/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({ ...prev, image: data.url }));
        } else {
          alert("حدث خطأ في رفع الصورة");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("حدث خطأ في رفع الصورة");
      }
    };

    // Trigger the file input
    input.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                إدارة معرض الصور
              </h1>
              <p className="text-gray-600 mt-1">إدارة صور الموقع وعروضنا</p>
            </div>
            <div className="flex gap-4">
              <Link href="/cms/dashboard">
                <Button variant="outline">العودة للوحة التحكم</Button>
              </Link>
              <Button
                onClick={() => {
                  setIsAdding(true);
                  setEditingImage(null);
                  resetForm();
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                إضافة صورة جديدة
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">معرض الصور</TabsTrigger>
            <TabsTrigger value="add">إضافة صورة</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="البحث في الصور..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 w-full sm:w-64"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الفئات</SelectItem>
                      <SelectItem value="business">صور الاعمال</SelectItem>
                      <SelectItem value="offers">العروض</SelectItem>
                      <SelectItem value="branch">صور الفرع</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="flex items-center gap-2"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="flex items-center gap-2"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-gray-600">
                  عرض {filteredImages.length} من {images.length} صورة
                </p>
                {selectedCategory !== "all" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    إزالة الفلتر
                  </Button>
                )}
              </div>
            </div>

            {/* Images Grid/List */}
            {filteredImages.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
                <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  لا توجد صور
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || selectedCategory !== "all"
                    ? "لم يتم العثور على صور تطابق البحث"
                    : "ابدأ بإضافة صور جديدة"}
                </p>
                <Button
                  onClick={() => {
                    setIsAdding(true);
                    setEditingImage(null);
                    resetForm();
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة صورة جديدة
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    {viewMode === "grid" ? (
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-square relative">
                          <Image
                            src={image.image}
                            alt={image.alt}
                            fill
                            className="object-cover"
                          />
                          {image.featured && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-yellow-500 text-white border-0">
                                <Star className="w-3 h-3 mr-1" />
                                مميز
                              </Badge>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute inset-0 flex items-center justify-center gap-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleEdit(image)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(image.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                            {image.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {image.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge className={categoryColors[image.category]}>
                              {categoryLabels[image.category]}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(image.uploadDate).toLocaleDateString(
                                "ar-SA"
                              )}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <Card className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={image.image}
                              alt={image.alt}
                              fill
                              className="object-cover"
                            />
                            {image.featured && (
                              <div className="absolute top-1 left-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg text-gray-800 mb-1">
                              {image.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                              {image.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge className={categoryColors[image.category]}>
                                {categoryLabels[image.category]}
                              </Badge>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(image.uploadDate).toLocaleDateString(
                                  "ar-SA"
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(image)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(image.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="add" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingImage ? "تعديل الصورة" : "إضافة صورة جديدة"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image Upload */}
                  <div className="space-y-4">
                    <Label>الصورة</Label>

                    {formData.image ? (
                      <div className="space-y-4">
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={formData.image}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={handleImageUpload}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            تغيير الصورة
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, image: "" }))
                            }
                          >
                            إزالة الصورة
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">
                          لم يتم اختيار صورة بعد
                        </p>
                        <Button
                          type="button"
                          onClick={handleImageUpload}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          اختر صورة
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">عنوان الصورة</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="أدخل عنوان الصورة"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">وصف الصورة</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="أدخل وصف الصورة"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">الفئة</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">صور الاعمال</SelectItem>
                          <SelectItem value="offers">العروض</SelectItem>
                          <SelectItem value="branch">صور الفرع</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alt">النص البديل</Label>
                      <Input
                        id="alt"
                        value={formData.alt}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            alt: e.target.value,
                          }))
                        }
                        placeholder="النص البديل للصورة"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            featured: Boolean(checked),
                          }))
                        }
                      />
                      <Label htmlFor="featured">صورة مميزة</Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={
                      !formData.title ||
                      !formData.description ||
                      !formData.image
                    }
                  >
                    {editingImage ? "تحديث الصورة" : "إضافة الصورة"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                      setEditingImage(null);
                      resetForm();
                    }}
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
