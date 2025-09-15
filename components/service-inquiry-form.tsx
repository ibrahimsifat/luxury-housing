"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  User,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  Loader2,
  CreditCard,
  Home,
  Calculator,
  TrendingUp,
  Users,
} from "lucide-react"
import type { Service } from "@/lib/services"

const iconMap = {
  CreditCard,
  Home,
  Calculator,
  TrendingUp,
  Users,
}

interface ServiceInquiryFormProps {
  service: Service
  onClose?: () => void
}

export function ServiceInquiryForm({ service, onClose }: ServiceInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "",
    message: "",
    preferredContact: "phone",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          service: service.title,
          formType: "service",
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: "",
            phone: "",
            email: "",
            inquiryType: "",
            message: "",
            preferredContact: "phone",
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || CreditCard

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl">
        <CardContent className="p-8 text-center">
          <div className="animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="w-10 h-10 text-white animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4 animate-slide-up">تم إرسال استفسارك بنجاح!</h3>
            <p className="text-slate-600 mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              شكراً لك على استفسارك حول <span className="font-semibold text-blue-600">{service.title}</span>
            </p>
            <div
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-blue-800 font-medium mb-2">الخطوات التالية:</p>
              <ul className="text-blue-700 text-sm space-y-1 text-right">
                <li>• سيتواصل معك مختص الخدمة خلال 24 ساعة</li>
                <li>• ستحصل على تفاصيل كاملة عن الخدمة</li>
                <li>• سنحدد موعد للاستشارة إذا لزم الأمر</li>
              </ul>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <p className="text-slate-500 text-sm">
                للاستفسارات العاجلة:
                <a href="tel:0581111488" className="text-blue-600 font-semibold mr-1">
                  0581111488
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl">
      <CardHeader className="p-8 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 ${service.iconBg} rounded-2xl flex items-center justify-center`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">استفسار عن الخدمة</CardTitle>
            <Badge variant="secondary" className="mt-2">
              {service.title}
            </Badge>
          </div>
        </div>

        <p className="text-slate-600">املأ النموذج أدناه وسيتواصل معك أحد مختصينا لتقديم المساعدة</p>
      </CardHeader>

      <CardContent className="p-8 pt-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700 font-semibold">
                الاسم الكامل *
              </Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pr-12 rounded-xl border-slate-200 focus:border-blue-500"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700 font-semibold">
                رقم الجوال *
              </Label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pr-12 rounded-xl border-slate-200 focus:border-blue-500"
                  placeholder="05xxxxxxxx"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-semibold">
              البريد الإلكتروني
            </Label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pr-12 rounded-xl border-slate-200 focus:border-blue-500"
                placeholder="example@email.com"
              />
            </div>
          </div>

          {/* Inquiry Type */}
          <div className="space-y-2">
            <Label htmlFor="inquiryType" className="text-slate-700 font-semibold">
              نوع الاستفسار *
            </Label>
            <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
              <SelectTrigger className="rounded-xl border-slate-200 focus:border-blue-500">
                <SelectValue placeholder="اختر نوع الاستفسار" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">استفسار عام</SelectItem>
                <SelectItem value="requirements">المتطلبات والشروط</SelectItem>
                <SelectItem value="pricing">الأسعار والتكاليف</SelectItem>
                <SelectItem value="timeline">المدة الزمنية</SelectItem>
                <SelectItem value="consultation">طلب استشارة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">طريقة التواصل المفضلة</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={formData.preferredContact === "phone"}
                  onChange={(e) => handleInputChange("preferredContact", e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-slate-700">مكالمة هاتفية</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="whatsapp"
                  checked={formData.preferredContact === "whatsapp"}
                  onChange={(e) => handleInputChange("preferredContact", e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-slate-700">واتساب</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === "email"}
                  onChange={(e) => handleInputChange("preferredContact", e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-slate-700">بريد إلكتروني</span>
              </label>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-700 font-semibold">
              تفاصيل الاستفسار *
            </Label>
            <div className="relative">
              <MessageCircle className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="pr-12 rounded-xl border-slate-200 focus:border-blue-500 min-h-[120px] resize-none"
                placeholder="اكتب تفاصيل استفسارك هنا..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري الإرسال...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                إرسال الاستفسار
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
