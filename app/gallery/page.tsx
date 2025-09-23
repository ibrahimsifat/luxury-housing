"use client";

import ImageLightbox from "@/components/image-lightbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryImage } from "@/lib/types";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Filter,
  Grid3X3,
  List,
  MapPin,
  Search,
  Star,
  Target,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Import gallery data
import galleryData from "@/lib/gallery.json";

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

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] =
    useState<GalleryImage[]>(galleryData);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && ["business", "offers", "branch"].includes(category)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = galleryData;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (image) => image.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (image) =>
          image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          image.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredImages(filtered);
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update URL without page reload
    const url = new URL(window.location.href);
    if (category === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    window.history.pushState({}, "", url.toString());
  };

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxNavigate = (index: number) => {
    setLightboxIndex(index);
  };

  const getCategoryStats = () => {
    const stats = {
      all: galleryData.length,
      business: galleryData.filter((img) => img.category === "business").length,
      offers: galleryData.filter((img) => img.category === "offers").length,
      branch: galleryData.filter((img) => img.category === "branch").length,
    };
    return stats;
  };

  const stats = getCategoryStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/30 via-transparent to-purple-600/30"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
            >
              معرض الصور
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed"
            >
              اكتشف صور مكاتبنا وفرعنا وعروضنا الخاصة
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/30 px-4 py-2 text-lg">
                {stats.all} صورة
              </Badge>
              <Badge className="bg-green-500/20 text-green-100 border-green-400/30 px-4 py-2 text-lg">
                {stats.business} صور أعمال
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-100 border-purple-400/30 px-4 py-2 text-lg">
                {stats.offers} عروض
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-100 border-orange-400/30 px-4 py-2 text-lg">
                {stats.branch} فروع
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-12 bg-white/50 backdrop-blur-sm border-b border-slate-200/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <Tabs
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              className="w-full"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
                <TabsList className="grid w-full lg:w-auto grid-cols-4 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
                  <TabsTrigger
                    value="all"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    <Grid3X3 className="w-4 h-4" />
                    جميع الصور
                  </TabsTrigger>
                  <TabsTrigger
                    value="business"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    <Building2 className="w-4 h-4" />
                    صور الاعمال
                  </TabsTrigger>
                  <TabsTrigger
                    value="offers"
                    className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    <Target className="w-4 h-4" />
                    العروض
                  </TabsTrigger>
                  <TabsTrigger
                    value="branch"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                  >
                    <MapPin className="w-4 h-4" />
                    صور الفرع
                  </TabsTrigger>
                </TabsList>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="البحث في الصور..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 pl-4 py-2 border border-slate-200 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                    />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg p-1">
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
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-slate-600">
                  عرض {filteredImages.length} من {galleryData.length} صورة
                </p>
                {selectedCategory !== "all" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCategoryChange("all")}
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    إزالة الفلتر
                  </Button>
                )}
              </div>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            {filteredImages.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">
                  لم يتم العثور على صور
                </h3>
                <p className="text-slate-500 mb-6">
                  جرب البحث بكلمات مختلفة أو اختر فئة أخرى
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    handleCategoryChange("all");
                  }}
                >
                  عرض جميع الصور
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
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => handleImageClick(index)}
                  >
                    {viewMode === "grid" ? (
                      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                        <div className="aspect-square relative">
                          <Image
                            src={image.image}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          {image.featured && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-yellow-500 text-white border-0">
                                <Star className="w-3 h-3 mr-1" />
                                مميز
                              </Badge>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-semibold text-lg mb-1">
                              {image.title}
                            </h3>
                            <p className="text-sm text-white/90 line-clamp-2">
                              {image.description}
                            </p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={categoryColors[image.category]}>
                              {categoryLabels[image.category]}
                            </Badge>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(image.uploadDate).toLocaleDateString(
                                "ar-SA"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
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
                          <h3 className="font-semibold text-lg text-slate-800 mb-1">
                            {image.title}
                          </h3>
                          <p className="text-slate-600 text-sm mb-2 line-clamp-2">
                            {image.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge className={categoryColors[image.category]}>
                              {categoryLabels[image.category]}
                            </Badge>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(image.uploadDate).toLocaleDateString(
                                "ar-SA"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              هل تريد رؤية المزيد؟
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              تواصل معنا لمعرفة المزيد عن خدماتنا وعروضنا الخاصة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  تواصل معنا
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  خدماتنا
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleLightboxNavigate}
      />
    </div>
  );
}
