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
  CheckCircle,
  CreditCard,
  DollarSign,
  FileText,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BusinessSectorForm {
  businessName: string;
  phoneNumber: string;
  mainBranchCity: string;
  activityCategory: string;
  accountMovement: string;
  auditedBudgets: string;
  bankName1: string;
  bankName2: string;
  budgetMovement: string;
  posMovement: string;
  realEstateAssets: string;
  zakatCertificate: string;
  taxCertificate: string;
  taxDeclarations: string;
  insuranceCertificate: string;
  localizationCertificate: string;
  municipalityLicense: string;
  electronicLeaseContract: string;
  serviceType: string;
  creditIssues: string;
  serviceSuspension: string;
  message: string;
}

export default function BusinessSectorPage() {
  const [formData, setFormData] = useState<BusinessSectorForm>({
    businessName: "",
    phoneNumber: "",
    mainBranchCity: "",
    activityCategory: "",
    accountMovement: "",
    auditedBudgets: "",
    bankName1: "",
    bankName2: "",
    budgetMovement: "",
    posMovement: "",
    realEstateAssets: "",
    zakatCertificate: "",
    taxCertificate: "",
    taxDeclarations: "",
    insuranceCertificate: "",
    localizationCertificate: "",
    municipalityLicense: "",
    electronicLeaseContract: "",
    serviceType: "",
    creditIssues: "",
    serviceSuspension: "",
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
                    businessName: "",
                    phoneNumber: "",
                    mainBranchCity: "",
                    activityCategory: "",
                    accountMovement: "",
                    auditedBudgets: "",
                    bankName1: "",
                    bankName2: "",
                    budgetMovement: "",
                    posMovement: "",
                    realEstateAssets: "",
                    zakatCertificate: "",
                    taxCertificate: "",
                    taxDeclarations: "",
                    insuranceCertificate: "",
                    localizationCertificate: "",
                    municipalityLicense: "",
                    electronicLeaseContract: "",
                    serviceType: "",
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
                    {/* Business Information */}
                    <div className="space-y-6 p-6 bg-white rounded-lg border-2 border-blue-300 shadow-lg">
                      <h3 className="text-xl font-bold text-blue-800 border-b-2 border-blue-400 pb-3 flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        معلومات النشاط التجاري
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label
                            htmlFor="businessName"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building2 className="w-4 h-4 text-blue-600" />
                            الاسم التجاري *
                          </Label>
                          <Input
                            id="businessName"
                            value={formData.businessName}
                            onChange={(e) =>
                              handleInputChange("businessName", e.target.value)
                            }
                            placeholder="الاسم التجاري"
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
                            htmlFor="mainBranchCity"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <MapPin className="w-4 h-4 text-blue-600" />
                            الفرع الرئيسي بأي مدينة؟ *
                          </Label>
                          <Input
                            id="mainBranchCity"
                            value={formData.mainBranchCity}
                            onChange={(e) =>
                              handleInputChange(
                                "mainBranchCity",
                                e.target.value
                              )
                            }
                            placeholder="المدينة"
                            className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="activityCategory"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-blue-600" />
                            فئة النشاط؟ *
                          </Label>
                          <Select
                            value={formData.activityCategory}
                            onValueChange={(value) =>
                              handleInputChange("activityCategory", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="شركة">شركة</SelectItem>
                              <SelectItem value="مؤسسة">مؤسسة</SelectItem>
                              <SelectItem value="مصنع">مصنع</SelectItem>
                              <SelectItem value="أخرى">أخرى</SelectItem>
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
                            htmlFor="accountMovement"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <DollarSign className="w-4 h-4 text-green-600" />
                            كم إجمالي حركة كشوف الحسابات لأخر سنة ميلادية؟ *
                          </Label>
                          <Input
                            id="accountMovement"
                            type="number"
                            value={formData.accountMovement}
                            onChange={(e) =>
                              handleInputChange(
                                "accountMovement",
                                e.target.value
                              )
                            }
                            placeholder="إجمالي حركة كشوف الحسابات"
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="auditedBudgets"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <FileText className="w-4 h-4 text-green-600" />
                            هل يوجد ميزانيات مدققة معتمدة لأخر ثلاث سنوات؟ *
                          </Label>
                          <Select
                            value={formData.auditedBudgets}
                            onValueChange={(value) =>
                              handleInputChange("auditedBudgets", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium">
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
                            htmlFor="bankName1"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-green-600" />
                            اسم البنوك التي يتم التعامل معها؟ *
                          </Label>
                          <Select
                            value={formData.bankName1}
                            onValueChange={(value) =>
                              handleInputChange("bankName1", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium">
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
                              <SelectItem value="البنك الاول">
                                البنك الاول
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="bankName2"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-green-600" />
                            اسم البنوك التي يتم التعامل معها؟
                          </Label>
                          <Select
                            value={formData.bankName2}
                            onValueChange={(value) =>
                              handleInputChange("bankName2", value)
                            }
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium">
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
                              <SelectItem value="البنك الاول">
                                البنك الاول
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="budgetMovement"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <DollarSign className="w-4 h-4 text-green-600" />
                            كم حركة الميزانيات اخر سنة؟ *
                          </Label>
                          <Input
                            id="budgetMovement"
                            type="number"
                            value={formData.budgetMovement}
                            onChange={(e) =>
                              handleInputChange(
                                "budgetMovement",
                                e.target.value
                              )
                            }
                            placeholder="حركة الميزانيات"
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="posMovement"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <CreditCard className="w-4 h-4 text-green-600" />
                            كم حركة نقاط البيع آخر (12) شهر؟ *
                          </Label>
                          <Input
                            id="posMovement"
                            type="number"
                            value={formData.posMovement}
                            onChange={(e) =>
                              handleInputChange("posMovement", e.target.value)
                            }
                            placeholder="حركة نقاط البيع"
                            className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="realEstateAssets"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building2 className="w-4 h-4 text-green-600" />
                            هل توجد أصول عقارية؟ *
                          </Label>
                          <Select
                            value={formData.realEstateAssets}
                            onValueChange={(value) =>
                              handleInputChange("realEstateAssets", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-3 text-lg font-medium">
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

                    {/* Documents Section */}
                    <div className="space-y-6 p-6 bg-white rounded-lg border-2 border-purple-300 shadow-lg">
                      <h3 className="text-xl font-bold text-purple-800 border-b-2 border-purple-400 pb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        هل تتوفر المستندات التالية؟
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label
                            htmlFor="zakatCertificate"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <FileText className="w-4 h-4 text-purple-600" />
                            شهادة الزكاة *
                          </Label>
                          <Select
                            value={formData.zakatCertificate}
                            onValueChange={(value) =>
                              handleInputChange("zakatCertificate", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium">
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
                            htmlFor="taxCertificate"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <FileText className="w-4 h-4 text-purple-600" />
                            شهادة الضريبة *
                          </Label>
                          <Select
                            value={formData.taxCertificate}
                            onValueChange={(value) =>
                              handleInputChange("taxCertificate", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium">
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
                            htmlFor="taxDeclarations"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <FileText className="w-4 h-4 text-purple-600" />
                            شهادة إقرارات ضريبية *
                          </Label>
                          <Select
                            value={formData.taxDeclarations}
                            onValueChange={(value) =>
                              handleInputChange("taxDeclarations", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium">
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
                            htmlFor="insuranceCertificate"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <FileText className="w-4 h-4 text-purple-600" />
                            شهادة التأمينات *
                          </Label>
                          <Select
                            value={formData.insuranceCertificate}
                            onValueChange={(value) =>
                              handleInputChange("insuranceCertificate", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium">
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
                            htmlFor="localizationCertificate"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <FileText className="w-4 h-4 text-purple-600" />
                            شهادة توطين *
                          </Label>
                          <Select
                            value={formData.localizationCertificate}
                            onValueChange={(value) =>
                              handleInputChange(
                                "localizationCertificate",
                                value
                              )
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium">
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
                            htmlFor="municipalityLicense"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <FileText className="w-4 h-4 text-purple-600" />
                            رخصة البلدية *
                          </Label>
                          <Select
                            value={formData.municipalityLicense}
                            onValueChange={(value) =>
                              handleInputChange("municipalityLicense", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium">
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
                            htmlFor="electronicLeaseContract"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <FileText className="w-4 h-4 text-purple-600" />
                            عقد إيجار إلكتروني *
                          </Label>
                          <Select
                            value={formData.electronicLeaseContract}
                            onValueChange={(value) =>
                              handleInputChange(
                                "electronicLeaseContract",
                                value
                              )
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 text-lg font-medium">
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

                    {/* Service Information */}
                    <div className="space-y-6 p-6 bg-white rounded-lg border-2 border-orange-300 shadow-lg">
                      <h3 className="text-xl font-bold text-orange-800 border-b-2 border-orange-400 pb-3 flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        معلومات الخدمة
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label
                            htmlFor="serviceType"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <Building className="w-4 h-4 text-orange-600" />
                            الخدمة المطلوبة: *
                          </Label>
                          <Select
                            value={formData.serviceType}
                            onValueChange={(value) =>
                              handleInputChange("serviceType", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-lg px-4 py-3 text-lg font-medium">
                              <SelectValue placeholder="Please Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="تمويل عقاري لشراء عقار تجاري أو سكني">
                                تمويل عقاري لشراء عقار تجاري أو سكني
                              </SelectItem>
                              <SelectItem value="رهن عقاري للحصول على سيولة">
                                رهن عقاري للحصول على سيولة
                              </SelectItem>
                              <SelectItem value="رهن عقاري بضمان عقود إيجار من منصة إيجار">
                                رهن عقاري بضمان عقود إيجار من منصة إيجار
                              </SelectItem>
                              <SelectItem value="تمويل سيولة بضمان نقاط البيع">
                                تمويل سيولة بضمان نقاط البيع
                              </SelectItem>
                              <SelectItem value="تمويل أسطول سيارات">
                                تمويل أسطول سيارات
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="creditIssues"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <CreditCard className="w-4 h-4 text-orange-600" />
                            هل لديك تعثر في سمة؟ *
                          </Label>
                          <Select
                            value={formData.creditIssues}
                            onValueChange={(value) =>
                              handleInputChange("creditIssues", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-lg px-4 py-3 text-lg font-medium">
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
                            <CreditCard className="w-4 h-4 text-orange-600" />
                            هل لديك إيقاف خدمات؟ *
                          </Label>
                          <Select
                            value={formData.serviceSuspension}
                            onValueChange={(value) =>
                              handleInputChange("serviceSuspension", value)
                            }
                            required
                          >
                            <SelectTrigger className="border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-lg px-4 py-3 text-lg font-medium">
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
                        للأستفسار والملاحظات
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
