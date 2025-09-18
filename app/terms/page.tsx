import Footer from "@/components/footer";
import Header from "@/components/header";
import { ScrollAnimation } from "@/components/scroll-animations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام - Luxury Housing",
  description:
    "شروط وأحكام استخدام خدمات Luxury Housing للتمويل العقاري الفاخر",
};

export default function TermsPage() {
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
              الشروط والأحكام
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8">
              شروط وأحكام استخدام خدمات Luxury Housing للتمويل العقاري الفاخر
            </p>
            <div className="text-sm text-slate-300">
              آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Terms Content */}
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
                    مرحباً بكم في Luxury Housing، شركة التمويل العقاري الرائدة
                    في المملكة العربية السعودية. هذه الشروط والأحكام تحكم
                    استخدامكم لموقعنا الإلكتروني وخدماتنا المالية المتخصصة في
                    التمويل العقاري الفاخر.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    باستخدامكم لموقعنا أو خدماتنا، فإنكم توافقون على الالتزام
                    بهذه الشروط والأحكام. إذا كنتم لا توافقون على أي جزء من هذه
                    الشروط، يرجى عدم استخدام موقعنا أو خدماتنا.
                  </p>
                </div>

                {/* Definitions */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    التعريفات
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        "الشركة"
                      </h3>
                      <p className="text-slate-700">
                        تشير إلى Luxury Housing وشركاتها التابعة.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        "العميل"
                      </h3>
                      <p className="text-slate-700">
                        أي شخص طبيعي أو اعتباري يستخدم خدماتنا.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        "الخدمات"
                      </h3>
                      <p className="text-slate-700">
                        جميع الخدمات المالية والعقارية التي نقدمها.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        "الموقع"
                      </h3>
                      <p className="text-slate-700">
                        موقعنا الإلكتروني وجميع صفحاته الفرعية.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Services Terms */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    شروط الخدمات
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        التمويل العقاري
                      </h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-2">
                        <li>
                          جميع طلبات التمويل تخضع للموافقة حسب الشروط والأحكام
                          المحددة
                        </li>
                        <li>
                          نحتفظ بالحق في رفض أي طلب تمويل دون إبداء الأسباب
                        </li>
                        <li>أسعار الفائدة قابلة للتغيير حسب ظروف السوق</li>
                        <li>
                          التمويل متاح للمواطنين السعوديين والمقيمين المؤهلين
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        الخدمات الاستشارية
                      </h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-2">
                        <li>الاستشارات المقدمة لأغراض إعلامية فقط</li>
                        <li>لا تشكل الاستشارات توصيات استثمارية</li>
                        <li>يُنصح بالحصول على استشارة مالية مستقلة</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    شروط الأهلية
                  </h2>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">
                      متطلبات العميل
                    </h3>
                    <ul className="list-disc list-inside text-blue-800 space-y-2">
                      <li>أن يكون العميل مواطناً سعودياً أو مقيماً مؤهلاً</li>
                      <li>أن يكون عمره 21 سنة أو أكثر</li>
                      <li>أن يمتلك دخل شهري ثابت ومستقر</li>
                      <li>أن يكون لديه سجل ائتماني جيد</li>
                      <li>أن يقدم جميع الوثائق المطلوبة</li>
                    </ul>
                  </div>
                </div>

                {/* Financial Terms */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    الشروط المالية
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-green-900 mb-3">
                        أسعار الفائدة
                      </h3>
                      <p className="text-green-800">
                        أسعار الفائدة قابلة للتغيير حسب ظروف السوق المالية
                        والسياسات المصرفية. سيتم إبلاغ العميل بالأسعار النهائية
                        قبل توقيع العقد.
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-yellow-900 mb-3">
                        الرسوم والعمولات
                      </h3>
                      <p className="text-yellow-800">
                        قد تطبق رسوم إدارية ورسوم معالجة على بعض الخدمات. سيتم
                        توضيح جميع الرسوم للعميل مسبقاً.
                      </p>
                    </div>
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-red-900 mb-3">
                        التأخير في السداد
                      </h3>
                      <p className="text-red-800">
                        في حالة التأخير في السداد، قد تطبق رسوم تأخير وفقاً
                        للقوانين المعمول بها والشروط المتفق عليها في العقد.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Privacy and Data */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    الخصوصية وحماية البيانات
                  </h2>
                  <div className="space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      نحن ملتزمون بحماية خصوصيتكم وبياناتكم الشخصية. يتم جمع
                      ومعالجة البيانات وفقاً لسياسة الخصوصية الخاصة بنا
                      والقوانين المعمول بها في المملكة العربية السعودية.
                    </p>
                    <ul className="list-disc list-inside text-slate-700 space-y-2">
                      <li>نستخدم البيانات فقط للأغراض المحددة</li>
                      <li>نحافظ على سرية المعلومات المالية</li>
                      <li>نتبع أعلى معايير الأمان في حماية البيانات</li>
                      <li>نحترم حقكم في الوصول وتعديل بياناتكم</li>
                    </ul>
                  </div>
                </div>

                {/* Limitation of Liability */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    حدود المسؤولية
                  </h2>
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <p className="text-slate-700 leading-relaxed mb-4">
                      لا تتحمل الشركة مسؤولية عن أي خسائر أو أضرار قد تنتج عن:
                    </p>
                    <ul className="list-disc list-inside text-slate-700 space-y-2">
                      <li>استخدام الموقع أو الخدمات</li>
                      <li>عدم توفر الخدمات لأي سبب كان</li>
                      <li>تغييرات في القوانين أو الأنظمة</li>
                      <li>أي أحداث خارجة عن سيطرتنا</li>
                    </ul>
                  </div>
                </div>

                {/* Termination */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    إنهاء الخدمة
                  </h2>
                  <div className="space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      يحق للشركة إنهاء أو تعليق الخدمات في الحالات التالية:
                    </p>
                    <ul className="list-disc list-inside text-slate-700 space-y-2">
                      <li>عدم الالتزام بالشروط والأحكام</li>
                      <li>تقديم معلومات خاطئة أو مضللة</li>
                      <li>عدم السداد في المواعيد المحددة</li>
                      <li>أي انتهاك للقوانين المعمول بها</li>
                    </ul>
                  </div>
                </div>

                {/* Governing Law */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    القانون الحاكم
                  </h2>
                  <div className="bg-slate-100 p-6 rounded-lg">
                    <p className="text-slate-700 leading-relaxed">
                      تحكم هذه الشروط والأحكام قوانين المملكة العربية السعودية.
                      أي نزاعات تنشأ عن هذه الشروط تخضع للاختصاص الحصري للمحاكم
                      السعودية.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    معلومات الاتصال
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Luxury Housing
                    </h3>
                    <div className="space-y-3 text-slate-700">
                      <p>
                        <strong>العنوان:</strong> المملكة العربية السعودية
                      </p>
                      <p>
                        <strong>الهاتف:</strong> +966 XX XXX XXXX
                      </p>
                      <p>
                        <strong>البريد الإلكتروني:</strong>{" "}
                        info@luxuryhousing.com
                      </p>
                      <p>
                        <strong>الموقع الإلكتروني:</strong>{" "}
                        www.luxuryhousing.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Updates */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 font-cairo">
                    تحديث الشروط
                  </h2>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <p className="text-slate-700 leading-relaxed">
                      نحتفظ بالحق في تحديث هذه الشروط والأحكام في أي وقت. سيتم
                      إشعار العملاء بأي تغييرات عبر الموقع أو البريد الإلكتروني.
                      استمرار استخدام الخدمات بعد التحديثات يعتبر موافقة على
                      الشروط الجديدة.
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
