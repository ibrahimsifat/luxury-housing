"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  CheckCircle,
  Home,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  Star,
  TrendingUp,
  User,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";

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
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const fullText = "شركة لوكسري هاوسينغ";
  const subText = "مستشار تمويل عقاري معتمد من الهيئة العامة للعقار";

  // Dynamic background images
  const backgroundImages = [
    "/luxury-modern-villa-with-glass-windows-and-beautif.jpg",
    "/modern-luxury-villa-in-saudi-arabia-with-beautiful.jpg",
    "/modern-luxury-real-estate-office-in-saudi-arabia.jpg",
    "/modern-office-building-in-saudi-arabia-representin.jpg",
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Typing animation effect
  useEffect(() => {
    if (inView && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, inView, fullText]);

  // Reset typing animation when component mounts
  useEffect(() => {
    if (inView) {
      setCurrentIndex(0);
      setDisplayedText("");
    }
  }, [inView]);

  // Background cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

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
      role="banner"
      aria-label="الصفحة الرئيسية - الإسكان الفاخر"
    >
      <div className="absolute inset-0 z-0">
        {/* Dynamic background images */}
        {backgroundImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentBgIndex ? 0.8 : 0,
              scale: index === currentBgIndex ? 1 : 1.1,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <Image
              src={image}
              alt={`Luxury Housing Background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-slate-900/70"></div>

        {/* Background indicator */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          {backgroundImages.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentBgIndex
                  ? "bg-amber-400 scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              onClick={() => setCurrentBgIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Enhanced animated floating background elements */}
        <motion.div
          className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-br from-amber-500/10 to-orange-100/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.9, 0.7],
            rotate: [0, 180, 360],
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
            rotate: [0, -180, -360],
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
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Additional floating elements */}
        <motion.div
          className="absolute top-[10%] left-[20%] w-[8%] h-[8%] bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <motion.div
          className="absolute bottom-[20%] right-[15%] w-[6%] h-[6%] bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-lg"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating icons */}
        <motion.div
          className="absolute top-[15%] right-[25%] text-amber-400/30"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Home className="w-8 h-8" />
        </motion.div>

        <motion.div
          className="absolute bottom-[25%] left-[30%] text-blue-400/30"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <TrendingUp className="w-6 h-6" />
        </motion.div>

        <motion.div
          className="absolute top-[40%] right-[10%] text-purple-400/30"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Star className="w-5 h-5" />
        </motion.div>
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
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance leading-tight"
                itemProp="name"
              >
                <motion.div
                  className="block text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.span
                    className="inline-block"
                    animate={
                      inView
                        ? {
                            backgroundPosition: [
                              "0% 50%",
                              "100% 50%",
                              "0% 50%",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    style={{
                      background:
                        "linear-gradient(90deg, #ffffff, #fbbf24, #ffffff)",
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {displayedText}
                    <motion.span
                      className="inline-block w-1 h-12 bg-amber-400 ml-1"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.span>
                </motion.div>

                <motion.div
                  className="relative inline-block mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.span
                    className="relative z-10 text-amber-400"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    للحلول العقارية
                  </motion.span>

                  {/* Enhanced underline animation */}
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      inView
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={{ duration: 1.5, delay: 1.2 }}
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
                      transition={{ duration: 1.5, delay: 1.2 }}
                    />
                  </motion.svg>

                  {/* Sparkle effects */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </motion.div>
                </motion.div>
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
                  whileHover={{
                    scale: 1.02,
                    textShadow: "0 0 20px rgba(251, 191, 36, 0.5)",
                  }}
                >
                  مستشار تمويل عقاري معتمد من الهيئة العامة للعقار
                </motion.span>
                <motion.span
                  className="block text-amber-300 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{
                    scale: 1.02,
                    color: "#fbbf24",
                  }}
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
                      className="px-3 py-1 bg-amber-600/80 border border-amber-500 rounded-full text-white text-sm font-medium relative overflow-hidden"
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={
                        inView ? { opacity: 1, scale: 1, rotate: 0 } : {}
                      }
                      transition={{
                        duration: 0.4,
                        delay: 0.9 + index * 0.15,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 2,
                        boxShadow: "0 10px 25px rgba(251, 191, 36, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">{badge}</span>
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
              className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl md:p-8 p-4 max-w-md mx-auto lg:mx-0 lg:mr-auto shadow-2xl relative overflow-hidden"
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              initial={{ rotateY: -15, opacity: 0 }}
              animate={inView ? { rotateY: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(251, 191, 36, 0.05), rgba(59, 130, 246, 0.05))",
                    "linear-gradient(225deg, rgba(59, 130, 246, 0.05), rgba(251, 191, 36, 0.05))",
                    "linear-gradient(45deg, rgba(251, 191, 36, 0.05), rgba(59, 130, 246, 0.05))",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Floating particles inside form */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${20 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 1.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
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
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <motion.div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <User className="h-5 w-5" />
                      </motion.div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="الاسم الكامل"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pr-10 bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 rounded-lg h-12 text-right focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 hover:border-amber-400"
                        required
                      />
                    </motion.div>

                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <motion.div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                      >
                        <Mail className="h-5 w-5" />
                      </motion.div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="البريد الإلكتروني"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pr-10 bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 rounded-lg h-12 text-right focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 hover:border-amber-400"
                        required
                      />
                    </motion.div>

                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.0 }}
                    >
                      <motion.div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                      >
                        <Phone className="h-5 w-5" />
                      </motion.div>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="رقم الهاتف (05xxxxxxxx)"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`pr-10 bg-white text-gray-800 placeholder:text-gray-500 rounded-lg h-12 text-right focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 hover:border-amber-400 ${
                          phoneError
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300"
                        }`}
                        maxLength={10}
                        required
                      />
                      {phoneError && (
                        <motion.p
                          className="text-red-500 text-xs mt-1 text-right"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {phoneError}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    >
                      <motion.div
                        className="absolute right-3 top-4 text-gray-400 h-5 w-5"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, -10, 0],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 1.5,
                        }}
                      >
                        <MessageSquare className="h-5 w-5" />
                      </motion.div>
                      <Textarea
                        name="message"
                        placeholder="كيف يمكننا مساعدتك؟"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="pr-10 bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 rounded-lg min-h-[100px] text-right resize-none focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 hover:border-amber-400"
                        rows={3}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 text-white py-5 px-8 text-lg font-bold rounded-xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 border-2 border-amber-500/50 group"
                      >
                        {/* Enhanced shimmer effect */}
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 1.2 }}
                        />

                        {/* Pulsing background */}
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20"
                          animate={{
                            opacity: [0, 0.3, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />

                        {isSubmitting ? (
                          <motion.div
                            className="flex items-center justify-center gap-2 relative z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                            >
                              <Loader2 className="w-5 h-5" />
                            </motion.div>
                            <motion.span
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            >
                              جاري الإرسال...
                            </motion.span>
                          </motion.div>
                        ) : (
                          <motion.div
                            className="flex items-center justify-center gap-2 relative z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              إرسال الطلب
                            </motion.span>
                            <motion.div
                              whileHover={{ x: 5, rotate: 5 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ArrowLeft className="h-5 w-5 rotate-180" />
                            </motion.div>
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>
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
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="h-5 w-5 text-amber-400" />
          </motion.div>

          {/* Animated dots */}
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-amber-400 rounded-full"
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <motion.p
            className="text-xs text-amber-400/80 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            اكتشف المزيد
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
