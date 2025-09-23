interface PersonalFinancingFormData {
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  birthDate: string;
  workplace: string;
  militaryRank: string;
  workStartDate: string;
  bankName: string;
  totalSalary: string;
  hasViolations: string;
  personalLoans: string;
  personalLoanInstallment: string;
  realEstateLoans: string;
  realEstateLoanInstallment: string;
  supportAmount: string;
  creditCardDebts: string;
  carLoans: string;
  carLoanInstallment: string;
  houseOwnership: string;
  city: string;
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
          من موقع لوكسري هاوسينغ
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
                  {formData.workStartDate}
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
                  الراتب الإجمالي:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.totalSalary} ريال سعودي
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
                  تعثرات في سمة:
                </td>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  {formData.hasViolations}
                </td>
              </tr>
              {formData.personalLoans && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    القروض الشخصية:
                  </td>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>
                    {formData.personalLoans} ريال
                  </td>
                </tr>
              )}
              {formData.personalLoanInstallment && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    قسط القروض الشخصية:
                  </td>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>
                    {formData.personalLoanInstallment} ريال
                  </td>
                </tr>
              )}
              {formData.realEstateLoans && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    القروض العقارية:
                  </td>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>
                    {formData.realEstateLoans} ريال
                  </td>
                </tr>
              )}
              {formData.realEstateLoanInstallment && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    قسط القروض العقارية:
                  </td>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>
                    {formData.realEstateLoanInstallment} ريال
                  </td>
                </tr>
              )}
              {formData.supportAmount && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    مبلغ الدعم:
                  </td>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>
                    {formData.supportAmount} ريال
                  </td>
                </tr>
              )}
              {formData.creditCardDebts && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    البطاقات الائتمانية:
                  </td>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>
                    {formData.creditCardDebts} ريال
                  </td>
                </tr>
              )}
              {formData.carLoans && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    قروض السيارات:
                  </td>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>
                    {formData.carLoans} ريال
                  </td>
                </tr>
              )}
              {formData.carLoanInstallment && (
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    قسط قروض السيارات:
                  </td>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>
                    {formData.carLoanInstallment} ريال
                  </td>
                </tr>
              )}
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
            تم إرسال هذا الطلب من موقع لوكسري هاوسينغ - مستشار تمويل عقاري معتمد
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
