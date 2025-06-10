import React, { useContext, useEffect } from "react";
import { Route, Switch, useRouteMatch, Redirect, useLocation } from "react-router-dom";

import { AppHome } from "./Home";
import Login from "../pages/citizen/Login";
import EmployeeLogin from "../pages/employee/Login/index";
import ChangePassword from "../pages/employee/ChangePassword/index";
import ForgotPassword from "../pages/employee/ForgotPassword/index";
import LanguageSelection from "../pages/employee/LanguageSelection";
import EGF from "../pages/employee/EGF";
import { BreadCrumb } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
// import UserProfile from "./userProfile";

const getTenants = (codes, tenants) => {
  return tenants.filter((tenant) => codes?.map?.((item) => item.code).includes(tenant.code));
};

const ServicesBreadCrumbs = ({ location }) => {
  const { t } = useTranslation();
  const crumbs = [
    {
      path: "/digit-ui/employee",
      content: t("ES_COMMON_HOME"),
      show: true,
    },
    {
      path: "/digit-ui/employee/services/EGF",
      content: t("EGF_COMMON_HEADER"),
      show: location.pathname.includes("/services/EGF") ? true : false,
    }
  ]

  return <BreadCrumb crumbs={crumbs} spanStyle={{ maxWidth: "min-content" }}/>
}

export const AppModules = ({ stateCode, userType, modules, appTenants }) => {
  const ComponentProvider = Digit.Contexts.ComponentProvider;
  const { path } = useRouteMatch();
  const location = useLocation();

  const user = Digit.UserService.getUser();

  if (!user || !user?.access_token || !user?.info) {
    return <Redirect to={{ pathname: "/digit-ui/employee/user/login", state: { from: location.pathname + location.search } }} />;
  }

  const appRoutes = modules.map(({ code, tenants }, index) => {
    const Module = Digit.ComponentRegistryService.getComponent(`${code}Module`);
    return Module ? (
      <Route key={index} path={`${path}/${code.toLowerCase()}`}>
        <Module stateCode={stateCode} moduleCode={code} userType={userType} tenants={getTenants(tenants, appTenants)} />
      </Route>
    ) :   <Route key={index} path={`${path}/${code.toLowerCase()}`}>
    <Redirect to={{ pathname: "/digit-ui/employee/user/error?type=notfound", state: { from: location.pathname + location.search } }} />
  </Route>;
  });

  return (
    <div className="ground-container">
      <Switch>
        {appRoutes}
        <Route path={`${path}/login`}>
          <Redirect to={{ pathname: "/digit-ui/employee/user/login", state: { from: location.pathname + location.search } }} />
        </Route>
        <Route path={`${path}/forgot-password`}>
          <ForgotPassword />
        </Route>
        <Route path={`${path}/change-password`}>
          <ChangePassword />
        </Route>
        <Route path={`${path}/services/EGF`}>
          <ServicesBreadCrumbs location={location} />
          <EGF />
        </Route>
        <Route>
          <AppHome userType={userType} modules={modules} />
        </Route>
        {/* <Route path={`${path}/user-profile`}> <UserProfile /></Route> */}
      </Switch>
    </div>
  );
};
