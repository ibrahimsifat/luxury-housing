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
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSaudiPhone(formData.phone)) {
      setPhoneError("يرجى إدخال رقم هاتف سعودي صحيح (05xxxxxxxx)");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "contact",
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            service: "",
            message: "",
          });
        }, 5000);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateSaudiPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[\s\-$$$$]/g, "");
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
      details: ["0581111488", "0581111488"],
      color: "text-cyan-600",
      bgColor: "bg-gradient-to-br from-cyan-100 to-cyan-200",
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      details: ["info@luxuryhousing.sa", "support@luxuryhousing.sa"],
      color: "text-pink-600",
      bgColor: "bg-gradient-to-br from-pink-100 to-pink-200",
    },
    {
      icon: MapPin,
      title: "العنوان",
      details: [
        "نوفوتيل بيزنس بارك، شارع الوليد بن سلامة، الخالدية الشمالية، الدمام 32232",
      ],
      color: "text-slate-600",
      bgColor: "bg-gradient-to-br from-slate-100 to-slate-200",
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: ["الأحد - الخميس: 8:00 ص - 6:00 م", "الجمعة - السبت: مغلق"],
      color: "text-indigo-600",
      bgColor: "bg-gradient-to-br from-indigo-100 to-indigo-200",
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
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
    >
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          {/* Simple Badge */}
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full border border-blue-200 mb-6">
            <span className="text-sm font-semibold text-blue-700 px-4 py-2">
              تواصل معنا
            </span>
          </div>

          {/* Simple Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
            نحن هنا لخدمتك
          </h2>

          {/* Simple Divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
          </div>

          {/* Simple Description */}
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-loose">
            تواصل معنا اليوم واحصل على استشارة مجانية لتحقيق حلمك بالتملك
            <br />
            <span className="text-blue-600 font-semibold">
              نحقق أحلامكم في تملك المسكن المثالي
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-8 flex items-center leading-tight">
                <div className="w-2 h-12 bg-blue-500 rounded-full mr-4"></div>
                معلومات التواصل
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
                  >
                    <CardContent className="p-6">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 ${info.bgColor} rounded-xl mb-4`}
                      >
                        <info.icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-3 text-lg">
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
                ))}
              </div>
            </div>
          </div>

          <div>
            <Card className="border shadow-xl bg-white">
              <CardHeader className="pb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 leading-tight">
                      أرسل لنا رسالة
                    </h3>
                    <p className="text-slate-600 mt-1">
                      سنتواصل معك خلال 24 ساعة
                    </p>
                  </div>
                </div>

                {/* Simple Success Indicators */}
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    استجابة سريعة
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    استشارة مجانية
                  </div>
                  <div className="flex items-center text-sm text-purple-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    حلول مخصصة
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      تم إرسال رسالتك بنجاح!
                    </h3>
                    <p className="text-slate-600 mb-6">
                      شكراً لك على تواصلك معنا
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-green-800 font-semibold mb-3">
                        ماذا يحدث الآن؟
                      </p>
                      <ul className="text-green-700 text-sm space-y-2 text-right">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          سيتم مراجعة رسالتك من قبل فريقنا المختص
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          سنتواصل معك خلال 24 ساعة كحد أقصى
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          ستحصل على رد مفصل يناسب استفسارك
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6">
                      <p className="text-slate-500 text-sm">
                        تحتاج مساعدة فورية؟ اتصل بنا على
                        <a
                          href="tel:0581111488"
                          className="text-blue-600 font-semibold mr-1 hover:text-blue-800 transition-colors"
                        >
                          0581111488
                        </a>
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label
                          htmlFor="name"
                          className="text-slate-800 font-semibold"
                        >
                          الاسم الكامل *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="أدخل اسمك الكامل"
                          className="h-12 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="phone"
                          className="text-slate-800 font-semibold"
                        >
                          رقم الهاتف *
                        </Label>
                        <div className="relative">
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            placeholder="05 123 456 78"
                            className={`h-12 border rounded-lg transition-colors ${
                              phoneError
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                : validateSaudiPhone(formData.phone)
                                ? "border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            }`}
                            required
                          />
                          {formData.phone && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              {validateSaudiPhone(formData.phone) ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : formData.phone.length >= 8 ? (
                                <AlertCircle className="w-5 h-5 text-red-600" />
                              ) : null}
                            </div>
                          )}
                        </div>
                        {phoneError && (
                          <p className="text-sm text-red-600 flex items-center mt-2">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {phoneError}
                          </p>
                        )}
                        {!phoneError && !validateSaudiPhone(formData.phone) && (
                          <p className="text-sm text-slate-600">
                            مثال: 05 123 456 78 (يجب أن يبدأ بـ 05 ويحتوي على 10
                            أرقام)
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="email"
                        className="text-slate-800 font-semibold"
                      >
                        البريد الإلكتروني *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="example@email.com"
                        className="h-12 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="service"
                        className="text-slate-800 font-semibold"
                      >
                        الخدمة المطلوبة
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) =>
                          handleInputChange("service", value)
                        }
                      >
                        <SelectTrigger className="w-full h-12 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-colors">
                          <SelectValue placeholder="اختر الخدمة المطلوبة" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-slate-200 rounded-lg shadow-lg max-h-60">
                          {services.map((service, index) => (
                            <SelectItem
                              key={index}
                              value={service}
                              className="hover:bg-blue-50 rounded-lg p-3 cursor-pointer transition-colors focus:bg-blue-100 text-slate-700 hover:text-blue-600"
                            >
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="message"
                        className="text-slate-800 font-semibold"
                      >
                        الرسالة *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="اكتب رسالتك هنا..."
                        rows={4}
                        className="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg resize-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            جاري الإرسال...
                          </>
                        ) : (
                          <>
                            إرسال الرسالة
                            <Send className="w-5 h-5 mr-2" />
                          </>
                        )}
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
  );
}

export default ContactSection;
