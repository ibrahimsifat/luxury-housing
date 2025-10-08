"use client";

import { ScrollAnimation } from "@/components/scroll-animations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IconSelector from "@/components/ui/icon-selector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddServicePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    icon: "",
    features: [""],
    benefits: [""],
    requirements: [""],
    process: [""],
    faq: [{ question: "", answer: "" }],
    gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600",
    accentColor: "border-blue-500/30",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item: any, i: number) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index),
    }));
  };

  const addFaqItem = () => {
    setFormData((prev) => ({
      ...prev,
      faq: [...prev.faq, { question: "", answer: "" }],
    }));
  };

  const removeFaqItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faq: prev.faq.filter((_, i) => i !== index),
    }));
  };

  const handleFaqChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      faq: prev.faq.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Generate slug from title
      const slug = formData.title.toLowerCase().replace(/\s+/g, "-");

      const serviceData = {
        ...formData,
        slug,
        id: `service-${Date.now()}`,
        features: formData.features.filter((f) => f.trim() !== ""),
        benefits: formData.benefits.filter((b) => b.trim() !== ""),
        requirements: formData.requirements.filter((r) => r.trim() !== ""),
        process: formData.process.filter((p) => p.trim() !== ""),
        faq: formData.faq.filter(
          (f) => f.question.trim() !== "" && f.answer.trim() !== ""
        ),
      };

      const response = await fetch("/api/cms/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        router.push("/cms/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "فشل في إنشاء الخدمة");
      }
    } catch (error) {
      setError("حدث خطأ أثناء إنشاء الخدمة");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <ScrollAnimation animation="fadeInUp">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/cms/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">العودة للوحة التحكم</span>
                  <span className="sm:hidden">العودة</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-cairo">
                  إضافة خدمة جديدة
                </h1>
                <p className="text-sm sm:text-base text-slate-600">
                  إنشاء خدمة جديدة لموقعك
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الأساسية</CardTitle>
                <CardDescription>أدخل التفاصيل الأساسية للخدمة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="title">عنوان الخدمة *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="أدخل عنوان الخدمة"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="icon">اختر الأيقونة</Label>
                    <IconSelector
                      value={formData.icon}
                      onChange={(iconName) =>
                        handleInputChange("icon", iconName)
                      }
                      placeholder="اختر أيقونة من المكتبة..."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">وصف مختصر *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="أدخل وصف مختصر"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="detailedDescription">الوصف التفصيلي</Label>
                  <Textarea
                    id="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={(e) =>
                      handleInputChange("detailedDescription", e.target.value)
                    }
                    placeholder="أدخل وصف تفصيلي"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="gradient">التدرج اللوني</Label>
                    <Input
                      id="gradient"
                      value={formData.gradient}
                      readOnly
                      disabled
                      className="bg-gray-100 cursor-not-allowed"
                      placeholder="from-blue-500/20 via-cyan-500/20 to-blue-600/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="iconBg">خلفية الأيقونة</Label>
                    <Input
                      id="iconBg"
                      value={formData.iconBg}
                      onChange={(e) =>
                        handleInputChange("iconBg", e.target.value)
                      }
                      placeholder="bg-gradient-to-br from-blue-500 to-cyan-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accentColor">اللون المميز</Label>
                    <Input
                      id="accentColor"
                      value={formData.accentColor}
                      onChange={(e) =>
                        handleInputChange("accentColor", e.target.value)
                      }
                      placeholder="border-blue-500/30"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>الميزات</CardTitle>
                <CardDescription>
                  اذكر الميزات الرئيسية لهذه الخدمة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange("features", index, e.target.value)
                        }
                        placeholder="أدخل ميزة"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("features", index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem("features")}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة ميزة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>الفوائد</CardTitle>
                <CardDescription>اذكر فوائد هذه الخدمة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={benefit}
                        onChange={(e) =>
                          handleArrayChange("benefits", index, e.target.value)
                        }
                        placeholder="أدخل فائدة"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("benefits", index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem("benefits")}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة فائدة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>المتطلبات</CardTitle>
                <CardDescription>اذكر متطلبات هذه الخدمة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={requirement}
                        onChange={(e) =>
                          handleArrayChange(
                            "requirements",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="أدخل متطلب"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("requirements", index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem("requirements")}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة متطلب
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Process */}
            <Card>
              <CardHeader>
                <CardTitle>خطوات العملية</CardTitle>
                <CardDescription>
                  اذكر خطوات العملية لهذه الخدمة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.process.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={step}
                        onChange={(e) =>
                          handleArrayChange("process", index, e.target.value)
                        }
                        placeholder="أدخل خطوة العملية"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("process", index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem("process")}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة خطوة عملية
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>الأسئلة الشائعة</CardTitle>
                <CardDescription>أضف الأسئلة المتكررة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.faq.map((faq, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">سؤال {index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFaqItem(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <Label>السؤال</Label>
                        <Input
                          value={faq.question}
                          onChange={(e) =>
                            handleFaqChange(index, "question", e.target.value)
                          }
                          placeholder="أدخل السؤال"
                        />
                      </div>
                      <div>
                        <Label>الإجابة</Label>
                        <Textarea
                          value={faq.answer}
                          onChange={(e) =>
                            handleFaqChange(index, "answer", e.target.value)
                          }
                          placeholder="أدخل الإجابة"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFaqItem}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة سؤال
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/cms/dashboard" className="w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  إلغاء
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isLoading ? "جاري الإنشاء..." : "إنشاء الخدمة"}
              </Button>
            </div>
          </form>
        </ScrollAnimation>
      </div>
    </div>
  );
}
