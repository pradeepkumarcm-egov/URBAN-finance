import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import React, { useState, Fragment, useEffect } from "react";
import { Button as ButtonNew,Toast } from "@egovernments/digit-ui-components";


const businessServiceMap = {};

const inboxModuleNameMap = {};

var Digit = window.Digit || {};



const ViewLinkButton = ({ tenantId, certificateId,hospitalname }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(
      `/${window.contextPath}/employee/death/death-common/viewDeath`,
      {
        myData: certificateId,
        myhospitalname: hospitalname,
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
  // //  <React.Fragment>
  //     <ButtonNew
  //     className="custom-class"
  //     label="View"
  //     onClick={handleClick}
  //     variation="link"
  //   />
  // // </React.Fragment>
  );
};


const ViewLinkButton2 = ({ tenantId, certificateId }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(
      `/${window.contextPath}/citizen/death/egov-common/pay`,
      {
        mytenantId: tenantId,
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
      Pay and Download
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
      }else if (gender === "TRANSGENDER") {
      data.params.gender = 3;
    } else {
      delete data.params.gender;
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

      const registrationNo = data?.state?.searchForm?.registrationno;
      if (registrationNo && registrationNo.trim() !== "") {
        data.params.registrationNo = registrationNo.trim();
      } else {
        delete data.params.registrationNo; 
      }
      
      const hospitalSelection = data?.state?.searchForm?.placeofdeath;

      if (hospitalSelection) {
          let hospitalNameString = "";

          if (typeof hospitalSelection === 'string') {
              hospitalNameString = hospitalSelection.trim();
          } else if (hospitalSelection.code && typeof hospitalSelection.code === 'string') {
              hospitalNameString = hospitalSelection.code.trim();
          }

          if (hospitalNameString !== "") {
            console.log("hospitalNameString", hospitalNameString);
              data.params.hospitalId = hospitalNameString;
          } else {
              delete data.params.hospitalId;
          }
      } else {
          delete data.params.hospitalId;
      }


      // Add motherName if provided
      const motherName = data?.state?.searchForm?.motherName;
      if (motherName && motherName.trim() !== "") {
        data.params.motherName = motherName.trim();
      } else {
        delete data.params.motherName;
      }

      // Add fatherName if provided
      const fatherName = data?.state?.searchForm?.fatherName;
      if (fatherName && fatherName.trim() !== "") {
        data.params.fatherName = fatherName.trim();
      } else {
        delete data.params.fatherName;
      }

      // Add spouseName if provided
      const spouseName = data?.state?.searchForm?.spouseName;
      if (spouseName && spouseName.trim() !== "") {
        data.params.spouseName = spouseName.trim();
      } else {
        delete data.params.spouseName;
      }

      // Add name if provided
      const name = data?.state?.searchForm?.name;
      if (name && name.trim() !== "") {
        data.params.name = name.trim();
      } else {
        delete data.params.name;
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
        case "View":
          return <ViewLinkButton tenantId={tenantId} certificateId={row?.id} hospitalname={row?.hospitalname} />;
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
   const { fromDate, toDate } = data;

   console.log("customValidationCheck called with data:", data);

      if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
        console.log("Validation error: To date before From date");
        return { error: true, label: "TO_DATE_CANNOT_BE_BEFORE_FROM_DATE" };
      }
      return false;
    },
 },


 searchAndDownloadConfig: {
    preProcess: (data) => {
      console.log("data in preProcess of searchAndDownloadConfig", data);
      const gender = data?.state?.searchForm?.gender?.code;
      if (gender === "MALE") {
        data.params.gender = 1;
      } else if (gender === "FEMALE") {
        data.params.gender = 2;
      }else if (gender === "TRANSGENDER") {
      data.params.gender = 3;
    } 
      const dateOfDeath = data?.state?.searchForm?.dateOfDeath;
      if (dateOfDeath) {
        const [yyyy, mm, dd] = dateOfDeath.split("-");
        data.params.dateOfDeath = `${dd}-${mm}-${yyyy}`;
      }
      const registrationNo = data?.state?.searchForm?.registrationno;
      if (registrationNo && registrationNo.trim() !== "") {
        data.params.registrationNo = registrationNo.trim();
      } else {
        delete data.params.registrationNo; 
      }
      
      const hospitalId = data?.state?.searchForm?.hospitalId;
      if (hospitalId && hospitalId.trim() !== "") {
        data.params.hospitalId = encodeURIComponent(hospitalId.trim());
      } else {
        delete data.params.hospitalId;
      }

      // Add motherName if provided
      const motherName = data?.state?.searchForm?.motherName;
      if (motherName && motherName.trim() !== "") {
        data.params.motherName = motherName.trim();
      } else {
        delete data.params.motherName;
      }

      // Add fatherName if provided
      const fatherName = data?.state?.searchForm?.fatherName;
      if (fatherName && fatherName.trim() !== "") {
        data.params.fatherName = fatherName.trim();
      } else {
        delete data.params.fatherName;
      }

      // Add spouseName if provided
      const spouseName = data?.state?.searchForm?.spouseName;
      if (spouseName && spouseName.trim() !== "") {
        data.params.spouseName = spouseName.trim();
      } else {
        delete data.params.spouseName;
      }

      // Add name if provided
      const name = data?.state?.searchForm?.name;
      if (name && name.trim() !== "") {
        data.params.name = name.trim();
      } else {
        delete data.params.name;
      }

      data.params.tenantId =  data?.state?.searchForm?.tenantId?.code;
      console.log(data, "data in preProcess of searchDeathConfig");
      if (data?.params?.dateOfDeath) {
        const createdFrom =data.params?.dateOfDeath;
        data.params.dateOfDeath = createdFrom;
      }
      return data;
    },

     additionalCustomizations: (row, key, column, value, t, searchResult) => {
      const tenantId = searchResult?.[0]?.tenantid;
      const counter = row?.counter;
      console.log("counter", counter);
      console.log("key", key);
      console.log("key", key);
      console.log("value", value);
      console.log("column", column);
      console.log("t", t);
      console.log("searchResult", searchResult);

      

      switch (key) {
        // case "Action": 
          // if (counter === 0) {
          //   return <DownloadButton tenantId={tenantId} certificateId={row?.id}  />;
          // } else if (counter >= 1) { // If counter is 1 or more, it's "Pay and Download"
          //   return <PayAndDownloadButton tenantId={tenantId} certificateId={row?.id}  />;
          // }
          // return <span>{t("ES_COMMON_NA")}</span>;

        case "Action":
          return <ViewLinkButton2 tenantId={tenantId} certificateId={row?.id} />;
          // return (
          //   <span className="link">
          //                 <Link
          //     to={`/${window.contextPath}/citizen/death/egov-common/pay`}
          //   >
          //     {"Pay and Download"}
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
  },

};


