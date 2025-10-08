import { ClientsGrid } from "@/components/clients-grid";
import { ClientsHero } from "@/components/clients-hero";
import { getAllClients } from "@/lib/clients";

// Force dynamic rendering to avoid build-time data fetching
export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  // Fetch clients data from API
  const clients = await getAllClients();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <ClientsHero />

      {/* Clients Grid Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              شركاء النجاح
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              نفتخر بشراكتنا مع أبرز الشركات والمؤسسات في المملكة العربية
              السعودية
            </p>
          </div>

          <ClientsGrid clients={clients} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            انضم إلى عملائنا الكرام
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            احصل على أفضل الخدمات العقارية والتمويلية مع فريقنا المحترف
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              تواصل معنا
            </a>
            <a
              href="/products"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-300"
            >
              تصفح خدماتنا
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
