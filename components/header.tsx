"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { FiPhone, FiMail } from "react-icons/fi"

export { Header }
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "الرئيسية", href: "/" },
    { name: "من نحن", href: "/#about" },
    { name: "خدماتنا", href: "/services" },
    { name: "منتجاتنا", href: "/products" },
    { name: "تواصل معنا", href: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-700 mb-4 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-xl shadow-slate-900/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`hidden md:flex justify-between items-center py-3 text-sm border-b transition-all duration-500 ${
            isScrolled ? "text-slate-600 border-slate-200/30" : "text-white border-white/10"
          }`}
        >
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-300">
              <FiPhone className="w-4 h-4" />
              <span className="font-medium">0581111488</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-300">
              <FiMail className="w-4 h-4" />
              <span className="font-medium">info@luxuryhousing.sa</span>
            </div>
          </div>
          <div
            className={`font-semibold text-sm transition-all duration-500 ${
              isScrolled ? "text-blue-600" : "text-white drop-shadow-lg"
            }`}
          >
            مستشار تمويل عقاري معتمد من الهيئة العامة للعقار
          </div>
        </div>

        <div className="flex justify-between items-center py-5">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/images/luxury-housing-logo.png"
                alt="لوكسري هاوسينغ"
                width={220}
                height={75}
                className={`h-16 w-auto transition-all duration-500 hover:scale-105 cursor-pointer`}
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-semibold text-base transition-all duration-300 hover:scale-105 relative group ${
                  isScrolled ? "text-slate-800 hover:text-blue-600" : "text-white hover:text-blue-200 drop-shadow-lg"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-blue-600" : "bg-blue-200"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          <Link className="hidden md:flex items-center gap-4" key='contact123'
                href='/contact'>
            <Button
              className={`transition-all duration-300 transform hover:scale-105 font-semibold px-6 py-2.5 shadow-lg text-white ${
                isScrolled
                  ? "bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 shadow-blue-500/20"
                  : "bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 shadow-blue-500/40 backdrop-blur-sm"
              }`}
            >
              استشارة مجانية
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
