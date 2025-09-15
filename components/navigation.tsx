"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const services = [
    { name: "تقفيل المديونيات", href: "#services" },
    { name: "حلول الدفعة المقدمة", href: "#services" },
    { name: "حلول الضريبة", href: "#services" },
    { name: "أعلى مبلغ تمويلي", href: "#services" },
    { name: "دمج الراتب مع الدعم السكني", href: "#services" },
  ]

  const products = [
    { name: "وحدات جاهزة من السوق", href: "#products" },
    { name: "قرض وأرض من السوق", href: "#products" },
    { name: "بيت عظم وقرض", href: "#products" },
    { name: "البناء الذاتي", href: "#products" },
    { name: "وحدة تحت الإنشاء", href: "#products" },
    { name: "فك العقار المرهون", href: "#products" },
    { name: "رهن العقار الحر", href: "#products" },
    { name: "تمويل قطاع الأعمال", href: "#products" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
          : "bg-slate-900/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Image
              src="/images/luxury-housing-logo.png"
              alt="Luxury Housing"
              width={100}
              height={32}
              className={`h-8 w-auto transition-all duration-300 ${isScrolled ? "" : "brightness-0 invert"}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link
              href="#home"
              className={`hover:text-primary transition-colors duration-200 font-bold ${
                isScrolled ? "text-slate-900 text-sm" : "text-white text-base drop-shadow-lg"
              }`}
            >
              الرئيسية
            </Link>
            <Link
              href="#about"
              className={`hover:text-primary transition-colors duration-200 font-bold ${
                isScrolled ? "text-slate-900 text-sm" : "text-white text-base drop-shadow-lg"
              }`}
            >
              من نحن
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center hover:text-primary transition-colors duration-200 font-bold ${
                  isScrolled ? "text-slate-900 text-sm" : "text-white text-base drop-shadow-lg"
                }`}
              >
                خدماتنا
                <ChevronDown className="ml-1 h-3 w-3 rtl:ml-0 rtl:mr-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border-gray-200 shadow-lg">
                {services.map((service) => (
                  <DropdownMenuItem key={service.name} asChild>
                    <Link
                      href={service.href}
                      className="text-right rtl:text-right text-sm text-slate-900 hover:text-primary hover:bg-slate-50"
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center hover:text-primary transition-colors duration-200 font-bold ${
                  isScrolled ? "text-slate-900 text-sm" : "text-white text-base drop-shadow-lg"
                }`}
              >
                منتجاتنا
                <ChevronDown className="ml-1 h-3 w-3 rtl:ml-0 rtl:mr-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border-gray-200 shadow-lg">
                {products.map((product) => (
                  <DropdownMenuItem key={product.name} asChild>
                    <Link
                      href={product.href}
                      className="text-right rtl:text-right text-sm text-slate-900 hover:text-primary hover:bg-slate-50"
                    >
                      {product.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="#contact"
              className={`hover:text-primary transition-colors duration-200 font-bold ${
                isScrolled ? "text-slate-900 text-sm" : "text-white text-base drop-shadow-lg"
              }`}
            >
              اتصل بنا
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              size="sm"
              className="font-medium text-sm px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
            >
              استشارة مجانية
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`${isScrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/20"}`}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/98 backdrop-blur-md border-t border-gray-200/50 shadow-lg">
              <Link
                href="#home"
                className="block px-3 py-2 text-slate-900 hover:text-primary hover:bg-slate-50 rounded-md transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                href="#about"
                className="block px-3 py-2 text-slate-900 hover:text-primary hover:bg-slate-50 rounded-md transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                من نحن
              </Link>
              <Link
                href="#services"
                className="block px-3 py-2 text-slate-900 hover:text-primary hover:bg-slate-50 rounded-md transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                خدماتنا
              </Link>
              <Link
                href="#products"
                className="block px-3 py-2 text-slate-900 hover:text-primary hover:bg-slate-50 rounded-md transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                منتجاتنا
              </Link>
              <Link
                href="#contact"
                className="block px-3 py-2 text-slate-900 hover:text-primary hover:bg-slate-50 rounded-md transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                اتصل بنا
              </Link>
              <div className="px-3 py-2">
                <Button
                  size="sm"
                  className="w-full font-medium text-sm bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  استشارة مجانية
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
