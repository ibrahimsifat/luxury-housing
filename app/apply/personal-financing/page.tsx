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
import { motion } from "framer-motion";
import {
  AlertCircle,
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
  birthDate: string;
  workplace: string;
  militaryRank: string;
  workStartDate: string;
  bankName: string;
  totalSalary: string;
  hasViolations: string;
  personalLoans: string;
  personalLoanInstallment: string;
  realEstateLoans: string;
  realEstateLoanInstallment: string;
  supportAmount: string;
  creditCardDebts: string;
  carLoans: string;
  carLoanInstallment: string;
  houseOwnership: string;
  city: string;
}

export default function PersonalFinancingPage() {
  const [formData, setFormData] = useState<PersonalFinancingForm>({
    fullName: "",
    phoneNumber: "",
    nationalId: "",
    birthDate: "",
    workplace: "",
    militaryRank: "",
    workStartDate: "",
    bankName: "",
    totalSalary: "",
    hasViolations: "",
    personalLoans: "",
    personalLoanInstallment: "",
    realEstateLoans: "",
    realEstateLoanInstallment: "",
    supportAmount: "",
    creditCardDebts: "",
    carLoans: "",
    carLoanInstallment: "",
    houseOwnership: "نعم",
    city: "",
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
                    birthDate: "",
                    workplace: "",
                    militaryRank: "",
                    workStartDate: "",
                    bankName: "",
                    totalSalary: "",
                    hasViolations: "",
                    personalLoans: "",
                    personalLoanInstallment: "",
                    realEstateLoans: "",
                    realEstateLoanInstallment: "",
                    supportAmount: "",
                    creditCardDebts: "",
                    carLoans: "",
                    carLoanInstallment: "",
                    houseOwnership: "نعم",
                    city: "",
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
                        <div className="space-y-2">
                          <Label
                            htmlFor="fullName"
                            className="flex items-center gap-2"
                          >
                            <User className="w-4 h-4" />
                            الاسم ثلاثي *
                          </Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                            placeholder="أدخل الاسم ثلاثي"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="phoneNumber"
                            className="flex items-center gap-2"
                          >
                            <Phone className="w-4 h-4" />
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
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="nationalId"
                            className="flex items-center gap-2"
                          >
                            <CreditCard className="w-4 h-4" />
                            رقم الهوية *
                          </Label>
                          <Input
                            id="nationalId"
                            value={formData.nationalId}
                            onChange={(e) =>
                              handleInputChange("nationalId", e.target.value)
                            }
                            placeholder="xxxxxxxxxxxxxxx"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="birthDate"
                            className="flex items-center gap-2"
                          >
                            <Calendar className="w-4 h-4" />
                            تاريخ الميلاد *
                          </Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) =>
                              handleInputChange("birthDate", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Work Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        البيانات الوظيفية
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="workplace"
                            className="flex items-center gap-2"
                          >
                            <Building className="w-4 h-4" />
                            جهة العمل *
                          </Label>
                          <Input
                            id="workplace"
                            value={formData.workplace}
                            onChange={(e) =>
                              handleInputChange("workplace", e.target.value)
                            }
                            placeholder="اسم جهة العمل"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="militaryRank"
                            className="flex items-center gap-2"
                          >
                            <User className="w-4 h-4" />
                            الرتبة العسكرية
                          </Label>
                          <Input
                            id="militaryRank"
                            value={formData.militaryRank}
                            onChange={(e) =>
                              handleInputChange("militaryRank", e.target.value)
                            }
                            placeholder="الرتبة العسكرية (إن وجدت)"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="workStartDate"
                            className="flex items-center gap-2"
                          >
                            <Calendar className="w-4 h-4" />
                            تاريخ بداية العمل *
                          </Label>
                          <Input
                            id="workStartDate"
                            type="date"
                            value={formData.workStartDate}
                            onChange={(e) =>
                              handleInputChange("workStartDate", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="bankName"
                            className="flex items-center gap-2"
                          >
                            <Building className="w-4 h-4" />
                            اسم البنك الذي ينزل عليه الراتب *
                          </Label>
                          <Input
                            id="bankName"
                            value={formData.bankName}
                            onChange={(e) =>
                              handleInputChange("bankName", e.target.value)
                            }
                            placeholder="اسم البنك"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="totalSalary"
                            className="flex items-center gap-2"
                          >
                            <DollarSign className="w-4 h-4" />
                            الراتب الإجمالي بكشف الحساب (بدون بدل غلاء المعيشة)
                            *
                          </Label>
                          <Input
                            id="totalSalary"
                            type="number"
                            value={formData.totalSalary}
                            onChange={(e) =>
                              handleInputChange("totalSalary", e.target.value)
                            }
                            placeholder="الراتب بالريال السعودي"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Financial Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        المعلومات المالية
                      </h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="hasViolations"
                            className="flex items-center gap-2"
                          >
                            <AlertCircle className="w-4 h-4" />
                            هل يوجد لديك تعثرات في سمة أو أحكام قضائية قيد
                            التنفيذ سابقة أو حالية؟ *
                          </Label>
                          <Select
                            value={formData.hasViolations}
                            onValueChange={(value) =>
                              handleInputChange("hasViolations", value)
                            }
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الإجابة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="نعم">نعم</SelectItem>
                              <SelectItem value="ربما">ربما</SelectItem>
                              <SelectItem value="أخرى">أخرى</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="personalLoans">
                              المديونيات (القروض الشخصية)
                            </Label>
                            <Input
                              id="personalLoans"
                              type="number"
                              value={formData.personalLoans}
                              onChange={(e) =>
                                handleInputChange(
                                  "personalLoans",
                                  e.target.value
                                )
                              }
                              placeholder="مبلغ القروض الشخصية"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="personalLoanInstallment">
                              القسط
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
                              placeholder="القسط الشهري"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="realEstateLoans">
                              المديونيات (القروض العقارية)
                            </Label>
                            <Input
                              id="realEstateLoans"
                              type="number"
                              value={formData.realEstateLoans}
                              onChange={(e) =>
                                handleInputChange(
                                  "realEstateLoans",
                                  e.target.value
                                )
                              }
                              placeholder="مبلغ القروض العقارية"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="realEstateLoanInstallment">
                              القسط
                            </Label>
                            <Input
                              id="realEstateLoanInstallment"
                              type="number"
                              value={formData.realEstateLoanInstallment}
                              onChange={(e) =>
                                handleInputChange(
                                  "realEstateLoanInstallment",
                                  e.target.value
                                )
                              }
                              placeholder="القسط الشهري"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="supportAmount">
                              القرض العقاري مدعوم من الصندوق - كم مبلغ الدعم
                              المرتجع لحسابك؟
                            </Label>
                            <Input
                              id="supportAmount"
                              type="number"
                              value={formData.supportAmount}
                              onChange={(e) =>
                                handleInputChange(
                                  "supportAmount",
                                  e.target.value
                                )
                              }
                              placeholder="مبلغ الدعم"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="creditCardDebts">
                              المديونيات (البطاقات الائتمانية)
                            </Label>
                            <Input
                              id="creditCardDebts"
                              type="number"
                              value={formData.creditCardDebts}
                              onChange={(e) =>
                                handleInputChange(
                                  "creditCardDebts",
                                  e.target.value
                                )
                              }
                              placeholder="مبلغ البطاقات الائتمانية"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="carLoans">
                              المديونيات (قروض السيارات)
                            </Label>
                            <Input
                              id="carLoans"
                              type="number"
                              value={formData.carLoans}
                              onChange={(e) =>
                                handleInputChange("carLoans", e.target.value)
                              }
                              placeholder="مبلغ قروض السيارات"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="carLoanInstallment">القسط</Label>
                            <Input
                              id="carLoanInstallment"
                              type="number"
                              value={formData.carLoanInstallment}
                              onChange={(e) =>
                                handleInputChange(
                                  "carLoanInstallment",
                                  e.target.value
                                )
                              }
                              placeholder="القسط الشهري"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        معلومات إضافية
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="houseOwnership"
                            className="flex items-center gap-2"
                          >
                            <Building className="w-4 h-4" />
                            البيت ملك؟ *
                          </Label>
                          <Select
                            value={formData.houseOwnership}
                            onValueChange={(value) =>
                              handleInputChange("houseOwnership", value)
                            }
                            required
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="نعم">نعم</SelectItem>
                              <SelectItem value="لا">لا</SelectItem>
                              <SelectItem value="إيجار">إيجار</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="city"
                            className="flex items-center gap-2"
                          >
                            <Building className="w-4 h-4" />
                            بأي مدينة *
                          </Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            placeholder="المدينة"
                            required
                          />
                        </div>
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
