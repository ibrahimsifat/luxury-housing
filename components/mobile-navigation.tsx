"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiPhone } from "react-icons/fi";
import { HiBriefcase, HiOutlineOfficeBuilding } from "react-icons/hi";

export function MobileNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "اتصل بنا",
      href: "/contact",
      icon: FiPhone,
    },
    {
      name: "منتجاتنا",
      href: "/products",
      icon: HiOutlineOfficeBuilding,
    },
    {
      name: "خدماتنا",
      href: "/services",
      icon: HiBriefcase,
    },
    {
      name: "الرئيسية",
      href: "/",
      icon: FiHome,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-200/50">
        <nav className="flex items-center justify-around py-3 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-blue-600 bg-blue-50 scale-105"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium font-cairo">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
