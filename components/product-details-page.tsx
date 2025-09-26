import { MobileNavigation } from "@/components/mobile-navigation";
import { ProductDetailsClient } from "@/components/product-details-client";
import WhatsAppFloat from "@/components/whatsapp-float";
import type { Product } from "@/lib/types";
import Link from "next/link";
import {
  HiBriefcase,
  HiCog,
  HiHome,
  HiLocationMarker,
  HiLockClosed,
  HiLockOpen,
  HiOfficeBuilding,
} from "react-icons/hi";
import { Badge } from "./ui/badge";

interface ProductDetailsPageProps {
  product: Product;
}

const renderIcon = (iconName: string) => {
  const iconProps = { className: "w-12 h-12 text-white" };

  switch (iconName) {
    case "HiHome":
      // @ts-ignore - React Icons type issue
      return <HiHome {...iconProps} />;
    case "HiLocationMarker":
      // @ts-ignore - React Icons type issue
      return <HiLocationMarker {...iconProps} />;
    case "HiLockOpen":
      // @ts-ignore - React Icons type issue
      return <HiLockOpen {...iconProps} />;
    case "HiCog":
      // @ts-ignore - React Icons type issue
      return <HiCog {...iconProps} />;
    case "HiOfficeBuilding":
      // @ts-ignore - React Icons type issue
      return <HiOfficeBuilding {...iconProps} />;
    case "HiLockClosed":
      // @ts-ignore - React Icons type issue
      return <HiLockClosed {...iconProps} />;
    case "HiBriefcase":
      // @ts-ignore - React Icons type issue
      return <HiBriefcase {...iconProps} />;
    default:
      return null;
  }
};

export function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-600/20 via-transparent to-pink-600/20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 md:mt-14 mt-10">
          <div className="text-center">
            {/* Breadcrumb */}
            <nav className="flex justify-center mb-8">
              <ol className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    الرئيسية
                  </Link>
                </li>
                <li className="text-white/50">/</li>
                <li>
                  <Link
                    href="/#products"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    المنتجات
                  </Link>
                </li>
                <li className="text-white/50">/</li>
                <li className="text-white font-medium">{product.title}</li>
              </ol>
            </nav>

            {/* Product Icon */}
            <div className="flex justify-center mb-6">
              <div
                className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${product.gradient} rounded-3xl shadow-2xl backdrop-blur-md border border-white/20`}
              >
                {renderIcon(product.icon)}
              </div>
            </div>

            {/* Product Title & Badge */}
            <div className="md:flex items-center justify-center gap-4 mb-6">
              <h1 className="text-2xl md:text-5xl font-bold text-white font-cairo text-balance">
                {product.title}
              </h1>
              {product.badge && (
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-4 py-2 md:mt-0 mt-4">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Product Description */}
            <p className="text-xl text-white/90 max-w-4xl mx-auto text-pretty leading-relaxed font-cairo mb-8">
              {product.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {product.minAmount && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-white/70 text-sm font-cairo">
                    الحد الأدنى
                  </div>
                  <div className="text-white font-bold font-cairo">
                    {product.minAmount}
                  </div>
                </div>
              )}
              {product.duration && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-white/70 text-sm font-cairo">
                    مدة التمويل
                  </div>
                  <div className="text-white font-bold font-cairo">
                    {product.duration}
                  </div>
                </div>
              )}
              {product.interestRate && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-white/70 text-sm font-cairo">
                    معدل الفائدة
                  </div>
                  <div className="text-white font-bold font-cairo">
                    {product.interestRate}
                  </div>
                </div>
              )}
              {product.processingTime && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-white/70 text-sm font-cairo">
                    وقت المعالجة
                  </div>
                  <div className="text-white font-bold font-cairo">
                    {product.processingTime}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Image Section */}
      <section className="py-16 bg-gradient-to-br from-white via-slate-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="relative max-w-4xl w-full group">
              {/* Animated Border Container */}
              <div className="relative p-2 rounded-lg bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 animate-pulse">
                <div className="bg-white rounded-lg p-2">
                  <img
                    src={product.image || "/images/product-image.jpg"}
                    alt={product.title}
                    className="w-full h-auto rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* Animated Corner Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-bounce delay-100"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute top-1/2 -left-3 w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-bounce delay-500"></div>
              <div className="absolute top-1/2 -right-3 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce delay-700"></div>
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsClient product={product} />
      <WhatsAppFloat />
      <MobileNavigation />
    </div>
  );
}
