import { useTLInbox } from "./useInbox";
import useMDMS from "./useMDMS";
import useTenants from "./useTenants";
import useTradeLicenseMDMS from "./useTradeLicenseMDMS";
import useApplicationDetail from "./useApplicationDetail";
import useSearch from "./useSearch";
import useApplicationActions from "./useApplicationActions";
import useTLWorkflowData from "./useTLWorkflowData";
import usePropertySearch from "./usePropertySearch";
import useTLSearchApplication from "./useTLsearchApplication";
import { useTLApplicationDetails } from "./useTLsearchApplication";
import useTLPaymentHistory from "./userPaymentHistory";
import useTradeLicenseBillingslab from "./useTradeLicenseBillingslab";
import useTLDocumentSearch from "./useTLDocumentSearch";
import useTLGenderMDMS from "./useTLGenderMDMS";
import useTradeLicenseAPI from "./useTradeLicenseAPI";
import usePropertyMDMS from "./usePropertyMDMS";

const tl = {
  useInbox: useTLInbox,
  useMDMS,
  useTenants,
  useTradeLicenseMDMS,
  useApplicationDetail,
  useApplicationActions,
  useSearch,
  useTLWorkflowData,
  usePropertySearch,
  useTLSearchApplication,
  useTLApplicationDetails,
  useTLPaymentHistory,
  useTLDocumentSearch,
  useTradeLicenseBillingslab,
  useTLGenderMDMS,
  usePropertyMDMS,
  useTradeLicenseAPI,
};

const Hooks = {
  tl,
};

export const CustomisedHooks = {
  Hooks,
};
