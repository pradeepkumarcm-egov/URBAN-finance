import { AppContainer, BackButton, Header, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";
import SearchBirth from "./SearchAndDownload";
import MyApplications from "./MyApplication";
// import SearchChallanComponent from "./SearchChallan";
// import SearchResultsComponent from "./SearchResults";
// import MyChallanResultsComponent from "./MyChallan";
//import BillInfo from "./SearchResults/BillInfo";

const CitizenApp = () => {
  const { path, url, ...match } = useRouteMatch();
  console.log(path);
  return (
    <span className={"birth-citizen"}>
      <Switch>
        <AppContainer>
          <PrivateRoute path={`${path}/myapplication`} component={MyApplications}/>
          <PrivateRoute path={`${path}/search`} component={SearchBirth} />
        </AppContainer>
      </Switch>
    </span>
  );
};

export default CitizenApp;
