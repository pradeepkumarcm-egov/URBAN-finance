import React from "react";
import { useQuery } from "react-query";
import { searchTLInboxData } from "./services/searchTLInboxData";

export const useTLInbox = ({ tenantId, filters, config = {} }) => {
  const USER_UUID = Digit.UserService.getUser()?.info?.uuid;

  return useQuery(
    ["TL_INBOX_DATA", tenantId, ...Object.keys(filters)?.map((e) => filters?.[e])],
    () => searchTLInboxData({ tenantId, filters, USER_UUID }),
    config
  );
};

export default useTLInbox;
