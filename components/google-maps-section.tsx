"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
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
          <p className="text-lg text-slate-600 font-cairo max-w-2xl mx-auto">
            زورونا في مكتبنا الرئيسي في الدمام، المملكة العربية السعودية
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map Container */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.1234567890!2d50.1234567!3d26.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA3JzI0LjQiTiA1MMKwMDcnMjQuNCJF!5e0!3m2!1sen!2ssa!4v1234567890123!5m2!1sen!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />

              {/* Map Overlay with Link */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-300 rounded-2xl">
                <Link
                  href="https://maps.app.goo.gl/MULiM5FfTwLFfDnn6?g_st=iwb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                    <Navigation className="w-8 h-8 text-slate-800" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 font-cairo">
                    العنوان
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-cairo">
                    نوفوتيل بزنس بارك، شارع الوليد بن سلامة، الخالدية الشمالية،
                    الدمام 32232
                  </p>
                  <p className="text-slate-500 text-sm mt-2 font-cairo">
                    Novotel Business Park, Alwalid Ibn Salamah St, Al Khalidiyah
                    Ash Shamaliyah, Dammam 32232
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone Card */}
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 space-x-reverse mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 font-cairo">
                    اتصل بنا
                  </h4>
                </div>
                <p className="text-slate-600 text-sm font-cairo">
                  +966 13 123 4567
                </p>
              </div>

              {/* Hours Card */}
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 space-x-reverse mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 font-cairo">
                    ساعات العمل
                  </h4>
                </div>
                <p className="text-slate-600 text-sm font-cairo">
                  الأحد - الخميس: 8:00 ص - 6:00 م
                </p>
                <p className="text-slate-500 text-xs font-cairo">
                  Saturday - Thursday: 8:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://maps.app.goo.gl/MULiM5FfTwLFfDnn6?g_st=iwb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <Navigation className="w-5 h-5" />
                    <span className="font-cairo">افتح في خرائط جوجل</span>
                  </div>
                </button>
              </Link>

              <Link href="/contact" className="flex-1">
                <button className="w-full bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <MapPin className="w-5 h-5" />
                    <span className="font-cairo">اتصل بنا</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
