import SampleCard from "../../components/DeathCard";
import ApplyCertificate from "./ApplyCertificate/ApplyCertificate";


import { AppContainer, BackButton, Header, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";


const CitizenApp = ({ userType }) => {
  const { path, url, ...match } = useRouteMatch();
  return (
    <span className={"death-citizen"}>
      <Switch>
        <AppContainer>
          <BackButton style={{ top: "55px" }}>Back</BackButton>
          <PrivateRoute path={`${path}/apply`} component={() => <SampleCard/>} />
         <PrivateRoute path={`${path}/death-common/getCertificate`} component={() => <ApplyCertificate/>} />
        </AppContainer>
      </Switch>
    </span>
  );
};
export default CitizenApp;
