"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import {
  Award,
  Building2,
  Heart,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: isMobile ? [0, -5, 0] : [0, -20, 0], // Reduced movement on mobile
      rotate: isMobile ? [0, 1, 0] : [0, 5, 0], // Reduced rotation on mobile
      transition: {
        duration: isMobile ? 8 : 6, // Slower on mobile
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-100/60"></div>

      {/* Animated Gradient Orbs - optimized for mobile */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-pink-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
          />
        </>
      )}

      {/* Floating Geometric Shapes - reduced on mobile */}
      {[...Array(isMobile ? 3 : 8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-blue-400/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: isMobile ? "auto" : "transform, opacity",
          }}
          animate={{
            y: [0, isMobile ? -10 : -30, 0], // Reduced movement on mobile
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: isMobile ? 6 + Math.random() * 4 : 4 + Math.random() * 4, // Slower on mobile
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Grid Pattern - disabled on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
            willChange: "background-position",
          }}
        />
      )}

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Enhanced Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          {/* Animated Badge */}
          <motion.div
            className="inline-flex items-center justify-center mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="relative text-sm font-semibold text-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-full border border-blue-200 shadow-lg backdrop-blur-sm"
              animate={{
                boxShadow: [
                  "0 4px 20px rgba(59, 130, 246, 0.1)",
                  "0 8px 30px rgba(59, 130, 246, 0.2)",
                  "0 4px 20px rgba(59, 130, 246, 0.1)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                من نحن
                <Star className="w-4 h-4 text-blue-600" />
              </span>
            </motion.span>
          </motion.div>

          {/* Animated Title */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                className="block bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                شركة لوكسري هاوسينج
              </motion.span>
              <motion.span
                className="block text-xl md:text-2xl font-medium text-slate-600 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                رائدة في الحلول العقارية المتكاملة
              </motion.span>
            </motion.h2>

            {/* Animated Divider - optimized for mobile */}
            <motion.div
              className="flex items-center justify-center gap-3 my-8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.div
                className="w-12 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-blue-600 rounded-full"
                animate={
                  !isMobile
                    ? {
                        scaleX: [0, 1, 0],
                      }
                    : {}
                }
                transition={{
                  duration: isMobile ? 0 : 2,
                  delay: isMobile ? 0 : 1,
                  repeat: isMobile ? 0 : Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={
                  !isMobile
                    ? {
                        scale: [1, 1.5, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.4)",
                          "0 0 0 10px rgba(59, 130, 246, 0)",
                          "0 0 0 0 rgba(59, 130, 246, 0)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: isMobile ? 0 : 2,
                  delay: isMobile ? 0 : 1.2,
                  repeat: isMobile ? 0 : Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="w-12 h-[3px] bg-gradient-to-l from-transparent via-blue-500 to-blue-600 rounded-full"
                animate={
                  !isMobile
                    ? {
                        scaleX: [0, 1, 0],
                      }
                    : {}
                }
                transition={{
                  duration: isMobile ? 0 : 2,
                  delay: isMobile ? 0 : 1.4,
                  repeat: isMobile ? 0 : Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Animated Description */}
            <motion.p
              className="text-xl text-slate-600 max-w-4xl mx-auto text-pretty leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              نحن نؤمن بأن كل عميل يستحق تجربة عقارية استثنائية
              <motion.span
                className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {" "}
                من خلال خبرتنا المتميزة منذ عام 2022
              </motion.span>
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Enhanced Main Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          variants={containerVariants}
        >
          {/* Left Content - Mission & Values */}
          <motion.div variants={itemVariants} className="relative">
            {/* 3D Glass Card */}
            <motion.div
              className="relative group"
              whileHover={{
                scale: 1.02,
                rotateY: 2,
                rotateX: 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-white/40 bg-white/10 hover:bg-white/20 transition-all duration-700"
                whileHover={{
                  boxShadow:
                    "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)",
                }}
              >
                {/* Floating Icons */}
                <motion.div
                  className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
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
                  <Building2 className="w-8 h-8 text-blue-600" />
                </motion.div>

                <div className="space-y-10">
                  {/* Mission Statement with 3D Effect */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <div className="border-r-4 border-gradient-to-b from-blue-500 to-indigo-600 pr-8">
                      <motion.h3
                        className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Target className="w-8 h-8 text-blue-600" />
                        رؤيتنا ورسالتنا
                      </motion.h3>
                      <motion.p
                        className="text-xl text-slate-700 leading-relaxed font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      >
                        شركة لوكسري هاوسينج العقارية، تأسست عام 2022 كشركة ذات
                        مسؤولية محدودة، متخصصة في تقديم الحلول العقارية
                        المتكاملة بأعلى معايير الجودة والاحترافية.
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Animated Key Points */}
                  <motion.div
                    className="space-y-8"
                    variants={containerVariants}
                  >
                    {[
                      {
                        icon: Award,
                        color: "blue",
                        title: "التميز والأفضلية",
                        description:
                          "اكتسبنا مكانة متميزة بين الشركات العقارية كمستشار تمويل عقاري معتمد.",
                        delay: 0.6,
                      },
                      {
                        icon: Users,
                        color: "indigo",
                        title: "شراكات استراتيجية",
                        description:
                          "نتعاون مع أفضل الجهات التمويلية من البنوك والشركات المعتمدة لضمان أفضل الحلول لعملائنا.",
                        delay: 0.8,
                      },
                      {
                        icon: Shield,
                        color: "purple",
                        title: "الثقة والمصداقية",
                        description:
                          "أصبحنا مصدر ثقة لكل الباحثين عن تملك العقارات بفضل خدماتنا المتميزة ونتائجنا المثبتة.",
                        delay: 1.0,
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-6 group"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.delay, duration: 0.8 }}
                        whileHover={{ x: 10 }}
                      >
                        <motion.div
                          className={`w-12 h-12 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                          }}
                        >
                          <item.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <motion.h4
                            className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300"
                            whileHover={{ scale: 1.02 }}
                          >
                            {item.title}:
                          </motion.h4>
                          <p className="text-lg text-slate-700 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Animated CTA Card */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.p
                      className="relative text-xl font-semibold text-slate-800 text-center flex items-center justify-center gap-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Heart className="w-6 h-6 text-red-500" />
                      "نحن هنا لنحول أحلامكم العقارية إلى واقع ملموس"
                      <Zap className="w-6 h-6 text-yellow-500" />
                    </motion.p>
                  </motion.div>
                </div>

                {/* Enhanced Decorative Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 0.8, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Video Content */}
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              className="relative group"
              whileHover={{
                scale: 1.02,
                rotateY: -2,
                rotateX: 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* 3D Video Container */}
              <motion.div
                className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/20 backdrop-blur-xl border border-white/40 p-3"
                whileHover={{
                  boxShadow:
                    "0 30px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3)",
                }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <motion.video
                    className="w-full h-auto object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <source
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luxury-about-qFUeXMFblcRXZdSfQ00GicsrMgCAha.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </motion.video>

                  {/* Enhanced Video Overlay with Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Animated Play Button Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  >
                    <motion.div
                      className="w-24 h-24 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-2xl"
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                      }}
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(255, 255, 255, 0.4)",
                          "0 0 0 20px rgba(255, 255, 255, 0)",
                          "0 0 0 0 rgba(255, 255, 255, 0)",
                        ],
                      }}
                      transition={{
                        boxShadow: {
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeOut",
                        },
                      }}
                    >
                      <motion.div
                        className="w-0 h-0 border-l-[20px] border-l-white border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent ml-1 drop-shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Floating Icons */}
                  <motion.div
                    className="absolute top-4 right-4 w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <TrendingUp className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Video Caption with Animation */}
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.div
                  className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30 shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <motion.div
                    className="w-3 h-3 bg-red-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <p className="text-lg font-semibold text-slate-700">
                    شاهد رحلتنا في تحقيق أحلام العملاء العقارية
                  </p>
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Star className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Enhanced Floating Decorative Elements */}
              <motion.div
                className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl"
                animate={{
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-transparent rounded-full blur-2xl"
                animate={{
                  x: [0, -30, 0],
                  y: [0, 30, 0],
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
