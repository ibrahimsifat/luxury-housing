import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST() {
  try {
    console.log("[SMTP TEST] Testing SMTP email configuration...");

    // Check if SMTP password is configured
    if (!process.env.SMTP_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          error: "SMTP_PASSWORD is not configured in environment variables",
        },
        { status: 500 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "premium195.web-hosting.com",
      port: 465, // SSL port
      secure: true, // true for 465, false for other ports
      auth: {
        user: "info@luxuryhousing.sa",
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // For self-signed certificates
      },
    });

    // Test connection
    console.log("[SMTP TEST] Testing SMTP connection...");
    await transporter.verify();

    console.log("[SMTP TEST] SMTP connection verified, sending test email...");

    // Send a simple test email
    const result = await transporter.sendMail({
      from: "Luxury Housing <info@luxuryhousing.sa>",
      to: "info@luxuryhousing.sa",
      subject: "SMTP Test Email - Luxury Housing",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">SMTP Test Email from Luxury Housing</h2>
          <p>This is a test email sent via SMTP to verify that the email configuration is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>From:</strong> info@luxuryhousing.sa</p>
          <p><strong>To:</strong> info@luxuryhousing.sa</p>
          <p><strong>SMTP Host:</strong> premium195.web-hosting.com</p>
          <p><strong>Port:</strong> 465 (SSL)</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            If you receive this email, your SMTP email configuration is working correctly.
          </p>
        </div>
      `,
      text: `SMTP Test Email from Luxury Housing

This is a test email sent via SMTP to verify that the email configuration is working correctly.

Timestamp: ${new Date().toISOString()}
From: info@luxuryhousing.sa
To: info@luxuryhousing.sa
SMTP Host: premium195.web-hosting.com
Port: 465 (SSL)

If you receive this email, your SMTP email configuration is working correctly.`,
    });

    console.log("[SMTP TEST] Test email sent:", result);

    return NextResponse.json({
      success: true,
      message: "SMTP test email sent successfully",
      messageId: result.messageId,
      details: result,
    });
  } catch (error) {
    console.error("[SMTP TEST] Error sending test email:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "SMTP email test endpoint. Use POST to send a test email.",
    instructions:
      "Send a POST request to this endpoint to test SMTP email configuration.",
    smtpConfig: {
      host: "premium195.web-hosting.com",
      port: 465,
      secure: true,
      user: "info@luxuryhousing.sa",
      password: "*** (configured via SMTP_PASSWORD env var)",
    },
  });
}
