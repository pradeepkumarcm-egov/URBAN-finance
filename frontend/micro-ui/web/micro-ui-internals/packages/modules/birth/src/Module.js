import { Loader} from "@egovernments/digit-ui-react-components";
import React from "react";
import BirthCard from "./components/BirthCard";
import EmployeeApp from "./pages/employee";
import { useRouteMatch } from "react-router-dom";

export const BirthModule = ({ stateCode, userType, tenants }) => {


  const tenantId = Digit.ULBService.getCurrentTenantId();
  const moduleCode = "birth";
  const language = Digit.StoreData.getCurrentLanguage();
  const { path, url } = useRouteMatch();

  const { isLoading, data: store } = Digit.Services.useStore({
    stateCode,
    moduleCode,
    language,
  });

if (isLoading) {
    return <Loader />;
  }
  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else return <div>Citizen</div>

}
  
const componentsToRegister = {
    BirthModule,
    BirthCard,
    EmployeeApp
  };

export const initBirthComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
}



