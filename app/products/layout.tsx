import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوكسري هاوسينج",
  description: "اكتشف مجموعة شاملة من المنتجات التمويلية المصممة خصيصاً لتلبية احتياجاتكم العقارية والمالية بأفضل الشروط والأسعار",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

