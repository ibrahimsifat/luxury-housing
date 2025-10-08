"use client";

import { motion } from "framer-motion";

export function ClientsHero() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10 md:pt-24 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">شركاء النجاح</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            نفتخر بشراكتنا مع أبرز المؤسسات والشركات الرائدة في مجال العقارات
            والتمويل
          </p>
        </motion.div>
      </div>
    </section>
  );
}
