import { MobileNavigation } from "@/components/mobile-navigation";
import { ServiceDetailsClient } from "@/components/service-details-client";
import WhatsAppFloat from "@/components/whatsapp-float";
import type { Service } from "@/lib/services";

interface ServiceDetailsPageProps {
  service: Service;
}

export function ServiceDetailsPage({ service }: ServiceDetailsPageProps) {
  const getIconName = (icon: string) => {
    // Since icon is now a string, just return it directly
    return icon || "CreditCard";
  };

  const serviceWithIconName = {
    ...service,
    iconName: getIconName(service.icon),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <ServiceDetailsClient service={serviceWithIconName} />
      <WhatsAppFloat />
      <MobileNavigation />
    </div>
  );
}
