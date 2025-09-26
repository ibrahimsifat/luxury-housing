"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";
import Header from "./header";
import { MobileNavigation } from "./mobile-navigation";
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
      <main className={!isCMSRoute ? "pb-16 md:pb-0" : ""}>{children}</main>
      {!isCMSRoute && (
        <>
          <Footer />
          <MobileNavigation />
          <WhatsAppFloat />
        </>
      )}
    </>
  );
}
