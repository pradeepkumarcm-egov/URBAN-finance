import { useTranslation } from "react-i18next";
import { EmployeeModuleCard } from "@egovernments/digit-ui-react-components";
const BirthCard = ({ userType }) => {
  console.log("BirthCard");
  const { t } = useTranslation();
  window.contextPath = window?.globalConfigs?.getConfig("CONTEXT_PATH");
  // Check URL
  const isCitizen = window?.location?.pathname?.toLowerCase().includes("citizen");

  console.log("Context Path:", window?.contextPath);

  const propsForModuleCard = {
    moduleName: isCitizen ? t("Birth Certificate Services") : t("Birth Module - Employee Services"),
    kpis: [],
    links: isCitizen
      ? [
          {
            label: t("Apply for Birth Certificate"),
            link: `/${window?.contextPath}/citizen/birth/birth-common/getCertificate`,
          },
          {
            label: t("My Applications"),
            link: `/${window?.contextPath}/citizen/birth/birth-citizen/myApplications`,
          },
        ]
      : [
          {
            label: t("Employee -Search and Download Birth Certificate"),
            link: `/${window?.contextPath}/employee/birth/birth-common/getCertificate`,
          },
          {
            label: t("Employee - Register Birth Certificate"),
            link: `/${window?.contextPath}/employee/birth/birth-common/create-birth`,
          },
        ],
  };
  return <EmployeeModuleCard {...propsForModuleCard} />;
};
export default BirthCard;
