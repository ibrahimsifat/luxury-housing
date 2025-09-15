import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailsClient } from "@/components/product-details-client"
import Link from "next/link"
import WhatsAppFloat from "@/components/whatsapp-float"
import { MobileNavigation } from "@/components/mobile-navigation"

interface ProductDetailsPageProps {
  product: Product
}

export function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pt-6">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-600/20 via-transparent to-pink-600/20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Breadcrumb */}
            <nav className="flex justify-center mb-8">
              <ol className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                <li>
                  <Link href="/" className="text-white/70 hover:text-white transition-colors">
                    الرئيسية
                  </Link>
                </li>
                <li className="text-white/50">/</li>
                <li>
                  <Link href="/#products" className="text-white/70 hover:text-white transition-colors">
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
                <span className="text-4xl">{product.icon}</span>
              </div>
            </div>

            {/* Product Title & Badge */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-cairo text-balance">{product.title}</h1>
              {product.badge && (
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-4 py-2">
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
                  <div className="text-white/70 text-sm font-cairo">الحد الأدنى</div>
                  <div className="text-white font-bold font-cairo">{product.minAmount}</div>
                </div>
              )}
              {product.duration && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-white/70 text-sm font-cairo">مدة التمويل</div>
                  <div className="text-white font-bold font-cairo">{product.duration}</div>
                </div>
              )}
              {product.interestRate && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-white/70 text-sm font-cairo">معدل الفائدة</div>
                  <div className="text-white font-bold font-cairo">{product.interestRate}</div>
                </div>
              )}
              {product.processingTime && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-white/70 text-sm font-cairo">وقت المعالجة</div>
                  <div className="text-white font-bold font-cairo">{product.processingTime}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsClient product={product} />
      <WhatsAppFloat />
      <MobileNavigation />
      <Footer />
    </div>
  )
}
