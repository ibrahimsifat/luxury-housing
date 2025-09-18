"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CMSPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("cms_logged_in");

    if (isLoggedIn) {
      router.push("/cms/dashboard");
    } else {
      router.push("/cms/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Redirecting...</p>
      </div>
    </div>
  );
}
