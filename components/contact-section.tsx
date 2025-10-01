"use client";

import ContactForm from "./contact-form";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
    >
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          {/* Simple Badge */}
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full border border-blue-200 mb-6">
            <span className="text-sm font-semibold text-blue-700 px-4 py-2">
              تواصل معنا
            </span>
          </div>

          {/* Simple Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
            نحن هنا لخدمتك
          </h2>

          {/* Simple Divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
          </div>

          {/* Simple Description */}
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-loose">
            تواصل معنا اليوم واحصل على استشارة مجانية لتحقيق حلمك بالتملك
            <br />
            <span className="text-blue-600 font-semibold">
              نحقق أحلامكم في تملك المسكن المثالي
            </span>
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export default ContactSection;
