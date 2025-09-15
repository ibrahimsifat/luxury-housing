"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Send, User, Calculator, FileText, CheckCircle, Loader2, Phone, MessageCircle, Lightbulb } from "lucide-react"
import type { Product } from "@/lib/products"

interface ProductInquiryFormProps {
  product: Product
  onClose?: () => void
}

export function ProductInquiryForm({ product, onClose }: ProductInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    monthlyIncome: "",
    requestedAmount: "",
    propertyType: "",
    propertyValue: "",
    currentEmployment: "",
    inquiryType: "general",
    message: "",
    preferredContact: "phone",
    agreeToTerms: false,
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
          service: product.title,
          formType: "product",
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: "",
            email: "",
            phone: "",
            city: "",
            monthlyIncome: "",
            requestedAmount: "",
            propertyType: "",
            propertyValue: "",
            currentEmployment: "",
            inquiryType: "general",
            message: "",
            preferredContact: "phone",
            agreeToTerms: false,
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl">
        <CardContent className="p-8 text-center">
          <div className="animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-white animate-bounce" />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4 animate-slide-up">تم إرسال طلبك بنجاح!</h3>
            <p className="text-slate-600 mb-6 text-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
              شكراً لك على اهتمامك بـ <span className="font-semibold text-blue-600">{product.title}</span>
            </p>
            <div
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-blue-800 font-bold mb-3 text-lg">ماذا يحدث الآن؟</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <span className="font-semibold text-blue-800">مراجعة الطلب</span>
                  </div>
                  <p className="text-blue-700 text-sm">سيقوم مستشار التمويل بمراجعة معلوماتك المالية</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <span className="font-semibold text-blue-800">التواصل معك</span>
                  </div>
                  <p className="text-blue-700 text-sm">سنتواصل معك خلال 24 ساعة لمناقشة الخيارات</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <span className="font-semibold text-blue-800">تقديم العروض</span>
                  </div>
                  <p className="text-blue-700 text-sm">ستحصل على أفضل العروض التمويلية المناسبة</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <span className="font-semibold text-blue-800">المتابعة</span>
                  </div>
                  <p className="text-blue-700 text-sm">سنساعدك في إجراءات التقديم حتى الحصول على التمويل</p>
                </div>
              </div>
            </div>
            <div
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="text-yellow-800 font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                نصيحة مهمة
              </p>
              <p className="text-yellow-700 text-sm">
                تأكد من توفر المستندات المطلوبة (الهوية، كشف الراتب، كشف حساب بنكي) لتسريع عملية التقديم
              </p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
              <p className="text-slate-500 text-sm mb-4">تحتاج مساعدة فورية أو لديك استفسار عاجل؟</p>
              <div className="flex justify-center gap-4">
                <a
                  href="tel:0581111488"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  اتصل الآن
                </a>
                <a
                  href="https://wa.me/966581111488"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  واتساب
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 shadow-2xl bg-white rounded-3xl">
      <CardHeader>
        <div className="text-center">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${product.gradient} rounded-2xl shadow-lg mb-4`}
          >
            <product.icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-cairo text-slate-800">استفسار عن {product.title}</CardTitle>
          <p className="text-slate-600 font-cairo mt-2">املأ النموذج أدناه وسنتواصل معك خلال 24 ساعة</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 font-cairo flex items-center">
              <User className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              المعلومات الشخصية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-cairo">
                  الاسم الكامل *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  required
                  className="font-cairo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="font-cairo">
                  رقم الجوال *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="05xxxxxxxx"
                  required
                  className="font-cairo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-cairo">
                  البريد الإلكتروني *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@email.com"
                  required
                  className="font-cairo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="font-cairo">
                  المدينة
                </Label>
                <Select onValueChange={(value) => handleInputChange("city", value)}>
                  <SelectTrigger className="font-cairo">
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riyadh">الرياض</SelectItem>
                    <SelectItem value="jeddah">جدة</SelectItem>
                    <SelectItem value="dammam">الدمام</SelectItem>
                    <SelectItem value="mecca">مكة المكرمة</SelectItem>
                    <SelectItem value="medina">المدينة المنورة</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 font-cairo flex items-center">
              <Calculator className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              المعلومات المالية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome" className="font-cairo">
                  الراتب الشهري *
                </Label>
                <Select onValueChange={(value) => handleInputChange("monthlyIncome", value)}>
                  <SelectTrigger className="font-cairo">
                    <SelectValue placeholder="اختر الراتب الشهري" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000-10000">5,000 - 10,000 ريال</SelectItem>
                    <SelectItem value="10000-15000">10,000 - 15,000 ريال</SelectItem>
                    <SelectItem value="15000-25000">15,000 - 25,000 ريال</SelectItem>
                    <SelectItem value="25000-50000">25,000 - 50,000 ريال</SelectItem>
                    <SelectItem value="50000+">أكثر من 50,000 ريال</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestedAmount" className="font-cairo">
                  المبلغ المطلوب
                </Label>
                <Input
                  id="requestedAmount"
                  value={formData.requestedAmount}
                  onChange={(e) => handleInputChange("requestedAmount", e.target.value)}
                  placeholder="مثال: 500,000 ريال"
                  className="font-cairo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentEmployment" className="font-cairo">
                  جهة العمل *
                </Label>
                <Select onValueChange={(value) => handleInputChange("currentEmployment", value)}>
                  <SelectTrigger className="font-cairo">
                    <SelectValue placeholder="اختر جهة العمل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="government">حكومي</SelectItem>
                    <SelectItem value="private">قطاع خاص</SelectItem>
                    <SelectItem value="military">عسكري</SelectItem>
                    <SelectItem value="retired">متقاعد</SelectItem>
                    <SelectItem value="business">أعمال حرة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {product.category === "residential" && (
                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="font-cairo">
                    نوع العقار
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                    <SelectTrigger className="font-cairo">
                      <SelectValue placeholder="اختر نوع العقار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="villa">فيلا</SelectItem>
                      <SelectItem value="apartment">شقة</SelectItem>
                      <SelectItem value="duplex">دوبلكس</SelectItem>
                      <SelectItem value="building">عمارة</SelectItem>
                      <SelectItem value="land">أرض</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Inquiry Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 font-cairo flex items-center">
              <FileText className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              تفاصيل الاستفسار
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inquiryType" className="font-cairo">
                  نوع الاستفسار
                </Label>
                <Select onValueChange={(value) => handleInputChange("inquiryType", value)}>
                  <SelectTrigger className="font-cairo">
                    <SelectValue placeholder="اختر نوع الاستفسار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">استفسار عام</SelectItem>
                    <SelectItem value="eligibility">التحقق من الأهلية</SelectItem>
                    <SelectItem value="rates">الاستفسار عن الأسعار</SelectItem>
                    <SelectItem value="process">الاستفسار عن الإجراءات</SelectItem>
                    <SelectItem value="appointment">طلب موعد</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredContact" className="font-cairo">
                  طريقة التواصل المفضلة
                </Label>
                <Select onValueChange={(value) => handleInputChange("preferredContact", value)}>
                  <SelectTrigger className="font-cairo">
                    <SelectValue placeholder="اختر طريقة التواصل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">مكالمة هاتفية</SelectItem>
                    <SelectItem value="whatsapp">واتساب</SelectItem>
                    <SelectItem value="email">بريد إلكتروني</SelectItem>
                    <SelectItem value="visit">زيارة المكتب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-cairo">
                رسالة إضافية
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="أضف أي تفاصيل إضافية أو أسئلة محددة..."
                rows={4}
                className="font-cairo"
              />
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm font-cairo text-slate-600">
                أوافق على الشروط والأحكام وسياسة الخصوصية
              </Label>
            </div>

            <Button
              type="submit"
              disabled={!formData.agreeToTerms || isSubmitting}
              className={`w-full py-4 bg-gradient-to-r ${product.gradient} text-white border-0 font-cairo font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
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
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
