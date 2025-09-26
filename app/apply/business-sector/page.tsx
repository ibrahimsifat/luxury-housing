"use client";

import { ScrollAnimation } from "@/components/scroll-animations";
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
import { motion } from "framer-motion";
import {
  Building,
  Building2,
  Calendar,
  CheckCircle,
  CreditCard,
  DollarSign,
  FileText,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BusinessSectorForm {
  fullName: string;
  phoneNumber: string;
  email: string;
  nationalId: string;
  birthDate: string;
  city: string;
  businessType: string;
  businessName: string;
  businessRegistration: string;
  businessStartDate: string;
  monthlyRevenue: string;
  numberOfEmployees: string;
  businessAddress: string;
  bankName: string;
  existingLoans: string;
  requestedAmount: string;
  loanPurpose: string;
  message: string;
}

export default function BusinessSectorPage() {
  const [formData, setFormData] = useState<BusinessSectorForm>({
    fullName: "",
    phoneNumber: "",
    email: "",
    nationalId: "",
    birthDate: "",
    city: "",
    businessType: "",
    businessName: "",
    businessRegistration: "",
    businessStartDate: "",
    monthlyRevenue: "",
    numberOfEmployees: "",
    businessAddress: "",
    bankName: "",
    existingLoans: "",
    requestedAmount: "",
    loanPurpose: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    field: keyof BusinessSectorForm,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "business-sector",
          formData: formData,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("تم إرسال طلبك بنجاح! سنتواصل معك قريباً");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="text-center p-8">
            <CardContent className="space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  تم إرسال طلبك بنجاح!
                </h2>
                <p className="text-gray-600">
                  شكراً لك على تقديم طلب تمويل قطاع الأعمال. سنراجع طلبك ونتواصل
                  معك خلال 24 ساعة.
                </p>
              </div>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    nationalId: "",
                    birthDate: "",
                    city: "",
                    businessType: "",
                    businessName: "",
                    businessRegistration: "",
                    businessStartDate: "",
                    monthlyRevenue: "",
                    numberOfEmployees: "",
                    businessAddress: "",
                    bankName: "",
                    existingLoans: "",
                    requestedAmount: "",
                    loanPurpose: "",
                    message: "",
                  });
                }}
                className="w-full"
              >
                تقديم طلب جديد
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      dir="rtl"
    >
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-16">
          <ScrollAnimation animation="fadeInUp">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                قطاع الاعمال
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                احصل على التمويل المناسب لمشروعك التجاري أو توسيع أعمالك
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" delay={200}>
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-2xl border-4 border-blue-200 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white border-b-4 border-blue-800">
                  <CardTitle className="text-3xl text-center font-bold">
                    نموذج طلب تمويل قطاع الاعمال
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 bg-gray-50">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-6 p-6 bg-white rounded-lg border-2 border-blue-300 shadow-lg">
                      <h3 className="text-xl font-bold text-blue-800 border-b-2 border-blue-400 pb-3 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        البيانات الشخصية
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label
                            htmlFor="fullName"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <User className="w-4 h-4 text-blue-600" />
                            الاسم ثلاثي *
                          </Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                            placeholder="أدخل الاسم ثلاثي"
                            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="phoneNumber"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Phone className="w-4 h-4 text-blue-600" />
                            رقم الجوال *
                          </Label>
                          <Input
                            id="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                              handleInputChange("phoneNumber", e.target.value)
                            }
                            placeholder="05xxxxxxxx"
                            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="email"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <CreditCard className="w-4 h-4 text-blue-600" />
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
                            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="nationalId"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <CreditCard className="w-4 h-4 text-blue-600" />
                            رقم الهوية *
                          </Label>
                          <Input
                            id="nationalId"
                            value={formData.nationalId}
                            onChange={(e) =>
                              handleInputChange("nationalId", e.target.value)
                            }
                            placeholder="xxxxxxxxxxxxxxx"
                            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="birthDate"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Calendar className="w-4 h-4 text-blue-600" />
                            تاريخ الميلاد *
                          </Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) =>
                              handleInputChange("birthDate", e.target.value)
                            }
                            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="city"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <MapPin className="w-4 h-4 text-blue-600" />
                            المدينة *
                          </Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            placeholder="المدينة"
                            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Business Information */}
                    <div className="space-y-6 p-6 bg-white rounded-lg border-2 border-green-300 shadow-lg">
                      <h3 className="text-xl font-bold text-green-800 border-b-2 border-green-400 pb-3 flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        معلومات النشاط التجاري
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label
                            htmlFor="businessType"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-green-600" />
                            نوع النشاط التجاري *
                          </Label>
                          <Select
                            value={formData.businessType}
                            onValueChange={(value) =>
                              handleInputChange("businessType", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="اختر نوع النشاط" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="تجارة عامة">
                                تجارة عامة
                              </SelectItem>
                              <SelectItem value="تجارة إلكترونية">
                                تجارة إلكترونية
                              </SelectItem>
                              <SelectItem value="صناعة">صناعة</SelectItem>
                              <SelectItem value="خدمات">خدمات</SelectItem>
                              <SelectItem value="مقاولات">مقاولات</SelectItem>
                              <SelectItem value="استيراد وتصدير">
                                استيراد وتصدير
                              </SelectItem>
                              <SelectItem value="أخرى">أخرى</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="businessName"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building2 className="w-4 h-4 text-green-600" />
                            اسم النشاط التجاري *
                          </Label>
                          <Input
                            id="businessName"
                            value={formData.businessName}
                            onChange={(e) =>
                              handleInputChange("businessName", e.target.value)
                            }
                            placeholder="اسم النشاط التجاري"
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="businessRegistration"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <FileText className="w-4 h-4 text-green-600" />
                            رقم السجل التجاري *
                          </Label>
                          <Input
                            id="businessRegistration"
                            value={formData.businessRegistration}
                            onChange={(e) =>
                              handleInputChange(
                                "businessRegistration",
                                e.target.value
                              )
                            }
                            placeholder="رقم السجل التجاري"
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="businessStartDate"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Calendar className="w-4 h-4 text-green-600" />
                            تاريخ بداية النشاط *
                          </Label>
                          <Input
                            id="businessStartDate"
                            type="date"
                            value={formData.businessStartDate}
                            onChange={(e) =>
                              handleInputChange(
                                "businessStartDate",
                                e.target.value
                              )
                            }
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="monthlyRevenue"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <DollarSign className="w-4 h-4 text-green-600" />
                            الإيرادات الشهرية *
                          </Label>
                          <Input
                            id="monthlyRevenue"
                            type="number"
                            value={formData.monthlyRevenue}
                            onChange={(e) =>
                              handleInputChange(
                                "monthlyRevenue",
                                e.target.value
                              )
                            }
                            placeholder="الإيرادات الشهرية بالريال السعودي"
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="numberOfEmployees"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <User className="w-4 h-4 text-green-600" />
                            عدد الموظفين *
                          </Label>
                          <Input
                            id="numberOfEmployees"
                            type="number"
                            value={formData.numberOfEmployees}
                            onChange={(e) =>
                              handleInputChange(
                                "numberOfEmployees",
                                e.target.value
                              )
                            }
                            placeholder="عدد الموظفين"
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3 md:col-span-2">
                          <Label
                            htmlFor="businessAddress"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <MapPin className="w-4 h-4 text-green-600" />
                            عنوان النشاط التجاري *
                          </Label>
                          <Input
                            id="businessAddress"
                            value={formData.businessAddress}
                            onChange={(e) =>
                              handleInputChange(
                                "businessAddress",
                                e.target.value
                              )
                            }
                            placeholder="عنوان النشاط التجاري"
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Financial Information */}
                    <div className="space-y-6 p-6 bg-white rounded-lg border-2 border-purple-300 shadow-lg">
                      <h3 className="text-xl font-bold text-purple-800 border-b-2 border-purple-400 pb-3 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        المعلومات المالية
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label
                            htmlFor="bankName"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-purple-600" />
                            اسم البنك *
                          </Label>
                          <Input
                            id="bankName"
                            value={formData.bankName}
                            onChange={(e) =>
                              handleInputChange("bankName", e.target.value)
                            }
                            placeholder="اسم البنك"
                            className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="requestedAmount"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <DollarSign className="w-4 h-4 text-purple-600" />
                            المبلغ المطلوب *
                          </Label>
                          <Input
                            id="requestedAmount"
                            type="number"
                            value={formData.requestedAmount}
                            onChange={(e) =>
                              handleInputChange(
                                "requestedAmount",
                                e.target.value
                              )
                            }
                            placeholder="المبلغ المطلوب بالريال السعودي"
                            className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="loanPurpose"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <FileText className="w-4 h-4 text-purple-600" />
                            الغرض من التمويل *
                          </Label>
                          <Select
                            value={formData.loanPurpose}
                            onValueChange={(value) =>
                              handleInputChange("loanPurpose", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="اختر الغرض من التمويل" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="رأس مال عامل">
                                رأس مال عامل
                              </SelectItem>
                              <SelectItem value="توسيع النشاط">
                                توسيع النشاط
                              </SelectItem>
                              <SelectItem value="شراء معدات">
                                شراء معدات
                              </SelectItem>
                              <SelectItem value="تطوير البنية التحتية">
                                تطوير البنية التحتية
                              </SelectItem>
                              <SelectItem value="استيراد بضائع">
                                استيراد بضائع
                              </SelectItem>
                              <SelectItem value="أخرى">أخرى</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="existingLoans"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <CreditCard className="w-4 h-4 text-purple-600" />
                            القروض الموجودة
                          </Label>
                          <Input
                            id="existingLoans"
                            value={formData.existingLoans}
                            onChange={(e) =>
                              handleInputChange("existingLoans", e.target.value)
                            }
                            placeholder="وصف القروض الموجودة (إن وجدت)"
                            className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-6 p-6 bg-white rounded-lg border-2 border-orange-300 shadow-lg">
                      <h3 className="text-xl font-bold text-orange-800 border-b-2 border-orange-400 pb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        معلومات إضافية
                      </h3>

                      <div className="space-y-3">
                        <Label
                          htmlFor="message"
                          className="text-sm font-semibold text-gray-700"
                        >
                          ملاحظات إضافية
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="أي معلومات إضافية تريد إضافتها..."
                          rows={4}
                          className="border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-lg px-4 py-3 text-lg font-medium"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-xl font-bold rounded-lg border-2 border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                            جاري الإرسال...
                          </>
                        ) : (
                          <>
                            <Send className="w-6 h-6 mr-3" />
                            إرسال طلب تمويل قطاع الاعمال
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
