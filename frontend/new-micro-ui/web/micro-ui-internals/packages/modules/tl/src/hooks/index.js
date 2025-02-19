import { useTLInbox } from "./useInbox";
import useMDMS from "./useMDMS";
import useTenants from "./useTenants";
import useTradeLicenseMDMS from "./useTradeLicenseMDMS";
import useApplicationDetail from "./useApplicationDetail";
import useSearch from "./useSearch";
import useApplicationActions from "./useApplicationActions";
import useTLWorkflowData from "./useTLWorkflowData";

const tl = {
  useInbox: useTLInbox,
  useMDMS,
  useTenants,
  useTradeLicenseMDMS,
  useApplicationDetail,
  useApplicationActions,
  useSearch,
  useTLWorkflowData,
};

const Hooks = {
  tl,
};

export const CustomisedHooks = {
  Hooks,
};
