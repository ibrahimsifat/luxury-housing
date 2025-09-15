import type * as React from "react"

interface ConsultationEmailProps {
  name: string
  email: string
  phone?: string
  companyName?: string
  companySize?: string
  industry?: string
  serviceInterest?: string
  consultationDate: Date
  consultationTime: string
  consultationType: string
  projectDescription?: string
  hearAboutUs?: string
}

export const ConsultationEmailTemplate: React.FC<ConsultationEmailProps> = ({
  name,
  email,
  phone,
  companyName,
  companySize,
  industry,
  serviceInterest,
  consultationDate,
  consultationTime,
  consultationType,
  projectDescription,
  hearAboutUs,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <h2 style={{ color: "#333", borderBottom: "2px solid #dc3545", paddingBottom: "10px" }}>
      New Consultation Request
    </h2>

    <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", margin: "20px 0" }}>
      <h3 style={{ color: "#dc3545", marginTop: "0" }}>Contact Information</h3>
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
      {companyName && (
        <p>
          <strong>Company:</strong> {companyName}
        </p>
      )}
      {companySize && (
        <p>
          <strong>Company Size:</strong> {companySize}
        </p>
      )}
      {industry && (
        <p>
          <strong>Industry:</strong> {industry}
        </p>
      )}
    </div>

    <div
      style={{
        backgroundColor: "#fff3cd",
        padding: "20px",
        borderRadius: "5px",
        margin: "20px 0",
        border: "1px solid #ffeaa7",
      }}
    >
      <h3 style={{ color: "#dc3545", marginTop: "0" }}>Consultation Details</h3>
      <p>
        <strong>Date:</strong> {consultationDate.toLocaleDateString()}
      </p>
      <p>
        <strong>Time:</strong> {consultationTime}
      </p>
      <p>
        <strong>Type:</strong> {consultationType}
      </p>
      {serviceInterest && (
        <p>
          <strong>Service Interest:</strong> {serviceInterest}
        </p>
      )}
    </div>

    {projectDescription && (
      <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", margin: "20px 0" }}>
        <h3 style={{ color: "#dc3545", marginTop: "0" }}>Project Description</h3>
        <p style={{ whiteSpace: "pre-wrap" }}>{projectDescription}</p>
      </div>
    )}

    {hearAboutUs && (
      <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", margin: "20px 0" }}>
        <h3 style={{ color: "#dc3545", marginTop: "0" }}>How they heard about us</h3>
        <p>{hearAboutUs}</p>
      </div>
    )}

    <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#e9ecef", borderRadius: "5px" }}>
      <p style={{ margin: "0", fontSize: "14px", color: "#6c757d" }}>
        This consultation request was sent from the Luxury Housing website on {new Date().toLocaleString()}.
      </p>
    </div>
  </div>
)
