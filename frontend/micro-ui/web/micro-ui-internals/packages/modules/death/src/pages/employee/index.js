import React from "react";
import { Switch, useLocation, Link } from "react-router-dom";
import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SampleCard from "../../components/DeathCard";
import { CreateDeath } from "./createDeath";
import SearchDeath from "./searchDeath";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
const EmployeeApp = ({ path, url, userType }) => {
    console.log("User Type: ........................", userType);
  const { t } = useTranslation();
  
  return (
    <Switch>
      {/* Base path: Only BackButton + SampleCard */}
      <Route exact path={path}>
        <AppContainer>
          <BackButton style={{ top: "55px" }}>{t("Back")}</BackButton>
          <SampleCard userType={userType} />
        </AppContainer>
      </Route>

      {/* Route for Create Death Registration */}
      <PrivateRoute
        path={`${path}/death-common/create-death`}
        component={CreateDeath}
      />

      {/* Route for Search and Download Death Certificate */}
      <PrivateRoute
        path={`${path}/death-common/getCertificate`}
        component={SearchDeath}
      />
    </Switch>
  );
};
export default EmployeeApp;


