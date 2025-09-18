"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

export function ProductsSection() {
  const [activeTab, setActiveTab] = useState("residential");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardsPerSlide, setCardsPerSlide] = useState(4);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const residentialProducts = [
    {
      icon: "HiHome",
      title: "وحدات جاهزة من السوق",
      description:
        "تمويل شراء عقار جاهز من السوق سواء كان (فيلا، شقة، عمارة سكنية) أو أحد مشاريع وزارة الإسكان الجاهزة",
      features: [
        "فلل وشقق جاهزة",
        "مشاريع وزارة الإسكان",
        "تمويل فوري",
        "إجراءات مبسطة",
      ],
      badge: "الأكثر طلباً",
      gradient: "from-cyan-500 to-blue-500",
      slug: "ready-market-units",
    },
    {
      icon: "HiLocationMarker",
      title: "قرض وأرض من السوق",
      description:
        "تمويل الأراضي الخارجية من السوق من خلال شراء أرض من السوق وبناء الأرض عن طريق مقاول خارجي معتمد وتوفير باقة كاملة",
      features: [
        "شراء الأرض",
        "البناء بمقاول معتمد",
        "باقة شاملة",
        "متابعة المشروع",
      ],
      badge: "حل متكامل",
      gradient: "from-green-500 to-emerald-500",
      slug: "land-and-loan",
    },
    {
      icon: "HiCog",
      title: "بيت عظم وقرض",
      description:
        "تمويل قرض البيت العظم الذي يملكه العميل واستكمال بناءه على المراحل المتبقية وتوفير باقة كاملة للعميل",
      features: [
        "استكمال البناء",
        "تمويل على مراحل",
        "للبيوت العظم",
        "باقة متكاملة",
      ],
      badge: "مرونة في السداد",
      gradient: "from-orange-500 to-red-500",
      slug: "large-house-loan",
    },
    {
      icon: "HiCog",
      title: "البناء الذاتي",
      description:
        "تمويل بناء ذاتي لمن لديه أرض ويرغب ببناء منزله حسب رغبته، وذلك من خلال تمويل عقاري على دفعات عبر جهات معتمدة",
      features: [
        "بناء حسب الرغبة",
        "تمويل على دفعات",
        "جهات معتمدة",
        "مرونة في التصميم",
      ],
      badge: "تصميم مخصص",
      gradient: "from-purple-500 to-pink-500",
      slug: "self-build",
    },
    {
      icon: "HiOfficeBuilding",
      title: "وحدة تحت الإنشاء",
      description:
        "تمويل شراء عقار تحت الإنشاء (عظم) سواء كان (فيلا، شقة، دبلكس) المقدمة من خلال العميل أو مقاولين معتمدين",
      features: [
        "عقارات تحت الإنشاء",
        "فلل ودبلكس",
        "مقاولين معتمدين",
        "أسعار تنافسية",
      ],
      badge: "وفر أكثر",
      gradient: "from-teal-500 to-cyan-500",
      slug: "unit-under-construction",
    },
  ];

  const financialProducts = [
    {
      icon: "HiLockOpen",
      title: "فك العقار المرهون",
      description:
        "فك الرهن عن العقار المرهون للبنوك (حسب السياسة) وإعادة التمويل، المنتج متاح لجميع العملاء",
      features: [
        "فك الرهن البنكي",
        "إعادة التمويل",
        "شروط أفضل",
        "لجميع العملاء",
      ],
      badge: "حرية مالية",
      gradient: "from-red-500 to-pink-500",
      slug: "property-mortgage-release",
    },
    {
      icon: "HiLockClosed",
      title: "رهن العقار الحر",
      description:
        "رهن العقار الحر والمملوك للعميل (شقة- فيلا-عمارة) شريطة أن يكون العقار سكنياً وأن لا يتجاوز عمر العقار 20 سنة",
      features: [
        "عقارات حرة",
        "عمر العقار أقل من 20 سنة",
        "سكني فقط",
        "سيولة فورية",
      ],
      badge: "سيولة سريعة",
      gradient: "from-indigo-500 to-purple-500",
      slug: "free-property-mortgage",
    },
    {
      icon: "HiBriefcase",
      title: "تمويل قطاع الأعمال",
      description:
        "يتم تمويل قطاع الأعمال للمنشآت الصغيرة أو المتوسطة أو الكبيرة عن طريق عدة برامج مرنة تخدم أغلب شرائح قطاع الأعمال",
      features: [
        "منشآت صغيرة ومتوسطة",
        "برامج مرنة",
        "جميع القطاعات",
        "حلول مخصصة",
      ],
      badge: "نمو الأعمال",
      gradient: "from-yellow-500 to-orange-500",
      slug: "business-sector-funding",
    },
  ];

  const currentProducts =
    activeTab === "residential" ? residentialProducts : financialProducts;
  const totalSlides = Math.ceil(currentProducts.length / cardsPerSlide);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerSlide(4); // Desktop: 4 cards
      } else if (window.innerWidth >= 768) {
        setCardsPerSlide(2); // Tablet: 2 cards
      } else {
        setCardsPerSlide(1); // Mobile: 1 card
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHovered]);

  useEffect(() => {
    setCurrentSlide(0);
    setIsTransitioning(false);
  }, [activeTab, cardsPerSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "HiHome":
        // @ts-ignore - React Icons type issue
        return <HiHome className="w-5 h-5 text-white" />;
      case "HiLocationMarker":
        // @ts-ignore - React Icons type issue
        return <HiLocationMarker className="w-5 h-5 text-white" />;
      case "HiCog":
        // @ts-ignore - React Icons type issue
        return <HiCog className="w-5 h-5 text-white" />;
      case "HiOfficeBuilding":
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
      default:
        return null;
    }
  };

  const ProductCard = ({ product, index }: { product: any; index: number }) => (
    <Card className="group hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border-0 bg-white/80 backdrop-blur-md hover:bg-white/95 overflow-hidden relative flex-shrink-0 w-full">
      <div className="relative h-40 overflow-hidden">
        <Image
          src="/images/product-image.jpg"
          alt="Luxury Housing Product"
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-700"
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
      <CardHeader className="relative pb-2 pt-3 px-4">
        <CardTitle className="text-lg font-bold text-slate-800 text-center font-cairo leading-tight flex items-center justify-center gap-3">
          <div
            className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${product.gradient} rounded-xl shadow-lg backdrop-blur-md border border-white/20 group-hover:scale-110 transition-all duration-500 flex-shrink-0`}
          >
            {getIconComponent(product.icon)}
          </div>
          <span className="flex-1">{product.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0 px-4 pb-4">
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

        <div className="relative mt-3">
          <Link
            href={`/products/${
              product.slug || product.title.replace(/\s+/g, "-").toLowerCase()
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

  const renderProductSlides = () => {
    const slides = [];
    for (let i = 0; i < totalSlides; i++) {
      const startIndex = i * cardsPerSlide;
      const slideProducts = currentProducts.slice(
        startIndex,
        startIndex + cardsPerSlide
      );

      slides.push(
        <div
          key={i}
          className={`flex gap-4 transition-all duration-500 ease-in-out ${
            cardsPerSlide === 1
              ? "w-full"
              : cardsPerSlide === 2
              ? "w-full"
              : "w-full"
          }`}
          style={{ minWidth: "100%" }}
        >
          {slideProducts.map((product, index) => (
            <div
              key={product.slug}
              className={`${
                cardsPerSlide === 1
                  ? "w-full"
                  : cardsPerSlide === 2
                  ? "w-1/2"
                  : "w-1/4"
              } flex-shrink-0`}
            >
              <ProductCard product={product} index={startIndex + index} />
            </div>
          ))}
          {slideProducts.length < cardsPerSlide &&
            Array.from({ length: cardsPerSlide - slideProducts.length }).map(
              (_, emptyIndex) => (
                <div
                  key={`empty-${emptyIndex}`}
                  className={`${
                    cardsPerSlide === 1
                      ? "w-full"
                      : cardsPerSlide === 2
                      ? "w-1/2"
                      : "w-1/4"
                  } flex-shrink-0`}
                />
              )
            )}
        </div>
      );
    }
    return slides;
  };

  return (
    <section id="products" className="py-24 relative overflow-hidden">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-6">
            <TabsList className="grid grid-cols-2 max-w-lg bg-white/80 backdrop-blur-md shadow-lg border-0 h-14">
              <TabsTrigger
                value="residential"
                className="text-lg font-cairo data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-slate-700 hover:text-slate-900 data-[state=active]:border-0"
              >
                التمويل السكني
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="text-lg font-cairo data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-slate-700 hover:text-slate-900 data-[state=active]:border-0"
              >
                الخدمات المالية
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
                <button
                  onClick={toggleAutoPlay}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors duration-200"
                  aria-label={
                    isAutoPlaying ? "Pause auto-scroll" : "Start auto-scroll"
                  }
                >
                  <span
                    className="text-lg"
                    role="img"
                    aria-label={isAutoPlaying ? "pause" : "play"}
                  >
                    {isAutoPlaying ? "⏸️" : "▶️"}
                  </span>
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-slate-900 w-6"
                          : "bg-slate-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group"
                  aria-label="Previous slide"
                >
                  <span
                    className="text-lg text-slate-600 group-hover:text-slate-900 transition-colors duration-200"
                    role="img"
                    aria-label="previous"
                  >
                    ◀️
                  </span>
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group"
                  aria-label="Next slide"
                >
                  <span
                    className="text-lg text-slate-600 group-hover:text-slate-900 transition-colors duration-200"
                    role="img"
                    aria-label="next"
                  >
                    ▶️
                  </span>
                </button>
              </div>
            </div>
          </div>

          <TabsContent value="residential" className="space-y-8">
            <div
              className="relative overflow-hidden rounded-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {renderProductSlides()}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-8">
            <div
              className="relative overflow-hidden rounded-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {renderProductSlides()}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default ProductsSection;
