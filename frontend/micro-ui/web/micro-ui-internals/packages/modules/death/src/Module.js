
import DeathCard from "./components/DeathCard";
import { CitizenHomeCard, Loader } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import EmployeeApp from "../src/pages/employee/index";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import CitizenApp from "../src/pages/citizen/index";
// import ParentInfoCard from "./pages/employee/customcomponents/ParentInfoCard";
import { overrideHooks, updateCustomConfigs } from "./utils";


export const DeathModule = ({ stateCode, userType, tenants }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const moduleCode = ["death", "common", "workflow"];
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({
    stateCode,
    moduleCode,
    language,
  });
  const { t } = useTranslation();
  if (isLoading) {
    return <Loader />;
  }
  const { path, url } = useRouteMatch();
  console.log("User Type: ........................", path);
  if(userType==="employee"){
    return <EmployeeApp path={path} url={url} userType={userType}/>
  }else{
    return <CitizenApp path={path} url={url} userType={userType}/>
  }
};
const componentsToRegister = {
  DeathModule,
  DeathCard,
};
export const initDeathComponents = () => {
  overrideHooks();
  updateCustomConfigs();
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

