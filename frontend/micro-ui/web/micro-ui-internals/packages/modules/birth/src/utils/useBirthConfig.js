// utils/createBirthConfig.js
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

  const config = {
    cards: [
      {
        sections: [
          {
            type: "DATA",
            cardHeader: { value: t("BIRTH_CERTIFICATE_DETAILS") },
            values: [
              { key: t("BC_CHILD_NAME"), value: birthCertData?.child?.name || "NA" },
              { key: t("BC_GENDER"), value: birthCertData?.child?.gender || "NA" },
              { key: t("BC_DATE_OF_BIRTH"), value: birthCertData?.child?.dob || "NA" },
              { key: t("BC_PLACE_OF_BIRTH"), value: birthCertData?.child?.placeofbirth || "NA" },
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("BC_PARENTS_DETAILS"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("BC_MOTHER_NAME"), value: birthCertData?.parents?.motherName || "NA" },
              { key: t("BC_FATHER_NAME"), value: birthCertData?.parents?.fatherName || "NA" },
              { key: t("BC_ADDRESS"), value: birthCertData?.address?.fullAddress || "NA" },
            ],
          },
          {
            type: "WFHISTORY",
            businessService: "BND",
            applicationNo: applicationNumber,
            tenantId,
            timelineStatusPrefix: "WF_BND_",
          },
          {
            type: "WFACTIONS",
            forcedActionPrefix: "WF_BND_ACTION",
            businessService: "BND",
            applicationNo: applicationNumber,
            tenantId,
            applicationDetails: {},
            url: "/birth-death-services/birth/_update",
            moduleCode: "BND",
            editApplicationNumber: undefined,
          },
        ],
      },
    ],
    apiResponse: birthCertData,
    additionalDetails: {},
  };

  return config;
};

export default useBirthConfig;
