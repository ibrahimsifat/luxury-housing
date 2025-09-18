"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useInView } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useRef, useState } from "react";

export function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const validateSaudiPhone = (phone: string) => {
    // Remove any spaces or special characters
    const cleanPhone = phone.replace(/\s+/g, "");

    // Check if it starts with 05 and is exactly 10 digits
    const saudiPhoneRegex = /^05\d{8}$/;

    if (!cleanPhone) {
      return "رقم الهاتف مطلوب";
    }

    if (!saudiPhoneRegex.test(cleanPhone)) {
      return "يجب أن يبدأ رقم الهاتف بـ 05 ويكون 10 أرقام";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneValidationError = validateSaudiPhone(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("[v0] Starting email submission process");

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "hero",
        }),
      });

      console.log("[v0] Email API response status:", response.status);

      let responseData;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        // If response is not JSON (like HTML error page), get text
        const responseText = await response.text();
        console.log(
          "[v0] Non-JSON response received:",
          responseText.substring(0, 100)
        );
        responseData = { error: "Server error occurred" };
      }

      if (response.ok) {
        console.log(" Email sent successfully");
        setIsSubmitted(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        }, 5000);
      } else {
        console.log("[v0] Email API error response:", responseData);
        throw new Error(responseData.error || "Failed to send email");
      }
    } catch (error) {
      console.error("[v0] Error sending email:", error);
      alert(
        "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة على 0581111488"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "phone") {
      if (value) {
        const error = validateSaudiPhone(value);
        setPhoneError(error);
      } else {
        setPhoneError("");
      }
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-700"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/luxury-modern-villa-with-glass-windows-and-beautif.jpg"
          alt="Luxury Housing Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/80"></div>

        {/* Animated floating background elements */}
        <motion.div
          className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-br from-amber-500/10 to-orange-100/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] bg-gradient-to-tr from-amber-500/10 to-orange-100/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute top-[20%] left-[60%] w-[15%] h-[15%] bg-gradient-to-bl from-amber-500/15 to-orange-100/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          <motion.div
            className="text-right lg:text-right"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Logo */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Placeholder for logo */}
            </motion.div>

            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance leading-tight">
                <motion.span
                  className="block text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  شركة لوكسري هاوسينغ
                </motion.span>
                <motion.span
                  className="relative inline-block mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <span className="relative z-10 text-amber-400">
                    للحلول العقارية
                  </span>
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      inView
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 w-full h-3 text-amber-400/30"
                    viewBox="0 0 200 8"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M0,5 C50,0 150,0 200,5"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </motion.svg>
                </motion.span>
              </h1>
            </div>

            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl text-right text-pretty leading-relaxed">
                <motion.span
                  className="block text-white font-semibold text-xl md:text-2xl mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  مستشار تمويل عقاري معتمد من الهيئة العامة للعقار
                </motion.span>
                <motion.span
                  className="block text-amber-300 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  نحقق أحلامكم في تملك المسكن المثالي
                </motion.span>
              </p>

              <motion.div
                className="flex flex-wrap gap-2 mt-4 text-right justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                {["استشارة مجانية", "تمويل عقاري", "حلول استثمارية"].map(
                  (badge, index) => (
                    <motion.span
                      key={badge}
                      className="px-3 py-1 bg-amber-600/80 border border-amber-500 rounded-full text-white text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {badge}
                    </motion.span>
                  )
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-2xl md:p-8 p-4 max-w-md mx-auto lg:mx-0 lg:mr-auto shadow-2xl"
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              {isSubmitted ? (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
                    <CheckCircle className="w-8 h-8 text-white animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 animate-slide-up">
                    تم إرسال طلبك بنجاح!
                  </h3>
                  <p
                    className="text-gray-300 mb-4 animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    شكراً لك على طلب الاستشارة المجانية
                  </p>
                  <div
                    className="bg-green-900/30 border border-green-700 rounded-lg p-3 mb-4 animate-slide-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <p className="text-green-300 text-sm">
                      سيتواصل معك مستشار تمويل معتمد خلال 24 ساعة
                    </p>
                  </div>
                  <p
                    className="text-gray-400 text-xs animate-slide-up"
                    style={{ animationDelay: "0.6s" }}
                  >
                    للاستفسارات العاجلة: 0581111488
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      احصل على استشارة مجانية
                    </h3>
                    <p className="text-gray-300 text-sm">
                      تواصل معنا الآن وسنساعدك في تحقيق حلمك
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        name="name"
                        placeholder="الاسم الكامل"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pr-10 bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 rounded-lg h-12 text-right focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="البريد الإلكتروني"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pr-10 bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 rounded-lg h-12 text-right focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="رقم الهاتف (05xxxxxxxx)"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`pr-10 bg-white text-gray-800 placeholder:text-gray-500 rounded-lg h-12 text-right focus:ring-primary focus:border-primary ${
                          phoneError
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300"
                        }`}
                        maxLength={10}
                        required
                      />
                      {phoneError && (
                        <p className="text-red-500 text-xs mt-1 text-right">
                          {phoneError}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <MessageSquare className="absolute right-3 top-4 text-gray-400 h-5 w-5" />
                      <Textarea
                        name="message"
                        placeholder="كيف يمكننا مساعدتك؟"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="pr-10 bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 rounded-lg min-h-[100px] text-right resize-none focus:ring-primary focus:border-primary"
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 text-white py-5 px-8 text-lg font-bold rounded-xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 border-2 border-amber-500/50 group"
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-amber-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2 relative z-10">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          جاري الإرسال...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 relative z-10">
                          إرسال الطلب
                          <ArrowLeft className="h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-gray-400 text-xs">
                      سنتواصل معك خلال 24 ساعة
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="h-5 w-5 text-amber-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
