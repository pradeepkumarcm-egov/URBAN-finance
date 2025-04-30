import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EmployeeModuleCard, PropertyHouse } from "@egovernments/digit-ui-react-components";

const FirenocCard = () => {
  const { t } = useTranslation();

  const links = [
    {
      label: t("ES_COMMON_INBOX"),
      link: `/digit-ui/employee/pt/inbox`,
    },
    {
      label: t("ES_TITLE_NEW_REGISTRATION"),
      link: `/digit-ui/employee/pt/new-application`,
      role: "PT_CEMP",
    },
    {
      label: t("SEARCH_PROPERTY"),
      link: `/digit-ui/employee/pt/search`,
    },
    {
      label: t("ES_COMMON_APPLICATION_SEARCH"),
      link: `/digit-ui/employee/pt/application-search`,
    },
    {
      label: t("PT_DASHBOARD"),
      link: `/digit-ui/employee/dss/dashboard/propertytax`
  }
  ];

  const propsForModuleCard = {
    moduleName: t("FIRENOC_COMMON_FIRENOC"),
    links: links
}
  

  return <FirenocCard {...propsForModuleCard} />;
};

export default FirenocCard;
