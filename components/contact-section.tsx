"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phoneError, setPhoneError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSaudiPhone(formData.phone)) {
      setPhoneError("يرجى إدخال رقم هاتف سعودي صحيح (05xxxxxxxx)")
      return
    }

    setIsSubmitting(true)

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
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: "",
            email: "",
            phone: "",
            service: "",
            message: "",
          })
        }, 5000)
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateSaudiPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[\s\-$$$$]/g, "")
    const saudiMobileRegex = /^05\d{8}$/
    return saudiMobileRegex.test(cleanPhone)
  }

  const handlePhoneChange = (value: string) => {
    let cleanValue = value.replace(/[^\d\s-]/g, "")
    if (cleanValue.length >= 2 && cleanValue.startsWith("05")) {
      cleanValue = cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, "$1 $2 $3 $4")
    }
    if (cleanValue.length <= 13) {
      setFormData((prev) => ({ ...prev, phone: cleanValue }))
      if (validateSaudiPhone(cleanValue)) {
        setPhoneError("")
      } else if (cleanValue.length >= 8) {
        setPhoneError("يرجى إدخال رقم هاتف سعودي صحيح (05xxxxxxxx)")
      } else {
        setPhoneError("")
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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
      details: ["نوفوتيل بيزنس بارك، شارع الوليد بن سلامة، الخالدية الشمالية، الدمام 32232"],
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
  ]

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
  ]

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.05),transparent_50%)] opacity-60" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.02)_50%,transparent_75%)]" />

      <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-200/15 to-indigo-200/15 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/15 to-rose-200/15 rounded-full blur-2xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-cyan-200/10 to-blue-200/10 rounded-full blur-xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm rounded-full border border-blue-200/30 shadow-lg mb-8">
            <span className="text-sm font-semibold text-blue-700 px-6 py-2 bg-white/50 rounded-full">تواصل معنا</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent mb-6 text-balance">
            نحن هنا لخدمتك
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-500 rounded-full" />
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            تواصل معنا اليوم واحصل على استشارة مجانية لتحقيق حلمك بالتملك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3" />
                معلومات التواصل
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:bg-white group"
                  >
                    <CardContent className="p-6">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 ${info.bgColor} rounded-2xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        <info.icon className={`w-7 h-7 ${info.color}`} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-3 text-lg">{info.title}</h4>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm text-slate-800 leading-relaxed mb-1">
                          {detail}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-2xl bg-white">
            <CardHeader className="pb-6 bg-white">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                أرسل لنا رسالة
              </CardTitle>
              <p className="text-slate-600 mt-2">سنتواصل معك خلال 24 ساعة</p>
            </CardHeader>
            <CardContent className="pt-0 bg-white">
              {isSubmitted ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-scale-in">
                    <CheckCircle className="w-12 h-12 text-white animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 animate-slide-up">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-slate-600 text-lg mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    شكراً لك على تواصلك معنا
                  </p>
                  <div
                    className="bg-green-50 border border-green-200 rounded-lg p-4 animate-slide-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <p className="text-green-800 font-medium mb-2">ماذا يحدث الآن؟</p>
                    <ul className="text-green-700 text-sm space-y-1 text-right">
                      <li>• سيتم مراجعة رسالتك من قبل فريقنا المختص</li>
                      <li>• سنتواصل معك خلال 24 ساعة كحد أقصى</li>
                      <li>• ستحصل على رد مفصل يناسب استفسارك</li>
                    </ul>
                  </div>
                  <div className="mt-6 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                    <p className="text-slate-500 text-sm">
                      تحتاج مساعدة فورية؟ اتصل بنا على
                      <a href="tel:0581111488" className="text-blue-600 font-semibold mr-1">
                        0581111488
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-slate-900 font-semibold">
                        الاسم الكامل *
                      </Label>
                      <div className="relative group">
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="أدخل اسمك الكامل"
                          className="h-14 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white rounded-xl transition-all duration-300 hover:border-slate-300 hover:shadow-md focus:shadow-lg text-slate-800 placeholder:text-slate-400"
                          required
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-slate-900 font-semibold">
                        رقم الهاتف *
                      </Label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center z-10">
                          <div className="w-8 h-6 bg-gradient-to-b from-green-600 to-green-700 rounded-md flex items-center justify-center shadow-sm">
                            <span className="text-xs text-white font-bold">SA</span>
                          </div>
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="05 123 456 78"
                          className={`h-14 pl-16 pr-12 border-2 rounded-xl transition-all duration-300 hover:shadow-md focus:shadow-lg text-slate-800 placeholder:text-slate-400 bg-white ${
                            phoneError
                              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                              : validateSaudiPhone(formData.phone)
                                ? "border-green-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                                : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300"
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
                        <div
                          className={`absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none ${
                            phoneError
                              ? "from-red-500/5 to-red-600/5"
                              : validateSaudiPhone(formData.phone)
                                ? "from-green-500/5 to-green-600/5"
                                : "from-blue-500/5 to-indigo-500/5"
                          }`}
                        />
                      </div>
                      {phoneError && (
                        <p className="text-sm text-red-600 flex items-center mt-2 bg-red-50 p-2 rounded-lg">
                          <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                          {phoneError}
                        </p>
                      )}
                      {!phoneError && !validateSaudiPhone(formData.phone) && (
                        <p className="text-sm text-slate-500 bg-slate-50 p-2 rounded-lg">
                          مثال: 05 123 456 78 (يجب أن يبدأ بـ 05 ويحتوي على 10 أرقام)
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-slate-900 font-semibold">
                      البريد الإلكتروني *
                    </Label>
                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="example@email.com"
                        className="h-14 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white rounded-xl transition-all duration-300 hover:border-slate-300 hover:shadow-md focus:shadow-lg text-slate-800 placeholder:text-slate-400"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="service" className="text-slate-900 font-semibold">
                      الخدمة المطلوبة
                    </Label>
                    <div className="relative group">
                      <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger className="w-full h-14 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white rounded-xl transition-all duration-300 hover:border-slate-300 hover:shadow-md focus:shadow-lg text-slate-800 data-[placeholder]:text-slate-800">
                          <SelectValue placeholder="اختر الخدمة المطلوبة" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-slate-200 rounded-xl shadow-xl max-h-60">
                          <div className="p-2">
                            {services.map((service, index) => (
                              <SelectItem
                                key={index}
                                value={service}
                                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg p-3 cursor-pointer transition-all duration-200 focus:bg-gradient-to-r focus:from-blue-100 focus:to-indigo-100 text-slate-700 hover:text-slate-900"
                              >
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3 opacity-60" />
                                  {service}
                                </div>
                              </SelectItem>
                            ))}
                          </div>
                        </SelectContent>
                      </Select>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-slate-900 font-semibold">
                      الرسالة *
                    </Label>
                    <div className="relative group">
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="اكتب رسالتك هنا..."
                        rows={5}
                        className="border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white rounded-xl resize-none transition-all duration-300 hover:border-slate-300 hover:shadow-md focus:shadow-lg text-slate-800 placeholder:text-slate-400"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl border-0 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center text-white">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 animate-spin" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          إرسال الرسالة
                          <Send className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
