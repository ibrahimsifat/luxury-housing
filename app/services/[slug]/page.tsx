import { ServiceDetailsPage } from "@/components/service-details-page";
import { getAllServices } from "@/lib/cms-data";
import { generateStructuredData } from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: {
    slug: string; // This will now be the id
  };
}

export async function generateStaticParams() {
  const servicesData = await getAllServices();
  return servicesData.map((service: any) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  // Find service by id
  const servicesData = await getAllServices();
  const service = servicesData.find((s: any) => s.id === params.slug);

  if (!service) {
    return {
      title: "خدمة غير موجودة",
      description: "الخدمة المطلوبة غير موجودة في موقعنا",
    };
  }

  const title = `${service.title} | خدماتنا`;
  const description =
    service.description ||
    `اكتشف ${service.title} من خدمات المساكن الفاخرة مع أفضل الخبرات والجودة`;
  const keywords = [
    service.title,
    "خدمات عقارية",
    "تمويل عقاري",
    "المساكن الفاخرة",
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

export default async function ServicePage({ params }: ServicePageProps) {
  // Find service by id
  const servicesData = await getAllServices();
  const service = servicesData.find((s: any) => s.id === params.slug);

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
