import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "شركة لوكسري هاوسينغ للحلول العقارية | Luxury Housing",
  description:
    "مستشار تمويل عقاري معتمد من الهيئة العامة للعقار - نحقق أحلامكم في تملك المسكن المثالي",
  generator: "v0.app",
  keywords:
    "تمويل عقاري, شراء منزل, الهيئة العامة للعقار, السعودية, لوكسري هاوسينغ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`font-sans ${cairo.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
