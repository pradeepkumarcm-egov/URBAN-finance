import React from "react";
import { Loader } from "@egovernments/digit-ui-components";
import { useRouteMatch } from "react-router-dom";
import { default as EmployeeApp } from "./pages/employee";
import TL_INBOX_FILTER from "./components/inbox/InboxFilter";
import Search from "./pages/employee/Search";
import SearchLicenseApplication from "./components/SearchApplication";
import SearchLicense from "./components/SearchLicense";
import TLApplicationDetails from "./pages/citizen/Applications/ApplicationDetails";
import CreateTradeLicence from "./pages/citizen/Create";
import TLCheckPage from "./pages/citizen/Create/CheckPage";
import TLAcknowledgement from "./pages/citizen/Create/TLAcknowledgement";

import NewApplication from "./pages/employee/NewApplication";
import TLCard from "./components/TLCard";
import { overrideHooks, updateCustomConfigs } from "./utils";
import TLMyApplications from "./pages/citizen/Applications/Application";
import CitizenApp from "./pages/citizen";

export const TLModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const moduleCode = "TL";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  //addComponentsToRegistry();
  Digit.SessionStorage.set("TL_TENANTS", tenants);

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else return <CitizenApp />;
};
export const TLLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_TRADE", {});

  useEffect(() => {
    clearParams();
  }, []);

  const links = [
    {
      link: `${matchPath}/tradelicence/new-application`,
      i18nKey: t("TL_CREATE_TRADE"),
    },
    {
      link: `${matchPath}/tradelicence/renewal-list`,
      i18nKey: t("TL_RENEWAL_HEADER"),
    },
    {
      link: `${matchPath}/tradelicence/my-application`,
      i18nKey: t("TL_MY_APPLICATIONS_HEADER"),
    },
  ];

  return <CitizenHomeCard header={t("ACTION_TEST_TRADE_LICENSE")} links={links} Icon={() => <CaseIcon className="fill-path-primary-main" />} />;
};

const componentsToRegister = {
  TLCard,
  TLLinks,
  TLModule,
  TLNewApplication: NewApplication,
  TL_INBOX_FILTER,
  TLSearch: Search,
  SearchLicenseApplication,
  SearchLicense,
  TLMyApplications,
  TLApplicationDetails,
  TLCreateTradeLicence: CreateTradeLicence,
  TLCheckPage,
  TLAcknowledgement,
};

export const initTLComponents = () => {
  overrideHooks();
  updateCustomConfigs();

  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
