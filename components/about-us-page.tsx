"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Building2,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250911-WA0029.jpg-KEU1nk662OmaHfQweQaWlKhSt5acsZ.jpeg",
    alt: "مكتب تنفيذي أنيق مع شعار الشركة",
    caption: "مكتب تنفيذي أنيق مع شعار الشركة",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250911-WA0028.jpg-iNtS9MgXtA1sSgQ5dcyeRxiLBq1hJd.jpeg",
    alt: "منطقة استقبال فاخرة مع أثاث عصري",
    caption: "منطقة استقبال فاخرة مع أثاث عصري",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250911-WA0031.jpg-UBI3IWiFJzKjccHKvclV8i297q23Qc.jpeg",
    alt: "مساحة عمل مفتوحة مع تصميم حديث",
    caption: "مساحة عمل مفتوحة مع تصميم حديث",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250911-WA0034.jpg-L1yAV45rfnarMUVOERvZq36qtAmobI.jpeg",
    alt: "قاعة اجتماعات مجهزة بأحدث التقنيات",
    caption: "قاعة اجتماعات مجهزة بأحدث التقنيات",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250911-WA0025.jpg-vNpM3XMomgGQRXcZau9O1XatupmZQu.jpeg",
    alt: "شعار الشركة المميز بالألوان الذهبية والزرقاء",
    caption: "شعار الشركة المميز بالألوان الذهبية والزرقاء",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250911-WA0033.jpg-oNnD8yeyfwAMqx5TYrtx2Im8uxTptu.jpeg",
    alt: "قاعة اجتماعات أخرى بتصميم احترافي",
    caption: "قاعة اجتماعات أخرى بتصميم احترافي",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250911-WA0022.jpg-YkqgXbwUFDh6Y9okO9Cs4hkrcg8Er2.jpeg",
    alt: "منطقة الاستقبال الرئيسية مع الشعار المضيء",
    caption: "منطقة الاستقبال الرئيسية مع الشعار المضيء",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250911-WA0030.jpg-brYdMUi3b4k5QcAeHwDAzUz3UwUweh.jpeg",
    alt: "مدخل المكتب مع تصميم داخلي راقي",
    caption: "مدخل المكتب مع تصميم داخلي راقي",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250911-WA0027.jpg-hwL3s3i5wOYYmF6DNA43cNOaN8Jepr.jpeg",
    alt: "مساحة عمل إضافية مع إضاءة مميزة",
    caption: "مساحة عمل إضافية مع إضاءة مميزة",
  },
];

const services = [
  {
    title: "تقفيل المديونيات",
    description:
      "إيجاد جميع الحلول التي تخدم العميل وتكون وسيلة لتسهيل إتمام عملية شراء المنزل حيث أننا نسعى لخدمة العميل بالشكل الكامل",
    icon: Shield,
  },
  {
    title: "حلول الدفعة المقدمة",
    description:
      "أعلى من مبلغ 800 ألف تكون 10% وأقل من مبلغ 800 ألف تكون 5% فقط حيث أننا نقوم بتوفير الدفعة",
    icon: TrendingUp,
  },
  {
    title: "حلول الضريبة",
    description:
      "حلول زيادة ضريبة القيمة المضافة يتم إعفاء جميع العملاء المستفيدين من الدعم السكني من ضريبة القيمة المضافة على شبك التمويل",
    icon: Award,
  },
  {
    title: "أعلى مبلغ تمويلي",
    description:
      "السعي دوماً لتوفير أفضل المنتجات والحلول لخدمة العملاء توفير أعلى مبلغ تمويلي بأقل هامش ربحي متوفر",
    icon: Building2,
  },
  {
    title: "دمج الراتب مع الدعم السكني",
    description:
      "يتم دمج الراتب مع الدعم السكني لجميع العملاء في حالة كان الراتب أقل من 14 ألف يكون العميل مستحق الدعم",
    icon: Users,
  },
];

const products = [
  "وحدات جاهزة من السوق",
  "قرض وأرض من السوق",
  "بيت عظم وقرض",
  "البناء الذاتي",
  "وحدة تحت الإنشاء",
  "فك العقار المرهون",
  "رهن العقار الحر",
  "تمويل قطاع الأعمال",
];

const objectives = [
  {
    title: "تنمية القدرات",
    description: "تنمية القدرات المؤسسية في التخطيط وصولاً لأداء متميز",
    icon: TrendingUp,
  },
  {
    title: "نشر المعرفة",
    description: "نشر المعرفة الداعمة لسياسات الجهات التمويلية",
    icon: Eye,
  },
  {
    title: "تحقيق الطموحات",
    description: "تحقيق طموح كل مواطن بتسهيل تملك مسكن الأحلام",
    icon: Target,
  },
  {
    title: "العلامة التجارية",
    description: "تحقيق علامة تجارية تميزنا عن منافسينا",
    icon: Award,
  },
  {
    title: "التطوير الدائم",
    description:
      "التطوير الدائم لخدماتنا بما يتناسب مع تطوير تطلعات عملائنا ومجتمعنا",
    icon: Building2,
  },
];

export function AboutUsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    setIsAutoPlaying(false);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
    setIsAutoPlaying(false);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div className="absolute inset-0 bg-[url('/modern-luxury-villa-in-saudi-arabia-with-beautiful.jpg')] bg-cover bg-center opacity-20" />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-balance">
              من نحن
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-200 leading-relaxed text-pretty">
              شركة لوكسري هاوسينغ العقارية - رائدة في الحلول العقارية المتميزة
            </p>
            <Badge className="bg-secondary text-secondary-foreground px-6 py-2 text-lg font-semibold">
              تأسست عام 2022
            </Badge>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 text-balance">
                نبذة عن الشركة
              </h2>
              <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-6">
                <p className="text-lg">
                  شركة لوكسري هاوسينغ العقارية تأسست عام 2022 ذات مسؤولية محدودة
                  نشاطها الرئيسي الحلول العقارية بجميع مصنفاتها. اكتسبت الشركة
                  الأفضلية والتميز بين الشركات باعتبارها مستشار تمويل عقاري
                  معتمد من المستشار العقاري ومصنف من الهيئة العامة للعقار.
                </p>
                <p className="text-lg">
                  وبفضل شراكاتنا المتميزة مع الجهات التمويلية من بنوك وشركات
                  اكتسبنا ثقة العملاء وكانت شركة لوكسري هاوسينغ مصدر ثقة لكل
                  الباحثين عن تملك العقارات.
                </p>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <Card className="overflow-hidden shadow-2xl hover-lift">
                <CardContent className="p-0">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250911-WA0022.jpg-YkqgXbwUFDh6Y9okO9Cs4hkrcg8Er2.jpeg"
                    alt="مكتب شركة لوكسري هاوسينغ"
                    className="w-full h-96 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-2xl hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-secondary ml-4" />
                  <h3 className="text-3xl font-bold">الرؤية</h3>
                </div>
                <p className="text-lg leading-relaxed text-slate-100">
                  تتمثل رؤيتنا في أننا نسعى لإحداث تطوير ونمو شامل في هذا القطاع
                  الذي يصب بدوره في حركة النمو الاقتصادية التي تشهدها المملكة
                  العربية السعودية.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground shadow-2xl hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-primary ml-4" />
                  <h3 className="text-3xl font-bold">الرسالة</h3>
                </div>
                <p className="text-lg leading-relaxed">
                  نعمل من أجل تطوير وتسهيل تملك العقار داخل المملكة العربية
                  السعودية والمساهمة في دعم الجهود الرامية إلى تعزيز سوق العقار.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Strategic Objectives */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 text-balance">
              الأهداف الاستراتيجية
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              نسعى لتحقيق مجموعة من الأهداف الاستراتيجية التي تدعم رؤيتنا
              ورسالتنا
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <Card
                key={index}
                className="group hover-lift bg-card shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <objective.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {objective.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {objective.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Slider */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 text-balance">
              معرض الصور
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              جولة في مكاتبنا ومساحات العمل المتميزة
            </p>
          </div>

          <div className="relative">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative h-96 md:h-[600px] overflow-hidden">
                  <img
                    src={
                      galleryImages[currentImageIndex].src || "/placeholder.svg"
                    }
                    alt={galleryImages[currentImageIndex].alt}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <div className="absolute bottom-6 right-6 left-6">
                    <p className="text-white text-lg font-semibold text-shadow">
                      {galleryImages[currentImageIndex].caption}
                    </p>
                  </div>

                  {/* Navigation Buttons */}
                  <Button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white p-3 rounded-full"
                    size="icon"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>

                  <Button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white p-3 rounded-full"
                    size="icon"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 text-balance">
              خدماتنا
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              نقدم مجموعة شاملة من الخدمات العقارية المتخصصة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover-lift bg-card shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 text-balance">
              منتجاتنا
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              مجموعة متنوعة من المنتجات التمويلية والعقارية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card
                key={index}
                className="group hover-lift bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {product}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 text-balance">
              قيمنا
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              في إثراء المساكن نستمد قيمنا من مبادئ وتعاليم الشريعة الإسلامية
              وأفضل الممارسات المهنية
            </p>
          </div>

          <Card className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 text-secondary mx-auto mb-8" />
              <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                نلتزم بأعلى معايير الشفافية والنزاهة في جميع معاملاتنا، ونسعى
                لتقديم خدمات متميزة تلبي احتياجات عملائنا وتحقق طموحاتهم في تملك
                المساكن المناسبة.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
