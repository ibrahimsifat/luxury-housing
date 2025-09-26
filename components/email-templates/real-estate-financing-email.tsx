interface RealEstateFinancingFormData {
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  serviceType: string;
  birthDate: string;
  birthDateType: string;
  familyMembers: string;
  workplace: string;
  militaryRank: string;
  workStartDate: string;
  workStartDateType: string;
  monthlySalary: string;
  personalLoanInstallment: string;
  personalLoanEarlyPayment: string;
  creditCardDebt: string;
  creditCardInstallment: string;
  personalLoanDebt: string;
  personalLoanInstallmentDebt: string;
  carLoanDebt: string;
  carLoanInstallment: string;
  salaryBank: string;
  housingSupportEligibility: string;
  propertyValue: string;
  propertyCity: string;
  creditIssues: string;
  serviceSuspension: string;
  message: string;
}

interface RealEstateFinancingEmailProps {
  formData: RealEstateFinancingFormData;
}

export default function RealEstateFinancingEmail({
  formData,
}: RealEstateFinancingEmailProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        direction: "rtl",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
          color: "white",
          padding: "30px",
          textAlign: "center",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <h1 style={{ margin: "0", fontSize: "28px", fontWeight: "bold" }}>
          طلب تمويل عقاري جديد
        </h1>
        <p style={{ margin: "10px 0 0 0", fontSize: "16px", opacity: "0.9" }}>
          من موقع لوكسري هاوسينج
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          border: "1px solid #e5e7eb",
          borderRadius: "0 0 10px 10px",
        }}
      >
        {/* Personal Information */}
        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#1e40af",
              fontSize: "20px",
              marginBottom: "15px",
              borderBottom: "2px solid #3b82f6",
              paddingBottom: "5px",
            }}
          >
            البيانات الشخصية
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                    width: "40%",
                  }}
                >
                  الاسم ثلاثي:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.fullName}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  رقم الجوال:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.phoneNumber}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  البريد الإلكتروني:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.email}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  رقم الهوية:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.nationalId}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  تاريخ الميلاد:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.birthDate}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  المدينة:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.city}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Property Information */}
        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#1e40af",
              fontSize: "20px",
              marginBottom: "15px",
              borderBottom: "2px solid #3b82f6",
              paddingBottom: "5px",
            }}
          >
            معلومات العقار
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                    width: "40%",
                  }}
                >
                  نوع العقار:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.propertyType}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  قيمة العقار:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.propertyValue} ريال سعودي
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  الدفعة المقدمة:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.downPayment} ريال سعودي
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Financial Information */}
        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#1e40af",
              fontSize: "20px",
              marginBottom: "15px",
              borderBottom: "2px solid #3b82f6",
              paddingBottom: "5px",
            }}
          >
            المعلومات المالية
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                    width: "40%",
                  }}
                >
                  الدخل الشهري:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.monthlyIncome} ريال سعودي
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  نوع العمل:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.employmentType}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  سنوات الخبرة:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.workExperience} سنة
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  اسم البنك:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.bankName}
                </td>
              </tr>
              {formData.existingLoans && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    القروض الموجودة:
                  </td>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>
                    {formData.existingLoans}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        {formData.message && (
          <div style={{ marginBottom: "30px" }}>
            <h2
              style={{
                color: "#1e40af",
                fontSize: "20px",
                marginBottom: "15px",
                borderBottom: "2px solid #3b82f6",
                paddingBottom: "5px",
              }}
            >
              ملاحظات إضافية
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              {formData.message}
            </p>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            textAlign: "center",
          }}
        >
          <p style={{ margin: "0", color: "#6b7280", fontSize: "14px" }}>
            تم إرسال هذا الطلب من موقع لوكسري هاوسينج - مستشار تمويل عقاري معتمد
          </p>
          <p
            style={{ margin: "5px 0 0 0", color: "#9ca3af", fontSize: "12px" }}
          >
            تاريخ الإرسال: {new Date().toLocaleDateString("ar-SA")}
          </p>
        </div>
      </div>
    </div>
  );
}
