import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ScrollAnimation } from "@/components/scroll-animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WhatsAppFloat from "@/components/whatsapp-float";
import { getAllProducts, getProductsByCategory } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import {
  FiCheckCircle,
  FiDollarSign,
  FiExternalLink,
  FiShield,
  FiTarget,
  FiZap,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const residentialProducts = getProductsByCategory("residential");
  const financialProducts = getProductsByCategory("financial");

  const ProductCard = ({ product, index }: { product: any; index: number }) => {
    return (
      <ScrollAnimation animation="fadeInUp" delay={index * 100}>
        <Card className="group hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border-0 bg-white/70 backdrop-blur-md hover:bg-white/95 overflow-hidden relative h-full">
          <div className="relative h-48 overflow-hidden">
            <Image
              src="/images/product-image.jpg"
              alt={product.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 h-full w-full"
            />
            <div className="absolute top-3 right-3 rtl:right-3 rtl:left-auto z-20">
              {product.badge && (
                <Badge className="bg-slate-900 text-white border-0 shadow-xl backdrop-blur-sm font-semibold text-xs px-3 py-1 rounded-full">
                  {product.badge}
                </Badge>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
            />
          </div>

          <div
            className={`h-1 bg-gradient-to-r ${product.gradient} shadow-sm`}
          ></div>

          <CardHeader className="relative pb-3 pt-4 px-4 md:px-6">
            <CardTitle className="text-lg md:text-xl font-bold text-slate-800 text-center leading-tight">
              {product.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 pt-0 px-4 md:px-6 pb-6 flex-1 flex flex-col">
            <p className="text-slate-800 leading-relaxed text-sm text-center mb-4 flex-1 line-clamp-3">
              {product.description}
            </p>

            <div className="space-y-2 bg-slate-100 rounded-lg p-2 md:p-3 backdrop-blur-sm">
              {product.features
                .slice(0, 4)
                .map((feature: string, featureIndex: number) => (
                  <div
                    key={featureIndex}
                    className="flex items-center text-xs md:text-sm group/feature"
                  >
                    <span className="text-green-600 mr-2 rtl:mr-0 rtl:ml-2 flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200">
                      {/* @ts-ignore - React Icons type issue */}
                      <FiCheckCircle className="w-3 md:w-4 h-3 md:h-4" />
                    </span>
                    <span className="text-slate-900 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
            </div>

            {/* Financial Details */}
            {product.minAmount && (
              <div className="grid grid-cols-2 gap-1 md:gap-2 text-xs bg-gradient-to-r from-slate-100 to-blue-50 rounded-lg p-2 md:p-3">
                <div className="text-center">
                  <div className="text-slate-700 mb-1 text-xs">المبلغ</div>
                  <div className="font-semibold text-slate-900 text-xs">
                    {product.minAmount} - {product.maxAmount}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-slate-700 mb-1 text-xs">المدة</div>
                  <div className="font-semibold text-slate-900 text-xs">
                    {product.duration}
                  </div>
                </div>
              </div>
            )}

            <Link href={`/products/${product.slug}`} className="mt-auto">
              <Button className="w-full py-3 md:py-4 h-auto bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0 font-bold hover:from-slate-800 hover:to-slate-700 hover:shadow-2xl transition-all duration-500 rounded-lg text-xs md:text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                <span className="flex items-center justify-center gap-1 md:gap-2 text-white drop-shadow-sm">
                  <span className="text-white font-bold">تفاصيل المنتج</span>
                  {/* @ts-ignore - React Icons type issue */}
                  <FiExternalLink className="w-3 md:w-4 h-3 md:h-4 group-hover:rotate-12 transition-transform duration-300 text-white" />
                </span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </ScrollAnimation>
    );
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.2),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeInUp">
            <div className="inline-flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-900/70 backdrop-blur-sm rounded-full border border-white/20 shadow-lg mb-4 md:mb-6 md:mt-10 mt-4">
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              {/* @ts-ignore - React Icons type issue */}
              <HiOutlineSparkles className="w-3 md:w-4 h-3 md:h-4 text-cyan-400" />
              <span className="text-xs md:text-sm font-semibold text-white px-1 md:px-2 py-0.5 md:py-1 bg-slate-800/80 rounded-full">
                منتجاتنا المميزة
              </span>
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={100}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 text-balance leading-tight drop-shadow-lg">
              منتجاتنا
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={200}>
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8">
              <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-blue-400 rounded-full"></div>
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
              <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-transparent rounded-full"></div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={300}>
            <p className="text-base md:text-xl text-blue-100 max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-sm px-4">
              مجموعة شاملة من المنتجات التمويلية المصممة خصيصاً لتلبية
              احتياجاتكم العقارية والمالية بأفضل الشروط والأسعار
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8 md:mb-12 px-4">
              <TabsList className="grid grid-cols-3 w-full max-w-2xl bg-white/80 backdrop-blur-md shadow-lg border-0 h-12 md:h-14">
                <TabsTrigger
                  value="all"
                  className="text-xs md:text-base font-semibold data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-slate-800 hover:text-slate-900 px-2 md:px-4"
                >
                  <span className="hidden sm:inline">جميع المنتجات</span>
                  <span className="sm:hidden">الكل</span>
                </TabsTrigger>
                <TabsTrigger
                  value="residential"
                  className="text-xs md:text-base font-semibold data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-slate-800 hover:text-slate-900 px-2 md:px-4"
                >
                  <span className="hidden sm:inline">التمويل السكني</span>
                  <span className="sm:hidden">سكني</span>
                </TabsTrigger>
                <TabsTrigger
                  value="financial"
                  className="text-xs md:text-base font-semibold data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-slate-800 hover:text-slate-900 px-2 md:px-4"
                >
                  <span className="hidden sm:inline">الخدمات المالية</span>
                  <span className="sm:hidden">مالي</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {allProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="residential" className="space-y-8">
              <div className="text-center mb-8 md:mb-12 px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  منتجات التمويل السكني
                </h2>
                <p className="text-base md:text-lg text-slate-800 max-w-2xl mx-auto">
                  حلول تمويلية متكاملة لتحقيق حلم امتلاك المنزل المثالي
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {residentialProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-8">
              <div className="text-center mb-8 md:mb-12 px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  الخدمات المالية
                </h2>
                <p className="text-base md:text-lg text-slate-800 max-w-2xl mx-auto">
                  خدمات مالية متخصصة لتحسين وضعكم المالي وتحقيق أهدافكم
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {financialProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
                لماذا تختار منتجاتنا؟
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto drop-shadow-sm">
                نقدم أفضل الحلول التمويلية بشروط تنافسية وخدمة عملاء متميزة
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiDollarSign,
                title: "أسعار تنافسية",
                desc: "أفضل أسعار الفوائد في السوق",
              },
              {
                icon: FiZap,
                title: "موافقة سريعة",
                desc: "موافقة خلال 24-48 ساعة",
              },
              {
                icon: FiShield,
                title: "أمان وثقة",
                desc: "معتمدون من الهيئة العامة للعقار",
              },
              {
                icon: FiTarget,
                title: "حلول مخصصة",
                desc: "منتجات مصممة لاحتياجاتك",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;

              return (
                <ScrollAnimation
                  key={index}
                  animation="fadeInUp"
                  delay={index * 100}
                >
                  <div className="text-center p-6 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-slate-800/70 transition-all duration-300">
                    <div className="flex justify-center mb-4">
                      {/* @ts-ignore - React Icons type issue */}
                      <IconComponent className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">
                      {feature.title}
                    </h3>
                    <p className="text-blue-100 drop-shadow-sm">
                      {feature.desc}
                    </p>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ابدأ رحلتك نحو تملك منزل أحلامك
            </h2>
            <p className="text-xl text-slate-800 mb-8 max-w-2xl mx-auto">
              تواصل معنا اليوم واحصل على استشارة مجانية لاختيار المنتج المناسب
              لك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-800 hover:to-purple-900 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  احسب التمويل
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-400 text-slate-800 hover:bg-slate-100 px-8 py-4 text-lg font-semibold bg-transparent"
                >
                  استشارة مجانية
                </Button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <MobileNavigation />
    </div>
  );
}
