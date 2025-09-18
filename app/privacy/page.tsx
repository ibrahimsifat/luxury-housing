import Footer from "@/components/footer";
import Header from "@/components/header";
import { ScrollAnimation } from "@/components/scroll-animations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية - Luxury Housing",
  description: "سياسة الخصوصية وحماية البيانات الشخصية لـ Luxury Housing",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)] opacity-60"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:mt-14 mt-10">
          <ScrollAnimation animation="fadeInUp">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-cairo">
              سياسة الخصوصية
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8">
              حماية خصوصيتكم وبياناتكم الشخصية هي أولويتنا القصوى
            </p>
            <div className="text-sm text-slate-300">
              آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeInUp">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {/* Introduction */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    مقدمة
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-6">
                    في Luxury Housing، نحن ملتزمون بحماية خصوصيتكم وبياناتكم
                    الشخصية. هذه السياسة توضح كيفية جمعنا واستخدامنا وحماية
                    معلوماتكم الشخصية وفقاً لأعلى معايير الأمان والخصوصية.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    نحن نتبع القوانين والأنظمة المعمول بها في المملكة العربية
                    السعودية بما في ذلك نظام حماية البيانات الشخصية.
                  </p>
                </div>

                {/* Information We Collect */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    المعلومات التي نجمعها
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">
                        المعلومات الشخصية
                      </h3>
                      <ul className="list-disc list-inside text-blue-800 space-y-2">
                        <li>الاسم الكامل وتاريخ الميلاد</li>
                        <li>رقم الهوية الوطنية أو الإقامة</li>
                        <li>العنوان ورقم الهاتف</li>
                        <li>البريد الإلكتروني</li>
                        <li>الحالة الاجتماعية والوظيفية</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-green-900 mb-4">
                        المعلومات المالية
                      </h3>
                      <ul className="list-disc list-inside text-green-800 space-y-2">
                        <li>الراتب الشهري ومصادر الدخل</li>
                        <li>كشوف الحسابات البنكية</li>
                        <li>التقييم الائتماني</li>
                        <li>الالتزامات المالية الحالية</li>
                        <li>معلومات الضرائب</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-purple-900 mb-4">
                        معلومات العقار
                      </h3>
                      <ul className="list-disc list-inside text-purple-800 space-y-2">
                        <li>تفاصيل العقار المراد تمويله</li>
                        <li>معلومات البائع أو المطور</li>
                        <li>الوثائق العقارية</li>
                        <li>تقييم العقار</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-yellow-900 mb-4">
                        معلومات تقنية
                      </h3>
                      <ul className="list-disc list-inside text-yellow-800 space-y-2">
                        <li>عنوان IP وموقع الجهاز</li>
                        <li>نوع المتصفح ونظام التشغيل</li>
                        <li>صفحات الموقع التي تم زيارتها</li>
                        <li>وقت ومدة الزيارة</li>
                        <li>ملفات تعريف الارتباط (Cookies)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* How We Use Information */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    كيفية استخدام المعلومات
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">
                        أغراض الخدمة
                      </h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-2">
                        <li>تقييم طلبات التمويل العقاري</li>
                        <li>معالجة الطلبات وتقديم الخدمات</li>
                        <li>التواصل مع العملاء بشأن طلباتهم</li>
                        <li>تقديم الاستشارات المالية</li>
                        <li>متابعة حالة القروض والتمويل</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">
                        أغراض قانونية
                      </h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-2">
                        <li>الامتثال للقوانين والأنظمة المحلية</li>
                        <li>منع الاحتيال والأنشطة غير القانونية</li>
                        <li>حماية حقوقنا وحقوق العملاء</li>
                        <li>الرد على الطلبات الحكومية</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">
                        أغراض تحسين الخدمة
                      </h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-2">
                        <li>تحليل استخدام الموقع والخدمات</li>
                        <li>تحسين تجربة المستخدم</li>
                        <li>تطوير منتجات وخدمات جديدة</li>
                        <li>إجراء البحوث والدراسات</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Data Sharing */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    مشاركة البيانات
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-red-900 mb-4">
                        نحن لا نبيع بياناتكم
                      </h3>
                      <p className="text-red-800">
                        نحن لا نبيع أو نؤجر أو نشارك معلوماتكم الشخصية مع أطراف
                        ثالثة لأغراض تسويقية أو تجارية.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">
                        مشاركة محدودة
                      </h3>
                      <p className="text-slate-700 mb-4">
                        نشارك معلوماتكم فقط في الحالات التالية:
                      </p>
                      <ul className="list-disc list-inside text-slate-700 space-y-2">
                        <li>مع البنوك والمؤسسات المالية لتقديم الخدمات</li>
                        <li>مع مقدمي الخدمات الموثوقين (تحت اتفاقيات سرية)</li>
                        <li>عندما يتطلب القانون ذلك</li>
                        <li>لحماية حقوقنا أو حقوق الآخرين</li>
                        <li>بموافقتكم الصريحة</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Data Security */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    أمان البيانات
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-green-900 mb-4">
                        إجراءات الحماية
                      </h3>
                      <ul className="list-disc list-inside text-green-800 space-y-2">
                        <li>تشفير البيانات أثناء النقل والتخزين</li>
                        <li>استخدام جدران حماية متقدمة</li>
                        <li>مراقبة الوصول والأنشطة المشبوهة</li>
                        <li>تدريب الموظفين على حماية البيانات</li>
                        <li>اختبارات أمنية دورية</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">
                        الوصول المحدود
                      </h3>
                      <p className="text-blue-800">
                        فقط الموظفون المصرح لهم يمكنهم الوصول إلى بياناتكم
                        الشخصية، وهم ملتزمون بسياسات السرية الصارمة.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Your Rights */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    حقوقكم
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-purple-900 mb-4">
                        حق الوصول
                      </h3>
                      <p className="text-purple-800">
                        يمكنكم طلب نسخة من بياناتكم الشخصية التي نحتفظ بها.
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-yellow-900 mb-4">
                        حق التصحيح
                      </h3>
                      <p className="text-yellow-800">
                        يمكنكم طلب تصحيح أي معلومات غير دقيقة أو غير مكتملة.
                      </p>
                    </div>
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-red-900 mb-4">
                        حق الحذف
                      </h3>
                      <p className="text-red-800">
                        يمكنكم طلب حذف بياناتكم في ظروف معينة، مع مراعاة
                        الالتزامات القانونية.
                      </p>
                    </div>
                    <div className="bg-indigo-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                        حق الاعتراض
                      </h3>
                      <p className="text-indigo-800">
                        يمكنكم الاعتراض على معالجة بياناتكم لأغراض معينة.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cookies */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    ملفات تعريف الارتباط (Cookies)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      نستخدم ملفات تعريف الارتباط لتحسين تجربتكم على موقعنا.
                      يمكنكم التحكم في ملفات تعريف الارتباط من خلال إعدادات
                      المتصفح.
                    </p>
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        أنواع ملفات تعريف الارتباط
                      </h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-2">
                        <li>
                          <strong>الأساسية:</strong> ضرورية لعمل الموقع
                        </li>
                        <li>
                          <strong>الأداء:</strong> تساعد في تحليل استخدام الموقع
                        </li>
                        <li>
                          <strong>الوظيفية:</strong> تحفظ تفضيلاتكم
                        </li>
                        <li>
                          <strong>التسويقية:</strong> تستخدم لتخصيص الإعلانات
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Data Retention */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    الاحتفاظ بالبيانات
                  </h2>
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <p className="text-slate-700 leading-relaxed mb-4">
                      نحتفظ ببياناتكم الشخصية طالما كانت ضرورية للأغراض المحددة،
                      أو كما يتطلب القانون. عادة ما نحتفظ بالبيانات لمدة:
                    </p>
                    <ul className="list-disc list-inside text-slate-700 space-y-2">
                      <li>7 سنوات بعد انتهاء العلاقة التعاقدية</li>
                      <li>10 سنوات للبيانات المالية</li>
                      <li>حسب المتطلبات القانونية</li>
                    </ul>
                  </div>
                </div>

                {/* International Transfers */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    النقل الدولي للبيانات
                  </h2>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-slate-700 leading-relaxed">
                      في حال نقل بياناتكم خارج المملكة العربية السعودية، نضمن أن
                      يتم ذلك وفقاً للمعايير الدولية لحماية البيانات وأن يكون
                      البلد المستلم يوفر مستوى حماية مناسب.
                    </p>
                  </div>
                </div>

                {/* Children's Privacy */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    خصوصية الأطفال
                  </h2>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <p className="text-slate-700 leading-relaxed">
                      خدماتنا مخصصة للأشخاص الذين تزيد أعمارهم عن 18 عاماً. نحن
                      لا نجمع معلومات شخصية من الأطفال دون سن 18 عاماً عن قصد.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    التواصل معنا
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      للاستفسارات حول الخصوصية
                    </h3>
                    <div className="space-y-3 text-slate-700">
                      <p>
                        <strong>مسؤول حماية البيانات:</strong>{" "}
                        privacy@luxuryhousing.com
                      </p>
                      <p>
                        <strong>الهاتف:</strong> +966 XX XXX XXXX
                      </p>
                      <p>
                        <strong>العنوان:</strong> المملكة العربية السعودية
                      </p>
                      <p>
                        <strong>أوقات العمل:</strong> الأحد - الخميس، 8:00 ص -
                        5:00 م
                      </p>
                    </div>
                  </div>
                </div>

                {/* Updates */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    تحديث السياسة
                  </h2>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <p className="text-slate-700 leading-relaxed">
                      قد نحدث هذه السياسة من وقت لآخر. سنقوم بإشعاركم بأي
                      تغييرات مهمة عبر الموقع أو البريد الإلكتروني. ننصحكم
                      بمراجعة هذه السياسة بانتظام.
                    </p>
                  </div>
                </div>

                {/* Compliance */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    الامتثال القانوني
                  </h2>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <p className="text-slate-700 leading-relaxed">
                      نحن ملتزمون بجميع القوانين والأنظمة المعمول بها في المملكة
                      العربية السعودية بما في ذلك نظام حماية البيانات الشخصية
                      وقانون مكافحة الجرائم المعلوماتية.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
      <Footer />
    </div>
  );
}
