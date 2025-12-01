"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Building,
  Building2,
  ChevronDown,
  Eye,
  Heart,
  Home,
  Image as ImageIcon,
  Mail,
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

// Icon components using Lucide React for better TypeScript support
const AboutIcon = () => <Building2 className="w-5 h-5" />;
const ProductsIcon = () => <Briefcase className="w-5 h-5" />;
const ServicesIcon = () => <Briefcase className="w-5 h-5" />;
const ApplicationsIcon = () => <Mail className="w-5 h-5" />;
const GalleryIcon = () => <ImageIcon className="w-5 h-5" />;

export { Header };
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedDropdowns, setExpandedDropdowns] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdownName: string) => {
    setExpandedDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dropdownName)) {
        newSet.delete(dropdownName);
      } else {
        newSet.add(dropdownName);
      }
      return newSet;
    });
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
      name: "الخدمات العقارية",
      href: "/products?category=real-estate-financing",
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

  const servicesItems = [
    {
      name: "جميع الخدمات",
      href: "/services",
      icon: <Award className="w-4 h-4" />,
    },
    {
      name: "حلول الدفعة المقدمة",
      href: "/services/down-payment-solutions",
      icon: <Home className="w-4 h-4" />,
    },
    {
      name: "حلول زيادة الضريبة",
      href: "/services/tax-solutions",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      name: "حلول توحيد الاقساط",
      href: "/services/installment-unification",
      icon: <RefreshCw className="w-4 h-4" />,
    },
    {
      name: "دمج الدعم مع الراتب",
      href: "/services/salary-housing-integration",
      icon: <Users className="w-4 h-4" />,
    },
    {
      name: "حلول تقفيل المديونيات",
      href: "/services/debt-settlement",
      icon: <Building className="w-4 h-4" />,
    },
  ];

  const applicationItems = [
    {
      name: "التمويل العقاري",
      href: "/apply/real-estate-financing",
      icon: <Building className="w-4 h-4" />,
    },
    {
      name: "الخدمات العقارية",
      href: "/contact",
      icon: <RefreshCw className="w-4 h-4" />,
    },
    {
      name: "الرهن العقاري",
      href: "/apply/real-estate-mortgage",
      icon: <Home className="w-4 h-4" />,
    },
    {
      name: "التمويل الشخصي",
      href: "/apply/personal-financing",
      icon: <User className="w-4 h-4" />,
    },
    {
      name: "قطاع الاعمال",
      href: "/apply/business-sector",
      icon: <Building2 className="w-4 h-4" />,
    },
  ];

  const galleryItems = [
    {
      name: "جميع الصور",
      href: "/gallery",
      icon: <Award className="w-4 h-4" />,
    },
    {
      name: "صور الاعمال",
      href: "/gallery?category=business",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      name: "العروض",
      href: "/gallery?category=offers",
      icon: <Target className="w-4 h-4" />,
    },
    {
      name: "صور الفرع",
      href: "/gallery?category=branch",
      icon: <Building className="w-4 h-4" />,
    },
  ];

  const navItems = [
    { name: "شركاء النجاح", href: "/clients" },
    { name: "المدونة", href: "/blog" },
    // { name: "جديدنا", href: "/news" },
    { name: "الأسئلة الشائعة", href: "/faq" },
    { name: "تواصل معنا", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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
              مستشار تمويل عقاري معتمد
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
                  alt="لوكسري هاوسينج"
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

              {/* Services Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + 0.15 }}
              >
                <DropdownMenu
                  title="الخدمات"
                  items={servicesItems}
                  isScrolled={isScrolled}
                />
              </motion.div>

              {/* Gallery Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + 0.25 }}
              >
                <DropdownMenu
                  title="معرض الصور"
                  items={galleryItems}
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
                    delay: 0.3 + (index + 6) * 0.05,
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

              {/* Application Forms Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + 0.2 }}
              >
                <DropdownMenu
                  title="تقدم طلبك الان"
                  items={applicationItems}
                  isScrolled={isScrolled}
                />
              </motion.div>
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
              className="lg:hidden p-2 rounded-lg transition-all duration-300 mobile-menu-container"
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
            className="fixed top-20 left-4 right-4 z-40 lg:hidden max-h-[calc(100vh-120px)] overflow-y-auto mobile-menu-container"
          >
            {/* Solid background container */}
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/20"
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
                      className="relative block py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 group overflow-hidden text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="relative z-10">الرئيسية</span>
                    </Link>
                  </motion.div>

                  {/* About Us Section in Mobile - Collapsible */}
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
                    <motion.button
                      onClick={() => toggleDropdown("about")}
                      className="w-full flex items-center justify-between py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center gap-3">
                        <AboutIcon />
                        من نحن
                      </span>
                      <motion.div
                        animate={{
                          rotate: expandedDropdowns.has("about") ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedDropdowns.has("about") ? "auto" : 0,
                        opacity: expandedDropdowns.has("about") ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4">
                        {aboutUsItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                              opacity: expandedDropdowns.has("about") ? 1 : 0,
                              x: expandedDropdowns.has("about") ? 0 : -20,
                            }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1,
                            }}
                          >
                            <Link
                              href={item.href}
                              className="relative block py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="flex items-center gap-2">
                                {item.icon}
                                {item.name}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Products Section in Mobile - Collapsible */}
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
                    <motion.button
                      onClick={() => toggleDropdown("products")}
                      className="w-full flex items-center justify-between py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center gap-3">
                        <ProductsIcon />
                        المنتجات
                      </span>
                      <motion.div
                        animate={{
                          rotate: expandedDropdowns.has("products") ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedDropdowns.has("products") ? "auto" : 0,
                        opacity: expandedDropdowns.has("products") ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4">
                        {productsItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                              opacity: expandedDropdowns.has("products")
                                ? 1
                                : 0,
                              x: expandedDropdowns.has("products") ? 0 : -20,
                            }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1,
                            }}
                          >
                            <Link
                              href={item.href}
                              className="relative block py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="flex items-center gap-2">
                                {item.icon}
                                {item.name}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Services Section in Mobile - Collapsible */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{
                      duration: 0.4,
                      delay:
                        0.1 +
                        (aboutUsItems.length + productsItems.length + 2) * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.button
                      onClick={() => toggleDropdown("services")}
                      className="w-full flex items-center justify-between py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center gap-3">
                        <ProductsIcon />
                        الخدمات
                      </span>
                      <motion.div
                        animate={{
                          rotate: expandedDropdowns.has("services") ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedDropdowns.has("services") ? "auto" : 0,
                        opacity: expandedDropdowns.has("services") ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4">
                        {servicesItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                              opacity: expandedDropdowns.has("services")
                                ? 1
                                : 0,
                              x: expandedDropdowns.has("services") ? 0 : -20,
                            }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1,
                            }}
                          >
                            <Link
                              href={item.href}
                              className="relative block py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="flex items-center gap-2">
                                {item.icon}
                                {item.name}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Application Forms Section in Mobile - Collapsible */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{
                      duration: 0.4,
                      delay:
                        0.1 +
                        (aboutUsItems.length +
                          productsItems.length +
                          servicesItems.length +
                          3) *
                          0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.button
                      onClick={() => toggleDropdown("applications")}
                      className="w-full flex items-center justify-between py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center gap-3">
                        <ApplicationsIcon />
                        تقدم طلبك الان
                      </span>
                      <motion.div
                        animate={{
                          rotate: expandedDropdowns.has("applications")
                            ? 180
                            : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedDropdowns.has("applications")
                          ? "auto"
                          : 0,
                        opacity: expandedDropdowns.has("applications") ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4">
                        {applicationItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                              opacity: expandedDropdowns.has("applications")
                                ? 1
                                : 0,
                              x: expandedDropdowns.has("applications")
                                ? 0
                                : -20,
                            }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1,
                            }}
                          >
                            <Link
                              href={item.href}
                              className="relative block py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="flex items-center gap-2">
                                {item.icon}
                                {item.name}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Gallery Section in Mobile - Collapsible */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{
                      duration: 0.4,
                      delay:
                        0.1 +
                        (aboutUsItems.length +
                          productsItems.length +
                          servicesItems.length +
                          applicationItems.length +
                          4) *
                          0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.button
                      onClick={() => toggleDropdown("gallery")}
                      className="w-full flex items-center justify-between py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center gap-3">
                        <AboutIcon />
                        معرض الصور
                      </span>
                      <motion.div
                        animate={{
                          rotate: expandedDropdowns.has("gallery") ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedDropdowns.has("gallery") ? "auto" : 0,
                        opacity: expandedDropdowns.has("gallery") ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4">
                        {galleryItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                              opacity: expandedDropdowns.has("gallery") ? 1 : 0,
                              x: expandedDropdowns.has("gallery") ? 0 : -20,
                            }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1,
                            }}
                          >
                            <Link
                              href={item.href}
                              className="relative block py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="flex items-center gap-2">
                                {item.icon}
                                {item.name}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
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
                            (aboutUsItems.length +
                              productsItems.length +
                              servicesItems.length +
                              applicationItems.length +
                              galleryItems.length +
                              5) *
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
                              ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30"
                              : "text-slate-800 hover:text-blue-600 hover:bg-blue-50"
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
                        className="relative overflow-hidden rounded-xl font-semibold text-lg py-4 px-6 text-center transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/30 text-white"
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
