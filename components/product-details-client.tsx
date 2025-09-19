"use client";

import { ProductInquiryForm } from "@/components/product-inquiry-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/lib/types";
import {
  Award,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  MessageCircle,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("product-inquiry-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Product Inquiry Form Section */}
      <section
        id="product-inquiry-form"
        className="py-20 bg-gradient-to-br from-white to-slate-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              استفسر عن {product.title}
            </h2>
            <p className="text-lg text-slate-600">
              املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
            </p>
          </div>
          <ProductInquiryForm product={product} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-md shadow-lg border-0 h-14 mb-8">
                  <TabsTrigger
                    value="overview"
                    className="font-cairo data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                  >
                    نظرة عامة
                  </TabsTrigger>
                  <TabsTrigger
                    value="benefits"
                    className="font-cairo data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                  >
                    المزايا
                  </TabsTrigger>
                  <TabsTrigger
                    value="process"
                    className="font-cairo data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                  >
                    الإجراءات
                  </TabsTrigger>
                  <TabsTrigger
                    value="faq"
                    className="font-cairo data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                  >
                    الأسئلة الشائعة
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle className="text-2xl font-cairo text-slate-800">
                        تفاصيل المنتج
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-slate-600 leading-relaxed font-cairo text-lg">
                        {product.detailedDescription}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-slate-800 font-cairo">
                            المتطلبات الأساسية
                          </h4>
                          <div className="space-y-2">
                            {product.requirements
                              .slice(0, 4)
                              .map((requirement, index) => (
                                <div key={index} className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0 mt-0.5" />
                                  <span className="text-slate-600 font-cairo">
                                    {requirement}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-slate-800 font-cairo">
                            شروط الأهلية
                          </h4>
                          <div className="space-y-2">
                            {product.eligibility.map((criteria, index) => (
                              <div key={index} className="flex items-start">
                                <Shield className="w-5 h-5 text-blue-500 mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-600 font-cairo">
                                  {criteria}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="benefits" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.benefits.map((benefit, index) => (
                      <Card
                        key={index}
                        className="border-0 shadow-lg bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <Award className="w-6 h-6 text-green-500 mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0 mt-1" />
                            <span className="text-slate-700 font-cairo leading-relaxed">
                              {benefit}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="process" className="space-y-6">
                  <div className="space-y-6">
                    {product.process.map((step, index) => (
                      <Card
                        key={index}
                        className="border-0 shadow-lg bg-white/80 backdrop-blur-md"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div
                              className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${product.gradient} rounded-full text-white font-bold mr-4 rtl:mr-0 rtl:ml-4 flex-shrink-0`}
                            >
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-800 font-cairo mb-2">
                                {step.title}
                              </h4>
                              <p className="text-slate-600 font-cairo leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="faq" className="space-y-4">
                  {product.faq.map((faq, index) => (
                    <Card
                      key={index}
                      className="border-0 shadow-lg bg-white/80 backdrop-blur-md"
                    >
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full p-6 text-right rtl:text-right flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                        >
                          <span className="font-semibold text-slate-800 font-cairo">
                            {faq.question}
                          </span>
                          {expandedFaq === index ? (
                            <ChevronUp className="w-5 h-5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-500" />
                          )}
                        </button>
                        {expandedFaq === index && (
                          <div className="px-6 pb-6">
                            <p className="text-slate-600 font-cairo leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-xl font-cairo text-slate-800">
                    تواصل معنا
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={scrollToForm}
                    className={`w-full py-4 bg-gradient-to-r ${product.gradient} text-white border-0 font-cairo font-semibold hover:shadow-lg transition-all duration-300`}
                  >
                    <MessageCircle className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    استفسار عن المنتج
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-cairo bg-transparent"
                      >
                        <Mail className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        إيميل
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Product Features */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-xl font-cairo text-slate-800">
                    مميزات المنتج
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0" />
                      <span className="text-slate-700 font-cairo">
                        {feature}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
