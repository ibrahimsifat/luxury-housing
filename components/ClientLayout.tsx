"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";
import Header from "./header";
import WhatsAppFloat from "./whatsapp-float";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isCMSRoute = pathname.startsWith("/cms");

  return (
    <>
      {!isCMSRoute && <Header />}
      <main className={!isCMSRoute ? "" : ""}>{children}</main>
      {!isCMSRoute && (
        <>
          <Footer />
          <WhatsAppFloat />
        </>
      )}
    </>
  );
}
