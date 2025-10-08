"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiExternalLink } from "react-icons/fi";
import {
  HiBriefcase,
  HiCog,
  HiHome,
  HiLocationMarker,
  HiLockClosed,
  HiLockOpen,
  HiOfficeBuilding,
} from "react-icons/hi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function ProductsSection() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/cms/products");
        const products = await response.json();
        setAllProducts(Array.isArray(products) ? products : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setAllProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "HiHome":
        // @ts-ignore - React Icons type issue
        return <HiHome className="w-5 h-5 text-white" />;
      case "HiLocationMarker":
        // @ts-ignore - React Icons type issue
        return <HiLocationMarker className="w-5 h-5 text-white" />;
      case "HiMap":
        // @ts-ignore - React Icons type issue
        return <HiLocationMarker className="w-5 h-5 text-white" />;
      case "HiCog":
        // @ts-ignore - React Icons type issue
        return <HiCog className="w-5 h-5 text-white" />;
      case "HiWrench":
        // @ts-ignore - React Icons type issue
        return <HiCog className="w-5 h-5 text-white" />;
      case "HiOfficeBuilding":
        // @ts-ignore - React Icons type issue
        return <HiOfficeBuilding className="w-5 h-5 text-white" />;
      case "HiBuildingOffice":
        // @ts-ignore - React Icons type issue
        return <HiOfficeBuilding className="w-5 h-5 text-white" />;
      case "HiBuildingOffice2":
        // @ts-ignore - React Icons type issue
        return <HiOfficeBuilding className="w-5 h-5 text-white" />;
      case "HiBuildingStorefront":
        // @ts-ignore - React Icons type issue
        return <HiOfficeBuilding className="w-5 h-5 text-white" />;
      case "HiLockOpen":
        // @ts-ignore - React Icons type issue
        return <HiLockOpen className="w-5 h-5 text-white" />;
      case "HiLockClosed":
        // @ts-ignore - React Icons type issue
        return <HiLockClosed className="w-5 h-5 text-white" />;
      case "HiBriefcase":
        // @ts-ignore - React Icons type issue
        return <HiBriefcase className="w-5 h-5 text-white" />;
      case "HiCreditCard":
        // @ts-ignore - React Icons type issue
        return <HiBriefcase className="w-5 h-5 text-white" />;
      case "HiTruck":
        // @ts-ignore - React Icons type issue
        return <HiBriefcase className="w-5 h-5 text-white" />;
      case "HiChartBar":
        // @ts-ignore - React Icons type issue
        return <HiBriefcase className="w-5 h-5 text-white" />;
      default:
        // @ts-ignore - React Icons type issue
        return <HiHome className="w-5 h-5 text-white" />;
    }
  };

  const ProductCard = ({
    product,
    index,
  }: {
    product: Product;
    index: number;
  }) => (
    <Card className="group hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border-0 bg-white/80 backdrop-blur-md hover:bg-white/95 overflow-hidden relative w-full h-full flex flex-col">
      <div className="relative h-32 w-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
        <Image
          src={product.image || "/images/product-image.jpg"}
          alt={product.title || "Luxury Housing Product"}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
          priority={index < 4}
        />
        <div className="absolute top-2 right-2 rtl:right-2 rtl:left-auto z-20">
          <Badge className="bg-slate-900 text-white border-0 shadow-xl backdrop-blur-sm font-semibold text-xs px-2 py-1 rounded-full relative overflow-hidden">
            <span className="relative z-10 drop-shadow-sm text-white text-xs">
              {product.badge}
            </span>
            <div className="absolute inset-0 bg-black/20 rounded-full"></div>
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
        />
      </div>

      <div
        className={`h-1 bg-gradient-to-r ${product.gradient} shadow-sm`}
      ></div>
      <CardHeader className="relative pb-2 pt-3 px-4 flex-shrink-0">
        <CardTitle className="text-lg font-bold text-slate-800 text-center font-cairo leading-tight flex items-center justify-center gap-3">
          <div
            className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${product.gradient} rounded-xl shadow-lg backdrop-blur-md border border-white/20 group-hover:scale-110 transition-all duration-500 flex-shrink-0`}
          >
            {getIconComponent(product.icon)}
          </div>
          <span className="flex-1">{product.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0 px-4 pb-4 flex-1 flex flex-col">
        <p className="text-slate-800 leading-relaxed text-xs font-cairo line-clamp-2 text-center">
          {product.description}
        </p>

        <div className="space-y-1.5 bg-slate-50/80 rounded-lg p-2 backdrop-blur-sm">
          {product.features
            .slice(0, 3)
            .map((feature: string, featureIndex: number) => (
              <div
                key={featureIndex}
                className="flex items-center text-xs group/feature"
              >
                {/* @ts-ignore - React Icons type issue */}
                <FiCheckCircle className="w-3 h-3 text-green-600 mr-2 rtl:mr-0 rtl:ml-2 flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200" />
                <span className="text-slate-900 font-cairo font-medium">
                  {feature}
                </span>
              </div>
            ))}
        </div>

        <div className="relative mt-auto pt-3">
          <Link
            href={`/products/${
              product.slug ? decodeURIComponent(product.slug) : product.id
            }`}
          >
            <Button
              size="sm"
              className="w-full py-4 h-auto bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0 font-cairo font-bold hover:from-slate-800 hover:to-slate-700 hover:shadow-2xl transition-all duration-500 rounded-lg text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2 text-white drop-shadow-sm">
                <span className="text-white font-bold">تفاصيل المنتج</span>
                {/* @ts-ignore - React Icons type issue */}
                <FiExternalLink className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300 text-white" />
              </span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section
      id="products"
      className="py-24 relative overflow-hidden"
      role="region"
      aria-label="منتجاتنا"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-100/20 to-pink-100/20"></div>
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-cyan-200/15 to-pink-200/15 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-pink-200/15 to-cyan-200/15 rounded-full blur-2xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 backdrop-blur-sm rounded-full border border-cyan-200/30 shadow-lg mb-6">
            <span className="text-sm font-semibold text-cyan-800 px-6 py-2 bg-white/80 rounded-full font-cairo">
              منتجاتنا المميزة
            </span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-balance font-cairo">
            منتجاتنا
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-800 max-w-3xl mx-auto text-pretty leading-relaxed font-cairo">
            مجموعة شاملة من المنتجات التمويلية المصممة لتلبية احتياجاتكم
            العقارية والتجارية
          </p>
        </div>

        <div className="w-full">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              pagination={{
                el: ".swiper-pagination-custom",
                clickable: true,
                bulletClass: "swiper-pagination-bullet-custom",
                bulletActiveClass: "swiper-pagination-bullet-active-custom",
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="products-swiper"
            >
              {allProducts.map((product, index) => (
                <SwiperSlide key={product.slug}>
                  <ProductCard product={product} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Custom Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button className="swiper-button-prev-custom p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group">
              <span className="text-lg text-slate-600 group-hover:text-slate-900 transition-colors duration-200">
                ◀️
              </span>
            </button>

            <div className="swiper-pagination-custom flex gap-2"></div>

            <button className="swiper-button-next-custom p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group">
              <span className="text-lg text-slate-600 group-hover:text-slate-900 transition-colors duration-200">
                ▶️
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
