import { AppContainer, BackButton, Header, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";
import SearchBirth from "./search";
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
          <BackButton style={{ top: "55px" }}>Back</BackButton>
          <PrivateRoute path={`${path}/search`} component={SearchBirth} />
        </AppContainer>
      </Switch>
    </span>
  );
};

export default CitizenApp;
