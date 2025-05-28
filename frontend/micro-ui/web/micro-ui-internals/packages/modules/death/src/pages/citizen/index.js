import DeathCard from "../../components/DeathCard";

import { AppContainer, BackButton, Header, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SearchAndDownload from "./searchanddownload";
import PayandDownload from "./payanddownload";
import MyApplications from "./myapplications";



const CitizenApp = ({ path, url, userType }) => {
  const { t } = useTranslation();

   console.log("User Type: ........................", userType);
    console.log("Path: ", path);
    console.log("qwertyu",SearchAndDownload)

    const BillDetails = Digit.ComponentRegistryService.getComponent("BillDetails");

  return (
    <span className={"death-citizen"} style={{marginTop:"1.5rem",marginLeft:"1.5rem",width:"100%"}}>
      <Switch>
        <Route exact path={path}>
          <AppContainer>
            <BackButton style={{ top: "55px" }}>{t("Back")}</BackButton>
            <DeathCard userType={userType} />
          </AppContainer>
        </Route>

        <PrivateRoute path={`${path}/death-common/getCertificate`} component={SearchAndDownload} />
        <PrivateRoute path={`${path}/egov-common/pay`} component={PayandDownload} />
        <PrivateRoute path={`${path}/death-citizen/myApplications`} component={MyApplications} />
        {/* <PrivateRoute path={`${path}/:consumerCode`} component={() => <BillDetails {...{ paymentRules, businessService }} />} /> */}

      
      </Switch>
    </span>
  );
};
export default CitizenApp;
