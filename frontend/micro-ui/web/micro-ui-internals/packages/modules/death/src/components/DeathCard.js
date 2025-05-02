import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard, PropertyHouse } from "@egovernments/digit-ui-react-components";
import { CaseIcon } from "@egovernments/digit-ui-react-components";

const DeathCard = () => {

   if (!Digit.Utils.BnDAccess()) return null;

  const { t } = useTranslation();

  const links = [
    {
      label: t("DEATH_REGISTRATION"),
      link: `/employee/death-employee/newRegistration`,
    },
    {
      label: t("SEARCH_DEATH_CERTIFICATE"),
      link: `/employee/death-common/getCertificate`,
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
