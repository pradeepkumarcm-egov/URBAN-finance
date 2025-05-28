
import React from "react";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard } from "@egovernments/digit-ui-react-components";

const DeathCard = ({userType}) => {  

  console.log("DeathCard");
  
  const { t } = useTranslation();

  // Check URL
  const isCitizen = window?.location?.pathname?.toLowerCase().includes("citizen");

  const propsForModuleCard = {
    moduleName: isCitizen ? t("ACTION_TEST_DEATH_CERTIFICATE") : t("COMMON_DEATH"),
    kpis: [],
    links: isCitizen ? [
      {
        label: t("BND_DEATH_APPLY_CERT"),
        link: `/${window?.contextPath}/citizen/death/death-common/getCertificate`,
      },
      {
        label: t("BND_MY_REQUESTS"),
        link: `/${window?.contextPath}/citizen/death/death-citizen/myApplications`,
      },
    ] : [
      {
        label: t("DEATH_REGISTRATION"),
        link: `/${window?.contextPath}/employee/death/death-common/create-death`,
      },
      {
        label: t("SEARCH_DEATH_CERTIFICATE"),
        link: `/${window?.contextPath}/employee/death/death-common/getCertificate`,
      },
    ],
  };

  return <EmployeeModuleCard {...propsForModuleCard} />;
};

export default DeathCard;
