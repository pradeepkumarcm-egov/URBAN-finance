import { useTLInbox } from "./useInbox";
import useMDMS from "./useMDMS";
import useTenants from "./useTenants";
import useTradeLicenseMDMS from "./useTradeLicenseMDMS";
import useApplicationDetail from "./useApplicationDetail";
import useSearch from "./useSearch";
import useApplicationActions from "./useApplicationActions";
import usePropertySearch from "./usePropertySearch";
import useTLSearchApplication from "./useTLsearchApplication";
import { useTLApplicationDetails } from "./useTLsearchApplication";
import useTradeLicenseBillingslab from "./useTradeLicenseBillingslab";
import useTLDocumentSearch from "./useTLDocumentSearch";
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
  usePropertySearch,
  useTLSearchApplication,
  useTLApplicationDetails,
  useTLDocumentSearch,
  useTradeLicenseBillingslab,
  usePropertyMDMS,
  useTradeLicenseAPI,
};

const Hooks = {
  tl,
};

export const CustomisedHooks = {
  Hooks,
};
