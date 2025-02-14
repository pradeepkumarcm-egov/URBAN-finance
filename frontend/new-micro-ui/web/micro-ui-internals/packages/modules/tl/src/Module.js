import React from "react";
import NewApplication from "./pages/employee/NewApplication";

export const TLModule = ({ stateCode, userType, tenants }) => {
  console.log("module");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  // const moduleCode = ["tl", "common", "workflow"];
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({
    stateCode,
    moduleCode,
    language,
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Switch>
      <AppContainer className="ground-container">
        <div>Sample Module </div>
      </AppContainer>
    </Switch>
  );
};

const componentsToRegister = {
  TLNewApplication: NewApplication,
  TLModule,
};

export const initTLComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
