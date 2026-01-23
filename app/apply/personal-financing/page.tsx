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
  Calendar,
  CheckCircle,
  CreditCard,
  DollarSign,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PersonalFinancingForm {
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  financingType: string;
  birthDate: string;
  birthDateType: string;
  workplace: string;
  militaryRank: string;
  workStartDate: string;
  workStartDateType: string;
  monthlySalary: string;
  personalLoanInstallment: string;
  personalLoanEarlyPayment: string;
  bankName: string;
  houseOwnership: string;
  city: string;
  creditIssues: string;
  serviceSuspension: string;
  message: string;
}

export default function PersonalFinancingPage() {
  const [formData, setFormData] = useState<PersonalFinancingForm>({
    fullName: "",
    phoneNumber: "",
    nationalId: "",
    financingType: "",
    birthDate: "",
    birthDateType: "",
    workplace: "",
    militaryRank: "",
    workStartDate: "",
    workStartDateType: "",
    monthlySalary: "",
    personalLoanInstallment: "",
    personalLoanEarlyPayment: "",
    bankName: "",
    houseOwnership: "",
    city: "",
    creditIssues: "",
    serviceSuspension: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    field: keyof PersonalFinancingForm,
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
          type: "personal-financing",
          formData: formData,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("تم إرسال طلبك بنجاح! سنتواصل معك قريباً");
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || "فشل إرسال الطلب";
        toast.error(`خطأ: ${errorMessage}`);
        console.error("Server error:", errorData);
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
                  شكراً لك على تقديم طلب التمويل الشخصي. سنراجع طلبك ونتواصل معك
                  خلال 24 ساعة.
                </p>
              </div>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: "",
                    phoneNumber: "",
                    nationalId: "",
                    financingType: "",
                    birthDate: "",
                    birthDateType: "",
                    workplace: "",
                    militaryRank: "",
                    workStartDate: "",
                    workStartDateType: "",
                    monthlySalary: "",
                    personalLoanInstallment: "",
                    personalLoanEarlyPayment: "",
                    bankName: "",
                    houseOwnership: "",
                    city: "",
                    creditIssues: "",
                    serviceSuspension: "",
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
                التمويل الشخصي
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                احصل على التمويل الشخصي الذي تحتاجه بأفضل الشروط والفوائد
                التنافسية
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
                    نموذج طلب التمويل الشخصي
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
                            الاسم الثلاثي *
                          </Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                            placeholder="أدخل الاسم الثلاثي"
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
                            htmlFor="financingType"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-blue-600" />
                            نوع التمويل *
                          </Label>
                          <Select
                            value={formData.financingType}
                            onValueChange={(value) =>
                              handleInputChange("financingType", value)
                            }
                            required
                          >
                            <SelectTrigger className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="Please Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="شخصي أساسي">
                                شخصي أساسي
                              </SelectItem>
                              <SelectItem value="شخصي إضافي">
                                شخصي إضافي
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                            htmlFor="birthDateType"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Calendar className="w-4 h-4 text-blue-600" />
                            هجري أو ميلادي
                          </Label>
                          <Select
                            value={formData.birthDateType}
                            onValueChange={(value) =>
                              handleInputChange("birthDateType", value)
                            }
                          >
                            <SelectTrigger className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="اختر نوع التاريخ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="هجري">هجري</SelectItem>
                              <SelectItem value="ميلادي">ميلادي</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="workplace"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-blue-600" />
                            جهة العمل *
                          </Label>
                          <Select
                            value={formData.workplace}
                            onValueChange={(value) =>
                              handleInputChange("workplace", value)
                            }
                            required
                          >
                            <SelectTrigger className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="Please Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="قطاع خاص">قطاع خاص</SelectItem>
                              <SelectItem value="متقاعد">متقاعد</SelectItem>
                              <SelectItem value="مدني">مدني</SelectItem>
                              <SelectItem value="عسكري">عسكري</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="militaryRank"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-blue-600" />
                            الرتبة العسكرية
                          </Label>
                          <Input
                            id="militaryRank"
                            value={formData.militaryRank}
                            onChange={(e) =>
                              handleInputChange("militaryRank", e.target.value)
                            }
                            placeholder="للموظفين القطاع العسكري"
                            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="workStartDate"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Calendar className="w-4 h-4 text-blue-600" />
                            تاريخ بداية العمل *
                          </Label>
                          <Input
                            id="workStartDate"
                            type="date"
                            value={formData.workStartDate}
                            onChange={(e) =>
                              handleInputChange("workStartDate", e.target.value)
                            }
                            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="workStartDateType"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Calendar className="w-4 h-4 text-blue-600" />
                            هجري أو ميلادي
                          </Label>
                          <Select
                            value={formData.workStartDateType}
                            onValueChange={(value) =>
                              handleInputChange("workStartDateType", value)
                            }
                          >
                            <SelectTrigger className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="اختر نوع التاريخ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="هجري">هجري</SelectItem>
                              <SelectItem value="ميلادي">ميلادي</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Financial Information */}
                    <div className="space-y-6 p-6 bg-white rounded-lg border-2 border-green-300 shadow-lg">
                      <h3 className="text-xl font-bold text-green-800 border-b-2 border-green-400 pb-3 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        المعلومات المالية
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label
                            htmlFor="monthlySalary"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <DollarSign className="w-4 h-4 text-green-600" />
                            كم الراتب الشهري المودع بالحساب؟ *
                          </Label>
                          <Input
                            id="monthlySalary"
                            type="number"
                            value={formData.monthlySalary}
                            onChange={(e) =>
                              handleInputChange("monthlySalary", e.target.value)
                            }
                            placeholder="الراتب الشهري بالريال السعودي"
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="personalLoanInstallment"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <DollarSign className="w-4 h-4 text-green-600" />
                            كم قسط القرض الشخصي؟ *
                          </Label>
                          <Input
                            id="personalLoanInstallment"
                            type="number"
                            value={formData.personalLoanInstallment}
                            onChange={(e) =>
                              handleInputChange(
                                "personalLoanInstallment",
                                e.target.value
                              )
                            }
                            placeholder="قسط القرض الشخصي"
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="personalLoanEarlyPayment"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <DollarSign className="w-4 h-4 text-green-600" />
                            كم مبلغ السداد المبكر للقرض الشخصي؟ *
                          </Label>
                          <Input
                            id="personalLoanEarlyPayment"
                            type="number"
                            value={formData.personalLoanEarlyPayment}
                            onChange={(e) =>
                              handleInputChange(
                                "personalLoanEarlyPayment",
                                e.target.value
                              )
                            }
                            placeholder="مبلغ السداد المبكر"
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="bankName"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-green-600" />
                            اسم البنك الذي ينزل عليه الراتب؟ *
                          </Label>
                          <Select
                            value={formData.bankName}
                            onValueChange={(value) =>
                              handleInputChange("bankName", value)
                            }
                            required
                          >
                            <SelectTrigger className="w-full border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="Please Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="الراجحي">الراجحي</SelectItem>
                              <SelectItem value="الأهلي">الأهلي</SelectItem>
                              <SelectItem value="الانماء">الانماء</SelectItem>
                              <SelectItem value="الرياض">الرياض</SelectItem>
                              <SelectItem value="البلاد">البلاد</SelectItem>
                              <SelectItem value="العربي">العربي</SelectItem>
                              <SelectItem value="الجزيره">الجزيره</SelectItem>
                              <SelectItem value="ساب">ساب</SelectItem>
                              <SelectItem value="الفرنسي">الفرنسي</SelectItem>
                              <SelectItem value="الإستثمار">
                                الإستثمار
                              </SelectItem>
                              <SelectItem value="بنك الإمارات دبي الوطني">
                                بنك الإمارات دبي الوطني
                              </SelectItem>
                              <SelectItem value="بنك الخليج">
                                بنك الخليج
                              </SelectItem>
                              <SelectItem value="بنك ابوظبي">
                                بنك ابوظبي
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-6 p-6 bg-white rounded-lg border-2 border-purple-300 shadow-lg">
                      <h3 className="text-xl font-bold text-purple-800 border-b-2 border-purple-400 pb-3 flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        معلومات إضافية
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label
                            htmlFor="houseOwnership"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-purple-600" />
                            هل البيت ملك؟
                          </Label>
                          <Select
                            value={formData.houseOwnership}
                            onValueChange={(value) =>
                              handleInputChange("houseOwnership", value)
                            }
                          >
                            <SelectTrigger className="w-full border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="Please Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="نعم">نعم</SelectItem>
                              <SelectItem value="لا">لا</SelectItem>
                              <SelectItem value="أخرى">أخرى</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="city"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-purple-600" />
                            بأي مدينة *
                          </Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            placeholder="المدينة"
                            className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="creditIssues"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <CreditCard className="w-4 h-4 text-purple-600" />
                            هل لديك تعثر في سمة؟ *
                          </Label>
                          <Select
                            value={formData.creditIssues}
                            onValueChange={(value) =>
                              handleInputChange("creditIssues", value)
                            }
                            required
                          >
                            <SelectTrigger className="w-full border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="اختر" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="نعم">نعم</SelectItem>
                              <SelectItem value="لا">لا</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="serviceSuspension"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <CreditCard className="w-4 h-4 text-purple-600" />
                            هل لديك إيقاف خدمات؟ *
                          </Label>
                          <Select
                            value={formData.serviceSuspension}
                            onValueChange={(value) =>
                              handleInputChange("serviceSuspension", value)
                            }
                            required
                          >
                            <SelectTrigger className="w-full border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="اختر" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="نعم">نعم</SelectItem>
                              <SelectItem value="لا">لا</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        للأستفسارات والملاحظات
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="message">ملاحظات إضافية</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="أي معلومات إضافية تريد إضافتها..."
                          rows={4}
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
                            إرسال طلب التمويل الشخصي
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
