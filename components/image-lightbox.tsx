"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GalleryImage } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  Pause,
  Play,
  RotateCw,
  Share2,
  Star,
  Target,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ImageLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

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

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentImage = images[currentIndex];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && isOpen) {
      const interval = setInterval(() => {
        onNavigate((currentIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isOpen, currentIndex, images.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
          break;
        case "ArrowRight":
          onNavigate((currentIndex + 1) % images.length);
          break;
        case " ":
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case "+":
        case "=":
          setZoom(Math.min(zoom + 0.25, 3));
          break;
        case "-":
          setZoom(Math.max(zoom - 0.25, 0.5));
          break;
        case "r":
          setRotation((rotation + 90) % 360);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    currentIndex,
    images.length,
    onNavigate,
    isPlaying,
    zoom,
    rotation,
  ]);

  // Reset zoom and rotation when image changes
  useEffect(() => {
    setZoom(1);
    setRotation(0);
  }, [currentIndex]);

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = currentImage.image;
    link.download = `${currentImage.title}.jpg`;
    link.click();
  }, [currentImage]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title,
          text: currentImage.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  }, [currentImage]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent"
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">{currentImage.title}</h2>
              <Badge className={categoryColors[currentImage.category]}>
                {categoryLabels[currentImage.category]}
              </Badge>
              {currentImage.featured && (
                <Badge className="bg-yellow-500 text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  مميز
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                className="text-white hover:bg-white/20"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                className="text-white hover:bg-white/20"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className="text-white hover:bg-white/20"
              >
                {isFullscreen ? (
                  <ZoomOut className="w-4 h-4" />
                ) : (
                  <ZoomIn className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Image */}
        <div className="flex items-center justify-center h-full p-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: zoom, opacity: 1, rotate: rotation }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.image}
              alt={currentImage.alt}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: "transform 0.3s ease",
              }}
            />
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(
                  currentIndex > 0 ? currentIndex - 1 : images.length - 1
                );
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((currentIndex + 1) % images.length);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        {/* Controls */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/50 to-transparent"
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <span className="text-sm">
                {currentIndex + 1} من {images.length}
              </span>
              <span className="text-sm flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(currentImage.uploadDate).toLocaleDateString("ar-SA")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-black/30 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoom(Math.max(zoom - 0.25, 0.5));
                  }}
                  className="text-white hover:bg-white/20 w-8 h-8"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs px-2">{Math.round(zoom * 100)}%</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoom(Math.min(zoom + 0.25, 3));
                  }}
                  className="text-white hover:bg-white/20 w-8 h-8"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              {/* Rotation */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setRotation((rotation + 90) % 360);
                }}
                className="text-white hover:bg-white/20 w-8 h-8"
              >
                <RotateCw className="w-4 h-4" />
              </Button>

              {/* Play/Pause */}
              {images.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="text-white hover:bg-white/20 w-8 h-8"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Image Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-center"
          >
            <p className="text-white/90 text-sm max-w-2xl mx-auto">
              {currentImage.description}
            </p>
          </motion.div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex justify-center"
            >
              <div className="flex gap-2 overflow-x-auto max-w-full px-4">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(index);
                    }}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                      index === currentIndex
                        ? "ring-2 ring-white scale-110"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image.image}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
