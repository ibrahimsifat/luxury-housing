"use client";

import { Client } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";

interface ClientsGridProps {
  clients: Client[];
}

export function ClientsGrid({ clients }: ClientsGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      {clients.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <div className="text-slate-500 text-lg">
            لا توجد عملاء متاحين حالياً
          </div>
        </div>
      ) : (
        clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 flex items-center justify-center h-32">
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={80}
                className="object-contain group-hover:scale-105 transition-transform duration-300 max-h-20"
                onError={(e) => {
                  console.error("Image failed to load:", client.logo, e);
                }}
              />
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
