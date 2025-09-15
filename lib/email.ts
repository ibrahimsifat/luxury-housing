import { Resend } from "resend"
import { HeroEmailTemplate } from "@/components/email-templates/hero-email"
import { ContactFormEmailTemplate } from "@/components/email-templates/contact-form-email"
import { ProductInquiryEmailTemplate } from "@/components/email-templates/product-inquiry-email"
import { ServiceInquiryEmailTemplate } from "@/components/email-templates/service-inquiry-email"
import { CustomerConfirmationEmailTemplate } from "@/components/email-templates/customer-confirmation-email"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Email types for all forms on the site
export type EmailType = "hero" | "contact" | "product" | "service"

// Base email data interface
interface BaseEmailData {
  name: string
  email: string
  phone?: string
  message?: string
}

// Hero form data (consultation request)
export interface HeroFormData extends BaseEmailData {
  phone: string
  message?: string
}

// Contact form data
export interface ContactFormData extends BaseEmailData {
  phone: string
  service?: string
  message: string
}

// Product inquiry form data
export interface ProductFormData extends BaseEmailData {
  phone: string
  city?: string
  monthlyIncome?: string
  requestedAmount?: string
  propertyType?: string
  employment?: string
  inquiryType?: string
  preferredContact?: string
  product?: string
}

// Service inquiry form data
export interface ServiceFormData extends BaseEmailData {
  phone: string
  service?: string
  inquiryType?: string
  preferredContact?: string
}

// Union type for all form data
export type FormData = HeroFormData | ContactFormData | ProductFormData | ServiceFormData

// Function to send emails
export async function sendEmail(type: EmailType, data: FormData) {
  try {
    console.log("[v0] Processing email for type:", type)

    // Email subjects in Arabic
    const subjects = {
      hero: "طلب استشارة مجانية جديد - شركة لوكسري هاوسينغ",
      contact: "رسالة تواصل جديدة - شركة لوكسري هاوسينغ",
      product: "استفسار منتج تمويلي جديد - شركة لوكسري هاوسينغ",
      service: "استفسار خدمة جديد - شركة لوكسري هاوسينغ",
    }

    console.log("[v0] Sending admin notification email")

    // Send email to admin with proper React component syntax
    let adminResult
    switch (type) {
      case "hero":
        adminResult = await resend.emails.send({
          from: "Luxury Housing <no-reply@luxuryhousing.sa>",
          to: ["info@luxuryhousing.sa"], // Admin email as requested
          subject: subjects[type],
          react: HeroEmailTemplate(data as HeroFormData),
          text: `${subjects[type]} من ${data.name}. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`,
        })
        break
      case "contact":
        adminResult = await resend.emails.send({
          from: "Luxury Housing <no-reply@luxuryhousing.sa>",
          to: ["info@luxuryhousing.sa"],
          subject: subjects[type],
          react: ContactFormEmailTemplate(data as ContactFormData),
          text: `${subjects[type]} من ${data.name}. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`,
        })
        break
      case "product":
        adminResult = await resend.emails.send({
          from: "Luxury Housing <no-reply@luxuryhousing.sa>",
          to: ["info@luxuryhousing.sa"],
          subject: subjects[type],
          react: ProductInquiryEmailTemplate(data as ProductFormData),
          text: `${subjects[type]} من ${data.name}. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`,
        })
        break
      case "service":
        adminResult = await resend.emails.send({
          from: "Luxury Housing <no-reply@luxuryhousing.sa>",
          to: ["info@luxuryhousing.sa"],
          subject: subjects[type],
          react: ServiceInquiryEmailTemplate(data as ServiceFormData),
          text: `${subjects[type]} من ${data.name}. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`,
        })
        break
      default:
        throw new Error("Invalid email type")
    }

    console.log("[v0] Admin email sent, sending customer confirmation")

    // Send Arabic confirmation email to customer
    await sendCustomerConfirmation(type, data)

    console.log("[v0] Customer confirmation sent")

    return { success: true, data: adminResult }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Function to send Arabic confirmation emails to customers
async function sendCustomerConfirmation(type: EmailType, data: FormData) {
  try {
    // Arabic confirmation subjects
    const subjects = {
      hero: "تأكيد استلام طلب الاستشارة - شركة لوكسري هاوسينغ",
      contact: "تأكيد استلام رسالتك - شركة لوكسري هاوسينغ",
      product: "تأكيد استلام استفسار المنتج - شركة لوكسري هاوسينغ",
      service: "تأكيد استلام استفسار الخدمة - شركة لوكسري هاوسينغ",
    }

    // Get service or product name for confirmation
    const service = "service" in data ? data.service : undefined
    const product = "product" in data ? data.product : undefined

    // Send Arabic confirmation email to customer with proper React component syntax
    await resend.emails.send({
      from: "Luxury Housing <no-reply@luxuryhousing.sa>",
      to: [data.email],
      subject: subjects[type],
      react: CustomerConfirmationEmailTemplate({
        name: data.name,
        formType: type,
        service,
        product,
      }),
      text: getArabicAutoReplyText(type, data.name),
    })

    return { success: true }
  } catch (error) {
    console.error("[v0] Error sending customer confirmation:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Helper function to generate Arabic auto-reply text
function getArabicAutoReplyText(type: EmailType, name: string): string {
  const currentDate = new Date().toLocaleDateString("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Riyadh",
  })

  const baseMessage = `عزيزي/عزيزتي ${name}،

شكراً لك على تواصلك مع شركة لوكسري هاوسينغ للحلول العقارية.`

  switch (type) {
    case "hero":
      return `${baseMessage}

تم استلام طلب الاستشارة المجانية بنجاح. سيتواصل معك أحد مستشارينا المعتمدين خلال 24 ساعة لتحديد موعد الاستشارة وتقديم أفضل الحلول التمويلية المناسبة لاحتياجاتك.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينغ
مستشار تمويل عقاري معتمد من الهيئة العامة للعقار`

    case "contact":
      return `${baseMessage}

تم استلام رسالتك بنجاح وسنقوم بالرد عليك خلال 24 ساعة. نحن نقدر تواصلك معنا ونتطلع لخدمتك.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينغ`

    case "product":
      return `${baseMessage}

تم استلام استفسارك عن المنتج التمويلي بنجاح. سيقوم أحد مختصي التمويل لدينا بمراجعة طلبك والتواصل معك خلال 24 ساعة لتقديم عرض مناسب حسب إمكانياتك المالية.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينغ`

    case "service":
      return `${baseMessage}

تم استلام استفسارك عن الخدمة بنجاح. سيتواصل معك مختص الخدمة خلال 24 ساعة لتقديم المعلومات المطلوبة والإجابة على جميع استفساراتك.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينغ`

    default:
      return `${baseMessage}

تم استلام طلبك بنجاح وسنتواصل معك قريباً.

التاريخ: ${currentDate}

مع أطيب التحيات،
فريق شركة لوكسري هاوسينغ`
  }
}
