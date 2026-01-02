"use client";

import { Navigation } from "lucide-react";
import Link from "next/link";

export function GoogleMapsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-cairo">
            موقعنا
          </h2>
        </div>

        {/* Map Container */}
        <div className="relative mx-auto">
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4462.225211289777!2d50.1376915!3d26.407250400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x83ef240e9f735ab%3A0x4fabec4cb9428e42!2z2YTZiNmD2LPYsdmKINmH2KfZiNiz2YrZhtisICjYp9mE2YXYs9in2YPZhiDYp9mE2YHYp9iu2LHYqSkgbHV4dXJ5IGhvdXNpbmc!5e1!3m2!1sen!2ssa!4v1758625496080!5m2!1sen!2ssa"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
              title="موقع لوكسري هاوسينج على الخريطة"
            />

            {/* Map Overlay with Link */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-300 rounded-2xl">
              <Link
                href="https://maps.app.goo.gl/MULiM5FfTwLFfDnn6?g_st=iwb"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                aria-label="فتح الموقع في خرائط جوجل"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                  <Navigation className="w-8 h-8 text-slate-800" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
