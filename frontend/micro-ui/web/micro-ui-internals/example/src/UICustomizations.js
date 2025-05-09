import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import React, { useState, Fragment } from "react";
import { Button as ButtonNew,Toast } from "@egovernments/digit-ui-components";



//create functions here based on module name set in mdms(eg->SearchProjectConfig)
//how to call these -> Digit?.Customizations?.[masterName]?.[moduleName]
// these functions will act as middlewares
// var Digit = window.Digit || {};

const businessServiceMap = {};

const inboxModuleNameMap = {};

var Digit = window.Digit || {};

const ViewLinkButton = ({ tenantId, certificateId }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(
      `/${window.contextPath}/employee/death/death-common/viewDeath`,
      {
        myData: certificateId,
      }
    );
  };

  return (
    <span
      className="link"
      onClick={handleClick}
      style={{ cursor: "pointer", color: "blue" }}
    >
      View
    </span>
  );
};

const GetSlaCell = (value) => {
  if (value === "-") return <span className="sla-cell-success">-</span>;
  if (isNaN(value)) return <span className="sla-cell-success">0</span>;
  return value < 0 ? <span className="sla-cell-error">{value}</span> : <span className="sla-cell-success">{value}</span>;
};



export const UICustomizations = {
 searchDeathConfig: {
    preProcess: (data) => {
      const tenantId = Digit.ULBService.getCurrentTenantId();
      const gender = data?.state?.searchForm?.gender?.code;
      if (gender === "MALE") {
        data.params.gender = 1;
      } else if (gender === "FEMALE") {
        data.params.gender = 2;
      } else {
        data.params.gender = 3;
      }
      const fromDate = data?.state?.searchForm?.fromDate;
      if (fromDate) {
        const [yyyy, mm, dd] = fromDate.split("-");
        data.params.fromDate = `${dd}-${mm}-${yyyy}`;
      }
      const toDate = data?.state?.searchForm?.toDate;
      if (toDate) {
        const [yyyy, mm, dd] = toDate.split("-");
        data.params.toDate = `${dd}-${mm}-${yyyy}`;
      }
      data.params.tenantId = tenantId;
      console.log(data, "data in preProcess of searchDeathConfig");
      if (data?.params?.fromDate || data?.params?.toDate) {
        const createdFrom =data.params?.fromDate;
        const createdTo = data.params?.toDate;
        data.params.fromDate = createdFrom;
        data.params.toDate = createdTo;
      }
      return data;
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      console.log("key", key);
      const tenantId = Digit.ULBService.getCurrentTenantId();
      console.log("key", key);
      console.log("value", value);
      console.log("column", column);
      console.log("t", t);
      console.log("searchResult", searchResult);

      

      switch (key) {
        case "view":
          return <ViewLinkButton tenantId={tenantId} certificateId={row?.id} />;
          // return (
          //   <span className="link">
          //                 <Link
          //     to={`/${window.contextPath}/employee/bnd-common/fullViewCertificate?tenantId=${tenantId}&certificateId=${row?.id}&module=death`}
          //   >
          //     {"View"}
          //   </Link>

          //   </span>
          // );
        case "Death Date":
          const epoch = row?.dateofdeath;
          if (epoch) {
            const date = new Date(epoch);
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return <span>{`${dd}-${mm}-${yyyy}`}</span>;
          }
          return <span>{t("ES_COMMON_NA")}</span>; 
        default:
          return t("ES_COMMON_NA");
      }
    },
    additionalValidations: (type, data, keys) => {
      if (type === "date") {
        return data.fromDate && data.toDate ? () => new Date(data.fromDate).getTime() < new Date(data.toDate).getTime() : true;
      }
    },
    customValidationCheck: (data) => {
      //checking both to and from date are present
      const { fromDate, toDate } = data;
      if ((fromDate === "" && toDate !== "") || (fromDate !== "" && toDate === "")) return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE" };

      return false;
    },
 },
 searchBirthConfig: {
  preProcess: (data) => {
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const gender = data?.state?.searchForm?.gender?.code;
    if (gender === "MALE") {
      data.params.gender = 1;
    } else if (gender === "FEMALE") {
      data.params.gender = 2;
    } else {
      data.params.gender = 3;
    }
    const fromDate = data?.state?.searchForm?.fromDate;
    if (fromDate) {
      const [yyyy, mm, dd] = fromDate.split("-");
      data.params.fromDate = `${dd}-${mm}-${yyyy}`;
    }
    const toDate = data?.state?.searchForm?.toDate;
    if (toDate) {
      const [yyyy, mm, dd] = toDate.split("-");
      data.params.toDate = `${dd}-${mm}-${yyyy}`;
    }
    data.params.tenantId = tenantId;
    console.log(data, "data in preProcess of search Birth Ui config");
    if (data?.params?.fromDate || data?.params?.toDate) {
      const createdFrom =data.params?.fromDate;
      const createdTo = data.params?.toDate;
      data.params.fromDate = createdFrom;
      data.params.toDate = createdTo;
    }
    return data;
  },
  additionalCustomizations: (row, key, column, value, t, searchResult) => {
    console.log("key", key);
    const tenantId = Digit.ULBService.getCurrentTenantId();
    
    console.log("value", value);
    console.log("column", column);
    console.log("t", t);
    console.log("searchResult", searchResult);

    

    switch (key) {
      case "view":
        return <ViewLinkButton tenantId={tenantId} certificateId={row?.id} />;
        // return (
        //   <span className="link">
        //                 <Link
        //     to={`/${window.contextPath}/employee/bnd-common/fullViewCertificate?tenantId=${tenantId}&certificateId=${row?.id}&module=death`}
        //   >
        //     {"View"}
        //   </Link>

        //   </span>
        // );
      case "Birth Date":
        const epoch = row?.dateofbirth;
        console.log(epoch,"changing the format of date");
        if (epoch) {
          const date = new Date(epoch);
          const dd = String(date.getDate()).padStart(2, '0');
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const yyyy = date.getFullYear();
          return <span>{`${dd}-${mm}-${yyyy}`}</span>;
        }
        return <span>{t("ES_COMMON_NA")}</span>; 
      default:
        return t("ES_COMMON_NA");
    }
  },
  additionalValidations: (type, data, keys) => {
    if (type === "date") {
      return data.fromDate && data.toDate ? () => new Date(data.fromDate).getTime() < new Date(data.toDate).getTime() : true;
    }
  },
  customValidationCheck: (data) => {
    //checking both to and from date are present
    const { fromDate, toDate } = data;
    if ((fromDate === "" && toDate !== "") || (fromDate !== "" && toDate === "")) return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE" };

    return false;
  },
}
};


