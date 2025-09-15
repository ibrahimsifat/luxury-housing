import { ServiceDetailsClient } from "@/components/service-details-client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Service } from "@/lib/services"

interface ServiceDetailsPageProps {
  service: Service
}

export function ServiceDetailsPage({ service }: ServiceDetailsPageProps) {
  const getIconName = (icon: string) => {
    // Since icon is now a string, just return it directly
    return icon || "CreditCard"
  }

  const serviceWithIconName = {
    ...service,
    iconName: getIconName(service.icon),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      <ServiceDetailsClient service={serviceWithIconName} />
      <Footer />
    </div>
  )
}
