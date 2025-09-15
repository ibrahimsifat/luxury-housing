import { notFound } from "next/navigation"
import { getServiceBySlug, getAllServices } from "@/lib/services"
import { ServiceDetailsPage } from "@/components/service-details-page"

interface ServicePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const services = getAllServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    return {
      title: "خدمة غير موجودة",
    }
  }

  return {
    title: `${service.title} | خدماتنا`,
    description: service.description,
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return <ServiceDetailsPage service={service} />
}
