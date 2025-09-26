export interface Service {
  id: string;
  slug: string;
  icon: string; // Changed from LucideIcon to string to avoid function passing
  title: string;
  description: string;
  features: string[];
  gradient: string;
  iconBg: string;
  accentColor: string;
  detailedDescription: string;
  benefits: string[];
  requirements: string[];
  process: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
}
