// Icon Library for Luxury Housing CMS
// Common icons that users can select from

export interface IconOption {
  name: string;
  label: string;
  category: string;
  description: string;
}

export const iconLibrary: IconOption[] = [
  // Real Estate & Property
  {
    name: "home",
    label: "Home",
    category: "Property",
    description: "House icon for residential properties",
  },
  {
    name: "building",
    label: "Building",
    category: "Property",
    description: "Commercial building icon",
  },
  {
    name: "apartment",
    label: "Apartment",
    category: "Property",
    description: "Apartment complex icon",
  },
  {
    name: "villa",
    label: "Villa",
    category: "Property",
    description: "Luxury villa icon",
  },
  {
    name: "office-building",
    label: "Office Building",
    category: "Property",
    description: "Office building icon",
  },
  {
    name: "warehouse",
    label: "Warehouse",
    category: "Property",
    description: "Industrial warehouse icon",
  },

  // Financial Services
  {
    name: "credit-card",
    label: "Credit Card",
    category: "Finance",
    description: "Payment and credit services",
  },
  {
    name: "bank",
    label: "Bank",
    category: "Finance",
    description: "Banking services",
  },
  {
    name: "money-bill",
    label: "Money Bill",
    category: "Finance",
    description: "Cash and money services",
  },
  {
    name: "calculator",
    label: "Calculator",
    category: "Finance",
    description: "Financial calculations",
  },
  {
    name: "chart-line",
    label: "Chart Line",
    category: "Finance",
    description: "Investment and growth",
  },
  {
    name: "piggy-bank",
    label: "Piggy Bank",
    category: "Finance",
    description: "Savings and deposits",
  },
  {
    name: "coins",
    label: "Coins",
    category: "Finance",
    description: "Currency and exchange",
  },
  {
    name: "hand-holding-dollar",
    label: "Hand Holding Dollar",
    category: "Finance",
    description: "Financial assistance",
  },

  // Services & Support
  {
    name: "user-tie",
    label: "User Tie",
    category: "Services",
    description: "Professional consultant",
  },
  {
    name: "headset",
    label: "Headset",
    category: "Services",
    description: "Customer support",
  },
  {
    name: "phone",
    label: "Phone",
    category: "Services",
    description: "Phone consultation",
  },
  {
    name: "envelope",
    label: "Envelope",
    category: "Services",
    description: "Email communication",
  },
  {
    name: "calendar-check",
    label: "Calendar Check",
    category: "Services",
    description: "Appointment booking",
  },
  {
    name: "clock",
    label: "Clock",
    category: "Services",
    description: "Time-sensitive services",
  },
  {
    name: "shield-check",
    label: "Shield Check",
    category: "Services",
    description: "Secure and verified",
  },
  {
    name: "star",
    label: "Star",
    category: "Services",
    description: "Premium service",
  },

  // Documents & Legal
  {
    name: "file-contract",
    label: "File Contract",
    category: "Legal",
    description: "Contract and agreement",
  },
  {
    name: "file-signature",
    label: "File Signature",
    category: "Legal",
    description: "Document signing",
  },
  {
    name: "gavel",
    label: "Gavel",
    category: "Legal",
    description: "Legal services",
  },
  {
    name: "scale-balanced",
    label: "Scale Balanced",
    category: "Legal",
    description: "Legal justice",
  },
  {
    name: "stamp",
    label: "Stamp",
    category: "Legal",
    description: "Official approval",
  },

  // Technology & Digital
  {
    name: "laptop",
    label: "Laptop",
    category: "Technology",
    description: "Digital services",
  },
  {
    name: "mobile-screen",
    label: "Mobile Screen",
    category: "Technology",
    description: "Mobile application",
  },
  {
    name: "wifi",
    label: "WiFi",
    category: "Technology",
    description: "Online services",
  },
  {
    name: "cloud",
    label: "Cloud",
    category: "Technology",
    description: "Cloud-based services",
  },
  {
    name: "lock",
    label: "Lock",
    category: "Technology",
    description: "Secure services",
  },

  // Business & Commerce
  {
    name: "briefcase",
    label: "Briefcase",
    category: "Business",
    description: "Business services",
  },
  {
    name: "handshake",
    label: "Handshake",
    category: "Business",
    description: "Partnership and deals",
  },
  {
    name: "users",
    label: "Users",
    category: "Business",
    description: "Team and collaboration",
  },
  {
    name: "trophy",
    label: "Trophy",
    category: "Business",
    description: "Achievement and success",
  },
  {
    name: "medal",
    label: "Medal",
    category: "Business",
    description: "Award and recognition",
  },

  // Location & Geography
  {
    name: "map-marker-alt",
    label: "Map Marker",
    category: "Location",
    description: "Location services",
  },
  {
    name: "globe",
    label: "Globe",
    category: "Location",
    description: "Global services",
  },
  {
    name: "compass",
    label: "Compass",
    category: "Location",
    description: "Direction and guidance",
  },

  // Utilities & Maintenance
  {
    name: "tools",
    label: "Tools",
    category: "Utilities",
    description: "Maintenance services",
  },
  {
    name: "wrench",
    label: "Wrench",
    category: "Utilities",
    description: "Repair services",
  },
  {
    name: "hammer",
    label: "Hammer",
    category: "Utilities",
    description: "Construction services",
  },
  {
    name: "paint-brush",
    label: "Paint Brush",
    category: "Utilities",
    description: "Renovation services",
  },

  // Luxury & Premium
  {
    name: "gem",
    label: "Gem",
    category: "Luxury",
    description: "Premium luxury service",
  },
  {
    name: "crown",
    label: "Crown",
    category: "Luxury",
    description: "Royal and exclusive",
  },
  {
    name: "diamond",
    label: "Diamond",
    category: "Luxury",
    description: "High-end luxury",
  },
  {
    name: "key",
    label: "Key",
    category: "Luxury",
    description: "Access and ownership",
  },
];

// Get icons by category
export function getIconsByCategory(category: string): IconOption[] {
  return iconLibrary.filter((icon) => icon.category === category);
}

// Get all categories
export function getIconCategories(): string[] {
  return [...new Set(iconLibrary.map((icon) => icon.category))];
}

// Search icons by name or label
export function searchIcons(query: string): IconOption[] {
  const lowercaseQuery = query.toLowerCase();
  return iconLibrary.filter(
    (icon) =>
      icon.name.toLowerCase().includes(lowercaseQuery) ||
      icon.label.toLowerCase().includes(lowercaseQuery) ||
      icon.description.toLowerCase().includes(lowercaseQuery)
  );
}

// Get icon by name
export function getIconByName(name: string): IconOption | undefined {
  return iconLibrary.find((icon) => icon.name === name);
}
