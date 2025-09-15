import type * as React from "react"

interface ContactEmailProps {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  budget?: string
  timeframe?: string
  message: string
  hearAbout?: string
}

export const ContactEmailTemplate: React.FC<ContactEmailProps> = ({
  name,
  email,
  phone,
  company,
  service,
  budget,
  timeframe,
  message,
  hearAbout,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <h2 style={{ color: "#333", borderBottom: "2px solid #007bff", paddingBottom: "10px" }}>
      New Contact Form Submission
    </h2>

    <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", margin: "20px 0" }}>
      <h3 style={{ color: "#007bff", marginTop: "0" }}>Contact Information</h3>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      {phone && (
        <p>
          <strong>Phone:</strong> {phone}
        </p>
      )}
      {company && (
        <p>
          <strong>Company:</strong> {company}
        </p>
      )}
    </div>

    {(service || budget || timeframe) && (
      <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", margin: "20px 0" }}>
        <h3 style={{ color: "#007bff", marginTop: "0" }}>Project Details</h3>
        {service && (
          <p>
            <strong>Service Interest:</strong> {service}
          </p>
        )}
        {budget && (
          <p>
            <strong>Budget:</strong> {budget}
          </p>
        )}
        {timeframe && (
          <p>
            <strong>Timeframe:</strong> {timeframe}
          </p>
        )}
      </div>
    )}

    <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", margin: "20px 0" }}>
      <h3 style={{ color: "#007bff", marginTop: "0" }}>Message</h3>
      <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
    </div>

    {hearAbout && (
      <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", margin: "20px 0" }}>
        <h3 style={{ color: "#007bff", marginTop: "0" }}>How they heard about us</h3>
        <p>{hearAbout}</p>
      </div>
    )}

    <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#e9ecef", borderRadius: "5px" }}>
      <p style={{ margin: "0", fontSize: "14px", color: "#6c757d" }}>
        This email was sent from the Luxury Housing contact form on {new Date().toLocaleString()}.
      </p>
    </div>
  </div>
)
