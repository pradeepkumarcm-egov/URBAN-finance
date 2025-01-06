import React from "react";
import { useQuery } from "react-query";
import { InboxGeneralV2 } from "../services/elements/InboxService";

const useInboxV2 = ({ tenantId, filters, config }) =>
  useQuery(["INBOX_DATA", tenantId, ...Object.keys(filters)?.map((e) => filters?.[e])], () => InboxGeneralV2.Search({ inbox: { ...filters } }), {
    ...config,
  });

export default useInboxV2;
