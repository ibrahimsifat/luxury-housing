"use client"

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Modern Background with Gradients and Patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]"></div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
              من نحن
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance leading-tight">
              <span className="block bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                شركة لوكسري هاوسينغ
              </span>
              <span className="block text-lg md:text-xl font-medium text-slate-600 mt-1">
                رائدة في الحلول العقارية المتكاملة
              </span>
            </h2>

            <div className="flex items-center justify-center gap-2 my-6">
              <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-blue-600 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-8 h-[2px] bg-gradient-to-l from-transparent via-blue-500 to-blue-600 rounded-full"></div>
            </div>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty leading-relaxed">
              نحن نؤمن بأن كل عميل يستحق تجربة عقارية استثنائية
              <span className="font-medium text-slate-700"> من خلال خبرتنا المتميزة منذ عام 2022</span>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] bg-transparent">
              <div className="space-y-8">
                {/* Professional Mission Statement */}
                <div className="border-r-4 border-blue-500 pr-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">رؤيتنا ورسالتنا</h3>
                  <p className="text-lg text-slate-700 leading-relaxed font-medium">
                    شركة لوكسري هاوسينغ العقارية، تأسست عام 2022 كشركة ذات مسؤولية محدودة، متخصصة في تقديم الحلول
                    العقارية المتكاملة بأعلى معايير الجودة والاحترافية.
                  </p>
                </div>

                {/* Key Differentiators */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-800">التميز والأفضلية:</span> اكتسبنا مكانة متميزة بين
                      الشركات العقارية كمستشار تمويل عقاري معتمد ومصنف من الهيئة العامة للعقار.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-800">شراكات استراتيجية:</span> نتعاون مع أفضل الجهات
                      التمويلية من البنوك والشركات المعتمدة لضمان أفضل الحلول لعملائنا.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-800">الثقة والمصداقية:</span> أصبحنا مصدر ثقة لكل
                      الباحثين عن تملك العقارات بفضل خدماتنا المتميزة ونتائجنا المثبتة.
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <p className="text-lg font-medium text-slate-800 text-center">
                    "نحن هنا لنحول أحلامكم العقارية إلى واقع ملموس"
                  </p>
                </div>
              </div>

              {/* Enhanced Decorative Elements */}
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Video Content */}
          <div className="relative">
            <div className="relative group">
              {/* Video Container with Modern Frame */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-2">
                <div className="relative overflow-hidden rounded-2xl">
                  <video className="w-full h-auto object-cover" autoPlay muted loop playsInline preload="metadata">
                   <source
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luxury-about-qFUeXMFblcRXZdSfQ00GicsrMgCAha.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>

                  {/* Enhanced Video Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>

                  {/* Modern Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-xl hover:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1 drop-shadow-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Video Caption */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium text-slate-700">شاهد رحلتنا في تحقيق أحلام العملاء العقارية</p>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
