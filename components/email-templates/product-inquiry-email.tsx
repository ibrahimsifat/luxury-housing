import type * as React from "react";

interface ProductInquiryEmailProps {
  name: string;
  email: string;
  phone: string;
  city?: string;
  monthlyIncome?: string;
  requestedAmount?: string;
  propertyType?: string;
  employment?: string;
  inquiryType?: string;
  message?: string;
  preferredContact?: string;
  product?: string;
}

export const ProductInquiryEmailTemplate: React.FC<
  ProductInquiryEmailProps
> = ({
  name,
  email,
  phone,
  city,
  monthlyIncome,
  requestedAmount,
  propertyType,
  employment,
  inquiryType,
  message,
  preferredContact,
  product,
}) => (
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
        backgroundColor: "#7c3aed",
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
        شركة لوكسري هاوسينج للحلول العقارية
      </h1>
      <p
        style={{
          color: "#e9d5ff",
          margin: "10px 0 0 0",
          fontSize: "16px",
        }}
      >
        استفسار عن منتج تمويلي جديد
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
      {/* Personal Information */}
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
          المعلومات الشخصية
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
        {city && (
          <div style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#475569" }}>المدينة:</strong>
            <span style={{ color: "#1e293b", marginRight: "8px" }}>{city}</span>
          </div>
        )}
        {preferredContact && (
          <div style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#475569" }}>طريقة التواصل المفضلة:</strong>
            <span style={{ color: "#1e293b", marginRight: "8px" }}>
              {preferredContact === "phone"
                ? "مكالمة هاتفية"
                : preferredContact === "whatsapp"
                ? "واتساب"
                : preferredContact === "email"
                ? "بريد إلكتروني"
                : preferredContact}
            </span>
          </div>
        )}
      </div>

      {/* Financial Information */}
      {(monthlyIncome || requestedAmount || employment) && (
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
            المعلومات المالية
          </h3>
          {monthlyIncome && (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#92400e" }}>الراتب الشهري:</strong>
              <span style={{ color: "#92400e", marginRight: "8px" }}>
                {monthlyIncome}
              </span>
            </div>
          )}
          {requestedAmount && (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#92400e" }}>المبلغ المطلوب:</strong>
              <span style={{ color: "#92400e", marginRight: "8px" }}>
                {requestedAmount}
              </span>
            </div>
          )}
          {employment && (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#92400e" }}>نوع العمل:</strong>
              <span style={{ color: "#92400e", marginRight: "8px" }}>
                {employment}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Property Information */}
      {(product || propertyType || inquiryType) && (
        <div
          style={{
            backgroundColor: "#e0f2fe",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #0284c7",
          }}
        >
          <h3
            style={{
              color: "#0c4a6e",
              marginTop: "0",
              marginBottom: "15px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            تفاصيل العقار والخدمة
          </h3>
          {product && (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#0c4a6e" }}>المنتج:</strong>
              <span style={{ color: "#0c4a6e", marginRight: "8px" }}>
                {product}
              </span>
            </div>
          )}
          {propertyType && (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#0c4a6e" }}>نوع العقار:</strong>
              <span style={{ color: "#0c4a6e", marginRight: "8px" }}>
                {propertyType}
              </span>
            </div>
          )}
          {inquiryType && (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#0c4a6e" }}>نوع الاستفسار:</strong>
              <span style={{ color: "#0c4a6e", marginRight: "8px" }}>
                {inquiryType}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Message */}
      {message && (
        <div
          style={{
            backgroundColor: "#f3e8ff",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #7c3aed",
          }}
        >
          <h3
            style={{
              color: "#581c87",
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
              color: "#581c87",
              margin: "0",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </p>
        </div>
      )}

      {/* Action Items */}
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
          <li>مراجعة المعلومات المالية للعميل</li>
          <li>التواصل مع العميل خلال 24 ساعة</li>
          <li>تقديم عرض مناسب حسب الإمكانيات المالية</li>
          <li>تحديد موعد لمناقشة تفاصيل التمويل</li>
          <li>متابعة العميل حتى إتمام عملية التمويل</li>
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
        تم إرسال هذا الاستفسار من صفحة المنتجات في موقع شركة لوكسري هاوسينج
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
);
