"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaSnapchat, FaTelegram, FaTiktok } from "react-icons/fa";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "من نحن", href: "/about" },
    { name: "خدماتنا", href: "/services" },
    { name: "منتجاتنا", href: "/products" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  const services = [
    { name: "تقفيل المديونيات", href: "/services/debt-settlement" },
    { name: "حلول الدفعة المقدمة", href: "/services/down-payment-solutions" },
    { name: "حلول زيادة الضريبة", href: "/services/tax-solutions" },
    {
      name: "دمج الدعم مع الراتب",
      href: "/services/salary-housing-integration",
    },
    { name: "حلول توحيد الاقساط", href: "/services/installment-unification" },
  ];

  const legalLinks = [
    { name: "الشروط والأحكام", href: "/terms" },
    { name: "سياسة الخصوصية", href: "/privacy" },
  ];

  return (
    <footer
      className="!bg-slate-900 text-white relative overflow-hidden"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)] opacity-60"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse"></div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="inline-block group">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="relative ml-2">
                  <Image
                    src="/images/luxury-housing-logo.png"
                    alt="Luxury Housing Logo"
                    width={100}
                    height={100}
                    className="transition-transform duration-300 group-hover:scale-110 brightness-0 invert"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-pink-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-white font-cairo">
                    لوكسري هاوسينج
                  </div>
                  <div className="text-sm text-slate-300 font-cairo mt-1">
                    مستشار تمويل عقاري معتمد
                  </div>
                </div>
              </div>
            </Link>

            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex flex-row items-center justify-between space-x-6 rtl:space-x-reverse">
                <div className="flex-1 text-right">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                    <div className="p-2 ml-2 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-lg">
                      <Phone className="w-5 h-5 text-cyan-400" />
                    </div>
                    <Link href="/contact">
                      <h4 className="text-lg font-semibold text-white font-cairo">
                        تواصل سريع
                      </h4>
                    </Link>
                  </div>
                  <p className="text-slate-300 text-base font-cairo leading-relaxed mb-2">
                    امسح الكود للتواصل المباشر
                  </p>
                  <p className="text-slate-400 text-sm font-cairo">
                    أو اتصل بنا على الرقم المجاني
                  </p>
                </div>
                <div className="relative group flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-pink-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 group-hover:border-cyan-400/50 transition-all duration-300">
                    <Image
                      src="/images/qr-code.png"
                      alt="QR Code للتواصل السريع"
                      width={100}
                      height={100}
                      className="rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed font-cairo text-lg max-w-md">
              شركة لوكسري هاوسينج العقارية - مستشار تمويل عقاري معتمد من الهيئة
              العامة للعقار. نحقق أحلامكم في تملك المسكن المثالي بأفضل الحلول
              التمويلية المبتكرة.
            </p>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white font-cairo">
                تابعونا على
              </h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all duration-300 rounded-xl w-10 h-10"
                  asChild
                >
                  <Link
                    href="https://www.facebook.com/luxuryhousing.sa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-600 transition-all duration-300 rounded-xl w-10 h-10"
                  asChild
                >
                  <Link
                    href="https://www.instagram.com/luxuryhousing.sa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-300 rounded-xl w-10 h-10"
                  asChild
                >
                  <Link
                    href="https://x.com/luxuryhousingsa"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="X (Twitter)"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 rounded-xl w-10 h-10"
                  asChild
                >
                  <Link
                    href="https://www.tiktok.com/@luxuryhousing.sa"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="TikTok"
                  >
                    <FaTiktok className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 rounded-xl w-10 h-10"
                  asChild
                >
                  <Link
                    href="https://www.snapchat.com/@luxuryhousingsa"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Snapchat"
                  >
                    <FaSnapchat className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-all duration-300 rounded-xl w-10 h-10"
                  asChild
                >
                  <Link
                    href="https://t.me/luxuryhousingsa"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                  >
                    <FaTelegram className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white font-cairo relative pb-2">
              روابط سريعة
              <div className="absolute bottom-0 right-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-100 hover:text-cyan-400 transition-all duration-200 font-cairo text-base hover:translate-x-2 rtl:hover:-translate-x-2 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white font-cairo relative pb-2">
              خدماتنا
              <div className="absolute bottom-0 right-0 w-12 h-0.5 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-100 hover:text-pink-400 transition-all duration-200 font-cairo hover:translate-x-2 rtl:hover:-translate-x-2 inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white font-cairo relative pb-2">
              تواصل معنا
              <div className="absolute bottom-0 right-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full"></div>
            </h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse group">
                <div className="p-2 ml-2 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-lg group-hover:from-cyan-500/30 group-hover:to-cyan-600/30 transition-all duration-300">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <Link
                    href="tel:+966581111488"
                    className="text-white font-semibold font-cairo hover:text-cyan-400 transition-colors duration-200"
                  >
                    0581111488
                  </Link>
                  <p className="text-slate-300 text-sm font-cairo">
                    خدمة العملاء
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse group">
                <div className="p-2 ml-2  bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-lg group-hover:from-pink-500/30 group-hover:to-pink-600/30 transition-all duration-300">
                  <Mail className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <Link
                    href="mailto:info@luxuryhousing.sa"
                    className="text-white font-semibold font-cairo hover:text-pink-400 transition-colors duration-200"
                  >
                    info@luxuryhousing.sa
                  </Link>
                  <p className="text-slate-300 text-sm font-cairo">
                    البريد الإلكتروني
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse group">
                <div className="p-2 ml-2  bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-lg group-hover:from-cyan-500/30 group-hover:to-pink-500/30 transition-all duration-300 mt-1">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <Link
                    href="https://maps.google.com/?q=Novotel+Business+Park+Dammam+Al+Khaleej+Al+Shamaliyah+32232+Saudi+Arabia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold font-cairo hover:text-cyan-400 transition-colors duration-200"
                  >
                    الدمام، السعودية
                  </Link>
                  <p className="text-slate-300 text-sm font-cairo">
                    نوفوتيل بيزنس بارك، شارع الوليد بن سلامة، الخالدية الشمالية،
                    الدمام 32232
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gradient-to-r from-transparent via-white/20 to-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-right">
              <p className="text-gray-100 font-cairo text-base">
                © thi شركة لوكسري هاوسينج العقارية. جميع الحقوق محفوظة.
              </p>
            </div>
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              <Link
                href="/privacy"
                className="text-gray-100 hover:text-cyan-400 transition-colors duration-200 font-cairo hover:underline"
              >
                سياسة الخصوصية
              </Link>
              <Link
                href="/terms"
                className="text-gray-100 hover:text-pink-400 transition-colors duration-200 font-cairo hover:underline"
              >
                الشروط والأحكام
              </Link>
              <Button
                onClick={scrollToTop}
                size="icon"
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-pink-500/20 transition-all duration-300 rounded-xl"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
