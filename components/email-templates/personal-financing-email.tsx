interface PersonalFinancingFormData {
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  financingType: string;
  birthDate: string;
  birthDateType: string;
  workplace: string;
  militaryRank: string;
  workStartDate: string;
  workStartDateType: string;
  monthlySalary: string;
  personalLoanInstallment: string;
  personalLoanEarlyPayment: string;
  bankName: string;
  houseOwnership: string;
  city: string;
  creditIssues: string;
  serviceSuspension: string;
  message: string;
}

interface PersonalFinancingEmailProps {
  formData: PersonalFinancingFormData;
}

export default function PersonalFinancingEmail({
  formData,
}: PersonalFinancingEmailProps) {
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
          طلب تمويل شخصي جديد
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
                  {formData.birthDate} ({formData.birthDateType || "ميلادي"})
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
                  نوع التمويل:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.financingType}
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

        {/* Work Information */}
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
            البيانات الوظيفية
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
                  جهة العمل:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.workplace}
                </td>
              </tr>
              {formData.militaryRank && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    الرتبة العسكرية:
                  </td>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>
                    {formData.militaryRank}
                  </td>
                </tr>
              )}
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  تاريخ بداية العمل:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.workStartDate} (
                  {formData.workStartDateType || "ميلادي"})
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
              <tr>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#374151",
                  }}
                >
                  الراتب الشهري:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.monthlySalary} ريال سعودي
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
                  قسط القرض الشخصي:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.personalLoanInstallment} ريال
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
                  مبلغ السداد المبكر:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.personalLoanEarlyPayment} ريال
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
                  تعثر في سمة:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.creditIssues}
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
                  إيقاف خدمات:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.serviceSuspension}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
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
            معلومات إضافية
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
                  البيت ملك:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.houseOwnership}
                </td>
              </tr>
              {formData.message && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#374151",
                      verticalAlign: "top",
                    }}
                  >
                    ملاحظات إضافية:
                  </td>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>
                    {formData.message}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
