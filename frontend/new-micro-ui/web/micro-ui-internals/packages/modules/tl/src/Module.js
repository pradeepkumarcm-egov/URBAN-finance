import { Loader } from "@egovernments/digit-ui-react-components";
import React from "react";

export const TLModule = ({ stateCode, userType, tenants }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const moduleCode = ["sample", "common", "workflow"];
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

  const componentsToRegister = {
    SampleModule,
  };
};

export const initSampleComponents = () => {
  overrideHooks();
  updateCustomConfigs();
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
