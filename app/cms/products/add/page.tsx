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

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    category: "residential",
    icon: "",
    image: "",
    features: [""],
    benefits: [""],
    requirements: [""],
    process: [{ step: 1, title: "", description: "" }],
    faq: [{ question: "", answer: "" }],
    minAmount: "",
    maxAmount: "",
    duration: "",
    interestRate: "",
    processingTime: "",
    eligibility: [""],
    badge: "",
    gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const router = useRouter();

  const categories = [
    { value: "residential", label: "Residential" },
    { value: "financial", label: "Financial" },
    { value: "commercial", label: "Commercial" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "products");

    const response = await fetch("/api/cms/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const result = await response.json();
    return result.url;
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

  const addProcessItem = () => {
    setFormData((prev) => ({
      ...prev,
      process: [
        ...prev.process,
        { step: prev.process.length + 1, title: "", description: "" },
      ],
    }));
  };

  const removeProcessItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      process: prev.process
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, step: i + 1 })),
    }));
  };

  const handleProcessChange = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      process: prev.process.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
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
      // Upload image if provided
      let imageUrl = formData.image;
      if (imageFile) {
        setIsUploading(true);
        imageUrl = await uploadImage(imageFile);
        setIsUploading(false);
      }

      // Generate slug from title
      const slug = formData.title.toLowerCase().replace(/\s+/g, "-");

      const productData = {
        ...formData,
        image: imageUrl,
        slug,
        id: `product-${Date.now()}`,
        features: formData.features.filter((f) => f.trim() !== ""),
        benefits: formData.benefits.filter((b) => b.trim() !== ""),
        requirements: formData.requirements.filter((r) => r.trim() !== ""),
        eligibility: formData.eligibility.filter((e) => e.trim() !== ""),
        process: formData.process.filter(
          (p) => p.title.trim() !== "" && p.description.trim() !== ""
        ),
        faq: formData.faq.filter(
          (f) => f.question.trim() !== "" && f.answer.trim() !== ""
        ),
      };

      const response = await fetch("/api/cms/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push("/cms/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "فشل في إنشاء المنتج");
      }
    } catch (error) {
      setError("حدث خطأ أثناء إنشاء المنتج");
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
                  إضافة منتج جديد
                </h1>
                <p className="text-sm sm:text-base text-slate-600">
                  إنشاء منتج جديد لموقعك
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الأساسية</CardTitle>
                <CardDescription>أدخل التفاصيل الأساسية للمنتج</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="title">عنوان المنتج *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="أدخل عنوان المنتج"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">الفئة *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                  <div>
                    <Label htmlFor="badge">الشارة</Label>
                    <Input
                      id="badge"
                      value={formData.badge}
                      onChange={(e) =>
                        handleInputChange("badge", e.target.value)
                      }
                      placeholder="e.g., مرونة في السداد"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <Label htmlFor="image">صورة المنتج</Label>
                  <div className="space-y-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {imagePreview && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">معاينة:</p>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    {formData.image && !imageFile && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          الصورة الحالية:
                        </p>
                        <img
                          src={formData.image}
                          alt="Current"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      </div>
                    )}
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
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card>
              <CardHeader>
                <CardTitle>المعلومات المالية</CardTitle>
                <CardDescription>أدخل التفاصيل المالية للمنتج</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="minAmount">المبلغ الأدنى</Label>
                    <Input
                      id="minAmount"
                      value={formData.minAmount}
                      onChange={(e) =>
                        handleInputChange("minAmount", e.target.value)
                      }
                      placeholder="مثال: 100,000 ريال"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxAmount">المبلغ الأقصى</Label>
                    <Input
                      id="maxAmount"
                      value={formData.maxAmount}
                      onChange={(e) =>
                        handleInputChange("maxAmount", e.target.value)
                      }
                      placeholder="مثال: 2,000,000 ريال"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">المدة</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) =>
                        handleInputChange("duration", e.target.value)
                      }
                      placeholder="مثال: حتى 20 سنة"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestRate">معدل الفائدة</Label>
                    <Input
                      id="interestRate"
                      value={formData.interestRate}
                      onChange={(e) =>
                        handleInputChange("interestRate", e.target.value)
                      }
                      placeholder="مثال: من 4.50%"
                    />
                  </div>
                  <div>
                    <Label htmlFor="processingTime">وقت المعالجة</Label>
                    <Input
                      id="processingTime"
                      value={formData.processingTime}
                      onChange={(e) =>
                        handleInputChange("processingTime", e.target.value)
                      }
                      placeholder="مثال: 5-8 أيام عمل"
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
                  اذكر الميزات الرئيسية لهذا المنتج
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
                <CardDescription>اذكر فوائد هذا المنتج</CardDescription>
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
                <CardDescription>اذكر متطلبات هذا المنتج</CardDescription>
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

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle>الأهلية</CardTitle>
                <CardDescription>اذكر معايير الأهلية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.eligibility.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          handleArrayChange(
                            "eligibility",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="أدخل معايير الأهلية"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("eligibility", index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem("eligibility")}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة أهلية
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Process */}
            <Card>
              <CardHeader>
                <CardTitle>خطوات العملية</CardTitle>
                <CardDescription>
                  اذكر خطوات العملية لهذا المنتج
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.process.map((step, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">خطوة {step.step}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeProcessItem(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <Label>العنوان</Label>
                        <Input
                          value={step.title}
                          onChange={(e) =>
                            handleProcessChange(index, "title", e.target.value)
                          }
                          placeholder="أدخل عنوان الخطوة"
                        />
                      </div>
                      <div>
                        <Label>الوصف</Label>
                        <Textarea
                          value={step.description}
                          onChange={(e) =>
                            handleProcessChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="أدخل وصف الخطوة"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addProcessItem}
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
                disabled={isLoading || isUploading}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isUploading
                  ? "جاري رفع الصورة..."
                  : isLoading
                  ? "جاري الإنشاء..."
                  : "إنشاء المنتج"}
              </Button>
            </div>
          </form>
        </ScrollAnimation>
      </div>
    </div>
  );
}
