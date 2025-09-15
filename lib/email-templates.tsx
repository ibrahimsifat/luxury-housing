export interface EmailTemplateData {
  name: string
  email: string
  phone: string
  message: string
  service?: string
  formType: "contact" | "service" | "product" | "hero"
  inquiryType?: string
  preferredContact?: string
  monthlyIncome?: string
  requestedAmount?: string
  propertyType?: string
  currentEmployment?: string
  city?: string
}

export function generateEmailSubject(data: EmailTemplateData): string {
  const { name, formType, service } = data

  switch (formType) {
    case "contact":
      return `استفسار جديد من ${name} - نموذج التواصل`
    case "service":
      return `استفسار عن الخدمة من ${name} - ${service || "خدمة غير محددة"}`
    case "product":
      return `استفسار عن المنتج من ${name} - ${service || "منتج غير محدد"}`
    case "hero":
      return `طلب استشارة مجانية من ${name} - الصفحة الرئيسية`
    default:
      return `استفسار جديد من ${name}`
  }
}

export function generateCompanyEmailTemplate(data: EmailTemplateData): string {
  const {
    name,
    email,
    phone,
    message,
    service,
    formType,
    inquiryType,
    preferredContact,
    monthlyIncome,
    requestedAmount,
    propertyType,
    currentEmployment,
    city,
  } = data

  const subject = generateEmailSubject(data)

  let additionalInfo = ""
  let formTypeDisplay = ""

  switch (formType) {
    case "contact":
      formTypeDisplay = "نموذج التواصل"
      break
    case "service":
      formTypeDisplay = "نموذج استفسار الخدمة"
      additionalInfo = `
        <tr>
          <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold; width: 30%;">نوع الاستفسار:</td>
          <td style="padding: 12px; border: 1px solid #e0e0e0;">${inquiryType || "غير محدد"}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold;">طريقة التواصل المفضلة:</td>
          <td style="padding: 12px; border: 1px solid #e0e0e0;">${getPreferredContactDisplay(preferredContact)}</td>
        </tr>
      `
      break
    case "product":
      formTypeDisplay = "نموذج استفسار المنتج"
      additionalInfo = `
        <tr>
          <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold; width: 30%;">المدينة:</td>
          <td style="padding: 12px; border: 1px solid #e0e0e0;">${getCityDisplay(city)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold;">الراتب الشهري:</td>
          <td style="padding: 12px; border: 1px solid #e0e0e0;">${getIncomeDisplay(monthlyIncome)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold;">المبلغ المطلوب:</td>
          <td style="padding: 12px; border: 1px solid #e0e0e0;">${requestedAmount || "غير محدد"}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold;">نوع العقار:</td>
          <td style="padding: 12px; border: 1px solid #e0e0e0;">${getPropertyTypeDisplay(propertyType)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold;">جهة العمل:</td>
          <td style="padding: 12px; border: 1px solid #e0e0e0;">${getEmploymentDisplay(currentEmployment)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold;">نوع الاستفسار:</td>
          <td style="padding: 12px; border: 1px solid #e0e0e0;">${getInquiryTypeDisplay(inquiryType)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold;">طريقة التواصل المفضلة:</td>
          <td style="padding: 12px; border: 1px solid #e0e0e0;">${getPreferredContactDisplay(preferredContact)}</td>
        </tr>
      `
      break
    case "hero":
      formTypeDisplay = "نموذج الاستشارة المجانية"
      break
    default:
      formTypeDisplay = "نموذج عام"
  }

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .priority-high { border-left: 5px solid #dc3545; }
        .priority-medium { border-left: 5px solid #ffc107; }
        .priority-low { border-left: 5px solid #28a745; }
      </style>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #003366 0%, #0066cc 100%); padding: 40px 30px; text-align: center; border-radius: 15px 15px 0 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">شركة لوكسري هاوسينغ</h1>
        <p style="color: #ffd700; margin: 15px 0 0 0; font-size: 18px; font-weight: 500;">للحلول العقارية</p>
        <div style="width: 60px; height: 3px; background: #ffd700; margin: 15px auto 0; border-radius: 2px;"></div>
      </div>
      
      <!-- Main Content -->
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        
        <!-- Alert Banner -->
        <div style="background: linear-gradient(135deg, #dc3545, #c82333); color: white; padding: 20px; border-radius: 10px; margin-bottom: 30px; text-align: center; box-shadow: 0 2px 10px rgba(220,53,69,0.3);">
          <h2 style="margin: 0; font-size: 24px; font-weight: bold;">🚨 استفسار جديد - يتطلب متابعة فورية</h2>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">تم استلام ${formTypeDisplay} جديد</p>
        </div>
        
        <h2 style="color: #003366; border-bottom: 3px solid #ffd700; padding-bottom: 15px; margin-bottom: 30px; font-size: 26px;">${subject}</h2>
        
        <!-- Customer Information Table -->
        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 30px; border: 1px solid #e9ecef;">
          <h3 style="color: #003366; margin-top: 0; margin-bottom: 20px; font-size: 20px; display: flex; align-items: center;">
            <span style="background: #003366; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-left: 10px; font-size: 16px;">👤</span>
            معلومات العميل
          </h3>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold; width: 30%;">الاسم الكامل:</td>
              <td style="padding: 12px; border: 1px solid #e0e0e0; font-size: 16px; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold;">البريد الإلكتروني:</td>
              <td style="padding: 12px; border: 1px solid #e0e0e0;">
                <a href="mailto:${email}" style="color: #0066cc; text-decoration: none; font-weight: 500; padding: 5px 10px; background: #e3f2fd; border-radius: 5px; display: inline-block;">
                  📧 ${email}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold;">رقم الهاتف:</td>
              <td style="padding: 12px; border: 1px solid #e0e0e0;">
                <a href="tel:${phone}" style="color: #0066cc; text-decoration: none; font-weight: 500; padding: 5px 10px; background: #e8f5e8; border-radius: 5px; display: inline-block;">
                  📱 ${phone}
                </a>
              </td>
            </tr>
            ${
              service
                ? `
            <tr>
              <td style="padding: 12px; border: 1px solid #e0e0e0; background-color: #f8f9fa; font-weight: bold;">الخدمة/المنتج:</td>
              <td style="padding: 12px; border: 1px solid #e0e0e0;">
                <span style="background: #fff3cd; color: #856404; padding: 5px 10px; border-radius: 5px; font-weight: 500;">
                  ${service}
                </span>
              </td>
            </tr>
            `
                : ""
            }
            ${additionalInfo}
          </table>
        </div>
        
        <!-- Message Section -->
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 10px; border-right: 5px solid #ffd700; margin-bottom: 30px;">
          <h3 style="color: #003366; margin-top: 0; margin-bottom: 15px; font-size: 20px; display: flex; align-items: center;">
            <span style="background: #ffd700; color: #003366; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-left: 10px; font-size: 16px;">💬</span>
            رسالة العميل
          </h3>
          <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);">
            <p style="white-space: pre-wrap; margin: 0; line-height: 1.8; font-size: 16px; color: #495057;">${message}</p>
          </div>
        </div>
        
        <!-- Action Required Section -->
        <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 25px; border-radius: 10px; border: 1px solid #ffeaa7; margin-bottom: 30px;">
          <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px; display: flex; align-items: center;">
            <span style="background: #856404; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-left: 10px; font-size: 16px;">⚡</span>
            إجراءات مطلوبة
          </h3>
          <ul style="margin: 0; padding-right: 20px; color: #856404;">
            <li style="margin-bottom: 8px; font-weight: 500;">التواصل مع العميل خلال 24 ساعة كحد أقصى</li>
            <li style="margin-bottom: 8px; font-weight: 500;">تحديد موعد للاستشارة إذا لزم الأمر</li>
            <li style="margin-bottom: 8px; font-weight: 500;">إرسال المعلومات والعروض المناسبة</li>
            <li style="margin-bottom: 0; font-weight: 500;">متابعة حالة الاستفسار في النظام</li>
          </ul>
        </div>
        
        <!-- Quick Actions -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h3 style="color: #003366; margin-bottom: 20px;">إجراءات سريعة</h3>
          <div style="display: inline-block; margin: 0 10px;">
            <a href="tel:${phone}" style="background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(40,167,69,0.3); transition: all 0.3s;">
              📞 اتصال مباشر
            </a>
          </div>
          <div style="display: inline-block; margin: 0 10px;">
            <a href="https://wa.me/${phone.replace(/\D/g, "")}" style="background: linear-gradient(135deg, #25d366, #128c7e); color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(37,211,102,0.3); transition: all 0.3s;">
              💬 واتساب
            </a>
          </div>
          <div style="display: inline-block; margin: 0 10px;">
            <a href="mailto:${email}" style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(0,123,255,0.3); transition: all 0.3s;">
              📧 رد بالإيميل
            </a>
          </div>
        </div>
        
        <!-- Timestamp -->
        <div style="background: #e8f4fd; padding: 20px; border-radius: 10px; text-align: center; border: 1px solid #b8daff;">
          <p style="margin: 0; color: #003366; font-weight: bold; font-size: 16px;">
            📅 تم إرسال هذا الاستفسار في: ${new Date().toLocaleString("ar-SA", {
              timeZone: "Asia/Riyadh",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 14px;">التوقيت: المملكة العربية السعودية</p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; margin-top: 30px; padding: 25px; background: #f8f9fa; border-radius: 10px; border: 1px solid #e9ecef;">
        <div style="margin-bottom: 15px;">
          <h4 style="color: #003366; margin: 0 0 10px 0; font-size: 20px;">شركة لوكسري هاوسينغ للحلول العقارية</h4>
          <p style="color: #6c757d; margin: 0; font-size: 14px; font-style: italic;">مستشار تمويل عقاري معتمد من الهيئة العامة للعقار</p>
        </div>
        <div style="border-top: 1px solid #dee2e6; padding-top: 15px;">
          <p style="margin: 5px 0; color: #495057; font-size: 14px;">📍 الدمام، المملكة العربية السعودية</p>
          <p style="margin: 5px 0; color: #495057; font-size: 14px;">📞 هاتف: 0581111488</p>
          <p style="margin: 5px 0; color: #495057; font-size: 14px;">📧 بريد إلكتروني: info@luxuryhousing.sa</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function generateCustomerConfirmationTemplate(
  name: string,
  formType: "contact" | "service" | "product" | "hero",
): string {
  let formTypeArabic = ""
  let expectedResponse = ""
  let nextSteps = ""

  switch (formType) {
    case "contact":
      formTypeArabic = "التواصل"
      expectedResponse = "سنقوم بمراجعة استفسارك والرد عليك بالمعلومات المطلوبة"
      nextSteps = `
        <li>مراجعة استفسارك من قبل فريق خدمة العملاء</li>
        <li>التواصل معك لتوضيح أي تفاصيل إضافية</li>
        <li>تقديم الحلول والخدمات المناسبة لاحتياجاتك</li>
      `
      break
    case "service":
      formTypeArabic = "استفسار الخدمة"
      expectedResponse = "سيتواصل معك أحد مختصي الخدمات لتقديم التفاصيل الكاملة"
      nextSteps = `
        <li>مراجعة طلب الخدمة من قبل المختص</li>
        <li>إعداد عرض مفصل للخدمة المطلوبة</li>
        <li>تحديد موعد للاستشارة إذا لزم الأمر</li>
      `
      break
    case "product":
      formTypeArabic = "استفسار المنتج"
      expectedResponse = "سيقوم مستشار التمويل بمراجعة طلبك وتقديم أفضل الحلول التمويلية"
      nextSteps = `
        <li>تحليل وضعك المالي والمتطلبات</li>
        <li>البحث عن أفضل العروض التمويلية المناسبة</li>
        <li>تقديم استشارة شاملة حول خيارات التمويل</li>
        <li>مساعدتك في إجراءات التقديم إذا رغبت</li>
      `
      break
    case "hero":
      formTypeArabic = "طلب الاستشارة المجانية"
      expectedResponse = "سيتواصل معك مستشار تمويل معتمد لتقديم استشارة مجانية شاملة"
      nextSteps = `
        <li>تحديد موعد مناسب للاستشارة المجانية</li>
        <li>مراجعة وضعك المالي وأهدافك</li>
        <li>تقديم نصائح مخصصة لحالتك</li>
        <li>شرح الخيارات المتاحة أمامك</li>
      `
      break
  }

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>تأكيد استلام ${formTypeArabic}</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #003366 0%, #0066cc 100%); padding: 40px 30px; text-align: center; border-radius: 15px 15px 0 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">شركة لوكسري هاوسينغ</h1>
        <p style="color: #ffd700; margin: 15px 0 0 0; font-size: 18px; font-weight: 500;">للحلول العقارية</p>
        <div style="width: 60px; height: 3px; background: #ffd700; margin: 15px auto 0; border-radius: 2px;"></div>
      </div>
      
      <!-- Main Content -->
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        
        <!-- Success Icon -->
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #28a745, #20c997); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(40,167,69,0.3);">
            <span style="color: white; font-size: 50px; font-weight: bold;">✓</span>
          </div>
          <h2 style="color: #003366; margin: 0; font-size: 28px; font-weight: bold;">تم استلام ${formTypeArabic} بنجاح!</h2>
          <div style="width: 80px; height: 3px; background: #28a745; margin: 15px auto; border-radius: 2px;"></div>
        </div>
        
        <!-- Personal Greeting -->
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 10px; margin-bottom: 25px; border-right: 5px solid #ffd700;">
          <p style="font-size: 20px; color: #003366; margin-bottom: 15px; font-weight: 600;">عزيزي/عزيزتي ${name}،</p>
          <p style="margin-bottom: 15px; font-size: 16px; line-height: 1.8;">شكراً لك على تواصلك معنا من خلال ${formTypeArabic}. لقد تم استلام طلبك بنجاح وسيقوم فريقنا المختص بمراجعته والرد عليك في أقرب وقت ممكن.</p>
          <p style="margin: 0; font-size: 16px; color: #28a745; font-weight: 600;">${expectedResponse}</p>
        </div>
        
        <!-- What Happens Next -->
        <div style="background: #e8f4fd; padding: 25px; border-radius: 10px; border: 1px solid #b8daff; margin: 25px 0;">
          <h3 style="color: #003366; margin-top: 0; margin-bottom: 20px; font-size: 20px; display: flex; align-items: center;">
            <span style="background: #003366; color: white; width: 35px; height: 35px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-left: 15px; font-size: 18px;">📋</span>
            ماذا يحدث الآن؟
          </h3>
          <ul style="margin: 0; padding-right: 25px; color: #495057;">
            ${nextSteps}
          </ul>
        </div>
        
        <!-- Timeline -->
        <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 25px; border-radius: 10px; border: 1px solid #ffeaa7; margin: 25px 0;">
          <h3 style="color: #856404; margin-top: 0; margin-bottom: 20px; font-size: 20px; display: flex; align-items: center;">
            <span style="background: #856404; color: white; width: 35px; height: 35px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-left: 15px; font-size: 18px;">⏰</span>
            الجدول الزمني المتوقع
          </h3>
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <div style="width: 30px; height: 30px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: 15px;">
              <span style="color: white; font-size: 14px; font-weight: bold;">1</span>
            </div>
            <div>
              <strong style="color: #856404;">خلال ساعة واحدة:</strong> تأكيد استلام الطلب (تم ✓)
            </div>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <div style="width: 30px; height: 30px; background: #ffc107; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: 15px;">
              <span style="color: white; font-size: 14px; font-weight: bold;">2</span>
            </div>
            <div>
              <strong style="color: #856404;">خلال 24 ساعة:</strong> مراجعة الطلب والتواصل معك
            </div>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="width: 30px; height: 30px; background: #17a2b8; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: 15px;">
              <span style="color: white; font-size: 14px; font-weight: bold;">3</span>
            </div>
            <div>
              <strong style="color: #856404;">خلال 48 ساعة:</strong> تقديم الحلول والعروض المناسبة
            </div>
          </div>
        </div>
        
        <!-- Contact Information -->
        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; text-align: center; margin: 25px 0; border: 1px solid #e9ecef;">
          <h3 style="color: #003366; margin-top: 0; margin-bottom: 20px; font-size: 20px;">تحتاج مساعدة فورية؟</h3>
          <p style="margin-bottom: 20px; color: #6c757d;">يمكنك التواصل معنا مباشرة عبر:</p>
          
          <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; margin-bottom: 20px;">
            <a href="tel:0581111488" style="background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 12px 20px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-flex; align-items: center; box-shadow: 0 4px 15px rgba(40,167,69,0.3);">
              📞 0581111488
            </a>
            <a href="https://wa.me/966581111488" style="background: linear-gradient(135deg, #25d366, #128c7e); color: white; padding: 12px 20px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-flex; align-items: center; box-shadow: 0 4px 15px rgba(37,211,102,0.3);">
              💬 واتساب
            </a>
            <a href="mailto:info@luxuryhousing.sa" style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 12px 20px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-flex; align-items: center; box-shadow: 0 4px 15px rgba(0,123,255,0.3);">
              📧 إيميل
            </a>
          </div>
          
          <div style="border-top: 1px solid #dee2e6; padding-top: 15px;">
            <p style="margin: 5px 0; color: #6c757d; font-size: 14px;">📍 العنوان: الدمام، المملكة العربية السعودية</p>
            <p style="margin: 5px 0; color: #6c757d; font-size: 14px;">🕐 ساعات العمل: الأحد - الخميس (8:00 ص - 6:00 م)</p>
          </div>
        </div>
        
        <!-- Closing Message -->
        <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 10px; border: 1px solid #90caf9;">
          <h3 style="color: #003366; margin-top: 0; margin-bottom: 15px; font-size: 20px;">نقدر ثقتك بنا</h3>
          <p style="margin: 0; color: #495057; font-size: 16px; line-height: 1.8; font-style: italic;">
            نحن ملتزمون بتقديم أفضل الخدمات والحلول العقارية لك. فريقنا من المختصين جاهز لمساعدتك في تحقيق أهدافك العقارية.
          </p>
          <div style="margin-top: 20px;">
            <span style="background: #003366; color: white; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: bold;">
              مستشار تمويل عقاري معتمد من الهيئة العامة للعقار
            </span>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px; border: 1px solid #e9ecef; color: #6c757d; font-size: 14px;">
        <p style="margin: 0 0 10px 0; font-weight: bold; color: #003366;">شركة لوكسري هاوسينغ للحلول العقارية</p>
        <p style="margin: 0;">جميع الحقوق محفوظة © ${new Date().getFullYear()}</p>
      </div>
    </body>
    </html>
  `
}

// Helper functions for display values
function getPreferredContactDisplay(contact?: string): string {
  switch (contact) {
    case "phone":
      return "مكالمة هاتفية"
    case "whatsapp":
      return "واتساب"
    case "email":
      return "بريد إلكتروني"
    case "visit":
      return "زيارة المكتب"
    default:
      return "غير محدد"
  }
}

function getCityDisplay(city?: string): string {
  switch (city) {
    case "riyadh":
      return "الرياض"
    case "jeddah":
      return "جدة"
    case "dammam":
      return "الدمام"
    case "mecca":
      return "مكة المكرمة"
    case "medina":
      return "المدينة المنورة"
    case "other":
      return "أخرى"
    default:
      return "غير محدد"
  }
}

function getIncomeDisplay(income?: string): string {
  switch (income) {
    case "5000-10000":
      return "5,000 - 10,000 ريال"
    case "10000-15000":
      return "10,000 - 15,000 ريال"
    case "15000-25000":
      return "15,000 - 25,000 ريال"
    case "25000-50000":
      return "25,000 - 50,000 ريال"
    case "50000+":
      return "أكثر من 50,000 ريال"
    default:
      return "غير محدد"
  }
}

function getPropertyTypeDisplay(type?: string): string {
  switch (type) {
    case "villa":
      return "فيلا"
    case "apartment":
      return "شقة"
    case "duplex":
      return "دوبلكس"
    case "building":
      return "عمارة"
    case "land":
      return "أرض"
    default:
      return "غير محدد"
  }
}

function getEmploymentDisplay(employment?: string): string {
  switch (employment) {
    case "government":
      return "حكومي"
    case "private":
      return "قطاع خاص"
    case "military":
      return "عسكري"
    case "retired":
      return "متقاعد"
    case "business":
      return "أعمال حرة"
    default:
      return "غير محدد"
  }
}

function getInquiryTypeDisplay(type?: string): string {
  switch (type) {
    case "general":
      return "استفسار عام"
    case "eligibility":
      return "التحقق من الأهلية"
    case "rates":
      return "الاستفسار عن الأسعار"
    case "process":
      return "الاستفسار عن الإجراءات"
    case "appointment":
      return "طلب موعد"
    case "requirements":
      return "المتطلبات والشروط"
    case "pricing":
      return "الأسعار والتكاليف"
    case "timeline":
      return "المدة الزمنية"
    case "consultation":
      return "طلب استشارة"
    default:
      return "غير محدد"
  }
}
