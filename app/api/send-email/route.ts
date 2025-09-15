import { NextResponse, type NextRequest } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Received email request:", {
      ...body,
      recaptchaToken: body.recaptchaToken ? "[REDACTED]" : undefined,
    })

    const { formType, ...formData } = body

    if (!formType) {
      console.log("[v0] Missing form type")
      return NextResponse.json({ success: false, error: "Missing form type" }, { status: 400 })
    }

    // Validate form type
    if (!["hero", "contact", "product", "service"].includes(formType)) {
      console.log("[v0] Invalid form type:", formType)
      return NextResponse.json({ success: false, error: "Invalid form type" }, { status: 400 })
    }

    console.log("[v0] Validating fields:", {
      name: formData.name,
      email: formData.email,
      nameExists: !!formData.name,
      emailExists: !!formData.email,
      nameLength: formData.name?.length || 0,
      emailLength: formData.email?.length || 0,
    })

    if (!formData.name || !formData.email || formData.name.trim() === "" || formData.email.trim() === "") {
      console.log("[v0] Missing required fields - name or email is empty")
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields (name and email are required)",
        },
        { status: 400 },
      )
    }

    console.log("[v0] Sending email for form type:", formType)

    // Send email
    const result = await sendEmail(formType, formData)

    if (!result.success) {
      console.error("[v0] Email sending failed:", result.error)
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    console.log("[v0] Email sent successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in send-email route:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}
