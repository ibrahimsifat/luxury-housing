import type * as React from "react"

interface ContactFormEmailProps {
  name: string
  email: string
  phone: string
  service?: string
  message: string
}

export const ContactFormEmailTemplate: React.FC<ContactFormEmailProps> = ({ name, email, phone, service, message }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      direction: "rtl",
      textAlign: "right",
    }}
  >
    {/* Header */}
    <div
      style={{
        backgroundColor: "#0f172a",
        padding: "30px 20px",
        borderRadius: "12px 12px 0 0",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "#ffffff",
          margin: "0",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        شركة لوكسري هاوسينغ للحلول العقارية
      </h1>
      <p
        style={{
          color: "#cbd5e1",
          margin: "10px 0 0 0",
          fontSize: "16px",
        }}
      >
        رسالة تواصل جديدة
      </p>
    </div>

    {/* Main Content */}
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "30px 20px",
        border: "1px solid #e2e8f0",
      }}
    >
      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h3
          style={{
            color: "#1e293b",
            marginTop: "0",
            marginBottom: "15px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          معلومات العميل
        </h3>
        <div style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#475569" }}>الاسم:</strong>
          <span style={{ color: "#1e293b", marginRight: "8px" }}>{name}</span>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#475569" }}>البريد الإلكتروني:</strong>
          <span style={{ color: "#1e293b", marginRight: "8px" }}>{email}</span>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <strong style={{ color: "#475569" }}>رقم الهاتف:</strong>
          <span style={{ color: "#1e293b", marginRight: "8px" }}>{phone}</span>
        </div>
        {service && (
          <div style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#475569" }}>الخدمة المطلوبة:</strong>
            <span style={{ color: "#1e293b", marginRight: "8px" }}>{service}</span>
          </div>
        )}
      </div>

      <div
        style={{
          backgroundColor: "#fef3c7",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #fbbf24",
        }}
      >
        <h3
          style={{
            color: "#92400e",
            marginTop: "0",
            marginBottom: "15px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          رسالة العميل
        </h3>
        <p
          style={{
            color: "#92400e",
            margin: "0",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
          }}
        >
          {message}
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#dcfce7",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #16a34a",
        }}
      >
        <h3
          style={{
            color: "#15803d",
            marginTop: "0",
            marginBottom: "15px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          الإجراءات المطلوبة
        </h3>
        <ul
          style={{
            color: "#15803d",
            margin: "0",
            paddingRight: "20px",
            lineHeight: "1.8",
          }}
        >
          <li>الرد على العميل خلال 24 ساعة</li>
          <li>تقديم المعلومات المطلوبة عن الخدمة</li>
          <li>تحديد موعد للاستشارة إذا لزم الأمر</li>
          <li>متابعة العميل حتى تلبية احتياجاته</li>
        </ul>
      </div>
    </div>

    {/* Footer */}
    <div
      style={{
        backgroundColor: "#f1f5f9",
        padding: "20px",
        borderRadius: "0 0 12px 12px",
        textAlign: "center",
        border: "1px solid #e2e8f0",
        borderTop: "none",
      }}
    >
      <p
        style={{
          margin: "0 0 10px 0",
          fontSize: "14px",
          color: "#64748b",
        }}
      >
        تم إرسال هذه الرسالة من صفحة التواصل في موقع شركة لوكسري هاوسينغ
      </p>
      <p
        style={{
          margin: "0",
          fontSize: "12px",
          color: "#94a3b8",
        }}
      >
        التاريخ والوقت:{" "}
        {new Date().toLocaleString("ar-SA", {
          timeZone: "Asia/Riyadh",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  </div>
)
