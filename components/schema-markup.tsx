interface SchemaMarkupProps {
  data: any;
  type:
    | "Organization"
    | "Product"
    | "Service"
    | "WebSite"
    | "BreadcrumbList"
    | "FAQPage"
    | "LocalBusiness";
}

export function SchemaMarkup({ data, type }: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// FAQ Schema Component
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  name?: string;
}

export function FAQSchema({ faqs, name = "الأسئلة الشائعة" }: FAQSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: name,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <SchemaMarkup data={faqSchema} type="FAQPage" />;
}

// Local Business Schema Component
interface LocalBusinessProps {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  website: string;
  openingHours?: string[];
  priceRange?: string;
}

export function LocalBusinessSchema({
  name,
  description,
  address,
  phone,
  email,
  website,
  openingHours = ["Mo-Fr 08:00-18:00", "Sa 09:00-17:00"],
  priceRange = "$$",
}: LocalBusinessProps) {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: name,
    description: description,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    telephone: phone,
    email: email,
    url: website,
    openingHours: openingHours,
    priceRange: priceRange,
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
  };

  return <SchemaMarkup data={businessSchema} type="LocalBusiness" />;
}
