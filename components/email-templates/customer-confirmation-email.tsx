import type * as React from "react";

interface CustomerConfirmationEmailProps {
  name: string;
  formType: "hero" | "contact" | "product" | "service";
  service?: string;
  product?: string;
}

export const CustomerConfirmationEmailTemplate: React.FC<
  CustomerConfirmationEmailProps
> = ({ name, formType, service, product }) => {
  const getFormTypeText = () => {
    switch (formType) {
      case "hero":
        return "طلب الاستشارة المجانية";
      case "contact":
        return "رسالة التواصل";
      case "product":
        return "استفسار المنتج التمويلي";
      case "service":
        return "استفسار الخدمة";
      default:
        return "طلبك";
    }
  };

  return (
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
          backgroundColor: "#1e293b",
          padding: "40px 20px",
          borderRadius: "12px 12px 0 0",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            margin: "0 0 10px 0",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          شركة لوكسري هاوسينج
        </h1>
        <p
          style={{
            color: "#cbd5e1",
            margin: "0",
            fontSize: "18px",
          }}
        >
          للحلول العقارية
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px 30px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#10b981",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <span style={{ color: "#ffffff", fontSize: "40px" }}>✓</span>
          </div>
          <h2
            style={{
              color: "#1e293b",
              margin: "0 0 10px 0",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            شكراً لك {name}
          </h2>
          <p
            style={{
              color: "#64748b",
              margin: "0",
              fontSize: "18px",
            }}
          >
            تم استلام {getFormTypeText()} بنجاح
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#f8fafc",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "25px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              color: "#1e293b",
              marginTop: "0",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            ماذا يحدث الآن؟
          </h3>
          <div style={{ marginBottom: "15px" }}>
            <div
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                marginLeft: "12px",
                verticalAlign: "middle",
              }}
            ></div>
            <span style={{ color: "#475569", fontSize: "16px" }}>
              سيتواصل معك أحد مستشارينا المعتمدين خلال 24 ساعة
            </span>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <div
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                marginLeft: "12px",
                verticalAlign: "middle",
              }}
            ></div>
            <span style={{ color: "#475569", fontSize: "16px" }}>
              سنقوم بدراسة احتياجاتك وتقديم أفضل الحلول المناسبة
            </span>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <div
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                marginLeft: "12px",
                verticalAlign: "middle",
              }}
            ></div>
            <span style={{ color: "#475569", fontSize: "16px" }}>
              سنرافقك في كل خطوة حتى تحقيق هدفك
            </span>
          </div>
        </div>

        {(service || product) && (
          <div
            style={{
              backgroundColor: "#fef3c7",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "25px",
              border: "1px solid #fbbf24",
            }}
          >
            <h4
              style={{
                color: "#92400e",
                marginTop: "0",
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {service ? "الخدمة المطلوبة:" : "المنتج المطلوب:"}
            </h4>
            <p
              style={{
                color: "#92400e",
                margin: "0",
                fontSize: "16px",
              }}
            >
              {service || product}
            </p>
          </div>
        )}

        <div
          style={{
            backgroundColor: "#dbeafe",
            padding: "25px",
            borderRadius: "12px",
            border: "1px solid #3b82f6",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              color: "#1e40af",
              marginTop: "0",
              marginBottom: "15px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            هل تحتاج مساعدة فورية؟
          </h3>
          <p
            style={{
              color: "#1e40af",
              margin: "0 0 20px 0",
              fontSize: "16px",
            }}
          >
            تواصل معنا مباشرة على:
          </p>
          <div style={{ marginBottom: "15px" }}>
            <a
              href="tel:0581111488"
              style={{
                color: "#1e40af",
                textDecoration: "none",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              📞 0581111488
            </a>
          </div>
          <div>
            <a
              href="mailto:info@luxuryhousing.sa"
              style={{
                color: "#1e40af",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              ✉️ info@luxuryhousing.sa
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#f1f5f9",
          padding: "30px 20px",
          borderRadius: "0 0 12px 12px",
          textAlign: "center",
          border: "1px solid #e2e8f0",
          borderTop: "none",
        }}
      >
        <p
          style={{
            margin: "0 0 15px 0",
            fontSize: "16px",
            color: "#1e293b",
            fontWeight: "bold",
          }}
        >
          مستشار تمويل عقاري معتمد
        </p>
        <p
          style={{
            margin: "0 0 10px 0",
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          الدمام، المملكة العربية السعودية
        </p>
        <p
          style={{
            margin: "0",
            fontSize: "12px",
            color: "#94a3b8",
          }}
        >
          نحقق أحلامكم في تملك المسكن المثالي
        </p>
      </div>
    </div>
  );
};
