"use client";

import { motion } from "framer-motion";
import { Award, Building2, Star, Users } from "lucide-react";
import Image from "next/image";

const clientImages = [
  {
    src: "/clients/imgi_13_download.png",
    alt: "Client 1",
    name: "شركة العقارات المتقدمة",
  },
  {
    src: "/clients/imgi_14_9404f6_c147c8d811f14beb916d6cd3567758ec_mv2.png",
    alt: "Client 2",
    name: "مجموعة التطوير العقاري",
  },
  {
    src: "/clients/imgi_16_002.jpg",
    alt: "Client 3",
    name: "مؤسسة البناء الحديث",
  },
  {
    src: "/clients/imgi_17_9404f6_556dd3f4f9f54128a9d2b0393e0ffcbd_mv2.png",
    alt: "Client 4",
    name: "شركة الاستثمار العقاري",
  },
  {
    src: "/clients/imgi_18_07.jpg",
    alt: "Client 5",
    name: "مجموعة المشاريع الكبرى",
  },
  {
    src: "/clients/imgi_19_001.jpg",
    alt: "Client 6",
    name: "مؤسسة التطوير الشامل",
  },
];

const stats = [
  {
    icon: <Building2 className="w-8 h-8" />,
    number: "500+",
    label: "مشروع مكتمل",
  },
  {
    icon: <Users className="w-8 h-8" />,
    number: "200+",
    label: "عميل راضي",
  },
  {
    icon: <Award className="w-8 h-8" />,
    number: "15+",
    label: "جائزة حصلنا عليها",
  },
  {
    icon: <Star className="w-8 h-8" />,
    number: "98%",
    label: "معدل الرضا",
  },
];

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 md:pt-24 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              عملاؤنا الكرام
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              نفتخر بثقة عملائنا الكرام الذين اختاروا شركة لوكسري هاوسينغ للحلول
              العقارية
            </p>
          </motion.div>
        </div>
      </section>

      {/* Clients Grid Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              شركاء النجاح
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              نفتخر بشراكتنا مع أبرز الشركات والمؤسسات في المملكة العربية
              السعودية
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {clientImages.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                  <div className="relative h-48 overflow-hidden rounded-xl">
                    <Image
                      src={client.src}
                      alt={client.alt}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              آراء عملائنا
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              اكتشف ما يقوله عملاؤنا عن تجربتهم مع شركة لوكسري هاوسينغ
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "أحمد محمد العتيبي",
                company: "مدير عام - شركة العقارات المتقدمة",
                text: "شركة لوكسري هاوسينغ تتميز بالاحترافية والشفافية في التعامل. ساعدونا في الحصول على أفضل التمويلات العقارية.",
                rating: 5,
              },
              {
                name: "فاطمة عبدالله السعيد",
                company: "مستثمرة عقارية",
                text: "خدمة ممتازة ومتابعة دقيقة. فريق العمل متخصص ومتفهم لاحتياجات العملاء. أنصح بالتعامل معهم.",
                rating: 5,
              },
              {
                name: "محمد سالم القحطاني",
                company: "رئيس مجلس إدارة - مجموعة التطوير العقاري",
                text: "شراكة استراتيجية مميزة. لوكسري هاوسينغ ساعدتنا في تطوير مشاريعنا العقارية بتمويلات ميسرة.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed text-center">
                  "{testimonial.text}"
                </p>
                <div className="text-center">
                  <div className="font-bold text-slate-800 mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              انضم إلى عملائنا الكرام
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              احصل على أفضل الحلول التمويلية العقارية مع فريق من الخبراء
              المتخصصين
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              تواصل معنا الآن
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
