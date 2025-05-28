import React, { useEffect } from "react";
import PGRCard from "./components/PGRCard";

import getRootReducer from "./redux/reducers";
import CitizenApp from "./pages/citizen";
import EmployeeApp from "./EmployeeApp";
import { ComplaintIcon, CitizenHomeCard, Loader, BreadCrumb } from "@egovernments/digit-ui-react-components";
import { PGR_CITIZEN_CREATE_COMPLAINT } from "./constants/Citizen";
import { useTranslation } from "react-i18next";
import { LOCALE } from "./constants/Localization";
import { ComplaintDetails } from "./pages/employee/ComplaintDetails";
import { CreateComplaint as CreateComplaintEmp } from "./pages/employee/CreateComplaint";
import Inbox from "./pages/employee/Inbox";
import ResponseEmp from "./pages/employee/Response";
import { Switch, useLocation, useRouteMatch, Route } from "react-router-dom";
import { CreateComplaint as CreateComplaintCitizen } from "./pages/citizen/Create";
import { ComplaintsList } from "./pages/citizen/ComplaintsList";
import ComplaintDetailsPage from "./pages/citizen/ComplaintDetails";
import SelectRating from "./pages/citizen/Rating/SelectRating";
import ResponseCitizen from "./pages/citizen/Response";


export const PGRReducers = getRootReducer;

const PGRBreadCrumb = ({ location }) => {
  const { t } = useTranslation();
  const crumbs = [
    {
      path: "/digit-ui/employee",
      content: t("ES_COMMON_HOME"),
      show: true,
    },
    {
      path: "/digit-ui/employee/pgr/inbox",
      content: t("ES_EVENT_INBOX"),
      show: location.pathname.includes("pgr/inbox") ? true : false,
    },
    {
      path: "/digit-ui/employee/pgr/complaint/create",
      content: t("ES_COMPLIENT_CREATE"),
      show: location.pathname.includes("complaint/create") ? true : false,
    },
  ];

  return <BreadCrumb crumbs={crumbs} />;
};

const PGRModule = ({ stateCode, userType, tenants }) => {
  const location = useLocation();
  const moduleCode = "PGR";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  if (isLoading) {
    return <Loader />;
  }

  Digit.SessionStorage.set("PGR_TENANTS", tenants);

  if (userType === "citizen") {
    return <CitizenApp />;
  } else {
    return <div>
      <PGRBreadCrumb
        location={location} />
      <EmployeeApp />
    </div>;
  }
};

const PGRLinks = ({ matchPath }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage(PGR_CITIZEN_CREATE_COMPLAINT, {});

  useEffect(() => {
    clearParams();
  }, []);

  const links = [
    {
      link: `${matchPath}/create-complaint/complaint-type`,
      i18nKey: t("CS_COMMON_FILE_A_COMPLAINT"),
    },
    {
      link: `${matchPath}/complaints`,
      i18nKey: t(LOCALE.MY_COMPLAINTS),
    },
  ];

  return <CitizenHomeCard header={t("CS_COMMON_HOME_COMPLAINTS")} links={links} Icon={ComplaintIcon} />;
};

const componentsToRegister = {
  PGRModule,
  PGRLinks,
  PGRCard,
  PGRComplaintDetails: ComplaintDetails,
  PGRCreateComplaintEmp: CreateComplaintEmp,
  PGRInbox: Inbox,
  PGRResponseEmp: ResponseEmp,
  PGRCreateComplaintCitizen: CreateComplaintCitizen,
  PGRComplaintsList: ComplaintsList,
  PGRComplaintDetailsPage: ComplaintDetailsPage,
  PGRSelectRating: SelectRating,
  PGRResponseCitzen: ResponseCitizen
};



export const initPGRComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
