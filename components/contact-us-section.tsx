"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { motion, useAnimation, useInView } from "framer-motion";
import {
  AlertCircle,
  Award,
  Building2,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import Footer from "./footer";
import { MobileNavigation } from "./mobile-navigation";
import WhatsAppFloat from "./whatsapp-float";

export function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSaudiPhone(formData.phone)) {
      setPhoneError("يرجى إدخال رقم هاتف سعودي صحيح (05xxxxxxxx)");
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const validateSaudiPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    const saudiMobileRegex = /^05\d{8}$/;
    return saudiMobileRegex.test(cleanPhone);
  };

  const handlePhoneChange = (value: string) => {
    let cleanValue = value.replace(/[^\d\s-]/g, "");
    if (cleanValue.length >= 2 && cleanValue.startsWith("05")) {
      cleanValue = cleanValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{2})/,
        "$1 $2 $3 $4"
      );
    }
    if (cleanValue.length <= 13) {
      setFormData((prev) => ({ ...prev, phone: cleanValue }));
      if (validateSaudiPhone(cleanValue)) {
        setPhoneError("");
      } else if (cleanValue.length >= 8) {
        setPhoneError("يرجى إدخال رقم هاتف سعودي صحيح (05xxxxxxxx)");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "اتصل بنا",
      details: ["0581111488", "013 234 5678"],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      details: ["info@luxuryhousing.sa", "support@luxuryhousing.sa"],
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: MapPin,
      title: "العنوان",
      details: [
        "الدمام، المملكة العربية السعودية",
        "نوفوتيل بيزنس بارك، شارع الوليد بن سلامة، الخالدية الشمالية، الدمام 32232",
      ],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: ["الأحد - الخميس: 8:00 ص - 6:00 م", "الجمعة - السبت: مغلق"],
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const companyStats = [
    {
      icon: Building2,
      number: "500+",
      label: "عقار تم تمويله",
      color: "text-primary",
    },
    {
      icon: Users,
      number: "1000+",
      label: "عميل راضي",
      color: "text-accent",
    },
    {
      icon: Award,
      number: "15+",
      label: "سنة خبرة",
      color: "text-primary",
    },
    {
      icon: Globe,
      number: "25+",
      label: "مدينة نخدمها",
      color: "text-accent",
    },
  ];

  const services = [
    "تقفيل المديونيات",
    "حلول الدفعة المقدمة",
    "حلول الضريبة",
    "أعلى مبلغ تمويلي",
    "دمج الراتب مع الدعم السكني",
    "وحدات جاهزة من السوق",
    "قرض وأرض من السوق",
    "بيت عظم وقرض",
    "البناء الذاتي",
    "وحدة تحت الإنشاء",
    "فك العقار المرهون",
    "رهن العقار الحر",
    "تمويل قطاع الأعمال",
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        ref={ref}
        className="relative py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={controls}
        variants={containerVariants}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />

        {/* Floating Particles - Reduced */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Static Geometric Shapes */}
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-amber-400/20 rounded-lg rotate-45 opacity-30" />
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 md:pt-16">
          <motion.div
            className="text-center text-white"
            variants={itemVariants}
          >
            {/* Premium Badge - Simplified */}
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 backdrop-blur-xl rounded-full border border-amber-400/40 shadow-2xl mb-8">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full" />
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
                <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full" />
              </div>
              <Link
                href="/contact"
                className="text-sm font-bold text-amber-300 px-6 py-3 bg-white/10 rounded-full shadow-lg"
              >
                تواصل معنا
              </Link>
            </div>

            {/* Premium Title - Simplified */}
            <h1 className="text-6xl md:text-7xl font-bold mb-8 text-balance text-white">
              <span className="block">نحن هنا لخدمتك</span>
              <span className="block text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text">
                بأفضل الطرق
              </span>
            </h1>

            {/* Static Divider */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full mx-4" />
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            </div>

            {/* Premium Description */}
            <motion.p
              className="text-xl text-white/90 max-w-4xl mx-auto text-pretty leading-relaxed mb-12"
              variants={itemVariants}
            >
              مستشار تمويل عقاري معتمد من الهيئة العامة للعقار
              <br />
              <span className="text-amber-300 font-semibold">
                نحقق أحلامكم في تملك المسكن المثالي
              </span>
            </motion.p>

            {/* Company Stats - Simplified */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {companyStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl mb-4 shadow-2xl group-hover:shadow-3xl group-hover:bg-white/20 transition-all duration-500">
                    <stat.icon className="w-10 h-10 text-white group-hover:text-amber-300 transition-colors duration-300" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-white/80 text-sm group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Contact Section */}
      <motion.section
        className="py-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-white to-blue-50/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-100/20 to-pink-100/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-100/20 to-blue-100/20" />

        {/* Static Gradient Orbs */}
        <div className="absolute top-20 right-10 w-48 h-48 bg-gradient-to-br from-cyan-200/20 to-pink-200/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-pink-200/20 to-cyan-200/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-blue-200/15 to-purple-200/15 rounded-full blur-2xl opacity-30" />

        {/* Floating Particles - Reduced */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.h2
                  className="text-4xl font-bold text-slate-800 mb-12 flex items-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-2 h-12 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full mr-4"
                    animate={{ scaleY: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.span
                    className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    معلومات التواصل
                  </motion.span>
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/95 backdrop-blur-xl hover:bg-gradient-to-br hover:from-white hover:via-blue-50/30 hover:to-purple-50/20 group overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                        <CardContent className="p-8 relative">
                          <motion.div
                            className={`inline-flex items-center justify-center w-16 h-16 ${info.bgColor} rounded-3xl mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <info.icon
                              className={`w-8 h-8 ${info.color} group-hover:scale-110 transition-transform duration-300`}
                            />
                          </motion.div>
                          <h4 className="font-bold text-slate-900 mb-4 text-xl group-hover:text-blue-600 transition-colors duration-300">
                            {info.title}
                          </h4>
                          {info.details.map((detail, detailIndex) => (
                            <motion.p
                              key={detailIndex}
                              className="text-sm text-slate-700 leading-relaxed mb-2 group-hover:text-slate-800 transition-colors duration-300"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 1 + index * 0.1 + detailIndex * 0.1,
                              }}
                            >
                              {detail}
                            </motion.p>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="border-0 shadow-3xl bg-white/95 backdrop-blur-2xl hover:shadow-4xl transition-all duration-500 group overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <CardHeader className="pb-8 bg-gradient-to-r from-white via-blue-50/30 to-purple-50/20 relative">
                  <motion.div
                    className="flex items-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl group-hover:shadow-2xl transition-all duration-500"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MessageCircle className="w-7 h-7 text-white" />
                      </motion.div>
                    </motion.div>
                    <div>
                      <motion.h3
                        className="text-3xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        أرسل لنا رسالة
                      </motion.h3>
                      <motion.p
                        className="text-slate-600 mt-2 text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                      >
                        سنتواصل معك خلال 24 ساعة
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Animated Success Indicators */}
                  <motion.div
                    className="flex items-center space-x-4 space-x-reverse"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <motion.div
                      className="flex items-center text-sm text-green-600"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full mr-2"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      استجابة سريعة
                    </motion.div>
                    <motion.div
                      className="flex items-center text-sm text-blue-600"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-blue-500 rounded-full mr-2"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                      />
                      استشارة مجانية
                    </motion.div>
                    <motion.div
                      className="flex items-center text-sm text-purple-600"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-purple-500 rounded-full mr-2"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: 1,
                        }}
                      />
                      حلول مخصصة
                    </motion.div>
                  </motion.div>
                </CardHeader>
                <CardContent className="pt-0 bg-white/95 backdrop-blur-xl relative">
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-16"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        className="w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <CheckCircle className="w-12 h-12 text-white" />
                        </motion.div>
                      </motion.div>
                      <motion.h3
                        className="text-3xl font-bold text-slate-800 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        تم إرسال رسالتك بنجاح!
                      </motion.h3>
                      <motion.p
                        className="text-slate-600 text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        سنتواصل معك في أقرب وقت ممكن
                      </motion.p>
                      <motion.div
                        className="flex justify-center mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <motion.div
                          className="flex space-x-2 space-x-reverse"
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.div
                            className="w-3 h-3 bg-green-500 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.7, 1],
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <motion.div
                            className="w-3 h-3 bg-emerald-500 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.7, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: 0.3,
                            }}
                          />
                          <motion.div
                            className="w-3 h-3 bg-teal-500 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.7, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: 0.6,
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-8"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                    >
                      <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                      >
                        <motion.div
                          className="space-y-4"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="flex items-center space-x-2 space-x-reverse"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 1.8 }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.7, 1],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <Label
                              htmlFor="name"
                              className="text-slate-800 font-bold text-lg"
                            >
                              الاسم الكامل *
                            </Label>
                          </motion.div>
                          <motion.div
                            className="relative group"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) =>
                                handleInputChange("name", e.target.value)
                              }
                              placeholder="أدخل اسمك الكامل"
                              className="h-16 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:border-blue-400 hover:shadow-xl focus:shadow-2xl text-slate-800 placeholder:text-slate-500 text-lg font-medium"
                              required
                            />
                            <motion.div
                              className="absolute left-4 top-1/2 transform -translate-y-1/2"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <motion.div
                                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <Users className="w-4 h-4 text-white" />
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                        <motion.div
                          className="space-y-4"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="flex items-center space-x-2 space-x-reverse"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 2 }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.7, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.5,
                              }}
                            />
                            <Label
                              htmlFor="phone"
                              className="text-slate-800 font-bold text-lg"
                            >
                              رقم الهاتف *
                            </Label>
                          </motion.div>
                          <motion.div
                            className="relative group"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center z-10"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <motion.div
                                className="w-10 h-8 bg-gradient-to-b from-green-600 via-emerald-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <span className="text-xs text-white font-bold">
                                  SA
                                </span>
                              </motion.div>
                            </motion.div>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                handlePhoneChange(e.target.value)
                              }
                              placeholder="05 123 456 78"
                              className={`h-16 pl-20 pr-16 border-2 rounded-2xl transition-all duration-500 hover:shadow-xl focus:shadow-2xl text-slate-800 placeholder:text-slate-500 bg-white/80 backdrop-blur-sm text-lg font-medium ${
                                phoneError
                                  ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
                                  : validateSaudiPhone(formData.phone)
                                  ? "border-green-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/20"
                                  : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 hover:border-blue-400"
                              }`}
                              required
                            />
                            {formData.phone && (
                              <motion.div
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                {validateSaudiPhone(formData.phone) ? (
                                  <motion.div
                                    className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                    }}
                                  >
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  </motion.div>
                                ) : formData.phone.length >= 8 ? (
                                  <motion.div
                                    className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shadow-lg"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                    }}
                                  >
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                  </motion.div>
                                ) : null}
                              </motion.div>
                            )}
                          </motion.div>
                          {phoneError && (
                            <motion.p
                              className="text-sm text-red-600 flex items-center mt-3 bg-red-50 p-3 rounded-xl border border-red-200"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                              {phoneError}
                            </motion.p>
                          )}
                          {!phoneError &&
                            !validateSaudiPhone(formData.phone) && (
                              <motion.p
                                className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 2.2 }}
                              >
                                مثال: 05 123 456 78 (يجب أن يبدأ بـ 05 ويحتوي
                                على 10 أرقام)
                              </motion.p>
                            )}
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.4 }}
                      >
                        <motion.div
                          className="flex items-center space-x-2 space-x-reverse"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 2.6 }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.7, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 1,
                            }}
                          />
                          <Label
                            htmlFor="email"
                            className="text-slate-800 font-bold text-lg"
                          >
                            البريد الإلكتروني *
                          </Label>
                        </motion.div>
                        <motion.div
                          className="relative group"
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="example@email.com"
                            className="h-16 border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 bg-white/80 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:border-purple-400 hover:shadow-xl focus:shadow-2xl text-slate-800 placeholder:text-slate-500 text-lg font-medium"
                            required
                          />
                          <motion.div
                            className="absolute left-4 top-1/2 transform -translate-y-1/2"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 1.5,
                            }}
                          >
                            <motion.div
                              className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Mail className="w-4 h-4 text-white" />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.8 }}
                      >
                        <motion.div
                          className="flex items-center space-x-2 space-x-reverse"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 3 }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.7, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 1.5,
                            }}
                          />
                          <Label
                            htmlFor="service"
                            className="text-slate-800 font-bold text-lg"
                          >
                            الخدمة المطلوبة
                          </Label>
                        </motion.div>
                        <motion.div
                          className="relative group"
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Select
                            value={formData.service}
                            onValueChange={(value) =>
                              handleInputChange("service", value)
                            }
                          >
                            <SelectTrigger className="w-full h-16 border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 bg-white/80 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:border-orange-400 hover:shadow-xl focus:shadow-2xl text-slate-800 text-lg font-medium data-[placeholder]:text-slate-500">
                              <SelectValue placeholder="اختر الخدمة المطلوبة" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/95 backdrop-blur-xl border-2 border-slate-200 rounded-2xl shadow-2xl max-h-60">
                              <div className="p-3">
                                {services.map((service, index) => (
                                  <SelectItem
                                    key={index}
                                    value={service}
                                    className="hover:bg-orange-50 rounded-xl p-4 cursor-pointer transition-all duration-300 focus:bg-orange-100 text-slate-700 hover:text-orange-600 font-medium"
                                  >
                                    <div className="flex items-center">
                                      <motion.div
                                        className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-3"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{
                                          duration: 1.5,
                                          repeat: Infinity,
                                          delay: index * 0.1,
                                        }}
                                      />
                                      {service}
                                    </div>
                                  </SelectItem>
                                ))}
                              </div>
                            </SelectContent>
                          </Select>
                          <motion.div
                            className="absolute left-4 top-1/2 transform -translate-y-1/2"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 2,
                            }}
                          >
                            <motion.div
                              className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Target className="w-4 h-4 text-white" />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 3.2 }}
                      >
                        <motion.div
                          className="flex items-center space-x-2 space-x-reverse"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 3.4 }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.7, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 2,
                            }}
                          />
                          <Label
                            htmlFor="message"
                            className="text-slate-800 font-bold text-lg"
                          >
                            الرسالة *
                          </Label>
                        </motion.div>
                        <motion.div
                          className="relative group"
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) =>
                              handleInputChange("message", e.target.value)
                            }
                            placeholder="اكتب رسالتك هنا..."
                            rows={6}
                            className="border-2 border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 bg-white/80 backdrop-blur-sm rounded-2xl resize-none transition-all duration-500 hover:border-cyan-400 hover:shadow-xl focus:shadow-2xl text-slate-800 placeholder:text-slate-500 text-lg font-medium"
                            required
                          />
                          <motion.div
                            className="absolute left-4 top-6 transform"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 2.5,
                            }}
                          >
                            <motion.div
                              className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <MessageCircle className="w-4 h-4 text-white" />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 3.6 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            type="submit"
                            size="lg"
                            className="w-full h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 transform rounded-2xl border-0 relative overflow-hidden group"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                              }}
                            />
                            <span className="relative z-10 flex items-center justify-center text-xl">
                              <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                إرسال الرسالة
                              </motion.span>
                              <motion.div
                                className="mr-3 rtl:mr-0 rtl:ml-3"
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.6 }}
                              >
                                <Send className="w-6 h-6" />
                              </motion.div>
                            </span>
                            <motion.div
                              className="absolute top-2 right-2 flex space-x-1 space-x-reverse"
                              animate={{ x: [0, 5, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 1,
                              }}
                            >
                              <motion.div
                                className="w-2 h-2 bg-white/60 rounded-full"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [1, 0.7, 1],
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-white/60 rounded-full"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [1, 0.7, 1],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: 0.3,
                                }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-white/60 rounded-full"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [1, 0.7, 1],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: 0.6,
                                }}
                              />
                            </motion.div>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      <Footer />
      <MobileNavigation />
      <WhatsAppFloat />
    </div>
  );
}

export default ContactUsSection;
