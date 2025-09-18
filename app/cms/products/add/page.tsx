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
        setError(errorData.error || "Failed to create product");
      }
    } catch (error) {
      setError("An error occurred while creating the product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollAnimation animation="fadeInUp">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/cms/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 font-cairo">
                  Add New Product
                </h1>
                <p className="text-slate-600">
                  Create a new product for your website
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details of the product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter product title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="icon">Icon Name</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) =>
                        handleInputChange("icon", e.target.value)
                      }
                      placeholder="e.g., HiHome, HiLocationMarker"
                    />
                  </div>
                  <div>
                    <Label htmlFor="badge">Badge</Label>
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
                  <Label htmlFor="image">Product Image</Label>
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
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
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
                          Current image:
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
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Enter a brief description"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="detailedDescription">
                    Detailed Description
                  </Label>
                  <Textarea
                    id="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={(e) =>
                      handleInputChange("detailedDescription", e.target.value)
                    }
                    placeholder="Enter detailed description"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="gradient">Gradient</Label>
                  <Input
                    id="gradient"
                    value={formData.gradient}
                    onChange={(e) =>
                      handleInputChange("gradient", e.target.value)
                    }
                    placeholder="from-blue-500/20 via-cyan-500/20 to-blue-600/20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
                <CardDescription>
                  Enter the financial details of the product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="minAmount">Minimum Amount</Label>
                    <Input
                      id="minAmount"
                      value={formData.minAmount}
                      onChange={(e) =>
                        handleInputChange("minAmount", e.target.value)
                      }
                      placeholder="e.g., 100,000 ريال"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxAmount">Maximum Amount</Label>
                    <Input
                      id="maxAmount"
                      value={formData.maxAmount}
                      onChange={(e) =>
                        handleInputChange("maxAmount", e.target.value)
                      }
                      placeholder="e.g., 2,000,000 ريال"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) =>
                        handleInputChange("duration", e.target.value)
                      }
                      placeholder="e.g., حتى 20 سنة"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestRate">Interest Rate</Label>
                    <Input
                      id="interestRate"
                      value={formData.interestRate}
                      onChange={(e) =>
                        handleInputChange("interestRate", e.target.value)
                      }
                      placeholder="e.g., من 4.50%"
                    />
                  </div>
                  <div>
                    <Label htmlFor="processingTime">Processing Time</Label>
                    <Input
                      id="processingTime"
                      value={formData.processingTime}
                      onChange={(e) =>
                        handleInputChange("processingTime", e.target.value)
                      }
                      placeholder="e.g., 5-8 أيام عمل"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>
                  List the key features of this product
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
                        placeholder="Enter feature"
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
                    Add Feature
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
                <CardDescription>
                  List the benefits of this product
                </CardDescription>
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
                        placeholder="Enter benefit"
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
                    Add Benefit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
                <CardDescription>
                  List the requirements for this product
                </CardDescription>
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
                        placeholder="Enter requirement"
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
                    Add Requirement
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility</CardTitle>
                <CardDescription>List the eligibility criteria</CardDescription>
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
                        placeholder="Enter eligibility criteria"
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
                    Add Eligibility
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Process */}
            <Card>
              <CardHeader>
                <CardTitle>Process Steps</CardTitle>
                <CardDescription>
                  List the process steps for this product
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
                        <h4 className="font-medium">Step {step.step}</h4>
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
                        <Label>Title</Label>
                        <Input
                          value={step.title}
                          onChange={(e) =>
                            handleProcessChange(index, "title", e.target.value)
                          }
                          placeholder="Enter step title"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={step.description}
                          onChange={(e) =>
                            handleProcessChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter step description"
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
                    Add Process Step
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
                <CardDescription>
                  Add frequently asked questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.faq.map((faq, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">FAQ {index + 1}</h4>
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
                        <Label>Question</Label>
                        <Input
                          value={faq.question}
                          onChange={(e) =>
                            handleFaqChange(index, "question", e.target.value)
                          }
                          placeholder="Enter question"
                        />
                      </div>
                      <div>
                        <Label>Answer</Label>
                        <Textarea
                          value={faq.answer}
                          onChange={(e) =>
                            handleFaqChange(index, "answer", e.target.value)
                          }
                          placeholder="Enter answer"
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
                    Add FAQ
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
            <div className="flex justify-end space-x-4">
              <Link href="/cms/dashboard">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isLoading || isUploading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isUploading
                  ? "Uploading Image..."
                  : isLoading
                  ? "Creating..."
                  : "Create Product"}
              </Button>
            </div>
          </form>
        </ScrollAnimation>
      </div>
    </div>
  );
}
