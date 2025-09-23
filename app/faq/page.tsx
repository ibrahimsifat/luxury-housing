"use client";

import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    question: "ماهو برنامج القرض العقاري المدعوم ؟",
    answer:
      "برنامج القرض العقاري هو برنامج تمويل سكني مدعوم الأرباح لمبلغ يصل حتى 500,000 ريال سعودي متوافق مع أحكام الشريعة الإسلامية.",
  },
  {
    question: "ماهي آلية عمل برنامج القرض العقاري المدعوم ؟",
    answer: `يُعطى البرنامج للشخص المستفيد بعد حصوله على تمويل عقاري من البنوك والشركات التمويلية المشاركة.
يقدم الصندوق مبلغ دعم شهري يغطي أرباح التمويل بنسبة تتراوح بين 35% كحد أدنى و100% كحد أعلى، ويُحول المبلغ لحساب المستفيد
مباشرة بعد سداده للقسط الشهري المستحق عليه من جهة التمويل.`,
  },
  {
    question: "ماهي أهم مميزات برنامج القرض العقاري المدعوم ؟",
    answer: `• تقديم دعم بنسبة 100% لأصحاب الدخل الشهري الذي يصل حتى 14,000 ريال سعودي (أساسي + بدل سكن) بعد خصم التأمينات أو معاشات التقاعد وما دون لتطبيق مبدأ خدمة الأشد حاجةً، في حين تتفاوت نسبة الدعم لأصحاب الدخل الشهري الأعلى.

• مجاز من الهيئات الشرعية لدى جهات التمويل.

• إمكانية تمويل المستفيد من جهات التمويل المشاركة بمبلغ يتجاوز 500,000 ريال سعودي.

• إمكانية التقدم بالتسجيل لطلب الاستحقاق من التمويل السكني المدعوم عن طريق منصة سكني (سكني).

• إمكانية الاستفادة من خدمة تخفيض الدفعة المقدمة من 10% الى 5%. للمبالغ اقل من 800 الف ريال.

• إمكانية التنازل عن طلب القرض لأحد أقربائه من الدرجة الأولى (الزوجه).

• إعطاء المستفيد مهلة سنتين من تاريخ صدور رقمه للاستفادة من البرنامج، أما في حال انتهاء هذه الفترة المحددة دون الاستفادة من الرقم سيتمكن من إعادة التقديم على بوابة الإسكان للحصول على إحدى منتجاتها.

• في حالة الوفاة أو العجز الكلي يتم إعفاء المستفيد وإسقاط التمويل (حسب سياسة الجهة التمويلية) وبالتالي يسقط إيداع مبلغ الدعم عن المستفيد.`,
  },
  {
    question: "ماهي اهم خيارات برنامج القرض العقاري ؟",
    answer: `• شراء وحدة سكنية جاهزة
• تمويل البناء الذاتي
• شراء وحدة سكنية تحت الإنشاء
• تمويل برهن العقار`,
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-right flex items-center justify-between hover:bg-slate-50 transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
          )}
        </div>
        <h3 className="text-lg font-bold text-slate-800 pr-4">{question}</h3>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-8 pb-6">
          <div className="border-t border-slate-100 pt-4">
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {answer}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 md:pt-24 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <HelpCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              الأسئلة الشائعة
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              إجابات على أكثر الأسئلة شيوعاً حول برامج التمويل العقاري والحلول
              السكنية
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              برنامج القرض العقاري المدعوم
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              تعرف على تفاصيل برنامج القرض العقاري المدعوم ومميزاته وآلية عمله
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 rounded-full">
                  <MessageCircle className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                هل لديك المزيد من الأسئلة؟
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                فريقنا المتخصص جاهز للإجابة على جميع استفساراتك وتقديم الاستشارة
                المناسبة لاحتياجاتك التمويلية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                >
                  تواصل معنا
                </motion.a>
                <motion.a
                  href="/apply/real-estate-financing"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-300 shadow-lg"
                >
                  تقدم بطلبك الآن
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
              لماذا تختار شركة لوكسري هاوسينغ؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
              >
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  خبرة واسعة
                </h3>
                <p className="text-slate-600">
                  فريق من الخبراء المتخصصين في التمويل العقاري مع سنوات من
                  الخبرة في السوق السعودي
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
              >
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  سرعة في المعالجة
                </h3>
                <p className="text-slate-600">
                  معالجة سريعة لطلبات التمويل مع متابعة مستمرة حتى الحصول على
                  الموافقة
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
              >
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  خدمة متميزة
                </h3>
                <p className="text-slate-600">
                  نقدم خدمة عملاء متميزة مع دعم مستمر طوال رحلة التمويل العقاري
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
