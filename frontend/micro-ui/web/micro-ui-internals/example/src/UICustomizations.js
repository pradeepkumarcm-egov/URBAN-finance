import React from "react";
import { Link } from "react-router-dom";

var Digit = window.Digit || {};

const GetSlaCell = (value) => {
  if (value === "-") return <span className="sla-cell-success">-</span>;
  if (isNaN(value)) return <span className="sla-cell-success">0</span>;
  return value < 0 ? <span className="sla-cell-error">{value}</span> : <span className="sla-cell-success">{value}</span>;
};

export const UICustomizations = {
  TLInboxConfig: {
    preProcess: (data) => {
      //fetch everything from data.state instead of data.body
      // application no, mobile no are getting auto populated correctly
      
      //set tenantId
      const tenantId = Digit.ULBService.getCurrentTenantId();
      data.body.inbox.tenantId = tenantId;

      // assignee filter
      const assignee = _.clone(data.body.inbox.moduleSearchCriteria.assignee);
      delete data.body.inbox.moduleSearchCriteria.assignee;
      if (assignee?.code === "ASSIGNED_TO_ME") {
        data.body.inbox.moduleSearchCriteria.assignee = JSON.parse(localStorage.getItem("user-info")).uuid;
      } else {
        delete data.body.inbox.moduleSearchCriteria.assignedToMe;
      }
      
      // cloning locality and workflow states to format them
      const {locality:localityFromState, state:stateFromState} = data?.state?.filterForm || {}
      let locality = _.clone(localityFromState?.length>0 ? localityFromState : []);
      let states = _.clone(stateFromState ? stateFromState : []);
      delete data.body.inbox.moduleSearchCriteria.state;

      states = Object.keys(states)
        ?.filter((key) => states[key])
        .flatMap((i) => i.split(", "));
      locality = locality?.map((row) => row?.code);
      states.length > 0 ? (data.body.inbox.moduleSearchCriteria.status = states) : delete data.body.inbox.moduleSearchCriteria.status;
      locality.length > 0 ? (data.body.inbox.moduleSearchCriteria.locality = locality) : delete data.body.inbox.moduleSearchCriteria.locality;

      return data;
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      const tenantId = Digit.ULBService.getCurrentTenantId();
      switch (key) {
        case "WF_INBOX_HEADER_APPLICATION_NO":
          return (
            <span className="link">
              <Link to={`/${window.contextPath}/employee/tl/application-details/${row?.businessObject?.applicationNumber}`}>{value}</Link>
            </span>
          );
        case "TL_COMMON_TABLE_COL_APP_DATE":
          value = new Date(value);
          return <span>{`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}</span>;
        case "WF_INBOX_HEADER_LOCALITY":
          return value ? <span>{t(Digit.Utils.locale.getRevenueLocalityCode(value, tenantId))}</span> : <span>{t("NA")}</span>;
        case "WF_INBOX_HEADER_STATUS":
          return <span>{t(value)}</span>;
        case "WF_INBOX_HEADER_SLA_DAYS_REMAINING":
          return GetSlaCell(value);
        default:
          return t("ES_COMMON_NA");
      }
    },
    localitydropdown: () => {
      const tenantId = Digit.ULBService.getCurrentTenantId();

      return {
        url: "/egov-location/location/v11/boundarys/_search",
        params: { hierarchyTypeCode: "ADMIN", boundaryType: "Locality", tenantId: tenantId },
        body: {},
        config: {
          enabled: true,
          select: (data) => {
            const localities = [];
            data?.TenantBoundary[0]?.boundary.forEach((item) => {
              localities.push({ code: item.code, name: item.name, i18nKey: `${tenantId.replace(".", "_").toUpperCase()}_REVENUE_${item?.code}` });
            });
            return localities;
          },
        },
      };
    },
  }
};