import { ServiceDetailsPage } from "@/components/service-details-page";
import { generateStructuredData } from "@/lib/seo";
import servicesData from "@/lib/services.json";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return servicesData.map((service: any) => ({
    slug: encodeURIComponent(service.slug),
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(params.slug);
  const service = servicesData.find((s: any) => s.slug === decodedSlug);

  if (!service) {
    return {
      title: "خدمة غير موجودة",
      description: "الخدمة المطلوبة غير موجودة في موقعنا",
    };
  }

  const title = `${service.title} | خدماتنا`;
  const description =
    service.description ||
    `اكتشف ${service.title} من خدمات الإسكان الفاخر مع أفضل الخبرات والجودة`;
  const keywords = [
    service.title,
    "خدمات عقارية",
    "تمويل عقاري",
    "الإسكان الفاخر",
    ...(service.features || []),
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://luxuryhousing.sa/services/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/services/${params.slug}`,
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(params.slug);
  const service = servicesData.find((s: any) => s.slug === decodedSlug);

  if (!service) {
    notFound();
  }

  // Generate structured data for the service
  const serviceStructuredData = generateStructuredData("Service", {
    title: service.title,
    description: service.description,
    category: "Real Estate Services",
    features: service.features,
  });

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = generateStructuredData("BreadcrumbList", {
    items: [
      { name: "الرئيسية", url: "https://luxuryhousing.sa" },
      { name: "الخدمات", url: "https://luxuryhousing.sa/services" },
      {
        name: service.title,
        url: `https://luxuryhousing.sa/services/${params.slug}`,
      },
    ],
  });

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <ServiceDetailsPage service={service} />
    </>
  );
}
