"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAllServices } from "@/lib/services"
import { FiCreditCard, FiHome, FiActivity, FiTrendingUp, FiUsers, FiStar, FiExternalLink } from "react-icons/fi"

const iconMap = {
  CreditCard: FiCreditCard,
  Home: FiHome,
  Calculator: FiActivity,
  TrendingUp: FiTrendingUp,
  Users: FiUsers,
}

export function ServicesSection() {
  const services = getAllServices()

  return (
    <section
      id="services"
      className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,182,193,0.1),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 backdrop-blur-sm rounded-full border border-blue-200/30 shadow-lg mb-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <FiStar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 px-2 py-1 bg-white/50 rounded-full">
              خدماتنا المتميزة
            </span>
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-4 text-balance leading-tight">
            خدماتنا
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent rounded-full"></div>
          </div>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            نقدم حلولاً عقارية متكاملة ومبتكرة تلبي جميع احتياجاتكم بأعلى معايير الجودة والاحترافية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || FiCreditCard

            return (
              <Card
                key={service.id}
                className={`group relative overflow-hidden bg-white/90 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 hover:rotate-1 ${service.accentColor} rounded-3xl`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative p-6 pb-4">
                  {/* Icon with enhanced styling */}
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`relative w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Floating particles around icon */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300 leading-tight text-center">
                    {service.title}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto group-hover:w-20 transition-all duration-500 mb-4"></div>
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />

                <CardContent className="relative p-6 pt-0 space-y-3">
                  <p className="text-slate-600 leading-relaxed text-sm group-hover:text-slate-700 transition-colors duration-300 line-clamp-3 text-center mb-3">
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

                  <Link href={`/services/${service.slug}`}>
                    <Button className="w-full mt-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-black hover:via-slate-900 hover:to-black text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 rounded-2xl py-6 h-14 font-semibold text-base relative overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      <span className="relative z-10 flex items-center justify-center gap-3 text-white drop-shadow-lg">
                        <FiExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                        تفاصيل الخدمة
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
