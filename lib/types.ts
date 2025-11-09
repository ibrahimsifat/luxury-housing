// Product type definition
export interface Product {
  _id?: string;
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  features: string[];
  badge: string;
  gradient: string;
  detailedDescription: string;
  benefits: string[];
  requirements: string[];
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  minAmount: string;
  maxAmount: string;
  duration: string;
  interestRate: string;
  processingTime: string;
  eligibility: string[];
  image: string;
  featured?: boolean;
}

// Service type definition
export interface Service {
  _id?: string;
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  badge: string;
  gradient: string;
  detailedDescription: string;
  benefits: string[];
  requirements: string[];
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  minAmount: string;
  maxAmount: string;
  duration: string;
  interestRate: string;
  processingTime: string;
  eligibility: string[];
  featured?: boolean;
  iconBg?: string; // Added for UI styling
  accentColor?: string; // Added for UI styling
}

// Gallery type definition
export interface GalleryImage {
  _id?: string;
  id: string;
  title: string;
  description: string;
  category: "business" | "offers" | "branch";
  image: string;
  alt: string;
  uploadDate: string;
  featured: boolean;
}

// Client type definition
export interface Client {
  _id?: string;
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  category?: string;
  featured: boolean;
  order: number;
}

// Blog type definition
export interface Blog {
  _id?: string;
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content from rich text editor
  featuredImage: string;
  author: string;
  publishedAt?: string | Date;
  updatedAt?: string | Date;
  status: "draft" | "published";
  featured: boolean;
  tags: string[];
  views: number;
  metaTitle?: string;
  metaDescription?: string;
}