"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Phone, User, Mail, MessageSquare } from "lucide-react"
import Image from "next/image"
import { ScrollAnimation } from "./scroll-animations"
import { useState, useEffect } from "react"

export function EnhancedHeroSection() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const formatSaudiPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.startsWith("966")) {
      const formatted = cleaned.replace(/^966(\d{2})(\d{3})(\d{4})$/, "+966 $1 $2 $3")
      return formatted
    } else if (cleaned.startsWith("05")) {
      const formatted = cleaned.replace(/^(\d{2})(\d{3})(\d{4})$/, "$1 $2 $3")
      return formatted
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSaudiPhone(e.target.value)
    setPhoneNumber(formatted)
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>

        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.01}% ${50 + scrollY * 0.02}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), 
                        radial-gradient(circle at ${30 - scrollY * 0.01}% ${70 - scrollY * 0.02}%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        ></div>

        <div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"
          style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.2}px)` }}
        ></div>
        <div
          className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-indigo-400/30 to-cyan-400/30 rounded-full blur-lg animate-bounce"
          style={{
            animationDelay: "1s",
            transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.1}px)`,
          }}
        ></div>
        <div
          className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-br from-purple-400/25 to-pink-400/25 rounded-full blur-md animate-pulse"
          style={{
            animationDelay: "2s",
            transform: `translate(${scrollY * 0.08}px, ${-scrollY * 0.12}px)`,
          }}
        ></div>

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translateY(${scrollY * (0.05 + i * 0.02)}px)`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollAnimation animation="fadeInUp">
          <div className="mb-8">
            <Image
              src="/images/luxury-housing-logo.png"
              alt="Luxury Housing"
              width={300}
              height={100}
              className="mx-auto h-20 w-auto brightness-0 invert animate-fade-in hover:scale-105 transition-transform duration-500"
            />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
            <span className="block animate-slide-up">
              <span className="inline-block animate-bounce" style={{ animationDelay: "0.1s" }}>
                ش
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "0.2s" }}>
                ر
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "0.3s" }}>
                ك
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "0.4s" }}>
                ة
              </span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "0.5s" }}>
                ل
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "0.6s" }}>
                و
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "0.7s" }}>
                ك
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "0.8s" }}>
                س
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "0.9s" }}>
                ر
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "1.0s" }}>
                ي
              </span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "1.1s" }}>
                ه
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "1.2s" }}>
                ا
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "1.3s" }}>
                و
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "1.4s" }}>
                س
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "1.5s" }}>
                ي
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "1.6s" }}>
                ن
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: "1.7s" }}>
                غ
              </span>
            </span>
            <span className="block text-white mt-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              للحلول العقارية
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <span className="inline-block animate-pulse" style={{ animationDelay: "2s" }}>
              مستشار
            </span>{" "}
            <span className="inline-block animate-pulse" style={{ animationDelay: "2.2s" }}>
              تمويل
            </span>{" "}
            <span className="inline-block animate-pulse" style={{ animationDelay: "2.4s" }}>
              عقاري
            </span>{" "}
            <span className="inline-block animate-pulse" style={{ animationDelay: "2.6s" }}>
              معتمد
            </span>{" "}
            <span className="inline-block animate-pulse" style={{ animationDelay: "2.8s" }}>
              من
            </span>{" "}
            <span className="inline-block animate-pulse" style={{ animationDelay: "3s" }}>
              الهيئة
            </span>{" "}
            <span className="inline-block animate-pulse" style={{ animationDelay: "3.2s" }}>
              العامة
            </span>{" "}
            <span className="inline-block animate-pulse" style={{ animationDelay: "3.4s" }}>
              للعقار
            </span>
            <br />
            <span className="text-white font-semibold">نحقق أحلامكم في تملك المسكن المثالي</span>
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setShowForm(!showForm)}
              className="text-lg px-8 py-4 font-semibold group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
            >
              استشارة مجانية
              <Phone className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 font-semibold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 group backdrop-blur-sm transform hover:scale-105 transition-all duration-300 bg-transparent"
            >
              تصفح منتجاتنا
              <ArrowLeft className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Button>
          </div>
        </ScrollAnimation>

        {showForm && (
          <ScrollAnimation animation="slideInUp" delay={0}>
            <div className="max-w-md mx-auto mb-12 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl animate-scale-in">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <MessageSquare className="h-6 w-6 text-accent" />
                تواصل معنا
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute right-3 top-3 h-5 w-5 text-white/80" />
                  <Input
                    placeholder="الاسم الكامل"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/80 pr-10 focus:bg-white/30 transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 h-5 w-5 text-white/80" />
                  <Input
                    placeholder="رقم الجوال (05xxxxxxxx أو +966xxxxxxxxx)"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/80 pr-10 focus:bg-white/30 transition-all"
                  />
                  <div className="text-xs text-white/80 mt-1 text-right">مثال: 050 123 4567 أو +966 50 123 4567</div>
                </div>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-white/80" />
                  <Input
                    placeholder="البريد الإلكتروني"
                    type="email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/80 pr-10 focus:bg-white/30 transition-all"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white font-bold py-3 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  إرسال الطلب
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        )}

        <ScrollAnimation animation="slideInUp" delay={400}>
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { number: "2022", label: "تأسست الشركة", delay: "0.2s" },
              { number: "معتمد", label: "من الهيئة العامة للعقار", delay: "0.4s" },
              { number: "شراكات", label: "مع البنوك والشركات التمويلية", delay: "0.6s" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transform hover:scale-105 transition-all duration-500 shadow-2xl"
                style={{ animationDelay: item.delay }}
              >
                <div className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-bold mb-2 animate-pulse">
                  {item.number}
                </div>
                <div className="text-white/90 font-semibold">{item.label}</div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>

      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ transform: `translate(-50%, ${scrollY * 0.1}px)` }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white/50 transition-all duration-300 cursor-pointer group">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse group-hover:from-blue-300 group-hover:to-purple-300 transition-colors"></div>
        </div>
      </div>
    </section>
  )
}
