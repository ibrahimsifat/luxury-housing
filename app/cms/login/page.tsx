"use client";

import { ScrollAnimation } from "@/components/scroll-animations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CMSLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Hard-coded credentials check
    if (email === "info@luxuryhousing.sa" && password === "12345678") {
      // Store login state in localStorage
      localStorage.setItem("cms_logged_in", "true");
      localStorage.setItem(
        "cms_user",
        JSON.stringify({ email, role: "admin" })
      );

      // Set cookie for server-side verification
      document.cookie = "cms_logged_in=true; path=/; max-age=86400"; // 24 hours

      // Redirect to dashboard
      router.push("/cms/dashboard");
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)] opacity-60"></div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <ScrollAnimation animation="fadeInUp">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 font-cairo">
                لوحة تحكم إدارة المحتوى
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-slate-600">
                نظام إدارة محتوى المساكن الفاخرة
              </CardDescription>
            </CardHeader>

            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    عنوان البريد الإلكتروني
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/80 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white/80 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  disabled={isLoading}
                >
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </div>
  );
}
