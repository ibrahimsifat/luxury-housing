import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-transparent bg-gradient-to-r from-slate-400 via-slate-600 to-slate-400 bg-clip-text opacity-20">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Error Message */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
          <CardContent className="p-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-slate-800 mb-4 font-cairo">
                الصفحة غير موجودة
              </h1>
              <p className="text-lg text-slate-600 mb-2 font-cairo">
                عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها
              </p>
              <p className="text-slate-500 font-cairo">
                قد تكون الصفحة قد تم نقلها أو حذفها أو أن الرابط غير صحيح
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  العودة للرئيسية
                </Button>
              </Link>

              <Link href="/products">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 group"
                >
                  <Search className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  تصفح المنتجات
                </Button>
              </Link>
            </div>

            {/* Additional Help */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-4 font-cairo">
                إذا كنت تعتقد أن هذا خطأ، يرجى التواصل معنا
              </p>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  className="text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all duration-300 group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  اتصل بنا
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-16 h-16 bg-gradient-to-r from-green-200/30 to-teal-200/30 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>
    </div>
  );
}
