
import React from "react";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard } from "@egovernments/digit-ui-react-components";

const DeathCard = () => {  
  
  const { t } = useTranslation();

  // Check URL
  const isCitizen = window?.location?.pathname?.toLowerCase().includes("citizen");

  const propsForModuleCard = {
    moduleName: isCitizen ? t("Death Certificate Services") : t("Death Module - Employee Services"),
    kpis: [],
    links: isCitizen ? [
      {
        label: t("Apply for Death Certificate"),
        link: `/${window?.contextPath}/citizen/death/death-common/getCertificate`,
      },
      {
        label: t("My Applications"),
        link: `/${window?.contextPath}/citizen/death/death-citizen/myApplications`,
      },
    ] : [
      {
        label: t("Employee -Search and Download Death Certificate"),
        link: `/${window?.contextPath}/employee/death/death-common/getCertificate`,
      },
      {
        label: t("Employee - Register Death Certificate"),
        link: `/${window?.contextPath}/employee/death/death-common/create-death`,
      },
    ],
  };

  return <EmployeeModuleCard {...propsForModuleCard} />;
};

export default DeathCard;
