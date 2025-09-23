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
import { ArrowLeft, Save, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category:
    | "business-financing"
    | "personal-financing"
    | "real-estate-refinancing"
    | "mortgage"
    | "real-estate-financing";
  icon: string;
  image?: string;
  features: string[];
  badge?: string;
  gradient: string;
  detailedDescription: string;
  benefits: string[];
  requirements: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  minAmount?: string;
  maxAmount?: string;
  duration?: string;
  interestRate?: string;
  processingTime?: string;
  eligibility: string[];
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    category: "real-estate-financing" as
      | "business-financing"
      | "personal-financing"
      | "real-estate-refinancing"
      | "mortgage"
      | "real-estate-financing",
    image: "",
    icon: "",
    badge: "",
    description: "",
    detailedDescription: "",
    features: [""],
    benefits: [""],
    requirements: [""],
    eligibility: [""],
    process: [{ step: 1, title: "", description: "" }],
    faq: [{ question: "", answer: "" }],
    minAmount: "",
    maxAmount: "",
    duration: "",
    interestRate: "",
    processingTime: "",
    gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
  });

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    try {
      const response = await fetch(`/api/cms/products/${productId}`);
      if (response.ok) {
        const productData = await response.json();
        setProduct(productData);
        setFormData({
          title: productData.title || "",
          category: productData.category || "real-estate-financing",
          image: productData.image || "",
          icon: productData.icon || "",
          badge: productData.badge || "",
          description: productData.description || "",
          detailedDescription: productData.detailedDescription || "",
          features: productData.features || [""],
          benefits: productData.benefits || [""],
          requirements: productData.requirements || [""],
          eligibility: productData.eligibility || [""],
          process: productData.process || [
            { step: 1, title: "", description: "" },
          ],
          faq: productData.faq || [{ question: "", answer: "" }],
          minAmount: productData.minAmount || "",
          maxAmount: productData.maxAmount || "",
          duration: productData.duration || "",
          interestRate: productData.interestRate || "",
          processingTime: productData.processingTime || "",
          gradient:
            productData.gradient ||
            "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
        });
      } else {
        setError("المنتج غير موجود");
      }
    } catch (error) {
      console.error("Error loading product:", error);
      setError("فشل في تحميل المنتج");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
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
      throw new Error("فشل في رفع الصورة");
    }

    const result = await response.json();
    return result.url;
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: any, i: number) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], ""],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter(
        (_: any, i: number) => i !== index
      ),
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
    setIsSaving(true);
    setError("");

    try {
      // Upload image if provided
      let imageUrl = formData.image;
      if (imageFile) {
        setIsUploading(true);
        imageUrl = await uploadImage(imageFile);
        setIsUploading(false);
      }

      const response = await fetch(`/api/cms/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          slug: formData.title
            .toLowerCase()
            .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
            .replace(/^-+|-+$/g, ""),
        }),
      });

      if (response.ok) {
        router.push("/cms/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "فشل في تحديث المنتج");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("فشل في تحديث المنتج");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">جاري تحميل المنتج...</p>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => router.push("/cms/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            العودة للوحة التحكم
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <ScrollAnimation animation="fadeInUp">
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => router.push("/cms/dashboard")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة للوحة التحكم
            </Button>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              تعديل المنتج
            </h1>
            <p className="text-slate-600">تحديث معلومات وتفاصيل المنتج</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                تفاصيل المنتج
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">العنوان *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="عنوان المنتج"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">الفئة *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business-financing">
                          تمويل قطاع الاعمال
                        </SelectItem>
                        <SelectItem value="personal-financing">
                          التمويل الشخصي
                        </SelectItem>
                        <SelectItem value="real-estate-refinancing">
                          إعادة التمويل العقاري
                        </SelectItem>
                        <SelectItem value="mortgage">الرهن العقاري</SelectItem>
                        <SelectItem value="real-estate-financing">
                          التمويل العقاري
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="icon">الأيقونة</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) =>
                        handleInputChange("icon", e.target.value)
                      }
                      placeholder="اسم الأيقونة (مثل: HiHome, HiLocationMarker)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="badge">الشارة</Label>
                    <Input
                      id="badge"
                      value={formData.badge}
                      onChange={(e) =>
                        handleInputChange("badge", e.target.value)
                      }
                      placeholder="شارة المنتج (اختياري)"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
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
                        <p className="text-sm text-gray-600 mb-2">
                          معاينة الصورة الجديدة:
                        </p>
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

                <div className="space-y-2">
                  <Label htmlFor="description">الوصف *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="وصف مختصر للمنتج"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailedDescription">الوصف التفصيلي</Label>
                  <Textarea
                    id="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={(e) =>
                      handleInputChange("detailedDescription", e.target.value)
                    }
                    placeholder="وصف تفصيلي للمنتج"
                    rows={4}
                  />
                </div>

                {/* Financial Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minAmount">الحد الأدنى للمبلغ</Label>
                    <Input
                      id="minAmount"
                      value={formData.minAmount}
                      onChange={(e) =>
                        handleInputChange("minAmount", e.target.value)
                      }
                      placeholder="100,000 ريال"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxAmount">الحد الأقصى للمبلغ</Label>
                    <Input
                      id="maxAmount"
                      value={formData.maxAmount}
                      onChange={(e) =>
                        handleInputChange("maxAmount", e.target.value)
                      }
                      placeholder="2,000,000 ريال"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">المدة</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) =>
                        handleInputChange("duration", e.target.value)
                      }
                      placeholder="25 سنة"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestRate">معدل الفائدة</Label>
                    <Input
                      id="interestRate"
                      value={formData.interestRate}
                      onChange={(e) =>
                        handleInputChange("interestRate", e.target.value)
                      }
                      placeholder="3.5%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="processingTime">وقت المعالجة</Label>
                    <Input
                      id="processingTime"
                      value={formData.processingTime}
                      onChange={(e) =>
                        handleInputChange("processingTime", e.target.value)
                      }
                      placeholder="5-7 أيام عمل"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gradient">التدرج اللوني</Label>
                    <Input
                      id="gradient"
                      value={formData.gradient}
                      onChange={(e) =>
                        handleInputChange("gradient", e.target.value)
                      }
                      placeholder="from-blue-500/20 via-cyan-500/20 to-blue-600/20"
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <Label>المميزات</Label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange("features", index, e.target.value)
                        }
                        placeholder="وصف الميزة"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("features", index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem("features")}
                    className="w-full"
                  >
                    إضافة ميزة
                  </Button>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <Label>الفوائد</Label>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={benefit}
                        onChange={(e) =>
                          handleArrayChange("benefits", index, e.target.value)
                        }
                        placeholder="وصف الفائدة"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("benefits", index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem("benefits")}
                    className="w-full"
                  >
                    إضافة فائدة
                  </Button>
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <Label>المتطلبات</Label>
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={requirement}
                        onChange={(e) =>
                          handleArrayChange(
                            "requirements",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="وصف المتطلب"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("requirements", index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem("requirements")}
                    className="w-full"
                  >
                    إضافة متطلب
                  </Button>
                </div>

                {/* Eligibility */}
                <div className="space-y-2">
                  <Label>الأهلية</Label>
                  {formData.eligibility.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          handleArrayChange(
                            "eligibility",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="متطلب الأهلية"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("eligibility", index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem("eligibility")}
                    className="w-full"
                  >
                    إضافة عنصر أهلية
                  </Button>
                </div>

                {/* Process */}
                <div className="space-y-2">
                  <Label>خطوات العملية</Label>
                  {formData.process.map((step, index) => (
                    <div
                      key={index}
                      className="space-y-2 p-4 border rounded-md"
                    >
                      <div className="flex gap-2">
                        <Input
                          value={step.title}
                          onChange={(e) =>
                            handleProcessChange(index, "title", e.target.value)
                          }
                          placeholder="عنوان الخطوة"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeProcessItem(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <Textarea
                        value={step.description}
                        onChange={(e) =>
                          handleProcessChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="وصف الخطوة"
                        rows={2}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addProcessItem}
                    className="w-full"
                  >
                    إضافة خطوة عملية
                  </Button>
                </div>

                {/* FAQ */}
                <div className="space-y-2">
                  <Label>الأسئلة الشائعة</Label>
                  {formData.faq.map((item, index) => (
                    <div
                      key={index}
                      className="space-y-2 p-4 border rounded-md"
                    >
                      <div className="flex gap-2">
                        <Input
                          value={item.question}
                          onChange={(e) =>
                            handleFaqChange(index, "question", e.target.value)
                          }
                          placeholder="السؤال"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFaqItem(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <Textarea
                        value={item.answer}
                        onChange={(e) =>
                          handleFaqChange(index, "answer", e.target.value)
                        }
                        placeholder="الإجابة"
                        rows={2}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFaqItem}
                    className="w-full"
                  >
                    إضافة سؤال شائع
                  </Button>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isSaving || isUploading}
                    className="flex-1"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        جاري رفع الصورة...
                      </>
                    ) : isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        جاري التحديث...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        تحديث المنتج
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/cms/dashboard")}
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </div>
  );
}
