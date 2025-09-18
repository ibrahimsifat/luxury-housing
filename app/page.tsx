import { AboutSection } from "@/components/about-section";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";
import { ServicesSection } from "@/components/services-section";
import { VisionMissionSection } from "@/components/vision-mission-section";

import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ScrollAnimation } from "@/components/scroll-animations";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function HomePage() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <HeroSection />

      <ScrollAnimation animation="fadeInUp">
        <AboutSection />
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={100}>
        <VisionMissionSection />
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={300}>
        <ProductsSection />
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={200}>
        <ServicesSection />
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={400}>
        <ContactSection />
      </ScrollAnimation>

      <Footer />

      <WhatsAppFloat />

      <MobileNavigation />
    </div>
  );
}
