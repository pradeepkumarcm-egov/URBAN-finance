import React from "react";
import { Loader } from "@egovernments/digit-ui-components";
import { useRouteMatch } from "react-router-dom";
import { default as EmployeeApp } from "./pages/employee";
import TL_INBOX_FILTER from "./components/inbox/InboxFilter";
import Search from "./pages/employee/Search";
import SearchLicenseApplication from "./components/SearchApplication";
import SearchLicense from "./components/SearchLicense";

import NewApplication from "./pages/employee/NewApplication";
import TLCard from "./components/TLCard";
import { overrideHooks, updateCustomConfigs } from "./utils";
import { TLSearch } from "./hooks/services/TLService";
// import EmployeeApp from "./pages/employee";

export const TLModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const moduleCode = ["tl", "common", "workflow"];
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({
    stateCode,
    moduleCode,
    language,
  });

  if (isLoading) {
    return <Loader page={true} variant={"PageLoader"} />;
  }

  return <EmployeeApp path={path} stateCode={stateCode} userType={userType} tenants={tenants} />;
};

const componentsToRegister = {
  TLCard,
  TLModule,
  TLNewApplication: NewApplication,
  TL_INBOX_FILTER,
  TLSearch: Search,
  SearchLicenseApplication,
  SearchLicense,
  // EmployeeApp,
};

export const initTLComponents = () => {
  overrideHooks();
  updateCustomConfigs();

  Object.entries(componentsToRegister).forEach(([key, value]) => {
    console.log("key:", key, "value:", value);
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
