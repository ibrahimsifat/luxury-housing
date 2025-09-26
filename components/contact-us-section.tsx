"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Award,
  Building2,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { MobileNavigation } from "./mobile-navigation";
import { AnimatedCounter } from "./ui/animated-counter";
import WhatsAppFloat from "./whatsapp-float";

export function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSaudiPhone(formData.phone)) {
      setPhoneError("يرجى إدخال رقم هاتف سعودي صحيح (05xxxxxxxx)");
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const validateSaudiPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    const saudiMobileRegex = /^05\d{8}$/;
    return saudiMobileRegex.test(cleanPhone);
  };

  const handlePhoneChange = (value: string) => {
    let cleanValue = value.replace(/[^\d\s-]/g, "");
    if (cleanValue.length >= 2 && cleanValue.startsWith("05")) {
      cleanValue = cleanValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{2})/,
        "$1 $2 $3 $4"
      );
    }
    if (cleanValue.length <= 13) {
      setFormData((prev) => ({ ...prev, phone: cleanValue }));
      if (validateSaudiPhone(cleanValue)) {
        setPhoneError("");
      } else if (cleanValue.length >= 8) {
        setPhoneError("يرجى إدخال رقم هاتف سعودي صحيح (05xxxxxxxx)");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "اتصل بنا",
      details: ["0581111488", "013 234 5678"],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      details: ["info@luxuryhousing.sa", "support@luxuryhousing.sa"],
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: MapPin,
      title: "العنوان",
      details: [
        "الدمام، المملكة العربية السعودية",
        "نوفوتيل بيزنس بارك، شارع الوليد بن سلامة، الخالدية الشمالية، الدمام 32232",
      ],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: ["الأحد - الخميس: 8:00 ص - 6:00 م", "الجمعة - السبت: مغلق"],
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const companyStats = [
    {
      icon: Building2,
      number: 500,
      label: "عقار تم تمويله",
      color: "text-primary",
    },
    {
      icon: Users,
      number: 1000,
      label: "عميل راضي",
      color: "text-accent",
    },
    {
      icon: Award,
      number: 15,
      label: "سنة خبرة",
      color: "text-primary",
    },
    {
      icon: Globe,
      number: 25,
      label: "مدينة نخدمها",
      color: "text-accent",
    },
  ];

  const services = [
    "تقفيل المديونيات",
    "حلول الدفعة المقدمة",
    "حلول الضريبة",
    "أعلى مبلغ تمويلي",
    "دمج الراتب مع الدعم السكني",
    "وحدات جاهزة من السوق",
    "قرض وأرض من السوق",
    "بيت عظم وقرض",
    "البناء الذاتي",
    "وحدة تحت الإنشاء",
    "فك العقار المرهون",
    "رهن العقار الحر",
    "تمويل قطاع الأعمال",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Simple Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 md:pt-16">
          <div className="text-center text-white">
            {/* Simple Badge */}
            <div className="inline-flex items-center justify-center p-3 bg-amber-600/20 rounded-full border border-amber-400/40 shadow-lg mb-8">
              <Link
                href="/contact"
                className="text-sm font-bold text-amber-300 px-6 py-3 bg-white/10 rounded-full"
              >
                تواصل معنا
              </Link>
            </div>

            {/* Simple Title */}
            <h1 className="text-6xl md:text-7xl font-bold mb-8 text-balance text-white leading-tight">
              <span className="block">نحن هنا لخدمتك</span>
              <span className="block text-amber-300">بأفضل الطرق</span>
            </h1>

            {/* Simple Divider */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-1 bg-amber-400" />
              <div className="w-3 h-3 bg-amber-400 rounded-full mx-4" />
              <div className="w-16 h-1 bg-amber-400" />
            </div>

            {/* Simple Description */}
            <p className="text-xl text-white/90 max-w-4xl mx-auto text-pretty leading-relaxed mb-12">
              مستشار تمويل عقاري معتمد من الهيئة العامة للعقار
              <br />
              <span className="text-amber-300 font-semibold">
                نحقق أحلامكم في تملك المسكن المثالي
              </span>
            </p>

            {/* Company Stats - Simplified */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl mb-4 shadow-lg">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter
                      end={stat.number}
                      suffix="+"
                      duration={2.5}
                      delay={index * 0.2}
                    />
                  </div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-slate-800 mb-12 flex items-center">
                  <div className="w-2 h-12 bg-blue-500 rounded-full mr-4" />
                  معلومات التواصل
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <div key={index}>
                      <Card className="border shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                        <CardContent className="p-8">
                          <div
                            className={`inline-flex items-center justify-center w-16 h-16 ${info.bgColor} rounded-3xl mb-6 shadow-lg`}
                          >
                            <info.icon className={`w-8 h-8 ${info.color}`} />
                          </div>
                          <h4 className="font-bold text-slate-900 mb-4 text-xl">
                            {info.title}
                          </h4>
                          {info.details.map((detail, detailIndex) => (
                            <p
                              key={detailIndex}
                              className="text-sm text-slate-700 leading-relaxed mb-2"
                            >
                              {detail}
                            </p>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border shadow-2xl bg-white">
                <CardHeader className="pb-8 bg-gradient-to-r from-white to-blue-50/30">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-800">
                        أرسل لنا رسالة
                      </h3>
                      <p className="text-slate-600 mt-2 text-lg">
                        سنتواصل معك خلال 24 ساعة
                      </p>
                    </div>
                  </div>

                  {/* Simple Success Indicators */}
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      استجابة سريعة
                    </div>
                    <div className="flex items-center text-sm text-blue-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                      استشارة مجانية
                    </div>
                    <div className="flex items-center text-sm text-purple-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                      حلول مخصصة
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 bg-white">
                  {isSubmitted ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                        <CheckCircle className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-slate-800 mb-4">
                        تم إرسال رسالتك بنجاح!
                      </h3>
                      <p className="text-slate-600 text-xl">
                        سنتواصل معك في أقرب وقت ممكن
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <Label
                            htmlFor="name"
                            className="text-slate-800 font-bold text-lg"
                          >
                            الاسم الكامل *
                          </Label>
                          <div className="relative">
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) =>
                                handleInputChange("name", e.target.value)
                              }
                              placeholder="أدخل اسمك الكامل"
                              className="h-16 border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-2xl transition-colors text-slate-800 placeholder:text-slate-500 text-lg font-medium"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <Label
                            htmlFor="phone"
                            className="text-slate-800 font-bold text-lg"
                          >
                            رقم الهاتف *
                          </Label>
                          <div className="relative">
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                handlePhoneChange(e.target.value)
                              }
                              placeholder="05 123 456 78"
                              className={`h-16 border-2 rounded-2xl transition-colors text-slate-800 placeholder:text-slate-500 text-lg font-medium ${
                                phoneError
                                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                  : validateSaudiPhone(formData.phone)
                                  ? "border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                  : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                              }`}
                              required
                            />
                            {formData.phone && (
                              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                {validateSaudiPhone(formData.phone) ? (
                                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  </div>
                                ) : formData.phone.length >= 8 ? (
                                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shadow-lg">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                  </div>
                                ) : null}
                              </div>
                            )}
                          </div>
                          {phoneError && (
                            <p className="text-sm text-red-600 flex items-center mt-3 bg-red-50 p-3 rounded-xl border border-red-200">
                              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                              {phoneError}
                            </p>
                          )}
                          {!phoneError &&
                            !validateSaudiPhone(formData.phone) && (
                              <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                                مثال: 05 123 456 78 (يجب أن يبدأ بـ 05 ويحتوي
                                على 10 أرقام)
                              </p>
                            )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label
                          htmlFor="email"
                          className="text-slate-800 font-bold text-lg"
                        >
                          البريد الإلكتروني *
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="example@email.com"
                            className="h-16 border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-2xl transition-colors text-slate-800 placeholder:text-slate-500 text-lg font-medium"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label
                          htmlFor="service"
                          className="text-slate-800 font-bold text-lg"
                        >
                          الخدمة المطلوبة
                        </Label>
                        <div className="relative">
                          <Select
                            value={formData.service}
                            onValueChange={(value) =>
                              handleInputChange("service", value)
                            }
                          >
                            <SelectTrigger className="w-full h-16 border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-2xl transition-colors text-slate-800 text-lg font-medium data-[placeholder]:text-slate-500">
                              <SelectValue placeholder="اختر الخدمة المطلوبة" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-2 border-slate-200 rounded-2xl shadow-lg max-h-60">
                              <div className="p-3">
                                {services.map((service, index) => (
                                  <SelectItem
                                    key={index}
                                    value={service}
                                    className="hover:bg-orange-50 rounded-xl p-4 cursor-pointer transition-colors focus:bg-orange-100 text-slate-700 hover:text-orange-600 font-medium"
                                  >
                                    {service}
                                  </SelectItem>
                                ))}
                              </div>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label
                          htmlFor="message"
                          className="text-slate-800 font-bold text-lg"
                        >
                          الرسالة *
                        </Label>
                        <div className="relative">
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) =>
                              handleInputChange("message", e.target.value)
                            }
                            placeholder="اكتب رسالتك هنا..."
                            rows={6}
                            className="border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-2xl resize-none transition-colors text-slate-800 placeholder:text-slate-500 text-lg font-medium"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full h-20 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-0"
                        >
                          <span className="flex items-center justify-center text-xl">
                            إرسال الرسالة
                            <Send className="w-6 h-6 mr-3 rtl:mr-0 rtl:ml-3" />
                          </span>
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <MobileNavigation />
      <WhatsAppFloat />
    </div>
  );
}

export default ContactUsSection;
