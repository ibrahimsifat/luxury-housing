"use client";

import { ScrollAnimation } from "@/components/scroll-animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Service {
  id: string;
  slug: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  iconBg: string;
  accentColor: string;
  detailedDescription: string;
  benefits: string[];
  requirements: string[];
  process: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    if (serviceId) {
      loadService();
    }
  }, [serviceId]);

  const loadService = async () => {
    try {
      const response = await fetch(`/api/cms/services/${serviceId}`);
      if (response.ok) {
        const serviceData = await response.json();
        setService(serviceData);
        setFormData({
          title: serviceData.title || "",
          description: serviceData.description || "",
          detailedDescription: serviceData.detailedDescription || "",
          icon: serviceData.icon || "",
          features: serviceData.features || [""],
          benefits: serviceData.benefits || [""],
          requirements: serviceData.requirements || [""],
          process: serviceData.process || [""],
          faq: serviceData.faq || [{ question: "", answer: "" }],
          gradient:
            serviceData.gradient ||
            "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
          iconBg:
            serviceData.iconBg || "bg-gradient-to-br from-blue-500 to-cyan-600",
          accentColor: serviceData.accentColor || "border-blue-500/30",
        });
      } else {
        setError("Service not found");
      }
    } catch (error) {
      console.error("Error loading service:", error);
      setError("Failed to load service");
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
      const response = await fetch(`/api/cms/services/${serviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
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
        setError(errorData.error || "Failed to update service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      setError("Failed to update service");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading service...</p>
        </div>
      </div>
    );
  }

  if (error && !service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => router.push("/cms/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
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
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Edit Service
            </h1>
            <p className="text-slate-600">
              Update service information and details
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                Service Details
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
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Service title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) =>
                        handleInputChange("icon", e.target.value)
                      }
                      placeholder="Icon name (e.g., CreditCard, Home)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Brief service description"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailedDescription">
                    Detailed Description
                  </Label>
                  <Textarea
                    id="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={(e) =>
                      handleInputChange("detailedDescription", e.target.value)
                    }
                    placeholder="Detailed service description"
                    rows={4}
                  />
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <Label>Features</Label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange("features", index, e.target.value)
                        }
                        placeholder="Feature description"
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
                    Add Feature
                  </Button>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <Label>Benefits</Label>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={benefit}
                        onChange={(e) =>
                          handleArrayChange("benefits", index, e.target.value)
                        }
                        placeholder="Benefit description"
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
                    Add Benefit
                  </Button>
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <Label>Requirements</Label>
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
                        placeholder="Requirement description"
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
                    Add Requirement
                  </Button>
                </div>

                {/* Process */}
                <div className="space-y-2">
                  <Label>Process Steps</Label>
                  {formData.process.map((step, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={step}
                        onChange={(e) =>
                          handleArrayChange("process", index, e.target.value)
                        }
                        placeholder="Process step description"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("process", index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem("process")}
                    className="w-full"
                  >
                    Add Process Step
                  </Button>
                </div>

                {/* FAQ */}
                <div className="space-y-2">
                  <Label>FAQ</Label>
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
                          placeholder="Question"
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
                        placeholder="Answer"
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
                    Add FAQ Item
                  </Button>
                </div>

                {/* Styling Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
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

                  <div className="space-y-2">
                    <Label htmlFor="iconBg">Icon Background</Label>
                    <Input
                      id="iconBg"
                      value={formData.iconBg}
                      onChange={(e) =>
                        handleInputChange("iconBg", e.target.value)
                      }
                      placeholder="bg-gradient-to-br from-blue-500 to-cyan-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
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

                <div className="flex gap-4 pt-6">
                  <Button type="submit" disabled={isSaving} className="flex-1">
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Update Service
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/cms/dashboard")}
                  >
                    Cancel
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
