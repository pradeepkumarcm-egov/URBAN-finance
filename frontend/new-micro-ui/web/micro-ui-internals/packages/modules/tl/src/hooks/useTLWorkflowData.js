import React from "react";
import { useQuery } from "react-query";
import { Digit } from "@egovernments/digit-ui-libraries";

const useTLWorkflowData = ({ tenantId, filters, config = {} }) => {
  return useQuery(
    ["WORKFLOW_BY_GET_ALL_APPLICATION", tenantId, ...Object.keys(filters)?.map((e) => filters?.[e])],
    () =>
      Digit.CustomService.getResponse({
        url: `/egov-workflow-v2/egov-wf/process/_search`,
        method: "POST",
        params: { tenantId, ...filters },
        auth: true,
        useCache: false,
      }),
    {
      ...config,
    }
  );
};

export default useTLWorkflowData;
