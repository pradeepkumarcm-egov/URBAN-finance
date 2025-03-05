import { Header, CitizenHomeCard, CaseIcon, HomeLink } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import TradeLicense from "../src/pageComponents/TradeLicense";
import TLSelectGeolocation from "../src/pageComponents/TLSelectGeolocation";
import TLSelectAddress from "./pageComponents/TLSelectAddress";
import TLSelectPincode from "./pageComponents/TLSelectPincode";
import TLProof from "./pageComponents/TLProof";
import TLSelectOwnerShipDetails from "./pageComponents/TLSelectOwnerShipDetails";
import TLSelectOwnerDetails from "./pageComponents/TLSelectOwnerDetails";
import TLSelectProofIdentity from "./pageComponents/TLSelectProofIdentity";
import SelectOwnershipProof from "./pageComponents/SelectOwnershipProof";
import SelectTradeName from "./pageComponents/SelectTradeName";
import SelectStructureType from "./pageComponents/SelectStructureType";
import TLSelectVehicleType from "./pageComponents/TLSelectVehicleType";
import SelectBuildingType from "./pageComponents/SelectBuildingType";
import SelectCommencementDate from "./pageComponents/SelectCommencementDate";
import SelectTradeUnits from "./pageComponents/SelectTradeUnits";
import SelectAccessories from "./pageComponents/SelectAccessories";
import SelectAccessoriesDetails from "./pageComponents/SelectAccessoriesDetails";
import TLCheckPage from "./pages/citizen/Create/CheckPage";
import TLDocument from "./pageComponents/TLDocumets";
import TLAcknowledgement from "./pages/citizen/Create/TLAcknowledgement";
import TLMyApplications from "./pages/citizen/Applications/Application";
import TradeLicenseList from "./pages/citizen/Renewal/TradeLicenseList";
import TLWFApplicationTimeline from "./pageComponents/TLWFApplicationTimeline";
import SelectOtherTradeDetails from "./pageComponents/SelectOtherTradeDetails";
import TLSelectStreet from "./pageComponents/TLSelectStreet";
import TLSelectLandmark from "./pageComponents/TLSelectLandMark";
import TLSelectOwnerAddress from "./pageComponents/TLSelectOwnerAddress";

import TLOwnerDetailsEmployee from "./pageComponents/TLOwnerDetailsEmployee";
import TLTradeDetailsEmployee from "./pageComponents/TLTradeDetailsEmployee";
import TLTradeUnitsEmployee from "./pageComponents/TLTradeUnitsEmployee";
import TLAccessoriesEmployee from "./pageComponents/TLAccessoriesEmployee";
import TLDocumentsEmployee from "./pageComponents/TLDocumentsEmployee";
import TLCard from "./components/TLCard";
import TLInfoLabel from "./pageComponents/TLInfoLabel";
import NewApplication from "./pages/employee/NewApplication";
import ReNewApplication from "./pages/employee/ReNewApplication";
import CPTPropertySearchNSummary from "./pageComponents/PropertySearchNSummary";

// import Response from "./pages/Response";

import TLApplicationDetails from "./pages/citizen/Applications/ApplicationDetails";
import CreateTradeLicence from "./pages/citizen/Create";
import EditTrade from "./pages/citizen/EditTrade";
import { TLList } from "./pages/citizen/Renewal";
import RenewTrade from "./pages/citizen/Renewal/renewTrade";
import SearchTradeComponent from "./pages/citizen/SearchTrade";
import SelectTradeUnitsInitial from "./pageComponents/SelectTradeUnitsInitial";
import TLTradeUnitsEmployeeInitial from "./pageComponents/TLTradeUnitsEmployeeInitial";
import { overrideHooks, updateCustomConfigs } from "./utils";
import CitizenApp from "./pages/citizen";
import EmployeeApp from "./pages/employee";

export const TLModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const moduleCode = "TL";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  //addComponentsToRegistry();
  Digit.SessionStorage.set("TL_TENANTS", tenants);

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else return <CitizenApp />;
};
export const TLLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_TRADE", {});

  useEffect(() => {
    clearParams();
  }, []);

  const links = [
    {
      link: `${matchPath}/tradelicence/new-application`,
      i18nKey: t("TL_CREATE_TRADE"),
    },
    {
      link: `${matchPath}/tradelicence/renewal-list`,
      i18nKey: t("TL_RENEWAL_HEADER"),
    },
    {
      link: `${matchPath}/tradelicence/my-application`,
      i18nKey: t("TL_MY_APPLICATIONS_HEADER"),
    },
  ];

  return <CitizenHomeCard header={t("ACTION_TEST_TRADE_LICENSE")} links={links} Icon={() => <CaseIcon className="fill-path-primary-main" />} />;
};

const componentsToRegister = {
  TLCard,
  TLLinks,
  TLModule,
  TLNewApplication: NewApplication,
  TLMyApplications,
  TLApplicationDetails,
  TLCreateTradeLicence: CreateTradeLicence,
  TLCheckPage,
  TLAcknowledgement,
  TLTradeDetailsEmployee,
  TLTradeUnitsEmployee,
  TLWFApplicationTimeline,
  SelectOtherTradeDetails,
  TLSelectStreet,
  TLSelectLandmark,
  TLSelectOwnerAddress,
  TLAccessoriesEmployee,
  TLDocumentsEmployee,
  TLOwnerDetailsEmployee,
  TradeLicense,
  TLSelectGeolocation,
  TLSelectAddress,
  TLSelectPincode,
  TLProof,
  TLSelectOwnerShipDetails,
  TLSelectOwnerDetails,
  TLSelectProofIdentity,
  SelectOwnershipProof,
  SelectTradeName,
  SelectStructureType,
  TLSelectVehicleType,
  SelectBuildingType,
  SelectCommencementDate,
  SelectTradeUnits,
  SelectAccessories,
  SelectAccessoriesDetails,
  TLDocument,
  TradeLicenseList,
  ReNewApplication,
  TLInfoLabel,
  TLTradeUnitsEmployeeInitial,
  EditTrade,
  RenewTrade,
  SelectTradeUnitsInitial,
  SearchTradeComponent,
  TLList,
  CPTPropertySearchNSummary,
};

export const initTLComponents = () => {
  overrideHooks();
  updateCustomConfigs();

  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
