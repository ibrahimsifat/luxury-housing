import { ServiceDetailsClient } from "@/components/service-details-client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Service } from "@/lib/services"
import WhatsAppFloat from "@/components/whatsapp-float"
import { MobileNavigation } from "@/components/mobile-navigation"

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-6">
      <Header />
      <ServiceDetailsClient service={serviceWithIconName} />
      <WhatsAppFloat />
      <MobileNavigation />
      <Footer />
    </div>
  )
}
