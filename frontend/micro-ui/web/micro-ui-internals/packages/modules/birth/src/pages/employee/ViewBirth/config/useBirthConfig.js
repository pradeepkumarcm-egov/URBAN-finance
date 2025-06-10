import { useTranslation } from "react-i18next";

const useBirthConfig = (birthCertData, applicationNumber, tenantId) => {
  const { t } = useTranslation();

  if (!birthCertData) {
    return {
      cards: [],
      apiResponse: {},
      additionalDetails: {},
    };
  }

  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    }
    return "NA";
  };

  const config = {
    cards: [
      {
        sections: [
          {
            type: "DATA",
            cardHeader: { value: t("BIRTH_CERTIFICATE_DETAILS") },
            values: [
              { key: t("Registration_Number"), value: birthCertData.BirthCertificate[0].registrationno || "NA" },
              { key: t("Hospital Name"), value: birthCertData.BirthCertificate[0].hospitalname || "NA" },
              { key: t("Date of registration"), value: formatDate(birthCertData.BirthCertificate[0].dateofreport) || "NA" },
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("Information of Child"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("Date Of Birth"), value: formatDate(birthCertData.BirthCertificate[0].dateofbirth) || "NA" },
              { key: t("Gender"), value: birthCertData.BirthCertificate[0].gender || "NA" },
              { key: t("Frist Name"), value: birthCertData.BirthCertificate[0].firstname || "NA" },
              { key: t("Middle Name"), value: birthCertData.BirthCertificate[0].middlename || "NA" },
              { key: t("Last Name"), value: birthCertData.BirthCertificate[0].lastname || "NA" },
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("Birth Place"), inlineStyles: { marginTop: "2rem" } },
            values: [{ key: t("Birth Place"), value: birthCertData.BirthCertificate[0].placeofbirth || "NA" }],
          },
          {
            type: "DATA",
            cardHeader: { value: t("Father's Information"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("First Name"), value: birthCertData.BirthCertificate[0].birthFatherInfo.firstname || "NA" },
              { key: t("Middle Name"), value: birthCertData.BirthCertificate[0].birthFatherInfo.middlename || "-" },
              { key: t("Last Name"), value: birthCertData.BirthCertificate[0].birthFatherInfo.lastname || "NA" },
              { key: t("National Identity Proof Number"), value: birthCertData.BirthCertificate[0].birthFatherInfo.aadharno || "-" },
              { key: t("Email ID"), value: birthCertData.BirthCertificate[0].birthFatherInfo.emailid || "-" },
              { key: t("Mobile Number"), value: birthCertData.BirthCertificate[0].birthFatherInfo.mobileno || "-" },
              { key: t("Education"), value: birthCertData.BirthCertificate[0].birthFatherInfo.education || "-" },
              { key: t("Profession"), value: birthCertData.BirthCertificate[0].birthFatherInfo.proffession || "-" },
              { key: t("Nationality"), value: birthCertData.BirthCertificate[0].birthFatherInfo.nationality || "-" },
              { key: t("Religion"), value: birthCertData.BirthCertificate[0].birthFatherInfo.religion || "-" },
            ],
          },
          {
            type: "DATA",
            cardHeader: {
              value: t("Mother's Information"),
              inlineStyles: { marginTop: "2rem" },
            },
            values: [
              { key: t("First Name"), value: birthCertData.BirthCertificate[0].birthMotherInfo.firstname || "NA" },
              { key: t("Middle Name"), value: birthCertData.BirthCertificate[0].birthMotherInfo.middlename || "-" },
              { key: t("Last Name"), value: birthCertData.BirthCertificate[0].birthMotherInfo.lastname || "NA" },
              { key: t("National Identity Proof Number"), value: birthCertData.BirthCertificate[0].birthMotherInfo.aadharno || "-" },
              { key: t("Email ID"), value: birthCertData.BirthCertificate[0].birthMotherInfo.emailid || "-" },
              { key: t("Mobile Number"), value: birthCertData.BirthCertificate[0].birthMotherInfo.mobileno || "-" },
              { key: t("Education"), value: birthCertData.BirthCertificate[0].birthMotherInfo.education || "-" },
              { key: t("Profession"), value: birthCertData.BirthCertificate[0].birthMotherInfo.proffession || "-" },
              { key: t("Nationality"), value: birthCertData.BirthCertificate[0].birthMotherInfo.nationality || "-" },
              { key: t("Religion"), value: birthCertData.BirthCertificate[0].birthMotherInfo.religion || "-" },
            ],
          },
          {
            type: "DATA",
            cardHeader: {
              value: t("Present Address of Parents"),
              inlineStyles: { marginTop: "2rem" },
            },
            values: [
              { key: t("Building Number"), value: birthCertData.BirthCertificate[0].birthPresentaddr.buildingno || "-" },
              { key: t("House No"), value: birthCertData.BirthCertificate[0].birthPresentaddr.houseno || "-" },
              { key: t("Street Name"), value: birthCertData.BirthCertificate[0].birthPresentaddr.streetname || "-" },
              { key: t("Locality"), value: birthCertData.BirthCertificate[0].birthPresentaddr.locality || "-" },
              { key: t("Tehsil"), value: birthCertData.BirthCertificate[0].birthPresentaddr.tehsil || "-" },
              { key: t("District"), value: birthCertData.BirthCertificate[0].birthPresentaddr.district || "-" },
              { key: t("City"), value: birthCertData.BirthCertificate[0].birthPresentaddr.city || "-" },
              { key: t("State"), value: birthCertData.BirthCertificate[0].birthPresentaddr.state || "-" },
              { key: t("Pincode"), value: birthCertData.BirthCertificate[0].birthPresentaddr.pinno || "-" },
              { key: t("Country"), value: birthCertData.BirthCertificate[0].birthPresentaddr.country || "-" },
            ],
          },
          {
            type: "DATA",
            cardHeader: {
              value: t("Permanent Address of Parents"),
              inlineStyles: { marginTop: "2rem" },
            },
            values: [
              { key: t("Building Number"), value: birthCertData.BirthCertificate[0].birthPermaddr.buildingno || "-" },
              { key: t("House No"), value: birthCertData.BirthCertificate[0].birthPermaddr.houseno || "-" },
              { key: t("Street Name"), value: birthCertData.BirthCertificate[0].birthPermaddr.streetname || "-" },
              { key: t("Locality"), value: birthCertData.BirthCertificate[0].birthPermaddr.locality || "-" },
              { key: t("Tehsil"), value: birthCertData.BirthCertificate[0].birthPermaddr.tehsil || "-" },
              { key: t("District"), value: birthCertData.BirthCertificate[0].birthPermaddr.district || "-" },
              { key: t("City"), value: birthCertData.BirthCertificate[0].birthPermaddr.city || "-" },
              { key: t("State"), value: birthCertData.BirthCertificate[0].birthPermaddr.state || "-" },
              { key: t("Pincode"), value: birthCertData.BirthCertificate[0].birthPermaddr.pinno || "-" },
              { key: t("Country"), value: birthCertData.BirthCertificate[0].birthPermaddr.country || "-" },
            ],
          },
          {
            type: "DATA",
            cardHeader: {
              value: t("Informant’s Information"),
              inlineStyles: { marginTop: "2rem" },
            },
            values: [
              { key: t("Name"), value: birthCertData.BirthCertificate[0].informantsname || "-" },
              { key: t("Address"), value: birthCertData.BirthCertificate[0].informantsaddress || "-" },
            ],
          },
          {
            type: "DATA",
            cardHeader: {
              value: t("Remarks"),
              inlineStyles: { marginTop: "2rem" },
            },
            values: [{ key: t("Remarks"), value: birthCertData.BirthCertificate[0].remarks || "-" }],
          },

          {
            type: "WFHISTORY",
            businessService: "BIRTH_CERT",
            applicationNumber: applicationNumber,
            tenantId: tenantId,
            // moduleName: "BillingService",
            // timelineStatusPrefix: "TEST",
          },
          // {
          //   type: "COMPONENT",
          //   component: "EditButton",
          //   noCardStyle: true,
          //   props: {
          //     tenantId: tenantId,
          //     applicationNumber: applicationNumber,
          //   },
          // },
        ],
      },
    ],
    apiResponse: birthCertData,
    additionalDetails: {},
  };

  return config;
};

export default useBirthConfig;
