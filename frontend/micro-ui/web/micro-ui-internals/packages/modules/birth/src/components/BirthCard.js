import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard, PropertyHouse } from "@egovernments/digit-ui-react-components";
import { CaseIcon } from "@egovernments/digit-ui-react-components";

const BirthCard = () => {
  if (!Digit.Utils.BnDAccess()) return null;

  const { t } = useTranslation();
  window.localStorage.setItem("Employee.locale", "en_IN");
  window.localStorage.setItem("locale", "en_IN");
  window.localStorage.setItem("Employee.tenant-id", Digit.ULBService.getCurrentTenantId());
  window.localStorage.setItem("tenant-id",Digit.ULBService.getCurrentTenantId());

  const links = [
    {
      label: t("BIRTH_REGISTRATION"),
      link: `https://unified-demo.digit.org/employee/birth-employee/newRegistration`,
      hyperlink: true
    },
    {
      label: t("SEARCH_BIRTH_CERTIFICATE"),
      link: `https://unified-demo.digit.org/employee/birth-common/getCertificate`,
      hyperlink: true

    }
  ];

  const propsForModuleCard = {
    moduleName: t("COMMON_BIRTH"),
    links: links,
    kpis: [
    ],
    icon: <CaseIcon/>
}

  return <EmployeeModuleCard {...propsForModuleCard} />;
};

export default BirthCard;
