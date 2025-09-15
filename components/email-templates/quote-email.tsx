import type * as React from "react"

interface QuoteEmailProps {
  name: string
  email: string
  phone?: string
  company?: string
  projectType: string
  complexity: string
  features: string[]
  estimatedPrice: number
  estimatedTimeWeeks: number
  message?: string
}

export const QuoteEmailTemplate: React.FC<QuoteEmailProps> = ({
  name,
  email,
  phone,
  company,
  projectType,
  complexity,
  features,
  estimatedPrice,
  estimatedTimeWeeks,
  message,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <h2 style={{ color: "#333", borderBottom: "2px solid #28a745", paddingBottom: "10px" }}>New Quote Request</h2>

    <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", margin: "20px 0" }}>
      <h3 style={{ color: "#28a745", marginTop: "0" }}>Contact Information</h3>
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

    <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", margin: "20px 0" }}>
      <h3 style={{ color: "#28a745", marginTop: "0" }}>Project Details</h3>
      <p>
        <strong>Project Type:</strong> {projectType}
      </p>
      <p>
        <strong>Complexity:</strong> {complexity}
      </p>
      <p>
        <strong>Estimated Price:</strong> ${estimatedPrice.toLocaleString()}
      </p>
      <p>
        <strong>Estimated Timeline:</strong> {estimatedTimeWeeks} weeks
      </p>
    </div>

    {features.length > 0 && (
      <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", margin: "20px 0" }}>
        <h3 style={{ color: "#28a745", marginTop: "0" }}>Requested Features</h3>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    )}

    {message && (
      <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", margin: "20px 0" }}>
        <h3 style={{ color: "#28a745", marginTop: "0" }}>Additional Message</h3>
        <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
      </div>
    )}

    <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#e9ecef", borderRadius: "5px" }}>
      <p style={{ margin: "0", fontSize: "14px", color: "#6c757d" }}>
        This quote request was sent from the Luxury Housing website on {new Date().toLocaleString()}.
      </p>
    </div>
  </div>
)
