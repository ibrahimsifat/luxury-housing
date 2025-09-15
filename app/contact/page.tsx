import Header from "@/components/header"
import { ContactUsSection } from "@/components/contact-us-section"
import { Footer } from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"

export default function ContactPage() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <ContactUsSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
