import { RealEstateMortgageFormData } from "@/lib/email";

interface RealEstateMortgageEmailTemplateProps {
  formData: RealEstateMortgageFormData;
}

export default function RealEstateMortgageEmailTemplate({
  formData,
}: RealEstateMortgageEmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        direction: "rtl",
        textAlign: "right",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            paddingBottom: "20px",
            borderBottom: "3px solid #2563eb",
          }}
        >
          <h1
            style={{
              color: "#2563eb",
              fontSize: "24px",
              margin: "0",
              fontWeight: "bold",
            }}
          >
            طلب الرهن العقاري
          </h1>
          <p style={{ color: "#666", margin: "10px 0 0 0", fontSize: "16px" }}>
            شركة لوكسري هاوسينغ للحلول العقارية
          </p>
        </div>

        {/* Personal Information Section */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: "#1e40af",
              fontSize: "18px",
              marginBottom: "15px",
              paddingBottom: "8px",
              borderBottom: "2px solid #3b82f6",
            }}
          >
            البيانات الشخصية
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <strong>الاسم ثلاثي:</strong> {formData.fullName}
            </div>
            <div>
              <strong>رقم الجوال:</strong> {formData.phoneNumber}
            </div>
            <div>
              <strong>البريد الإلكتروني:</strong> {formData.email}
            </div>
            <div>
              <strong>رقم الهوية:</strong> {formData.nationalId}
            </div>
            <div>
              <strong>تاريخ الميلاد:</strong> {formData.birthDate}
            </div>
            <div>
              <strong>المدينة:</strong> {formData.city}
            </div>
          </div>
        </div>

        {/* Property Information Section */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: "#059669",
              fontSize: "18px",
              marginBottom: "15px",
              paddingBottom: "8px",
              borderBottom: "2px solid #10b981",
            }}
          >
            معلومات العقار
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <strong>نوع العقار:</strong> {formData.propertyType}
            </div>
            <div>
              <strong>قيمة العقار:</strong> {formData.propertyValue} ريال سعودي
            </div>
            <div>
              <strong>الدفعة المقدمة المتاحة:</strong> {formData.downPayment}{" "}
              ريال سعودي
            </div>
            <div>
              <strong>مبلغ القرض المطلوب:</strong> {formData.loanAmount} ريال
              سعودي
            </div>
            <div>
              <strong>موقع العقار:</strong> {formData.propertyLocation}
            </div>
            <div>
              <strong>عمر العقار:</strong> {formData.propertyAge || "غير محدد"}{" "}
              سنة
            </div>
          </div>
        </div>

        {/* Financial Information Section */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: "#7c3aed",
              fontSize: "18px",
              marginBottom: "15px",
              paddingBottom: "8px",
              borderBottom: "2px solid #8b5cf6",
            }}
          >
            المعلومات المالية
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <strong>الدخل الشهري:</strong> {formData.monthlyIncome} ريال سعودي
            </div>
            <div>
              <strong>نوع العمل:</strong> {formData.employmentType}
            </div>
            <div>
              <strong>سنوات الخبرة:</strong> {formData.workExperience} سنة
            </div>
            <div>
              <strong>اسم البنك:</strong> {formData.bankName}
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <strong>القروض الموجودة:</strong>{" "}
              {formData.existingLoans || "لا يوجد"}
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        {formData.message && (
          <div style={{ marginBottom: "25px" }}>
            <h2
              style={{
                color: "#ea580c",
                fontSize: "18px",
                marginBottom: "15px",
                paddingBottom: "8px",
                borderBottom: "2px solid #f97316",
              }}
            >
              ملاحظات إضافية
            </h2>
            <div
              style={{
                backgroundColor: "#fef3c7",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #f59e0b",
              }}
            >
              {formData.message}
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "2px solid #e5e7eb",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          <p>تم إرسال هذا الطلب من موقع شركة لوكسري هاوسينغ للحلول العقارية</p>
          <p>التاريخ: {new Date().toLocaleDateString("ar-SA")}</p>
        </div>
      </div>
    </div>
  );
}
