import { RealEstateRefinancingFormData } from "@/lib/email";

interface RealEstateRefinancingEmailTemplateProps {
  formData: RealEstateRefinancingFormData;
}

export default function RealEstateRefinancingEmailTemplate({
  formData,
}: RealEstateRefinancingEmailTemplateProps) {
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
            طلب إعادة التمويل العقاري
          </h1>
          <p style={{ color: "#666", margin: "10px 0 0 0", fontSize: "16px" }}>
            شركة لوكسري هاوسينج للحلول العقارية
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
              <strong>القيمة الحالية للعقار:</strong> {formData.propertyValue}{" "}
              ريال سعودي
            </div>
          </div>
        </div>

        {/* Current Loan Information Section */}
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
            معلومات القرض الحالي
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <strong>مبلغ القرض الحالي:</strong> {formData.currentLoanAmount}{" "}
              ريال سعودي
            </div>
            <div>
              <strong>البنك الحالي:</strong> {formData.currentBank}
            </div>
            <div>
              <strong>القسط الشهري الحالي:</strong>{" "}
              {formData.currentMonthlyPayment} ريال سعودي
            </div>
            <div>
              <strong>تاريخ بداية القرض:</strong> {formData.loanStartDate}
            </div>
            <div>
              <strong>المدة المتبقية:</strong> {formData.remainingLoanTerm} سنة
            </div>
            <div>
              <strong>الغرض من إعادة التمويل:</strong>{" "}
              {formData.refinancingPurpose}
            </div>
          </div>
        </div>

        {/* Financial Information Section */}
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
              <strong>البنك المفضل للتمويل الجديد:</strong>{" "}
              {formData.bankName || "غير محدد"}
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        {formData.message && (
          <div style={{ marginBottom: "25px" }}>
            <h2
              style={{
                color: "#dc2626",
                fontSize: "18px",
                marginBottom: "15px",
                paddingBottom: "8px",
                borderBottom: "2px solid #ef4444",
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
          <p>تم إرسال هذا الطلب من موقع شركة لوكسري هاوسينج للحلول العقارية</p>
          <p>التاريخ: {new Date().toLocaleDateString("ar-SA")}</p>
        </div>
      </div>
    </div>
  );
}
