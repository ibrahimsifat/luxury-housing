"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface DropdownItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  isScrolled: boolean;
}

export function DropdownMenu({ title, items, isScrolled }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`font-semibold text-sm transition-all duration-300 hover:scale-105 relative group px-2 py-2 rounded-lg whitespace-nowrap flex items-center gap-1 ${
          isScrolled
            ? "text-slate-800 hover:text-blue-600 hover:bg-blue-50"
            : "text-white hover:text-blue-200 hover:bg-white/10 drop-shadow-lg"
        }`}
      >
        {title}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
        <span
          className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
            isScrolled ? "bg-blue-600" : "bg-blue-200"
          }`}
        />
      </button>

      {/* Dropdown Content */}
      <div
        className={cn(
          "absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200/20 backdrop-blur-xl z-50 transition-all duration-300",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        )}
      >
        <div className="p-2">
          {items.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
            >
              {item.icon && (
                <div className="text-blue-500 group-hover:text-blue-600 transition-colors">
                  {item.icon}
                </div>
              )}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
