import { sendEmail } from "@/lib/email";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[v0] Received email request:", {
      ...body,
      recaptchaToken: body.recaptchaToken ? "[REDACTED]" : undefined,
    });

    const { type, formType, formData: nestedFormData } = body;
    const emailType = type || formType;

    // Handle both data formats:
    // 1. New format: { type: "business-sector", formData: {...} }
    // 2. Old format: { formType: "hero", name: "...", email: "...", ... }
    const rawFormData = nestedFormData || body;

    // Clean up formData by removing metadata fields
    const {
      type: _,
      formType: __,
      recaptchaToken: ___,
      ...formData
    } = rawFormData;

    if (!emailType) {
      console.log("[v0] Missing form type");
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
        "product",
        "service",
        "personal-financing",
        "real-estate-financing",
        "business-sector",
        "real-estate-refinancing",
        "real-estate-mortgage",
      ].includes(emailType)
    ) {
      console.log("[v0] Invalid form type:", emailType);
      return NextResponse.json(
        { success: false, error: "Invalid form type" },
        { status: 400 }
      );
    }

    // Different validation for different form types
    if (emailType === "personal-financing") {
      if (!formData.fullName || formData.fullName.trim() === "") {
        console.log("[v0] Missing required fields - fullName is empty");
        return NextResponse.json(
          {
            success: false,
            error: "Missing required fields (fullName is required)",
          },
          { status: 400 }
        );
      }
    } else if (emailType === "real-estate-financing") {
      if (
        !formData.fullName ||
        formData.fullName.trim() === "" ||
        !formData.email ||
        formData.email.trim() === ""
      ) {
        console.log(
          "[v0] Missing required fields - fullName or email is empty"
        );
        return NextResponse.json(
          {
            success: false,
            error: "Missing required fields (fullName and email are required)",
          },
          { status: 400 }
        );
      }
    } else if (emailType === "business-sector") {
      if (
        !formData.fullName ||
        formData.fullName.trim() === "" ||
        !formData.email ||
        formData.email.trim() === ""
      ) {
        console.log(
          "[v0] Missing required fields - fullName or email is empty"
        );
        return NextResponse.json(
          {
            success: false,
            error: "Missing required fields (fullName and email are required)",
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
        console.log(
          "[v0] Missing required fields - fullName or email is empty"
        );
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
        console.log(
          "[v0] Missing required fields - fullName or email is empty"
        );
        return NextResponse.json(
          {
            success: false,
            error: "Missing required fields (fullName and email are required)",
          },
          { status: 400 }
        );
      }
    } else {
      console.log("[v0] Validating fields:", {
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
        console.log("[v0] Missing required fields - name or email is empty");
        return NextResponse.json(
          {
            success: false,
            error: "Missing required fields (name and email are required)",
          },
          { status: 400 }
        );
      }
    }

    console.log("[v0] Sending email for form type:", emailType);

    // Send email
    const result = await sendEmail(emailType, formData);

    if (!result.success) {
      console.error("[v0] Email sending failed:", result.error);
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    console.log("[v0] Email sent successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[v0] Error in send-email route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
