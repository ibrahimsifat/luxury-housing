"use client";

import { Client } from "@/lib/types";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Custom Swiper styles
const swiperStyles = `
    .clients-swiper .swiper-pagination-bullet-active {
    background: #2563eb;
    transform: scale(1.25);
  }
  
  .clients-swiper .swiper-slide {
    height: auto;
  }
`;

interface ClientsSectionProps {
  clients?: Client[];
  title?: string;
  description?: string;
  showAll?: boolean;
  maxItems?: number;
}

export function ClientsSection({
  clients: initialClients,
  title = "شركاء النجاح",
  description = "نفتخر بشراكتنا مع أبرز المؤسسات والشركات الرائدة في مجال العقارات والتمويل",
  showAll = false,
  maxItems = 8,
}: ClientsSectionProps) {
  const [clients, setClients] = useState<Client[]>(initialClients || []);
  const [isLoading, setIsLoading] = useState(!initialClients);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/cms/clients", {
        next: {
          revalidate: 300, // 5 minutes cache
          tags: ["clients"],
        },
      });
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      } else {
        console.error("Failed to fetch clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayClients = showAll
    ? clients.sort((a, b) => a.order - b.order)
    : clients.sort((a, b) => a.order - b.order).slice(0, maxItems);

  // Debug logging
  console.log("ClientsSection - Total clients:", clients.length);
  console.log("ClientsSection - Display clients:", displayClients.length);
  console.log("ClientsSection - First client:", displayClients[0]);

  useEffect(() => {
    if (!initialClients) {
      fetchClients();
    }
  }, [initialClients]);

  // Force autoplay to start after component mounts
  useEffect(() => {
    if (displayClients.length > 0) {
      // Small delay to ensure Swiper is fully initialized
      const timer = setTimeout(() => {
        const swiperEl = document.querySelector(".clients-swiper") as any;
        if (swiperEl && swiperEl.swiper) {
          swiperEl.swiper.autoplay.start();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [displayClients.length]);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading clients...</p>
          </div>
        </div>
      </section>
    );
  }

  if (displayClients.length === 0) {
    return null;
  }

  return (
    <>
      <style jsx>{swiperStyles}</style>
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
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          {/* Swiper Carousel */}
          <div className="max-w-6xl mx-auto">
            <Swiper
              key={displayClients.length}
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={2}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                reverseDirection: false,
                stopOnLastSlide: false,
              }}
              speed={800}
              allowTouchMove={true}
              grabCursor={true}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              loop={displayClients.length > 4}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },
              }}
              className="clients-swiper"
            >
              {displayClients.map((client) => (
                <SwiperSlide key={client.id}>
                  <div className="transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative h-32 w-full mx-auto flex items-center justify-center">
                      {/* Background */}
                      <div className="absolute inset-0 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"></div>
                      {/* Client Logo */}
                      <div className="relative h-[80%] w-[80%] px-4 py-2 mx-auto my-auto">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            console.error(
                              "Image failed to load:",
                              client.logo,
                              e
                            );
                          }}
                          onLoad={() => {
                            console.log(
                              "Image loaded successfully:",
                              client.logo
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Pagination */}
            <div className="swiper-pagination !relative !mt-8 !bottom-0"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientsSection;
