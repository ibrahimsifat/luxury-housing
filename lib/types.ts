// Product type definition
export interface Product {
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
}

// Service type definition
export interface Service {
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
}

// Gallery type definition
export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: "business" | "offers" | "branch";
  image: string;
  alt: string;
  uploadDate: string;
  featured: boolean;
}
