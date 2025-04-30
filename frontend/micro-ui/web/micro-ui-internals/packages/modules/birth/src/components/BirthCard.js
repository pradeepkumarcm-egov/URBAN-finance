import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard, PropertyHouse } from "@egovernments/digit-ui-react-components";
import { CaseIcon } from "@egovernments/digit-ui-react-components";

const BirthCard = () => {
  if (!Digit.Utils.BnDAccess()) return null;

  const { t } = useTranslation();

  const links = [
    {
      label: t("BIRTH_REGISTRATION"),
      link: "/employee/birth-employee/newRegistration",
    },
    {
      label: t("SEARCH_BIRTH_CERTIFICATE"),
      link: `/employee/birth-common/getCertificate`,
    }
  ];

  const propsForModuleCard = {
    moduleName: t("COMMON_BIRTH"),
    links: links,
    icon: <CaseIcon/>
}

  return <EmployeeModuleCard {...propsForModuleCard} />;
};

export default BirthCard;
