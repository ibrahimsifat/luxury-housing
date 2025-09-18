"use client";

import { ServiceInquiryForm } from "@/components/service-inquiry-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Service } from "@/lib/services";
import {
  ArrowLeft,
  Calculator,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  FileText,
  Home,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ServiceDetailsClientProps {
  service: Omit<Service, "icon"> & { iconName: string };
}

const iconMap = {
  CreditCard,
  Home,
  Calculator,
  TrendingUp,
  Users,
};

export function ServiceDetailsClient({ service }: ServiceDetailsClientProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("service-inquiry-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const IconComponent =
    iconMap[service.iconName as keyof typeof iconMap] || CreditCard;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:mt-14 mt-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-300 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              الرئيسية
            </Link>
            <ArrowLeft className="w-4 h-4" />
            <Link
              href="/#services"
              className="hover:text-white transition-colors"
            >
              الخدمات
            </Link>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-white">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Service Icon */}
              <div className="flex items-center justify-start mb-8">
                <div
                  className={`w-24 h-24 ${service.iconBg} rounded-3xl flex items-center justify-center shadow-2xl`}
                >
                  <IconComponent className="w-12 h-12 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance leading-tight">
                {service.title}
              </h1>

              <p className="text-xl text-slate-200 mb-8 leading-relaxed text-pretty">
                {service.detailedDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={scrollToForm}
                  className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 ml-2" />
                  استفسر عن الخدمة
                </Button>

                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm bg-transparent"
                >
                  <Phone className="w-5 h-5 ml-2" />
                  اتصل بنا
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-400" />
                    المميزات الرئيسية
                  </h3>
                  <div className="space-y-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-200 text-lg">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section
        id="service-inquiry-form"
        className="py-20 bg-gradient-to-br from-white to-slate-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              استفسر عن {service.title}
            </h2>
            <p className="text-lg text-slate-600">
              املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
            </p>
          </div>
          <ServiceInquiryForm service={service as Service} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Benefits */}
            <Card className="bg-white shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">الفوائد</h3>
                </div>
                <div className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-600 leading-relaxed">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-white shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    المتطلبات
                  </h3>
                </div>
                <div className="space-y-4">
                  {service.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-600 leading-relaxed">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Process */}
            <Card className="bg-white shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    خطوات العمل
                  </h3>
                </div>
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-slate-600 leading-relaxed pt-1">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 backdrop-blur-sm rounded-full border border-blue-200/30 shadow-lg mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">
                الأسئلة الشائعة
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              أسئلة شائعة حول {service.title}
            </h2>
            <p className="text-lg text-slate-600">
              إجابات على أكثر الأسئلة شيوعاً حول هذه الخدمة
            </p>
          </div>

          <div className="space-y-4">
            {service.faq.map((faq, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg rounded-2xl overflow-hidden"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-right hover:bg-slate-50 transition-colors duration-200 flex items-center justify-between"
                  >
                    <span className="text-lg font-semibold text-slate-800">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <Separator className="mb-4" />
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            هل أنت مستعد للبدء؟
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            تواصل معنا الآن للحصول على استشارة مجانية حول {service.title}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button
                onClick={scrollToForm}
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                استفسر الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
