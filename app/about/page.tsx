"use client";

import { MobileNavigation } from "@/components/mobile-navigation";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Award,
  Briefcase,
  GraduationCap,
  Handshake,
  Heart,
  Lightbulb,
  Mail,
  Phone,
  Shield,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="md:pt-36 pt-20 pb-20 bg-gradient-to-br from-blue-400 to-indigo-300">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              من نحن
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              شركة لوكسري هاوسينج
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              مستشار تمويل عقاري معتمد من الهيئة العامة للعقار، نعمل على تطوير
              وتسهيل تملك العقار داخل المملكة العربية السعودية
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section id="overview" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                نبذة عن الشركة
              </h2>
              <p className="text-lg text-gray-600">
                شركة لوكسري هاوسينج العقارية تأسست عام 2022 ذات مسؤولية محدودة
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    شركة لوكسري هاوسينج العقارية تأسست عام 2022 ذات مسؤولية
                    محدودة نشاطها الرئيسي الحلول العقارية بجميع مصنفاتها. اكتسبت
                    الشركة الأفضلية والتميز بين الشركات باعتبارها مستشار تمويل
                    عقاري معتمد من المستشار العقاري ومصنف من الهيئة العامة
                    للعقار.
                  </p>

                  <p>
                    وبفضل شراكاتنا المتميزة مع الجهات التمويلية من بنوك وشركات
                    اكتسبنا ثقة العملاء وكانت شركة لوكسري هاوسينج مصدر ثقة لكل
                    الباحثين عن تملك العقارات.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                الرسالة
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">رسالتنا</h2>
              <p className="text-lg text-gray-600">
                نعمل من أجل تطوير وتسهيل تملك العقار داخل المملكة العربية
                السعودية والمساهمة في دعم الجهود الرامية إلى تعزيز سوق العقار
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    في شركة لوكسري هاوسينج، نؤمن بأن كل فرد يستحق تحقيق حلمه في
                    امتلاك منزل أحلامه. لذلك نعمل بجد واجتهاد لتقديم أفضل الحلول
                    التمويلية العقارية التي تلبي احتياجات عملائنا وتتجاوز
                    توقعاتهم.
                  </p>

                  <p>
                    رسالتنا تتمثل في أن نكون الجسر الموثوق بين العملاء والتمويل
                    العقاري، من خلال تقديم استشارات مالية متخصصة وحلول تمويلية
                    مبتكرة تساعد في تحقيق أهدافهم العقارية بأفضل الشروط
                    والأسعار.
                  </p>

                  <p>
                    نلتزم بتقديم خدمة متميزة تتميز بالشفافية والوضوح، مع ضمان
                    الحصول على أفضل العروض التمويلية من البنوك وشركات التمويل
                    المعتمدة في المملكة العربية السعودية.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                الرؤية
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">رؤيتنا</h2>
              <p className="text-lg text-gray-600">
                تتمثل رؤيتنا في أننا نسعى لإحداث تطوير ونمو شامل في هذا القطاع
                الذي يصب بدوره في حركة النمو الاقتصادية التي تشهدها المملكة
                العربية السعودية
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    نطمح لأن نكون الرائدين في مجال التمويل العقاري في المملكة
                    العربية السعودية، من خلال تقديم حلول مبتكرة ومتطورة تساهم في
                    تطوير القطاع العقاري وتعزيز النمو الاقتصادي.
                  </p>

                  <p>
                    نسعى لبناء مستقبل أفضل للتمويل العقاري من خلال الاستفادة من
                    التطورات التقنية والابتكارات المالية، مع الحفاظ على القيم
                    الأصيلة للثقة والشفافية في التعامل مع عملائنا.
                  </p>

                  <p>
                    نؤمن بأن التمويل العقاري ليس مجرد خدمة مالية، بل هو وسيلة
                    لتحقيق الأحلام وبناء المستقبل، لذلك نعمل على تطوير حلول
                    شاملة تلبي احتياجات جميع شرائح المجتمع.
                  </p>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-bold text-blue-900 mb-3">
                      الريادة في القطاع
                    </h3>
                    <p className="text-blue-800 text-sm">
                      أن نكون الشركة الرائدة في تقديم حلول التمويل العقاري
                      المبتكرة
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-bold text-green-900 mb-3">
                      النمو الاقتصادي
                    </h3>
                    <p className="text-green-800 text-sm">
                      المساهمة في دعم النمو الاقتصادي الشامل للمملكة العربية
                      السعودية
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-bold text-purple-900 mb-3">
                      الابتكار والتطوير
                    </h3>
                    <p className="text-purple-800 text-sm">
                      تطوير حلول مالية متطورة تستخدم أحدث التقنيات والابتكارات
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section
        id="goals"
        className="py-20 bg-gradient-to-br from-green-50 to-emerald-100"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                الأهداف
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">أهدافنا</h2>
              <p className="text-lg text-gray-600">
                نسعى لتحقيق أهدافنا الاستراتيجية من خلال تقديم أفضل الحلول
                التمويلية العقارية وخدمة عملائنا بأعلى معايير الجودة
              </p>
            </div>

            {/* Company Stats */}
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-12">
                إنجازاتنا في الأرقام
              </h3>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter
                      end={500}
                      suffix="+"
                      duration={2.5}
                      delay={0.2}
                    />
                  </div>
                  <div className="text-gray-600">عقار تم تمويله</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    <AnimatedCounter
                      end={1000}
                      suffix="+"
                      duration={2.5}
                      delay={0.4}
                    />
                  </div>
                  <div className="text-gray-600">عميل راضي</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    <AnimatedCounter
                      end={15}
                      suffix="+"
                      duration={2.5}
                      delay={0.6}
                    />
                  </div>
                  <div className="text-gray-600">سنة خبرة</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    <AnimatedCounter
                      end={25}
                      suffix="+"
                      duration={2.5}
                      delay={0.8}
                    />
                  </div>
                  <div className="text-gray-600">مدينة نخدمها</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                القيم
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                قيمنا الأساسية
              </h2>
              <p className="text-lg text-gray-600">
                نؤمن بأن القيم الأساسية هي العمود الفقري لأي شركة ناجحة، لذلك
                نلتزم بقيم راسخة توجهنا في كل قرار نتخذه وكل خدمة نقدمها
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  الثقة والموثوقية
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  نؤمن بأن الثقة هي أساس أي علاقة ناجحة، لذلك نعمل على بناء
                  علاقات قوية ومستدامة مع عملائنا وشركائنا من خلال الوفاء
                  بوعودنا وتقديم خدمات موثوقة.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  الشفافية والوضوح
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  نلتزم بالشفافية الكاملة في جميع تعاملاتنا، مع تقديم معلومات
                  واضحة ومفصلة حول جميع الخدمات والأسعار، مما يضمن ثقة العملاء
                  ورضاهم.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  خدمة العملاء أولاً
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  نضع احتياجات عملائنا في المقدمة، ونعمل على تقديم تجربة
                  استثنائية تلبي توقعاتهم وتتجاوزها، مع ضمان رضاهم التام عن
                  خدماتنا.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  التميز والجودة
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  نسعى للتميز في كل ما نقوم به، من خلال تقديم خدمات عالية الجودة
                  تتميز بالكفاءة والدقة، مع الالتزام بأعلى المعايير المهنية.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  الابتكار والتطوير
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  نؤمن بأهمية الابتكار والتطوير المستمر، لذلك نعمل على تطوير
                  حلول جديدة ومبتكرة تلبي احتياجات السوق المتغيرة وتتجاوز توقعات
                  العملاء.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  الشراكة والتعاون
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  نؤمن بقوة الشراكة والتعاون، لذلك نعمل على بناء علاقات قوية مع
                  البنوك وشركات التمويل والشركاء الآخرين لضمان تقديم أفضل
                  الخدمات لعملائنا.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        className="py-20 bg-gradient-to-br from-orange-50 to-red-100"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                فريق العمل
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                فريقنا المتميز
              </h2>
              <p className="text-lg text-gray-600">
                فريق متخصص من الخبراء والمستشارين المعتمدين، يعملون بجد لتحقيق
                أحلام عملائنا في امتلاك العقارات
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  فريق الاستشارات المالية
                </h3>
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  مستشارين تمويل عقاري معتمدين
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  فريق متخصص من المستشارين المعتمدين من الهيئة العامة للعقار،
                  يتمتعون بخبرة واسعة في مجال التمويل العقاري
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-600">الخبرة</div>
                    <div className="font-bold text-gray-900">
                      <AnimatedCounter
                        end={15}
                        suffix="+ سنة خبرة"
                        duration={2}
                        delay={0}
                      />
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-600">الإنجازات</div>
                    <div className="font-bold text-gray-900">
                      <AnimatedCounter
                        end={1000}
                        suffix="+ عميل راضي"
                        duration={2}
                        delay={0.1}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  فريق خدمة العملاء
                </h3>
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  متخصصين في خدمة العملاء
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  فريق متميز من متخصصي خدمة العملاء، يعملون على تقديم أفضل تجربة
                  للعملاء من البداية حتى النهاية
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-600">الخبرة</div>
                    <div className="font-bold text-gray-900">
                      <AnimatedCounter
                        end={10}
                        suffix="+ سنة خبرة"
                        duration={2}
                        delay={0.2}
                      />
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-600">الإنجازات</div>
                    <div className="font-bold text-gray-900">
                      متابعة مستمرة 24/7
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  فريق التطوير والتدريب
                </h3>
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  متخصصين في التطوير المهني
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  فريق متخصص في التطوير المستمر والتدريب، يضمن تقديم أحدث الحلول
                  التمويلية وأفضل الممارسات
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-600">الخبرة</div>
                    <div className="font-bold text-gray-900">
                      <AnimatedCounter
                        end={8}
                        suffix="+ سنة خبرة"
                        duration={2}
                        delay={0.4}
                      />
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-600">الإنجازات</div>
                    <div className="font-bold text-gray-900">تدريب مستمر</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  فريق العلاقات المصرفية
                </h3>
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  متخصصين في العلاقات المصرفية
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  فريق متخصص في بناء العلاقات مع البنوك وشركات التمويل، يضمن
                  الحصول على أفضل العروض التمويلية
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-600">الخبرة</div>
                    <div className="font-bold text-gray-900">
                      <AnimatedCounter
                        end={12}
                        suffix="+ سنة خبرة"
                        duration={2}
                        delay={0.6}
                      />
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-600">الإنجازات</div>
                    <div className="font-bold text-gray-900">
                      <AnimatedCounter
                        end={25}
                        suffix="+ بنك شريك"
                        duration={2}
                        delay={0.7}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Team Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                تواصل مع فريقنا
              </h3>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                <p className="text-lg text-gray-700 mb-8">
                  فريقنا جاهز لمساعدتك في تحقيق حلمك في امتلاك العقار. تواصل
                  معنا للحصول على استشارة مجانية
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">اتصل بنا</h4>
                        <p className="text-gray-600">
                          للحصول على استشارة فورية
                        </p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      0581111488
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">راسلنا</h4>
                        <p className="text-gray-600">للاستفسارات والاستشارات</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-blue-600">
                      info@luxuryhousing.sa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MobileNavigation />
    </div>
  );
}
