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
            cardHeader: { value: t("BND_REGISTRATION") },
            values: [
              { key: t("BND_REG_NO_LABEL"), value: birthCertData.BirthCertificate[0].registrationno || "NA" },
              { key: t("BND_HOSPITALNAME_LABEL"), value: birthCertData.BirthCertificate[0].hospitalname || "NA" },
              { key: t("BND_DOR"), value: formatDate(birthCertData.BirthCertificate[0].dateofreport) || "NA" },
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_INFO_OF_CHILD"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BND_BIRTH_DOB"), value: formatDate(birthCertData.BirthCertificate[0].dateofbirth) || "NA" },
              { key: t("BND_COMMON_GENDER"), value: birthCertData.BirthCertificate[0].gender || "NA" },
              { key: t("BND_FIRSTNAME_LABEL"), value: birthCertData.BirthCertificate[0].firstname || "NA" },
              { key: t("BND_MIDDLENAME_LABEL"), value: birthCertData.BirthCertificate[0].middlename || "NA" },
              { key: t("BND_LASTNAME_LABEL"), value: birthCertData.BirthCertificate[0].lastname || "NA" },
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_BIRTH_PLACE"), inlineStyles: { marginTop: "2rem" } },
            values: [{ key: t("BND_BIRTH_PLACE"), value: birthCertData.BirthCertificate[0].placeofbirth || "NA" }],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BND_FATHERS_INFO"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BND_FIRSTNAME_LABEL"), value: birthCertData.BirthCertificate[0].birthFatherInfo.firstname || "NA" },
              { key: t("BND_MIDDLENAME_LABEL"), value: birthCertData.BirthCertificate[0].birthFatherInfo.middlename || "-" },
              { key: t("BND_LASTNAME_LABEL"), value: birthCertData.BirthCertificate[0].birthFatherInfo.lastname || "NA" },
              { key: t("BPAREG_HEADER_APPL_BPAREG_GOVT_APPROVED_ID_CARD"), value: birthCertData.BirthCertificate[0].birthFatherInfo.aadharno || "-" },
              { key: t("BND_EMAIL_ID"), value: birthCertData.BirthCertificate[0].birthFatherInfo.emailid || "-" },
              { key: t("CORE_COMMON_PROFILE_MOBILE_NUMBER"), value: birthCertData.BirthCertificate[0].birthFatherInfo.mobileno || "-" },
              { key: t("BND_EDUCATION"), value: birthCertData.BirthCertificate[0].birthFatherInfo.education || "-" },
              { key: t("BND_PROFESSION"), value: birthCertData.BirthCertificate[0].birthFatherInfo.proffession || "-" },
              { key: t("BND_NATIONALIT"), value: birthCertData.BirthCertificate[0].birthFatherInfo.nationality || "-" },
              { key: t("BND_RELIGION"), value: birthCertData.BirthCertificate[0].birthFatherInfo.religion || "-" },
            ],
          },
          {
            type: "DATA",
            cardHeader: {
              value: t("BND_MOTHERS_INFO"),
              inlineStyles: { marginTop: "2rem" },
            },
            values: [
              { key: t("BND_FIRSTNAME_LABEL"), value: birthCertData.BirthCertificate[0].birthMotherInfo.firstname || "NA" },
              { key: t("BND_MIDDLENAME_LABEL"), value: birthCertData.BirthCertificate[0].birthMotherInfo.middlename || "-" },
              { key: t("BND_LASTNAME_LABEL"), value: birthCertData.BirthCertificate[0].birthMotherInfo.lastname || "NA" },
              { key: t("BPAREG_HEADER_APPL_BPAREG_GOVT_APPROVED_ID_CARD"), value: birthCertData.BirthCertificate[0].birthMotherInfo.aadharno || "-" },
              { key: t("BND_EMAIL_ID"), value: birthCertData.BirthCertificate[0].birthMotherInfo.emailid || "-" },
              { key: t("CORE_COMMON_PROFILE_MOBILE_NUMBER"), value: birthCertData.BirthCertificate[0].birthMotherInfo.mobileno || "-" },
              { key: t("BND_EDUCATION"), value: birthCertData.BirthCertificate[0].birthMotherInfo.education || "-" },
              { key: t("BND_PROFESSION"), value: birthCertData.BirthCertificate[0].birthMotherInfo.proffession || "-" },
              { key: t("BND_NATIONALITY"), value: birthCertData.BirthCertificate[0].birthMotherInfo.nationality || "-" },
              { key: t("BND_RELIGION"), value: birthCertData.BirthCertificate[0].birthMotherInfo.religion || "-" },
            ],
          },
          {
            type: "DATA",
            cardHeader: {
              value: t("BND_PRESENT_ADDR_DURING_BIRTH"),
              inlineStyles: { marginTop: "2rem" },
            },
            values: [
              { key: t("BND_BUILDINGNO_LABEL"), value: birthCertData.BirthCertificate[0].birthPresentaddr.buildingno || "-" },
              { key: t("BND_HOUSENO_LABEL"), value: birthCertData.BirthCertificate[0].birthPresentaddr.houseno || "-" },
              { key: t("BND_STREETNAME_LABEL"), value: birthCertData.BirthCertificate[0].birthPresentaddr.streetname || "-" },
              { key: t("BND_LOCALITY_LABEL"), value: birthCertData.BirthCertificate[0].birthPresentaddr.BND_LOCALITY_LABEL || "-" },
              { key: t("BND_TEHSIL_LABEL"), value: birthCertData.BirthCertificate[0].birthPresentaddr.BND_TEHSIL_LABEL || "-" },
              { key: t("BND_DISTRICT_LABEL"), value: birthCertData.BirthCertificate[0].birthPresentaddr.BND_DISTRICT_LABEL || "-" },
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
              { key: t("BND_BUILDINGNO_LABEL"), value: birthCertData.BirthCertificate[0].birthPermaddr.buildingno || "-" },
              { key: t("BND_HOUSENO_LABEL"), value: birthCertData.BirthCertificate[0].birthPermaddr.houseno || "-" },
              { key: t("BND_STREETNAME_LABEL"), value: birthCertData.BirthCertificate[0].birthPermaddr.streetname || "-" },
              { key: t("BND_LOCALITY_LABEL"), value: birthCertData.BirthCertificate[0].birthPermaddr.BND_LOCALITY_LABEL || "-" },
              { key: t("BND_TEHSIL_LABEL"), value: birthCertData.BirthCertificate[0].birthPermaddr.BND_TEHSIL_LABEL || "-" },
              { key: t("BND_DISTRICT_LABEL"), value: birthCertData.BirthCertificate[0].birthPermaddr.BND_DISTRICT_LABEL || "-" },
              { key: t("BND_CITY_LABEL"), value: birthCertData.BirthCertificate[0].birthPermaddr.city || "-" },
              { key: t("BND_STATE_LABEL"), value: birthCertData.BirthCertificate[0].birthPermaddr.state || "-" },
              { key: t("BND_PINNO_LABEL"), value: birthCertData.BirthCertificate[0].birthPermaddr.pinno || "-" },
              { key: t("BND_COUNTRY_LABEL"), value: birthCertData.BirthCertificate[0].birthPermaddr.country || "-" },
            ],
          },
          {
            type: "DATA",
            cardHeader: {
              value: t("BND_INFORMANTS_INFO"),
              inlineStyles: { marginTop: "2rem" },
            },
            values: [
              { key: t("BND_COMMON_NAME"), value: birthCertData.BirthCertificate[0].informantsname || "-" },
              { key: t("BND_ADDRESS"), value: birthCertData.BirthCertificate[0].informantsaddress || "-" },
            ],
          },
          {
            type: "DATA",
            cardHeader: {
              value: t("BND_REMARKS_LABEL"),
              inlineStyles: { marginTop: "2rem" },
            },
            values: [{ key: t("BND_REMARKS_LABEL"), value: birthCertData.BirthCertificate[0].remarks || "-" }],
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
