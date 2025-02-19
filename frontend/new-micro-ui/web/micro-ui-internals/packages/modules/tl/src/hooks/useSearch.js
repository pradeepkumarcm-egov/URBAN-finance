import React from "react";
import { useQuery } from "react-query";
import { Digit } from "@egovernments/digit-ui-libraries";

const useSearch = ({ tenantId, filters, config = {} }) =>
  useQuery(
    ["TL_SEARCH", tenantId, ...Object.keys(filters)?.map((e) => filters?.[e])],
    () =>
      Digit.CustomService.getResponse({
        url: `/tl-services/v1/_search`,
        method: "POST",
        params: { tenantId, ...filters },
        auth: true,
        useCache: false,
        userService: false,
      }),
    {
      // select: (data) => data.Licenses,
      ...config,
    }
  );

export default useSearch;
