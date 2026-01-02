"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "966581111488"; // Saudi format without + for WhatsApp URL
  const message = "مرحباً، أود الاستفسار عن خدماتكم"; // Hello, I would like to inquire about your services

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed bottom-28 md:bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="تواصل معنا عبر واتساب"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FaWhatsapp className="w-6 h-6 text-white" />

        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>

        {isHovered && (
          <div
            className="absolute right-16 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl transition-all duration-300"
            style={{
              backgroundColor: "#1e293b !important", // slate-800
              color: "#ffffff !important",
              border: "1px solid #475569",
              zIndex: 9999,
            }}
          >
            <span style={{ color: "#ffffff !important" }}>
              تواصل عبر واتساب
            </span>
            <div
              className="absolute left-full top-1/2 transform -translate-y-1/2"
              style={{
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderRight: "6px solid #1e293b",
              }}
            />
          </div>
        )}
      </a>
    </div>
  );
}
