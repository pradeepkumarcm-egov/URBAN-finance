import React from "react";

import { Switch, useLocation, Link } from "react-router-dom";
import { AppContainer, PrivateRoute } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { BackButton } from "@egovernments/digit-ui-react-components";
import { CreateBirth } from "./createBirth";
import SearchBirth from "./SeachBirth";
import BirthCard from "../../components/BirthCard";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

const EmployeeApp = ({ path, url, userType }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const mobileView = innerWidth <= 640;

  return (
    <Switch>
      <React.Fragment>
        <div className="ground-container">
          <Route exact path={path}>
            <AppContainer>
              <BackButton style={{ top: "55px" }}>Back</BackButton>
              <BirthCard userType={userType} />
            </AppContainer>
          </Route>
          <PrivateRoute path={`${path}/createbirth`} component={CreateBirth} />
          <PrivateRoute path={`${path}/searchbirth`} component={SearchBirth} />
        </div>
      </React.Fragment>
    </Switch>
  );
};

export default EmployeeApp;
