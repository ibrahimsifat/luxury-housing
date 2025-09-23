"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ClientsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesPerSlide, setImagesPerSlide] = useState(5);

  // Client images from the public/clients folder
  const clientImages = [
    "/clients/imgi_13_download.png",
    "/clients/imgi_14_9404f6_c147c8d811f14beb916d6cd3567758ec_mv2.png",
    "/clients/imgi_16_002.jpg",
    "/clients/imgi_17_9404f6_556dd3f4f9f54128a9d2b0393e0ffcbd_mv2.png",
    "/clients/imgi_18_07.jpg",
    "/clients/imgi_19_001.jpg",
  ];

  // Calculate total slides - always show at least 2 slides for proper looping
  const totalSlides = Math.max(
    2,
    Math.ceil(clientImages.length / imagesPerSlide)
  );

  useEffect(() => {
    const updateImagesPerSlide = () => {
      if (window.innerWidth >= 1024) {
        setImagesPerSlide(5); // Desktop: 5 images
      } else if (window.innerWidth >= 768) {
        setImagesPerSlide(4); // Tablet: 4 images
      } else {
        setImagesPerSlide(2); // Mobile: 2 images
      }
    };

    updateImagesPerSlide();
    window.addEventListener("resize", updateImagesPerSlide);
    return () => window.removeEventListener("resize", updateImagesPerSlide);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [imagesPerSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentSlideImages = () => {
    const startIndex = currentSlide * imagesPerSlide;
    const endIndex = Math.min(startIndex + imagesPerSlide, clientImages.length);
    let slideImages = clientImages.slice(startIndex, endIndex);

    // If we don't have enough images for the current slide, fill from the beginning
    if (slideImages.length < imagesPerSlide) {
      const remainingSlots = imagesPerSlide - slideImages.length;
      const additionalImages = clientImages.slice(0, remainingSlots);
      slideImages = [...slideImages, ...additionalImages];
    }

    return slideImages;
  };

  return (
    <section
      id="clients"
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            الشركاء
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            شركاء النجاح
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نفتخر بشراكتنا مع أبرز المؤسسات والشركات الرائدة في مجال العقارات
            والتمويل
          </p>
        </div>

        {/* Multi-Image Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Images Grid */}
            <div className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {getCurrentSlideImages().map((image, index) => (
                  <div
                    key={index}
                    className="transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-32 w-full mx-auto flex items-center justify-center">
                      {/* Background Image */}
                      <div className="absolute inset-0 bg-white rounded-xl shadow-sm border border-gray-200"></div>
                      {/* Client Logo */}
                      <div className="relative h-[80%] w-[80%] px-4 py-2 mx-auto my-auto">
                        <Image
                          src={image}
                          alt={`Client ${
                            ((currentSlide * imagesPerSlide + index) %
                              clientImages.length) +
                            1
                          }`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 z-10"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 z-10"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientsSection;
