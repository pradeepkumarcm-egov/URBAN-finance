import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import React, { useState, Fragment } from "react";
import { Button as ButtonNew, Toast } from "@egovernments/digit-ui-components";

//create functions here based on module name set in mdms(eg->SearchProjectConfig)
//how to call these -> Digit?.Customizations?.[masterName]?.[moduleName]
// these functions will act as middlewares
// var Digit = window.Digit || {};

const businessServiceMap = {};

const inboxModuleNameMap = {};

var Digit = window.Digit || {};

const GetSlaCell = (value) => {
  if (value === "-") return <span className="sla-cell-success">-</span>;
  if (isNaN(value)) return <span className="sla-cell-success">0</span>;
  return value < 0 ? <span className="sla-cell-error">{value}</span> : <span className="sla-cell-success">{value}</span>;
};

export const UICustomizations = {
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
      // console.log(data, "data in preProcess of search Birth Ui config");
      if (data?.params?.fromDate || data?.params?.toDate) {
        const createdFrom = data.params?.fromDate;
        const createdTo = data.params?.toDate;
        data.params.fromDate = createdFrom;
        data.params.toDate = createdTo;
      }
      return data;
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      // console.log("key", key);
      const tenantId = Digit.ULBService.getCurrentTenantId();
      const ViewBirthLinkButton = ({ tenantId, certificateId }) => {
        const history = useHistory();

        const handleClick = () => {
          history.push(`/${window.contextPath}/employee/birth/viewbirth/${certificateId}`);
        };

        return (
          <span className="link" onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
            View
          </span>
        );
      };

      // console.log("value", value);
      // console.log("column", column);
      // console.log("t", t);
      // console.log("searchResult", searchResult);

      switch (key) {
        case "view":
          return <ViewBirthLinkButton tenantId={tenantId} certificateId={row?.id} />;

        case "Birth Date":
          const epoch = row?.dateofbirth;
          // console.log(epoch, "changing the format of date");
          if (epoch) {
            const date = new Date(epoch);
            const dd = String(date.getDate()).padStart(2, "0");
            const mm = String(date.getMonth() + 1).padStart(2, "0");
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
  searchAndDownloadConfig: {
    // preProcess function to transform form data into API query parameters
    preProcess: (data) => {
      // console.log("BIRTH: UICustomization preProcess START - received data:", JSON.stringify(data, null, 2));

      const finalApiParams = {};
      const formValues = data.state.searchForm || {};
      // console.log("BIRTH: Form Values (data.state.searchForm):", JSON.stringify(formValues, null, 2));

      // 1. Tenant ID
      const tenantFromForm = formValues.tenantId;
      if (tenantFromForm && tenantFromForm.code) {
        finalApiParams.tenantId = tenantFromForm.code;
      } else if (typeof tenantFromForm === "string" && tenantFromForm) {
        finalApiParams.tenantId = tenantFromForm;
      } else {
        console.warn("PreProcess: tenantId issue. Value:", tenantFromForm);
      }

      // 2. Gender
      const gender = formValues.gender?.code;
      if (gender) {
        if (gender === "MALE") finalApiParams.gender = 1;
        else if (gender === "FEMALE") finalApiParams.gender = 2;
        else if (gender === "TRANSGENDER") finalApiParams.gender = 3;
      }

      // 3. Date of Birth
      const dateOfBirth = formValues.dateOfBirth; // <-- CHANGED
      if (dateOfBirth) {
        try {
          const [yyyy, mm, dd] = dateOfBirth.split("-");
          finalApiParams.dateOfBirth = `${dd}-${mm}-${yyyy}`; // <-- CHANGED API param
        } catch (e) {
          console.error("Error parsing dateOfBirth:", dateOfBirth, e);
        }
      }

      // 4. Registration Number
      const registrationNo = formValues.registrationno;
      if (registrationNo && String(registrationNo).trim() !== "") {
        finalApiParams.registrationNo = String(registrationNo).trim();
      }

      // 5. Hospital ID
      const placeOfBirthRawValue = formValues.placeofbirth; // <-- CHANGED
      // console.log("Raw value of formValues.placeofbirth:", JSON.stringify(placeOfBirthRawValue));

      let placeOfBirthCode = null;
      if (typeof placeOfBirthRawValue === "string" && placeOfBirthRawValue.trim() !== "") {
        placeOfBirthCode = placeOfBirthRawValue.trim();
      } else if (typeof placeOfBirthRawValue === "object" && placeOfBirthRawValue !== null && placeOfBirthRawValue.code) {
        placeOfBirthCode = String(placeOfBirthRawValue.code).trim();
      } else {
        // console.log("placeofbirth is not a usable string or object with a code property.");
      }

      if (placeOfBirthCode) {
        finalApiParams.hospitalId = placeOfBirthCode;
        // console.log(`PreProcess: Hospital ID set to: ${finalApiParams.hospitalId}`);
      } else {
        delete finalApiParams.hospitalId;
      }

      // 6. Mother's Name
      const motherName = formValues.MotherName;
      if (motherName && motherName.trim() !== "") {
        finalApiParams.motherName = motherName.trim();
      }

      // 7. Father's Name
      const fatherName = formValues.FatherName;
      if (fatherName && fatherName.trim !== "") {
        finalApiParams.fatherName = fatherName.trim();
      }

      // 8. Child's Name (CHANGED from spouseName & nameofdeceased)
      const childName = formValues.childName; // <-- CHANGED
      if (childName && childName.trim() !== "") {
        finalApiParams.name = childName.trim(); // API likely uses 'name' for the child's name
      }

      data.params = finalApiParams;
      // console.log("BIRTH: UICustomization preProcess END - final data.params being sent:", JSON.stringify(data.params, null, 2));
      return data;
    },

    // additionalCustomizations for rendering columns in the results table
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
      const DownloadButton = Digit.ComponentRegistryService.getComponent("DownloadButton");
      const PayAndDownloadButton = Digit.ComponentRegistryService.getComponent("PayAndDownloadButton");
      const colKey = column.key;
      const tenantId = searchResult?.[0]?.tenantid;
      const counter = row?.counter;

      switch (colKey) {
        case "action":
          if (counter === 0) {
            return <DownloadButton tenantId={tenantId} certificateId={row?.id} />;
          } else if (counter >= 1) {
            return <PayAndDownloadButton tenantId={tenantId} certificateId={row?.id} />;
          }

          return <span>{t("ES_COMMON_NA")}</span>;

        case "dateOfBirth":
          const epoch = row?.dateofbirth;
          if (epoch) {
            const date = new Date(epoch);
            const dd = String(date.getDate()).padStart(2, "0");
            const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
            const yyyy = date.getFullYear();
            return <span>{`${dd}-${mm}-${yyyy}`}</span>;
          }
          return <span>{t("ES_COMMON_NA")}</span>;

        default:
          return <span>{t("ES_COMMON_NA")}</span>;
      }
    },
  },
};
