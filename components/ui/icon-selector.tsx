"use client";

import { getIconCategories, iconLibrary } from "@/lib/icon-library";
import {
  Briefcase,
  Building,
  Calculator,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  Cloud,
  Coins,
  Compass,
  CreditCard,
  Crown,
  DollarSign,
  FileText,
  Gavel,
  Gem,
  Globe,
  Hammer,
  HandHeart,
  Handshake,
  Headphones,
  Home,
  Key,
  Landmark,
  Laptop,
  Lock,
  Mail,
  MapPin,
  Medal,
  Paintbrush,
  PenTool,
  Phone,
  PiggyBank,
  Scale,
  Search,
  ShieldCheck,
  Smartphone,
  Stamp,
  Star,
  TrendingUp,
  Trophy,
  User,
  Users,
  Wifi,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Icon mapping for Lucide React components
const iconMap: Record<string, any> = {
  home: Home,
  building: Building,
  apartment: Building,
  villa: Home,
  "office-building": Building,
  warehouse: Building,
  "credit-card": CreditCard,
  bank: Landmark,
  "money-bill": DollarSign,
  calculator: Calculator,
  "chart-line": TrendingUp,
  "piggy-bank": PiggyBank,
  coins: Coins,
  "hand-holding-dollar": HandHeart,
  "user-tie": User,
  headset: Headphones,
  phone: Phone,
  envelope: Mail,
  "calendar-check": CalendarCheck,
  clock: Clock,
  "shield-check": ShieldCheck,
  star: Star,
  "file-contract": FileText,
  "file-signature": PenTool,
  gavel: Gavel,
  "scale-balanced": Scale,
  stamp: Stamp,
  laptop: Laptop,
  "mobile-screen": Smartphone,
  wifi: Wifi,
  cloud: Cloud,
  lock: Lock,
  briefcase: Briefcase,
  handshake: Handshake,
  users: Users,
  trophy: Trophy,
  medal: Medal,
  "map-marker-alt": MapPin,
  globe: Globe,
  compass: Compass,
  tools: Wrench,
  wrench: Wrench,
  hammer: Hammer,
  "paint-brush": Paintbrush,
  gem: Gem,
  crown: Crown,
  diamond: Gem,
  key: Key,
};

interface IconSelectorProps {
  value?: string;
  onChange: (iconName: string) => void;
  placeholder?: string;
  className?: string;
}

export default function IconSelector({
  value,
  onChange,
  placeholder = "Select an icon...",
  className = "",
}: IconSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ["All", ...getIconCategories()];

  // Filter icons based on search and category
  const filteredIcons = iconLibrary.filter((icon) => {
    const matchesSearch =
      icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icon.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icon.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || icon.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const selectedIcon = iconLibrary.find((icon) => icon.name === value);

  // Helper function to render icon
  const renderIcon = (iconName: string, size: string = "text-2xl") => {
    const IconComponent = iconMap[iconName];
    if (IconComponent) {
      return <IconComponent className={`${size} w-6 h-6`} />;
    }
    // Fallback to FontAwesome if Lucide icon not found
    return <i className={`fas fa-${iconName} ${size}`}></i>;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIconSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <div className="flex items-center space-x-3">
          {selectedIcon ? (
            <>
              <div className="text-blue-600">
                {renderIcon(selectedIcon.name, "text-lg")}
              </div>
              <span className="text-gray-900 font-medium">
                {selectedIcon.label}
              </span>
            </>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-hidden">
          {/* Search and Category Filter */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Icons Grid */}
          <div className="max-h-64 overflow-y-auto p-3">
            {filteredIcons.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredIcons.map((icon) => (
                  <button
                    key={icon.name}
                    type="button"
                    onClick={() => handleIconSelect(icon.name)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all hover:bg-gray-50 hover:scale-105 hover:shadow-sm ${
                      value === icon.name
                        ? "bg-blue-50 border-blue-300 shadow-md scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    title={`${icon.label} - ${icon.description}`}
                  >
                    <div
                      className={`mb-2 ${
                        value === icon.name ? "text-blue-600" : "text-gray-600"
                      }`}
                    >
                      {renderIcon(icon.name, "text-2xl")}
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-900 truncate w-full">
                        {icon.label}
                      </div>
                      {value === icon.name && (
                        <Check className="h-3 w-3 text-blue-600 mx-auto mt-1" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-search text-2xl mb-2"></i>
                <p className="text-sm">No icons found</p>
                <p className="text-xs">Try a different search term</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
            {filteredIcons.length} icon{filteredIcons.length !== 1 ? "s" : ""}{" "}
            found
          </div>
        </div>
      )}
    </div>
  );
}
