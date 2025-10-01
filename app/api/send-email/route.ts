import { sendEmailSMTP } from "@/lib/smtp-email";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received email request:", {
      ...body,
      recaptchaToken: body.recaptchaToken ? "[REDACTED]" : undefined,
    });

    const { type, formType, data: nestedFormData } = body;
    const emailType = type || formType;

    // Handle both data formats:
    // 1. New format: { type: "contact-form", data: {...} }
    // 2. Old format: { formType: "hero", name: "...", email: "...", ... }
    const rawFormData = nestedFormData || body;

    // Clean up formData by removing metadata fields
    const {
      type: _,
      formType: __,
      data: ___,
      recaptchaToken: ____,
      ...formData
    } = rawFormData;

    if (!emailType) {
      console.log("Missing form type");
      return NextResponse.json(
        { success: false, error: "Missing form type" },
        { status: 400 }
      );
    }

    // Validate form type
    if (
      ![
        "hero",
        "contact",
        "contact-form",
        "product",
        "service",
        "personal-financing",
        "real-estate-financing",
        "business-sector",
        "real-estate-refinancing",
        "real-estate-mortgage",
      ].includes(emailType)
    ) {
      console.log("Invalid form type:", emailType);
      return NextResponse.json(
        { success: false, error: "Invalid form type" },
        { status: 400 }
      );
    }

    // Different validation for different form types
    if (emailType === "personal-financing") {
      if (
        !formData.fullName ||
        formData.fullName.trim() === "" ||
        !formData.phoneNumber ||
        formData.phoneNumber.trim() === ""
      ) {
        console.log(
          "Missing required fields - fullName or phoneNumber is empty"
        );
        return NextResponse.json(
          {
            success: false,
            error:
              "Missing required fields (fullName and phoneNumber are required)",
          },
          { status: 400 }
        );
      }
    } else if (emailType === "real-estate-financing") {
      if (
        !formData.fullName ||
        formData.fullName.trim() === "" ||
        !formData.phoneNumber ||
        formData.phoneNumber.trim() === ""
      ) {
        console.log(
          "Missing required fields - fullName or phoneNumber is empty"
        );
        return NextResponse.json(
          {
            success: false,
            error:
              "Missing required fields (fullName and phoneNumber are required)",
          },
          { status: 400 }
        );
      }
    } else if (emailType === "business-sector") {
      if (
        !formData.businessName ||
        formData.businessName.trim() === "" ||
        !formData.phoneNumber ||
        formData.phoneNumber.trim() === ""
      ) {
        console.log(
          "Missing required fields - businessName or phoneNumber is empty"
        );
        return NextResponse.json(
          {
            success: false,
            error:
              "Missing required fields (businessName and phoneNumber are required)",
          },
          { status: 400 }
        );
      }
    } else if (emailType === "real-estate-refinancing") {
      if (
        !formData.fullName ||
        formData.fullName.trim() === "" ||
        !formData.email ||
        formData.email.trim() === ""
      ) {
        console.log("Missing required fields - fullName or email is empty");
        return NextResponse.json(
          {
            success: false,
            error: "Missing required fields (fullName and email are required)",
          },
          { status: 400 }
        );
      }
    } else if (emailType === "real-estate-mortgage") {
      if (
        !formData.fullName ||
        formData.fullName.trim() === "" ||
        !formData.email ||
        formData.email.trim() === ""
      ) {
        console.log("Missing required fields - fullName or email is empty");
        return NextResponse.json(
          {
            success: false,
            error: "Missing required fields (fullName and email are required)",
          },
          { status: 400 }
        );
      }
    } else if (emailType === "contact-form") {
      if (
        !formData.name ||
        formData.name.trim() === "" ||
        !formData.email ||
        formData.email.trim() === "" ||
        !formData.phone ||
        formData.phone.trim() === "" ||
        !formData.message ||
        formData.message.trim() === ""
      ) {
        console.log("Missing required fields for contact form");
        return NextResponse.json(
          {
            success: false,
            error:
              "Missing required fields (name, email, phone, and message are required)",
          },
          { status: 400 }
        );
      }
    } else {
      console.log("Validating fields:", {
        name: formData.name,
        email: formData.email,
        nameExists: !!formData.name,
        emailExists: !!formData.email,
        nameLength: formData.name?.length || 0,
        emailLength: formData.email?.length || 0,
      });

      if (
        !formData.name ||
        !formData.email ||
        formData.name.trim() === "" ||
        formData.email.trim() === ""
      ) {
        console.log("Missing required fields - name or email is empty");
        return NextResponse.json(
          {
            success: false,
            error: "Missing required fields (name and email are required)",
          },
          { status: 400 }
        );
      }
    }

    console.log("Sending email for form type:", emailType);

    // Send email via SMTP
    const result = await sendEmailSMTP(emailType, formData);

    if (!result.success) {
      console.error("Email sending failed:", result.error);
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    console.log("Email sent successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in send-email route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
