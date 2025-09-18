import { ServiceDetailsPage } from "@/components/service-details-page";
import servicesData from "@/lib/services.json";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return servicesData.map((service: any) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = servicesData.find((s: any) => s.slug === params.slug);

  if (!service) {
    return {
      title: "خدمة غير موجودة",
    };
  }

  return {
    title: `${service.title} | خدماتنا`,
    description: service.description,
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = servicesData.find((s: any) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailsPage service={service} />;
}
