"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface License {
  name: string;
  number: string;
  logo: string;
  alt: string;
}

const licenses: License[] = [
  {
    name: "رخصة فال",
    number: "1200042229",
    logo: "/images/certificate/realestategeneraauthorit.jpg",
    alt: "رخصة فال - الهيئة العامة للعقار",
  },
  {
    name: "رخصة إيجار",
    number: "EJAR_27606927",
    logo: "/images/certificate/ejar.jpg",
    alt: "رخصة إيجار - الشبكة الإلكترونية لإيجار",
  },
  {
    name: "رخصة أعمالي",
    number: "0000196153",
    logo: "/images/certificate/saudi-business-center.jpg",
    alt: "رخصة أعمالي - المركز السعودي للأعمال",
  },
  {
    name: "رخصة مقاول",
    number: "879587959",
    logo: "/images/certificate/saudi-contractor-authority.jpg",
    alt: "رخصة مقاول - الهيئة السعودية للمقاولين",
  },
];

export function LicensesSection() {
  return (
    <div className="w-full py-12 border-t border-white/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold text-white font-cairo relative pb-3 inline-block">
            التراخيص والشهادات
            <div className="absolute bottom-0 right-0 w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full"></div>
          </h3>
          <p className="text-gray-300 mt-4 font-cairo text-base">
            نحن معتمدون ومرخصون من الجهات الرسمية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {licenses.map((license, index) => (
            <motion.div
              key={license.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 h-full flex flex-col items-center text-center hover:shadow-lg hover:shadow-cyan-500/20">
                {/* Logo */}
                <div className="relative w-24 h-24 mb-4 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-full h-full bg-white/10 rounded-lg p-3 flex items-center justify-center border border-white/20 group-hover:border-cyan-400/50 transition-all duration-300">
                    <Image
                      src={license.logo}
                      alt={license.alt}
                      width={80}
                      height={80}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                </div>

                {/* License Name */}
                <h4 className="text-lg font-semibold text-white font-cairo mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {license.name}
                </h4>

                {/* License Number */}
                <p className="text-sm text-gray-300 font-cairo font-mono bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/10 group-hover:border-cyan-400/30 group-hover:text-cyan-300 transition-all duration-300">
                  {license.number}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

