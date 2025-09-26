import BusinessSectorEmailTemplate from "@/components/email-templates/business-sector-email";
import { ContactFormEmailTemplate } from "@/components/email-templates/contact-form-email";
import { CustomerConfirmationEmailTemplate } from "@/components/email-templates/customer-confirmation-email";
import { HeroEmailTemplate } from "@/components/email-templates/hero-email";
import PersonalFinancingEmailTemplate from "@/components/email-templates/personal-financing-email";
import { ProductInquiryEmailTemplate } from "@/components/email-templates/product-inquiry-email";
import RealEstateFinancingEmailTemplate from "@/components/email-templates/real-estate-financing-email";
import RealEstateMortgageEmailTemplate from "@/components/email-templates/real-estate-mortgage-email";
import RealEstateRefinancingEmailTemplate from "@/components/email-templates/real-estate-refinancing-email";
import { ServiceInquiryEmailTemplate } from "@/components/email-templates/service-inquiry-email";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

// Email types for all forms on the site
export type EmailType =
  | "hero"
  | "contact"
  | "product"
  | "service"
  | "personal-financing"
  | "real-estate-financing"
  | "business-sector"
  | "real-estate-refinancing"
  | "real-estate-mortgage";

// Base email data interface
interface BaseEmailData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

// Hero form data (consultation request)
export interface HeroFormData extends BaseEmailData {
  phone: string;
  message?: string;
}

// Contact form data
export interface ContactFormData extends BaseEmailData {
  phone: string;
  service?: string;
  message: string;
}

// Product inquiry form data
export interface ProductFormData extends BaseEmailData {
  phone: string;
  city?: string;
  monthlyIncome?: string;
  requestedAmount?: string;
  propertyType?: string;
  employment?: string;
  inquiryType?: string;
  preferredContact?: string;
  product?: string;
}

// Service inquiry form data
export interface ServiceFormData extends BaseEmailData {
  phone: string;
  service?: string;
  inquiryType?: string;
  message: string;
  preferredContact?: string;
}

// Personal financing form data
export interface PersonalFinancingFormData {
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  financingType: string;
  birthDate: string;
  birthDateType: string;
  workplace: string;
  militaryRank: string;
  workStartDate: string;
  workStartDateType: string;
  monthlySalary: string;
  personalLoanInstallment: string;
  personalLoanEarlyPayment: string;
  bankName: string;
  houseOwnership: string;
  city: string;
  creditIssues: string;
  serviceSuspension: string;
  message: string;
}

// Real estate financing form data
export interface RealEstateFinancingFormData {
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  serviceType: string;
  birthDate: string;
  birthDateType: string;
  familyMembers: string;
  workplace: string;
  militaryRank: string;
  workStartDate: string;
  workStartDateType: string;
  monthlySalary: string;
  personalLoanInstallment: string;
  personalLoanEarlyPayment: string;
  creditCardDebt: string;
  creditCardInstallment: string;
  personalLoanDebt: string;
  personalLoanInstallmentDebt: string;
  carLoanDebt: string;
  carLoanInstallment: string;
  salaryBank: string;
  housingSupportEligibility: string;
  propertyValue: string;
  propertyCity: string;
  creditIssues: string;
  serviceSuspension: string;
  message: string;
}

// Business sector form data
export interface BusinessSectorFormData {
  businessName: string;
  phoneNumber: string;
  mainBranchCity: string;
  activityCategory: string;
  accountMovement: string;
  auditedBudgets: string;
  bankName1: string;
  bankName2: string;
  budgetMovement: string;
  posMovement: string;
  realEstateAssets: string;
  zakatCertificate: string;
  taxCertificate: string;
  taxDeclarations: string;
  insuranceCertificate: string;
  localizationCertificate: string;
  municipalityLicense: string;
  electronicLeaseContract: string;
  serviceType: string;
  creditIssues: string;
  serviceSuspension: string;
  message: string;
}

// Real estate refinancing form data
export interface RealEstateRefinancingFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  nationalId: string;
  birthDate: string;
  city: string;
  propertyType: string;
  propertyValue: string;
  currentLoanAmount: string;
  currentBank: string;
  currentMonthlyPayment: string;
  loanStartDate: string;
  remainingLoanTerm: string;
  monthlyIncome: string;
  employmentType: string;
  workExperience: string;
  bankName: string;
  refinancingPurpose: string;
  message: string;
}

// Real estate mortgage form data
export interface RealEstateMortgageFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  nationalId: string;
  birthDate: string;
  city: string;
  propertyType: string;
  propertyValue: string;
  downPayment: string;
  loanAmount: string;
  monthlyIncome: string;
  employmentType: string;
  workExperience: string;
  bankName: string;
  existingLoans: string;
  propertyLocation: string;
  propertyAge: string;
  message: string;
}

// Union type for all form data
export type FormData =
  | HeroFormData
  | ContactFormData
  | ProductFormData
  | ServiceFormData
  | PersonalFinancingFormData
  | RealEstateFinancingFormData
  | BusinessSectorFormData
  | RealEstateRefinancingFormData
  | RealEstateMortgageFormData;

// Create SMTP transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "premium195.web-hosting.com",
    port: 465, // SSL port
    secure: true, // true for 465, false for other ports
    auth: {
      user: "info@luxuryhousing.sa",
      pass: process.env.SMTP_PASSWORD, // You'll need to set this in your environment variables
    },
    tls: {
      rejectUnauthorized: false, // For self-signed certificates
    },
  });
};

// Function to send emails via SMTP
export async function sendEmailSMTP(type: EmailType, data: FormData) {
  try {
    console.log("[SMTP] Processing email for type:", type);

    // Check if SMTP password is configured
    if (!process.env.SMTP_PASSWORD) {
      console.error("[SMTP] SMTP_PASSWORD is not configured");
      throw new Error(
        "Email service is not configured. Please contact the administrator."
      );
    }

    // Create transporter
    const transporter = createTransporter();

    // Email subjects in Arabic
    const subjects = {
      hero: "طلب استشارة مجانية جديد - شركة لوكسري هاوسينج",
      contact: "رسالة تواصل جديدة - شركة لوكسري هاوسينج",
      product: "استفسار منتج تمويلي جديد - شركة لوكسري هاوسينج",
      service: "استفسار خدمة جديد - شركة لوكسري هاوسينج",
      "personal-financing": "طلب تمويل شخصي جديد - شركة لوكسري هاوسينج",
      "real-estate-financing": "طلب تمويل عقاري جديد - شركة لوكسري هاوسينج",
      "business-sector": "طلب تمويل قطاع الاعمال جديد - شركة لوكسري هاوسينج",
      "real-estate-refinancing":
        "طلب إعادة تمويل عقاري جديد - شركة لوكسري هاوسينج",
      "real-estate-mortgage": "طلب رهن عقاري جديد - شركة لوكسري هاوسينج",
    };

    console.log("[SMTP] Sending admin notification email");

    // Send email to admin with proper React component syntax
    let adminResult;
    try {
      let htmlContent = "";
      let textContent = "";

      switch (type) {
        case "hero":
          htmlContent = await render(HeroEmailTemplate(data as HeroFormData));
          textContent = `${subjects[type]} من ${
            (data as HeroFormData).name
          }. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`;
          break;
        case "contact":
          htmlContent = await render(
            ContactFormEmailTemplate(data as ContactFormData)
          );
          textContent = `${subjects[type]} من ${
            (data as ContactFormData).name
          }. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`;
          break;
        case "product":
          htmlContent = await render(
            ProductInquiryEmailTemplate(data as ProductFormData)
          );
          textContent = `${subjects[type]} من ${
            (data as ProductFormData).name
          }. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`;
          break;
        case "service":
          htmlContent = await render(
            ServiceInquiryEmailTemplate(data as ServiceFormData)
          );
          textContent = `${subjects[type]} من ${
            (data as ServiceFormData).name
          }. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`;
          break;
        case "personal-financing":
          htmlContent = await render(
            PersonalFinancingEmailTemplate({
              formData: data as PersonalFinancingFormData,
            })
          );
          textContent = `${subjects[type]} من ${
            (data as PersonalFinancingFormData).fullName
          }. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`;
          break;
        case "real-estate-financing":
          htmlContent = await render(
            RealEstateFinancingEmailTemplate({
              formData: data as RealEstateFinancingFormData,
            })
          );
          textContent = `${subjects[type]} من ${
            (data as RealEstateFinancingFormData).fullName
          }. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`;
          break;
        case "business-sector":
          htmlContent = await render(
            BusinessSectorEmailTemplate({
              formData: data as BusinessSectorFormData,
            })
          );
          textContent = `${subjects[type]} من ${
            (data as BusinessSectorFormData).businessName
          }. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`;
          break;
        case "real-estate-refinancing":
          htmlContent = await render(
            RealEstateRefinancingEmailTemplate({
              formData: data as RealEstateRefinancingFormData,
            })
          );
          textContent = `${subjects[type]} من ${
            (data as RealEstateRefinancingFormData).fullName
          }. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`;
          break;
        case "real-estate-mortgage":
          htmlContent = await render(
            RealEstateMortgageEmailTemplate({
              formData: data as RealEstateMortgageFormData,
            })
          );
          textContent = `${subjects[type]} من ${
            (data as RealEstateMortgageFormData).fullName
          }. يرجى مراجعة النسخة HTML من هذا البريد للحصول على التفاصيل الكاملة.`;
          break;
        default:
          throw new Error("Invalid email type");
      }

      adminResult = await transporter.sendMail({
        from: "Luxury Housing <info@luxuryhousing.sa>",
        to: "info@luxuryhousing.sa",
        subject: subjects[type],
        html: htmlContent,
        text: textContent,
      });

      console.log("[SMTP] Admin email sent successfully:", adminResult);
    } catch (adminError) {
      console.error("[SMTP] Failed to send admin email:", adminError);
      throw new Error(
        `Failed to send admin notification: ${
          adminError instanceof Error ? adminError.message : "Unknown error"
        }`
      );
    }

    console.log("[SMTP] Admin email sent, sending customer confirmation");

    // Send Arabic confirmation email to customer (skip for personal financing as no email provided)
    if (type !== "personal-financing") {
      await sendCustomerConfirmationSMTP(type, data, transporter);
      console.log("[SMTP] Customer confirmation sent");
    } else {
      console.log(
        "[SMTP] Skipping customer confirmation for personal financing (no email provided)"
      );
    }

    return { success: true, data: adminResult };
  } catch (error) {
    console.error("[SMTP] Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Function to send Arabic confirmation emails to customers via SMTP
async function sendCustomerConfirmationSMTP(
  type: EmailType,
  data: FormData,
  transporter: nodemailer.Transporter
) {
  try {
    // Arabic confirmation subjects
    const subjects = {
      hero: "تأكيد استلام طلب الاستشارة - شركة لوكسري هاوسينج",
      contact: "تأكيد استلام رسالتك - شركة لوكسري هاوسينج",
      product: "تأكيد استلام استفسار المنتج - شركة لوكسري هاوسينج",
      service: "تأكيد استلام استفسار الخدمة - شركة لوكسري هاوسينج",
      "personal-financing":
        "تأكيد استلام طلب التمويل الشخصي - شركة لوكسري هاوسينج",
      "real-estate-financing":
        "تأكيد استلام طلب التمويل العقاري - شركة لوكسري هاوسينج",
      "business-sector":
        "تأكيد استلام طلب تمويل قطاع الاعمال - شركة لوكسري هاوسينج",
      "real-estate-refinancing":
        "تأكيد استلام طلب إعادة التمويل العقاري - شركة لوكسري هاوسينج",
      "real-estate-mortgage":
        "تأكيد استلام طلب الرهن العقاري - شركة لوكسري هاوسينج",
    };

    // Get service or product name for confirmation
    const service = "service" in data ? data.service : undefined;
    const product = "product" in data ? data.product : undefined;

    // Send Arabic confirmation email to customer with proper React component syntax
    const email = "email" in data ? data.email : "";
    const name =
      "name" in data ? data.name : "fullName" in data ? data.fullName : "";

    const htmlContent = await render(
      CustomerConfirmationEmailTemplate({
        name: name,
        formType: type as "hero" | "contact" | "product" | "service",
        service,
        product,
      })
    );

    await transporter.sendMail({
      from: "Luxury Housing <info@luxuryhousing.sa>",
      to: email,
      subject: subjects[type],
      html: htmlContent,
      text: getArabicAutoReplyText(type, name),
    });

    return { success: true };
  } catch (error) {
    console.error("[SMTP] Error sending customer confirmation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
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
  });

  const baseMessage = `عزيزي/عزيزتي ${name}،

شكراً لك على تواصلك مع شركة لوكسري هاوسينج للحلول العقارية.`;

  switch (type) {
    case "hero":
      return `${baseMessage}

تم استلام طلب الاستشارة المجانية بنجاح. سيتواصل معك أحد مستشارينا المعتمدين خلال 24 ساعة لتحديد موعد الاستشارة وتقديم أفضل الحلول التمويلية المناسبة لاحتياجاتك.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينج
مستشار تمويل عقاري معتمد من الهيئة العامة للعقار`;

    case "contact":
      return `${baseMessage}

تم استلام رسالتك بنجاح وسنقوم بالرد عليك خلال 24 ساعة. نحن نقدر تواصلك معنا ونتطلع لخدمتك.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينج`;

    case "product":
      return `${baseMessage}

تم استلام استفسارك عن المنتج التمويلي بنجاح. سيقوم أحد مختصي التمويل لدينا بمراجعة طلبك والتواصل معك خلال 24 ساعة لتقديم عرض مناسب حسب إمكانياتك المالية.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينج`;

    case "service":
      return `${baseMessage}

تم استلام استفسارك عن الخدمة بنجاح. سيتواصل معك مختص الخدمة خلال 24 ساعة لتقديم المعلومات المطلوبة والإجابة على جميع استفساراتك.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينج`;

    case "personal-financing":
      return `${baseMessage}

تم استلام طلب التمويل الشخصي بنجاح. سيقوم أحد مختصي التمويل لدينا بمراجعة طلبك والتواصل معك خلال 24 ساعة لتقديم عرض مناسب حسب إمكانياتك المالية.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينج`;

    case "real-estate-financing":
      return `${baseMessage}

تم استلام طلب التمويل العقاري بنجاح. سيقوم أحد مختصي التمويل العقاري لدينا بمراجعة طلبك والتواصل معك خلال 24 ساعة لتقديم أفضل العروض التمويلية المناسبة لاحتياجاتك.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينج`;

    case "business-sector":
      return `${baseMessage}

تم استلام طلب تمويل قطاع الاعمال بنجاح. سيقوم أحد مختصي التمويل التجاري لدينا بمراجعة طلبك والتواصل معك خلال 24 ساعة لتقديم أفضل الحلول التمويلية لمشروعك التجاري.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينج`;

    case "real-estate-refinancing":
      return `${baseMessage}

تم استلام طلب إعادة التمويل العقاري بنجاح. سيقوم أحد مختصي التمويل العقاري لدينا بمراجعة طلبك والتواصل معك خلال 24 ساعة لتقديم أفضل شروط إعادة التمويل المناسبة لاحتياجاتك.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينج`;

    case "real-estate-mortgage":
      return `${baseMessage}

تم استلام طلب الرهن العقاري بنجاح. سيقوم أحد مختصي الرهن العقاري لدينا بمراجعة طلبك والتواصل معك خلال 24 ساعة لتقديم أفضل عروض الرهن العقاري المناسبة لاحتياجاتك.

التاريخ: ${currentDate}

للاستفسارات العاجلة: 0581111488

مع أطيب التحيات،
فريق شركة لوكسري هاوسينج`;

    default:
      return `${baseMessage}

تم استلام طلبك بنجاح وسنتواصل معك قريباً.

التاريخ: ${currentDate}

مع أطيب التحيات،
فريق شركة لوكسري هاوسينج`;
  }
}
