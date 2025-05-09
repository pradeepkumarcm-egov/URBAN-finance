import { useTranslation } from "react-i18next";

const viewDeathConfig = (DeathData, applicationNumber, tenantId) => {
    console.log("inide view death config ");
  const { t } = useTranslation();

  if (!DeathData || !Array.isArray(DeathData)) {
    return {
      cards: [],
      apiResponse: {},
      additionalDetails: {},
    };
  }

  const getValue = (val) => (val === null || val === undefined ? "NA" : val);

  const config = {
    cards: [
      {
        sections: [
          {
            type: "DATA",
            cardHeader: { value: t("DC_DECEASED_DETAILS"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("DC_FULL_NAME"), value: getValue(DeathData.fullName) },
              { key: t("DC_GENDER"), value: getValue(DeathData.genderStr) },
              { key: t("DC_AGE"), value: getValue(DeathData.age) },
              { key: t("DC_DATE_OF_DEATH"), value: DeathData.dateofdeath ? new Date(DeathData.dateofdeath).toLocaleDateString() : "NA" },
              { key: t("DC_PLACE_OF_DEATH"), value: getValue(DeathData.placeofdeath) },
              { key: t("DC_NATIONALITY"), value: getValue(DeathData.nationality) },
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("DC_ADDRESS_DETAILS"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("DC_PERMANENT_ADDRESS"), value: getValue(DeathData.deathPermaddr?.fullAddress) },
              { key: t("DC_PRESENT_ADDRESS"), value: getValue(DeathData.deathPresentaddr?.fullAddress) },
            ],
          },
          {
            type: "DATA",
            cardHeader: { value: t("DC_RELATION_DETAILS"), inlineStyles: { marginTop: "2rem" } },
            values: [
              { key: t("DC_FATHER_NAME"), value: getValue(DeathData.deathFatherInfo?.fullName) },
              { key: t("DC_MOTHER_NAME"), value: getValue(DeathData.deathMotherInfo?.fullName) },
              { key: t("DC_SPOUSE_NAME"), value: getValue(DeathData.deathSpouseInfo?.fullName) },
            ],
          },
          {
            type: "WFHISTORY",
            businessService: "DEATH",
            applicationNo: applicationNumber,
            tenantId: tenantId,
            timelineStatusPrefix: "WF_DEATH_",
          },
          {
            type: "WFACTIONS",
            forcedActionPrefix: "WF_DEATH_ACTION",
            businessService: "DEATH",
            applicationNo: applicationNumber,
            tenantId: tenantId,
            applicationDetails: {},
            url: "/death-services/death/_update",
            moduleCode: "DEATH",
          },
        ],
      },
    ],
    apiResponse: DeathData,
    additionalDetails: {},
  };

  return config;
};

export default viewDeathConfig;
