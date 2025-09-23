import { BusinessSectorFormData } from "@/lib/email";

interface BusinessSectorEmailTemplateProps {
  formData: BusinessSectorFormData;
}

export default function BusinessSectorEmailTemplate({
  formData,
}: BusinessSectorEmailTemplateProps) {
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
            طلب تمويل قطاع الاعمال
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

        {/* Business Information Section */}
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
            معلومات النشاط التجاري
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <strong>نوع النشاط التجاري:</strong> {formData.businessType}
            </div>
            <div>
              <strong>اسم النشاط التجاري:</strong> {formData.businessName}
            </div>
            <div>
              <strong>رقم السجل التجاري:</strong>{" "}
              {formData.businessRegistration}
            </div>
            <div>
              <strong>تاريخ بداية النشاط:</strong> {formData.businessStartDate}
            </div>
            <div>
              <strong>الإيرادات الشهرية:</strong> {formData.monthlyRevenue} ريال
              سعودي
            </div>
            <div>
              <strong>عدد الموظفين:</strong> {formData.numberOfEmployees}
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <strong>عنوان النشاط التجاري:</strong> {formData.businessAddress}
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
              <strong>اسم البنك:</strong> {formData.bankName}
            </div>
            <div>
              <strong>المبلغ المطلوب:</strong> {formData.requestedAmount} ريال
              سعودي
            </div>
            <div>
              <strong>الغرض من التمويل:</strong> {formData.loanPurpose}
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
          <p>تم إرسال هذا الطلب من موقع شركة لوكسري هاوسينج للحلول العقارية</p>
          <p>التاريخ: {new Date().toLocaleDateString("ar-SA")}</p>
        </div>
      </div>
    </div>
  );
}
