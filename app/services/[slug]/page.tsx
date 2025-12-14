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
  try {
    const servicesData = await getAllServices();
    return servicesData.map((service: any) => ({
      slug: service.id,
    }));
  } catch (error) {
    // If database connection fails during build, return empty array
    // Pages will be generated on-demand instead
    console.error("Error generating static params for service pages:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  try {
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
  } catch (error) {
    // If database connection fails, return default metadata
    console.error("Error generating metadata for service page:", error);
    return {
      title: "خدمة غير موجودة",
      description: "الخدمة المطلوبة غير موجودة في موقعنا",
    };
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  try {
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
  } catch (error) {
    // If database connection fails, show not found
    console.error("Error loading service page:", error);
    notFound();
  }
}
