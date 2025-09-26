import productsData from "./products.json";

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

export const products: Product[] = productsData as Product[];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}
