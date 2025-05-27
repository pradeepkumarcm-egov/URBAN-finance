import React from "react";
import { Switch, useLocation, Link } from "react-router-dom";
import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { CreateDeath } from "./createDeath";
import SearchDeath from "./searchDeath";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import ViewDeath from "./viewDeath";
import UpdateDeath from "./updateDeath";
import DeathCard from "../../components/DeathCard";
import PayandDownload from "./payanddownload";


const EmployeeApp = ({ path, url, userType }) => {
    console.log("User Type: ........................", userType);
  const { t } = useTranslation();
  console.log("Path: ", path);
  
  return (
    <Switch>
      {/* Base path: Only BackButton + SampleCard */}
      <Route exact path={path}>
        <AppContainer>
          <BackButton style={{ top: "55px" }}>{t("Back")}</BackButton>
          <DeathCard userType={userType} />
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
        
        {/* Route for Search Death Registration */}
      <PrivateRoute
        path={`${path}/death-common/viewDeath`}
        component={ViewDeath} 
      />

      <PrivateRoute
        path={`${path}/death-common/update-death`}
        component={UpdateDeath}
        />

         <PrivateRoute path={`${path}/egov-common/pay`} component={PayandDownload} />
    </Switch>
  );
};
export default EmployeeApp;


