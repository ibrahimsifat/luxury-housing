"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type React from "react";
import { useState } from "react";
import Footer from "./footer";
import { MobileNavigation } from "./mobile-navigation";
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
      number: "500+",
      label: "عقار تم تمويله",
      color: "text-primary",
    },
    {
      icon: Users,
      number: "1000+",
      label: "عميل راضي",
      color: "text-accent",
    },
    {
      icon: Award,
      number: "15+",
      label: "سنة خبرة",
      color: "text-primary",
    },
    {
      icon: Globe,
      number: "25+",
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.05),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 md:pt-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center p-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30 shadow-lg mb-8">
              <span className="text-sm font-semibold text-accent px-6 py-2 bg-white/10 rounded-full">
                تواصل معنا
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance text-white">
              نحن هنا لخدمتك
            </h1>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent rounded-full" />
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent rounded-full" />
            </div>
            <p className="text-xl text-white max-w-3xl mx-auto text-pretty leading-relaxed mb-12">
              مستشار تمويل عقاري معتمد من الهيئة العامة للعقار - نحقق أحلامكم في
              تملك المسكن المثالي
            </p>

            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20" />
        <div className="absolute top-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full mr-3" />
                  معلومات التواصل
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <Card
                      key={index}
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:bg-card group"
                    >
                      <CardContent className="p-6 bg-white">
                        <div
                          className={`inline-flex items-center justify-center w-14 h-14 ${info.bgColor} rounded-2xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                        >
                          <info.icon className={`w-7 h-7 ${info.color}`} />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-3 text-lg">
                          {info.title}
                        </h4>
                        {info.details.map((detail, detailIndex) => (
                          <p
                            key={detailIndex}
                            className="text-sm text-slate-800 leading-relaxed mb-1"
                          >
                            {detail}
                          </p>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-2xl bg-white backdrop-blur-md">
              <CardHeader className="pb-6 bg-white">
                <CardTitle className="text-2xl font-bold text-card-foreground flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  أرسل لنا رسالة
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  سنتواصل معك خلال 24 ساعة
                </p>
              </CardHeader>
              <CardContent className="pt-0 bg-white">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-3">
                      تم إرسال رسالتك بنجاح!
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      سنتواصل معك في أقرب وقت ممكن
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label
                          htmlFor="name"
                          className="text-slate-900 font-semibold"
                        >
                          الاسم الكامل *
                        </Label>
                        <div className="relative group">
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="أدخل اسمك الكامل"
                            className="h-14 border-2 border-border focus:border-primary focus:ring-4 focus:ring-ring bg-white rounded-xl transition-all duration-300 hover:border-primary/50 hover:shadow-md focus:shadow-lg text-foreground placeholder:text-muted-foreground"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="phone"
                          className="text-slate-900 font-semibold"
                        >
                          رقم الهاتف *
                        </Label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center z-10">
                            <div className="w-8 h-6 bg-gradient-to-b from-green-600 to-green-700 rounded-md flex items-center justify-center shadow-sm">
                              <span className="text-xs text-white font-bold">
                                SA
                              </span>
                            </div>
                          </div>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            placeholder="05 123 456 78"
                            className={`h-14 pl-16 pr-12 border-2 rounded-xl transition-all duration-300 hover:shadow-md focus:shadow-lg text-foreground placeholder:text-muted-foreground bg-white ${
                              phoneError
                                ? "border-destructive focus:border-destructive focus:ring-4 focus:ring-destructive/20"
                                : validateSaudiPhone(formData.phone)
                                ? "border-green-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/20"
                                : "border-border focus:border-primary focus:ring-4 focus:ring-ring hover:border-primary/50"
                            }`}
                            required
                          />
                          {formData.phone && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              {validateSaudiPhone(formData.phone) ? (
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                              ) : formData.phone.length >= 8 ? (
                                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                        {phoneError && (
                          <p className="text-sm text-destructive flex items-center mt-2 bg-destructive/10 p-2 rounded-lg">
                            <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                            {phoneError}
                          </p>
                        )}
                        {!phoneError && !validateSaudiPhone(formData.phone) && (
                          <p className="text-sm text-muted-foreground bg-muted p-2 rounded-lg">
                            مثال: 05 123 456 78 (يجب أن يبدأ بـ 05 ويحتوي على 10
                            أرقام)
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="email"
                        className="text-slate-900 font-semibold"
                      >
                        البريد الإلكتروني *
                      </Label>
                      <div className="relative group">
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="example@email.com"
                          className="h-14 border-2 border-border focus:border-primary focus:ring-4 focus:ring-ring bg-white rounded-xl transition-all duration-300 hover:border-primary/50 hover:shadow-md focus:shadow-lg text-foreground placeholder:text-muted-foreground"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="service"
                        className="text-slate-900 font-semibold"
                      >
                        الخدمة المطلوبة
                      </Label>
                      <div className="relative group">
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            handleInputChange("service", value)
                          }
                        >
                          <SelectTrigger className="w-full h-14 border-2 border-border focus:border-primary focus:ring-4 focus:ring-ring bg-white rounded-xl transition-all duration-300 hover:border-primary/50 hover:shadow-md focus:shadow-lg text-foreground data-[placeholder]:text-slate-800">
                            <SelectValue placeholder="اختر الخدمة المطلوبة" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-2 border-border rounded-xl shadow-xl max-h-60">
                            <div className="p-2">
                              {services.map((service, index) => (
                                <SelectItem
                                  key={index}
                                  value={service}
                                  className="hover:bg-primary/10 rounded-lg p-3 cursor-pointer transition-all duration-200 focus:bg-primary/20 text-popover-foreground hover:text-primary"
                                >
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mr-3 opacity-60" />
                                    {service}
                                  </div>
                                </SelectItem>
                              ))}
                            </div>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="message"
                        className="text-slate-900 font-semibold"
                      >
                        الرسالة *
                      </Label>
                      <div className="relative group">
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="اكتب رسالتك هنا..."
                          rows={5}
                          className="border-2 border-border focus:border-primary focus:ring-4 focus:ring-ring bg-white rounded-xl resize-none transition-all duration-300 hover:border-primary/50 hover:shadow-md focus:shadow-lg text-foreground placeholder:text-muted-foreground"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl border-0 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        إرسال الرسالة
                        <Send className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
      <MobileNavigation />
      <WhatsAppFloat />
    </div>
  );
}

export default ContactUsSection;
