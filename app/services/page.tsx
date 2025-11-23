import { MobileNavigation } from "@/components/mobile-navigation";
import { ScrollAnimation } from "@/components/scroll-animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllServices } from "@/lib/cms-data";
import Link from "next/link";
import {
  FiActivity,
  FiCreditCard,
  FiExternalLink,
  FiHome,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

// Force dynamic rendering to avoid build-time data fetching
export const dynamic = "force-dynamic";

const iconMap = {
  CreditCard: FiCreditCard,
  Home: FiHome,
  Calculator: FiActivity,
  TrendingUp: FiTrendingUp,
  Users: FiUsers,
};

export default async function ServicesPage() {
  const services = await getAllServices();

  const getIconComponent = (iconName: string) => {
    const IconComponent =
      iconMap[iconName as keyof typeof iconMap] || FiCreditCard;
    // @ts-ignore - React Icons type issue
    return <IconComponent className="w-8 h-8 text-white" />;
  };

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.2),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeInUp">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              {/* @ts-ignore - React Icons type issue */}
              <FiStar className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-white px-2 py-1 bg-white/20 rounded-full">
                خدماتنا المتميزة
              </span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={100}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance leading-tight">
              خدماتنا
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={200}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-purple-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-transparent rounded-full"></div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={300}>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto text-pretty leading-relaxed">
              نقدم مجموعة شاملة من الخدمات العقارية والتمويلية المتخصصة لتلبية
              جميع احتياجاتكم بأعلى معايير الجودة والاحترافية
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 md:py-24">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <FiStar className="w-12 h-12 md:w-16 md:h-16 text-slate-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                لا توجد خدمات متاحة حالياً
              </h3>
              <p className="text-slate-600 text-center max-w-md mb-6">
                سيتم إضافة الخدمات قريباً. يرجى التحقق لاحقاً أو التواصل معنا للمزيد من المعلومات.
              </p>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  تواصل معنا
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ScrollAnimation
                  key={service.id}
                  animation="fadeInUp"
                  delay={index * 100}
                >
                  <Card className="group relative overflow-hidden bg-white/90 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 hover:rotate-1 rounded-3xl h-full">
                    <div className="relative p-6 pb-4">
                      {/* Icon with enhanced styling */}
                      <div className="flex items-center justify-center mb-4">
                        <div
                          className={`relative w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700`}
                        >
                          {getIconComponent(service.icon)}
                          <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          {/* Floating particles around icon */}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500" />
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300 leading-tight text-center">
                        {service.title}
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto group-hover:w-20 transition-all duration-500 mb-4"></div>
                    </div>

                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />

                    <CardContent className="relative p-6 pt-0 space-y-4 flex-1 flex flex-col">
                      <p className="text-slate-600 leading-relaxed text-sm group-hover:text-slate-700 transition-colors duration-300 text-center mb-4 flex-1">
                        {service.description}
                      </p>

                      <div className="space-y-2 pt-2">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center text-sm group-hover:translate-x-2 transition-transform duration-500"
                            style={{ transitionDelay: `${featureIndex * 100}ms` }}
                          >
                            <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mr-2 rtl:mr-0 rtl:ml-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-500">
                              <span className="text-xs text-white">✓</span>
                            </div>
                            <span className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300 leading-tight text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Link href={`/services/${service.id}`} className="mt-auto">
                        <Button className="w-full mt-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-black hover:via-slate-900 hover:to-black text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 rounded-2xl py-6 h-14 font-semibold text-base relative overflow-hidden">
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                          <span className="relative z-10 flex items-center justify-center gap-3 text-white drop-shadow-lg">
                            {/* @ts-ignore - React Icons type issue */}
                            <FiExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                            تفاصيل الخدمة
                          </span>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              هل تحتاج إلى استشارة مخصصة؟
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              فريقنا من الخبراء جاهز لمساعدتك في اختيار الخدمة المناسبة
              لاحتياجاتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="whatsapp://send?phone=+966581111488&text=استشارة مجانية">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  احجز استشارة مجانية
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold bg-transparent"
                >
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <MobileNavigation />
    </div>
  );
}
