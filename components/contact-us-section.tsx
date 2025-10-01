"use client";

import { Award, Building2, Globe, Users } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "./contact-form";
import { MobileNavigation } from "./mobile-navigation";
import { AnimatedCounter } from "./ui/animated-counter";
import WhatsAppFloat from "./whatsapp-float";

export function ContactUsSection() {
  const companyStats = [
    {
      icon: Building2,
      number: 500,
      label: "عقار تم تمويله",
      color: "text-primary",
    },
    {
      icon: Users,
      number: 1000,
      label: "عميل راضي",
      color: "text-accent",
    },
    {
      icon: Award,
      number: 15,
      label: "سنة خبرة",
      color: "text-primary",
    },
    {
      icon: Globe,
      number: 25,
      label: "مدينة نخدمها",
      color: "text-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Simple Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 md:pt-16">
          <div className="text-center text-white">
            {/* Simple Badge */}
            <div className="inline-flex items-center justify-center p-3 bg-amber-600/20 rounded-full border border-amber-400/40 shadow-lg mb-8">
              <Link
                href="/contact"
                className="text-sm font-bold text-amber-300 px-6 py-3 bg-white/10 rounded-full"
              >
                تواصل معنا
              </Link>
            </div>

            {/* Simple Title */}
            <h1 className="text-6xl md:text-7xl font-bold mb-8 text-balance text-white leading-tight">
              <span className="block">نحن هنا لخدمتك</span>
              <span className="block text-amber-300">بأفضل الطرق</span>
            </h1>

            {/* Simple Divider */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-1 bg-amber-400" />
              <div className="w-3 h-3 bg-amber-400 rounded-full mx-4" />
              <div className="w-16 h-1 bg-amber-400" />
            </div>

            {/* Simple Description */}
            <p className="text-xl text-white/90 max-w-4xl mx-auto text-pretty leading-relaxed mb-12">
              مستشار تمويل عقاري معتمد من الهيئة العامة للعقار
              <br />
              <span className="text-amber-300 font-semibold">
                نحقق أحلامكم في تملك المسكن المثالي
              </span>
            </p>

            {/* Company Stats - Simplified */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl mb-4 shadow-lg">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter
                      end={stat.number}
                      suffix="+"
                      duration={2.5}
                      delay={index * 0.2}
                    />
                  </div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ContactForm />
        </div>
      </section>
      <MobileNavigation />
      <WhatsAppFloat />
    </div>
  );
}

export default ContactUsSection;
