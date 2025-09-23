import { AboutSection } from "@/components/about-section";
import { ClientsSection } from "@/components/clients-section";
import HeroSection from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";
import { ServicesSection } from "@/components/services-section";
import { VisionMissionSection } from "@/components/vision-mission-section";

import { ContactSection } from "@/components/contact-section";
import { GoogleMapsSection } from "@/components/google-maps-section";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ScrollAnimation } from "@/components/scroll-animations";
import { generateStructuredData } from "@/lib/seo";

export default function HomePage() {
  // Generate structured data for the organization
  const organizationStructuredData = generateStructuredData("Organization", {});
  const websiteStructuredData = generateStructuredData("WebSite", {});

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />

      <HeroSection />

      <ScrollAnimation animation="fadeInUp">
        <AboutSection />
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={100}>
        <VisionMissionSection />
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={200}>
        <ProductsSection />
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={300}>
        <ServicesSection />
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={400}>
        <ClientsSection />
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={500}>
        <ContactSection />
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={600}>
        <GoogleMapsSection />
      </ScrollAnimation>

      <MobileNavigation />
    </div>
  );
}
