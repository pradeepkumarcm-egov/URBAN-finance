import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard, PropertyHouse } from "@egovernments/digit-ui-react-components";
import { CaseIcon } from "@egovernments/digit-ui-react-components";

const DeathCard = () => {

   if (!Digit.Utils.BnDAccess()) return null;

  const { t } = useTranslation();

  window.localStorage.setItem("Employee.locale", "en_IN");
  window.localStorage.setItem("locale", "en_IN");

  const links = [
    {
      label: t("DEATH_REGISTRATION"),
      link: `https://unified-demo.digit.org/employee/death-employee/newRegistration`,
      hyperlink: true

    },
    {
      label: t("SEARCH_DEATH_CERTIFICATE"),
      link: `https://unified-demo.digit.org/employee/death-common/getCertificate`,
      hyperlink: true

    },
  ];

  const propsForModuleCard = {
    moduleName: t("COMMON_DEATH"),
    links: links,
    kpis: [
    ],
    icon: <CaseIcon/>
}

  return <EmployeeModuleCard {...propsForModuleCard} />;
};

export default DeathCard;
