"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Building,
  Building2,
  Eye,
  Heart,
  Home,
  Menu,
  RefreshCw,
  Target,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";

export { Header };
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const aboutUsItems = [
    {
      name: "نظرة عامة",
      href: "/about#overview",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      name: "الرسالة",
      href: "/about#mission",
      icon: <Target className="w-4 h-4" />,
    },
    {
      name: "الرؤية",
      href: "/about#vision",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      name: "الأهداف",
      href: "/about#goals",
      icon: <Award className="w-4 h-4" />,
    },
    {
      name: "القيم",
      href: "/about#values",
      icon: <Heart className="w-4 h-4" />,
    },
    {
      name: "فريق العمل",
      href: "/about#team",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  const productsItems = [
    {
      name: "جميع المنتجات",
      href: "/products",
      icon: <Award className="w-4 h-4" />,
    },
    {
      name: "تمويل قطاع الاعمال",
      href: "/products?category=business-financing",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      name: "التمويل الشخصي",
      href: "/products?category=personal-financing",
      icon: <User className="w-4 h-4" />,
    },
    {
      name: "إعادة التمويل العقاري",
      href: "/products?category=real-estate-refinancing",
      icon: <RefreshCw className="w-4 h-4" />,
    },
    {
      name: "الرهن العقاري",
      href: "/products?category=mortgage",
      icon: <Home className="w-4 h-4" />,
    },
    {
      name: "التمويل العقاري",
      href: "/products?category=real-estate-financing",
      icon: <Building className="w-4 h-4" />,
    },
  ];

  const navItems = [
    { name: "الخدمات", href: "/services" },
    { name: "تقدم بطلبك الان", href: "/contact" },
    { name: "معرض الصور", href: "/gallery" },
    { name: "شركاء النجاح", href: "/#clients" },
    { name: "جديدنا", href: "/news" },
    { name: "الأسئلة الشائعة", href: "/faq" },
    { name: "تواصل معنا", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/20 shadow-2xl shadow-slate-900/10"
            : "bg-transparent backdrop-blur-none border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          {/* Top Contact Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`hidden lg:flex justify-between items-center py-3 text-sm border-b transition-all duration-500 ${
              isScrolled
                ? "text-slate-600 border-slate-200/30"
                : "text-white/90 border-white/10"
            }`}
          >
            <div className="flex items-center gap-8">
              <motion.div
                className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                {/* @ts-ignore - React Icons type issue */}
                <FiPhone className="w-4 h-4" />
                <span className="font-medium">0581111488</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                {/* @ts-ignore - React Icons type issue */}
                <FiMail className="w-4 h-4" />
                <span className="font-medium">info@luxuryhousing.sa</span>
              </motion.div>
            </div>
            <motion.div
              className={`font-semibold text-sm transition-all duration-500 ${
                isScrolled ? "text-blue-600" : "text-white/90 drop-shadow-lg"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              مستشار تمويل عقاري معتمد من الهيئة العامة للعقار
            </motion.div>
          </motion.div>

          {/* Main Navigation */}
          <div className="flex justify-between items-center py-4 lg:py-6">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/">
                <Image
                  src="/images/luxury-housing-logo.png"
                  alt="لوكسري هاوسينغ"
                  width={220}
                  height={75}
                  className={`h-12 lg:h-16 w-auto transition-all duration-500 hover:scale-105 cursor-pointer ${
                    isScrolled ? "brightness-100" : "brightness-0 invert"
                  }`}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4">
              {/* Home Link */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/"
                  className={`font-semibold text-sm transition-all duration-300 hover:scale-105 relative group px-2 py-2 rounded-lg whitespace-nowrap ${
                    isScrolled
                      ? "text-slate-800 hover:text-blue-600 hover:bg-blue-50"
                      : "text-white hover:text-blue-200 hover:bg-white/10 drop-shadow-lg"
                  }`}
                >
                  الرئيسية
                  <motion.span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? "bg-blue-600" : "bg-blue-200"
                    }`}
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>

              {/* About Us Dropdown - Right after Home */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + 0.05 }}
              >
                <DropdownMenu
                  title="من نحن"
                  items={aboutUsItems}
                  isScrolled={isScrolled}
                />
              </motion.div>

              {/* Products Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + 0.1 }}
              >
                <DropdownMenu
                  title="المنتجات"
                  items={productsItems}
                  isScrolled={isScrolled}
                />
              </motion.div>

              {/* Other Navigation Items */}
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + (index + 3) * 0.05,
                  }}
                >
                  <Link
                    href={item.href}
                    className={`font-semibold text-sm transition-all duration-300 hover:scale-105 relative group px-2 py-2 rounded-lg whitespace-nowrap ${
                      isScrolled
                        ? "text-slate-800 hover:text-blue-600 hover:bg-blue-50"
                        : "text-white hover:text-blue-200 hover:bg-white/10 drop-shadow-lg"
                    }`}
                  >
                    {item.name}
                    <motion.span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        isScrolled ? "bg-blue-600" : "bg-blue-200"
                      }`}
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div
              className="hidden lg:flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/contact">
                <motion.div
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 font-semibold px-6 py-3 shadow-lg text-white rounded-xl ${
                      isScrolled
                        ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-blue-500/25"
                        : "bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-blue-600 hover:to-purple-700 shadow-blue-500/40 backdrop-blur-sm border border-white/20"
                    }`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">استشارة مجانية</span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg transition-all duration-300"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X
                      className={`w-6 h-6 ${
                        isScrolled ? "text-slate-800" : "text-white"
                      }`}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu
                      className={`w-6 h-6 ${
                        isScrolled ? "text-slate-800" : "text-white"
                      }`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Modern Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 z-40 lg:hidden"
          >
            {/* Glass morphism container */}
            <motion.div
              className={`relative overflow-hidden rounded-2xl backdrop-blur-2xl border ${
                isScrolled
                  ? "bg-white/10 border-white/20 shadow-2xl shadow-slate-900/20"
                  : "bg-black/20 border-white/30 shadow-2xl shadow-black/30"
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-amber-500/10"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.05), rgba(245, 158, 11, 0.1))",
                    "linear-gradient(225deg, rgba(147, 51, 234, 0.05), rgba(59, 130, 246, 0.1), rgba(245, 158, 11, 0.1))",
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.05), rgba(245, 158, 11, 0.1))",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
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

              <div className="relative z-10 p-6">
                <nav className="flex flex-col space-y-3">
                  {/* Home Link */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      z: 50,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/"
                      className={`relative block py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 group overflow-hidden ${
                        isScrolled
                          ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                          : "text-white/90 hover:text-blue-200 hover:bg-white/10"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="relative z-10">الرئيسية</span>
                    </Link>
                  </motion.div>

                  {/* About Us Section in Mobile */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <div className="text-sm font-bold text-gray-500 mb-2 px-2">
                      من نحن
                    </div>
                    {aboutUsItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -30, rotateY: -15 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1 + (index + 1) * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{
                          scale: 1.05,
                          rotateY: 5,
                          z: 50,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={item.href}
                          className={`relative block py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 group overflow-hidden ${
                            isScrolled
                              ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                              : "text-white/90 hover:text-blue-200 hover:bg-white/10"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            {item.icon}
                            {item.name}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Products Section in Mobile */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + (aboutUsItems.length + 1) * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <div className="text-sm font-bold text-gray-500 mb-2 px-2">
                      المنتجات
                    </div>
                    {productsItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -30, rotateY: -15 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{
                          duration: 0.4,
                          delay:
                            0.1 +
                            (aboutUsItems.length + 1) * 0.1 +
                            (index + 1) * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{
                          scale: 1.05,
                          rotateY: 5,
                          z: 50,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={item.href}
                          className={`relative block py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 group overflow-hidden ${
                            isScrolled
                              ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                              : "text-white/90 hover:text-blue-200 hover:bg-white/10"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            {item.icon}
                            {item.name}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Other Navigation Items */}
                  {navItems.map((item, index) => {
                    const isActive =
                      typeof window !== "undefined" &&
                      window.location.pathname === item.href;

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -30, rotateY: -15 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{
                          duration: 0.4,
                          delay:
                            0.1 +
                            (aboutUsItems.length + productsItems.length + 2) *
                              0.1 +
                            index * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{
                          scale: 1.05,
                          rotateY: 5,
                          z: 50,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={item.href}
                          className={`relative block py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 group overflow-hidden ${
                            isActive
                              ? isScrolled
                                ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30"
                                : "bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white shadow-lg shadow-blue-500/40"
                              : isScrolled
                              ? "text-slate-800 hover:text-blue-600 hover:bg-white/20"
                              : "text-white hover:text-blue-200 hover:bg-white/10"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {/* 3D active indicator */}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                            />
                          )}

                          {/* Hover shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />

                          <span className="relative z-10 flex items-center justify-between">
                            {item.name}
                            {isActive && (
                              <motion.div
                                className="w-2 h-2 bg-white rounded-full"
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
                            )}
                          </span>

                          {/* 3D border effect */}
                          <motion.div
                            className={`absolute inset-0 rounded-xl border-2 ${
                              isActive
                                ? "border-white/30"
                                : "border-transparent group-hover:border-white/20"
                            }`}
                            whileHover={{
                              boxShadow:
                                "0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                            }}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* CTA Button with 3D effect */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="pt-4"
                    whileHover={{
                      scale: 1.02,
                      rotateY: 5,
                      z: 50,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        className={`relative overflow-hidden rounded-xl font-semibold text-lg py-4 px-6 text-center transition-all duration-300 ${
                          isScrolled
                            ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/30"
                            : "bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/40"
                        }`}
                        whileHover={{
                          boxShadow:
                            "0 20px 40px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.8 }}
                        />

                        {/* 3D border */}
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2 border-white/30"
                          whileHover={{
                            boxShadow:
                              "inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
                          }}
                        />

                        <span className="relative z-10">استشارة مجانية</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
