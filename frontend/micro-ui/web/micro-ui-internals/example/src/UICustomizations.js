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

const GetSlaCell = (value) => {
  if (value === "-") return <span className="sla-cell-success">-</span>;
  if (isNaN(value)) return <span className="sla-cell-success">0</span>;
  return value < 0 ? <span className="sla-cell-error">{value}</span> : <span className="sla-cell-success">{value}</span>;
};


// export const UICustomizations = {
//     searchDeathConfig:{
//         preProcess: (data) => {
//             //set tenantId
//             const tenantId = Digit.ULBService.getCurrentTenantId();
//             data.params.tenantId = tenantId;
//             data.params.applicationStatus = data.params.applicationStatus?.[0].name;
//             const authToken = Digit.UserService.getUser()?.access_token || "";
//             if (data?.params?.fromDate || data?.params?.toDate) {
//               const createdFrom = Digit.Utils.pt.convertDateToEpoch(data.params?.fromDate);
//               const createdTo = Digit.Utils.pt.convertDateToEpoch(data.params?.toDate);
//               data.params.fromDate = createdFrom;
//               data.params.toDate = createdTo;
//             }
//             return data;
//           },
//         getCityOptions :async () => {
//             try {
//                 const currentTenant = Digit.ULBService.getCurrentTenantId(); // e.g., pg.citya
//                 const currentUlb = Digit.ULBService.getCurrentUlb();         // full ULB object
            
//                 return [
//                   {
//                     code: currentTenant, 
//                     name: currentUlb?.address?.split(",")?.[2]?.trim() || currentUlb?.name || "City",
//                   },
//                 ];
//               } catch (err) {
//                 console.error("Error loading city options", err);
//                 return [];
//               }
//           },
//         getPlaceOfDeathList : async (t, tenantId) => {
//             try {
//               const mdmsBody = {
//                 MdmsCriteria: {
//                   tenantId,
//                   moduleDetails: [
//                     {
//                       moduleName: "birth-death-service",
//                       masterDetails: [
//                         {
//                           name: "hospitalList"
//                         }
//                       ]
//                     }
//                   ]
//                 }
//               };
          
//               const response = await Digit.Utils.CustomService.getResponse({
//                 url: "/egov-mdms-service/v1/_search",
//                 params: {},
//                 body: mdmsBody,
//               });
          
//               const hospitals =
//                 response?.MdmsRes?.["birth-death-service"]?.hospitalList?.map((item) => ({
//                   code: item.code,
//                   name: item.name,
//                   i18nKey: `COMMON_HOSPITAL_${item.code.toUpperCase()}`,
//                 })) || [];
          
//               return hospitals;
//             } catch (error) {
//               console.error("Failed to fetch hospital list", error);
//               return [];
//             }
//           },
//         additionalValidations: (type, data, keys) => {
//             if (type === "date") {
//               return data.fromDate && data.toDate ? () => new Date(data.fromDate).getTime() < new Date(data.toDate).getTime() : true;
//             }
//           },
//         customValidationCheck: (data) => {
//             //checking both to and from date are present
//             const { fromDate, toDate } = data;
//             if ((fromDate === "" && toDate !== "") || (fromDate !== "" && toDate === "")) return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE" };
      
//             return false;
//           }
//         // getDeathSearchApiDetails : (props) => {
//         //     const tenantId = Digit.ULBService.getCurrentTenantId();
//         //     const authToken = Digit.UserService.getUser()?.access_token || "";
          
//         //     // Extract form field values from props.data
//         //     const fromDate = props?.data?.fromDateFormatted || "";
//         //     const toDate = props?.data?.toDateFormatted || "";
//         //     const gender = props?.data?.gender || "";
          
//         //     return {
//         //       requestParam: {
//         //         tenantId: tenantId,
//         //         fromDate: fromDate,
//         //         toDate: toDate,
//         //         gender: gender,
//         //       },
//         //       requestBody: {
//         //         RequestInfo: {
//         //           apiId: "Mihy",
//         //           ver: ".01",
//         //           action: "_search",
//         //           did: "1",
//         //           key: "",
//         //           msgId: "20170310130900|en_IN",
//         //           requesterId: "",
//         //           authToken: authToken,
//         //         },
//         //       },
//         //       minParametersForSearchForm: 1,
//         //     };
//         //   }

//     }

// };

export const UICustomizations = {
 searchDeathConfig: {

//   preProcess: (data) => {
//     debugger
//     console.log(data,"beforeeeeeeeeeeee preprocess")
//     data.params.tenantId = "pg.cityassssssssssssss";
//     data.params.limit = 100;
//     data.body={};
//     data.params.fromDate = data?.state?.searchFrom?.fromDateFormatted;
//     console.log(data, "Data in preProcess: example");
//     return data;
  


//   },
// nameofdeceased="",spouseName="",placeofdeath="",registrationno=""
preProcess:(data,additionalDetails)=>{
    const { searchForm, tableForm } = data?.state || {};
    console.log("qwertyuijhgfdsgbg",searchForm,tableForm)
    const {  city= "", fromDate = "", toDate = "", gender = "" } = data?.state?.searchForm || {};
    console.log(city,fromDate,toDate,gender,".............qwertyu");
    data.headers ={"tenantId": Digit.ULBService.getCurrentTenantId()}
    data.params = {...data.params,tenantId:Digit.ULBService.getCurrentTenantId()};
    data.body.example={}
    console.log(data,"dataaaaaaaaaaaaaaaaaaaaaaaaa");
    return data;
},

  additionalValidations: (type, data, keys) => {
    // if (type === "date") {
    //   return data.fromDate && data.toDate
    //     ? () => new Date(data.fromDate).getTime() < new Date(data.toDate).getTime()
    //     : true;
    // }
    return true;
  },

  customValidationCheck: (data) => {
    // const { fromDate, toDate } = data;
    // if ((fromDate === "" && toDate !== "") || (fromDate !== "" && toDate === "")) {
    //   return { warning: true, label: "ES_COMMON_ENTER_DATE_RANGE" };
    // }
    // return false;
    return true;
  }
},
    CampaignsInboxConfig: {
    preProcess: (data, additionalDetails) => {
      console.log(data,'came to preProcess example')
      data.body.ProjectStaff = {};
    //   data.body.ProjectStaff.limit = data?.state?.tableForm?.limit;
    //   data.body.ProjectStaff.offset = data?.state?.tableForm?.offset;
      console.log(Digit.UserService.getUser().info.uuid,"Digit.UserService.getUser().info.uuid")
      data.body.ProjectStaff.staffId = [Digit.UserService.getUser().info.uuid];
    //   data.body.ProjectStaff.tenantId = Digit.ULBService.getCurrentTenantId();
    //   cleanObject(data.body.ProjectStaff);
      console.log(data,"dataaaaaaaaaaaaaaa")
      return data;
    },
    additionalCustomizations: (row, key, column, value, t, searchResult) => {
    //   const [showToast, setShowToast] = useState(false);
      const tenantId = Digit.ULBService.getCurrentTenantId();
      const microplanId = row?.id;

      const { data: rootEstimationApprover } = Digit.Hooks.microplanv1.usePlanSearchEmployeeWithTagging({
        tenantId: tenantId,
        body: {
          PlanEmployeeAssignmentSearchCriteria: {
            tenantId: tenantId,
            planConfigurationId: microplanId,
            role: ["ROOT_PLAN_ESTIMATION_APPROVER"],
            active: true,
          },
        },
        config: {
          enabled: true,
        },
      });

      const { data: rootPopulationApprover } = Digit.Hooks.microplanv1.usePlanSearchEmployeeWithTagging({
        tenantId,
        body: {
          PlanEmployeeAssignmentSearchCriteria: {
            tenantId,
            planConfigurationId: microplanId,
            role: ["ROOT_POPULATION_DATA_APPROVER"],
            active: true,
          },
        },
        config: { enabled: true },
      });

      const { data: rootFacilityMapper } = Digit.Hooks.microplanv1.usePlanSearchEmployeeWithTagging({
        tenantId,
        body: {
          PlanEmployeeAssignmentSearchCriteria: {
            tenantId,
            planConfigurationId: microplanId,
            role: ["ROOT_FACILITY_CATCHMENT_MAPPER"],
            active: true,
          },
        },
        config: { enabled: true },
      });

    //   switch (key) {
    //     case "ACTIONS":
    //       // TODO : Replace dummy file id with real file id when API is ready
    //       const dummyFile = "c22a7676-d5d7-49b6-bcdb-83e9519f58df"
    //       const microplanFileId = row?.campaignDetails?.additionalDetails?.microplanFileId || dummyFile;
    //       const EstimationsfileId = row?.files.find((item) => item.templateIdentifier === "Estimations")?.filestoreId;
    //       let options = [];

    //       if (row?.status == "DRAFT") {
    //         options = [
    //           { code: "1", name: "MP_ACTIONS_EDIT_SETUP" },
    //           { code: "2", name: "MP_ACTIONS_DOWNLOAD_DRAFT" },
    //           { code: "3", name: "MP_ACTIONS_FREEZE_MICROPLAN" },
    //         ];
    //       } else {
    //         options = [{ code: "1", name: "MP_ACTIONS_VIEW_SUMMARY" }];
    //       }

    //       const handleDownload = ({ type }) => {
    //         const template = type === "Estimations" ? "Estimations" : "DraftComplete";
    //         const fileId = row?.files.find((item) => item.templateIdentifier === template)?.filestoreId;
    //         if (!fileId) {
    //           setShowToast({ label: t("NO_DRAFT_FILE_FOUND") });
    //           return;
    //         }
    //         const campaignName = row?.name || "";
    //         const customName = type === "Estimations" ? campaignName : `${campaignName}_DRAFT`;
    //         Digit.Utils.campaign.downloadExcelWithCustomName({
    //           fileStoreId: fileId,
    //           customName: customName,
    //         });
    //       };

    //       const onActionSelect = async (e, row) => {
    //         if (e.name === "MP_ACTIONS_EDIT_SETUP") {
    //           const key = parseInt(row?.additionalDetails?.key);
    //           const resolvedKey = key === 8 ? 7 : key === 10 ? 11 : key || 2;
    //           const url = `/${window.contextPath}/employee/microplan/setup-microplan?key=${resolvedKey}&microplanId=${row.id}&campaignId=${row.campaignDetails.id}`;
    //           window.location.href = url;
    //         }
    //         if (e.name === "MP_ACTIONS_DOWNLOAD_DRAFT") {
    //           if (row?.status == "DRAFT" && row?.assumptions.length > 0 && row?.operations.length > 0) {
    //             handleDownload({ type: "Draft" });
    //           } else {
    //             setShowToast({ label: t("PLEASE_UPDATE_THE_SETUP_INFORMATION_BEFORE_DOWNLOADING_DRAFT") });
    //           }
    //         }
    //         if (e.name === "MP_ACTIONS_FREEZE_MICROPLAN") {
    //           if (
    //             row?.status == "DRAFT" &&
    //             row?.assumptions.length > 0 &&
    //             row?.operations.length > 0 &&
    //             rootEstimationApprover?.data?.length > 0 &&
    //             rootPopulationApprover?.data?.length > 0 &&
    //             rootFacilityMapper?.data?.length > 0
    //           ) {
    //             const triggeredFromMain = "OPEN_MICROPLANS";
    //             const response = await Digit.Hooks.microplanv1.useCompleteSetUpFlow({
    //               tenantId,
    //               microplanId,
    //               triggeredFrom: triggeredFromMain,
    //             });
    //             if (response && !response?.isError) {
    //               window.history.pushState(response?.state, "", response?.redirectTo);
    //               window.dispatchEvent(new PopStateEvent("popstate", { state: response?.state }));
    //             }
    //             if (response && response?.isError) {
    //               console.error(`ERR_FAILED_TO_COMPLETE_SETUP`);
    //             }
    //           } else {
    //             setShowToast({ label: t("PLEASE_FINISH_THE_DRAFT_BEFORE_FREEZING") });
    //           }
    //         }
    //         if (e.name == "MP_ACTIONS_VIEW_SUMMARY") {
    //           window.location.href = `/${window.contextPath}/employee/microplan/setup-microplan?key=${11}&microplanId=${row.id}&campaignId=${
    //             row.campaignDetails.id
    //           }&setup-completed=true`;
    //         }
    //       };
    //       const handleToast = () => {
    //         setShowToast(false);
    //       };

    //       return (
    //         <>
    //           <div>
    //             {microplanFileId && row?.status == "RESOURCE_ESTIMATIONS_APPROVED" ? (
    //               <div>
    //                 <ButtonNew
    //                   style={{ width: "20rem" }}
    //                   icon="DownloadIcon"
    //                   onClick={() => handleDownload({ type: "Estimations" })}
    //                   label={t("WBH_DOWNLOAD_MICROPLAN")}
    //                   title={t("WBH_DOWNLOAD_MICROPLAN")}
    //                   isDisabled={!EstimationsfileId}
    //                 />
    //               </div>
    //             ) : (
    //               <div className={"action-button-open-microplan"}>
    //                 <div style={{ position: "relative" }}>
    //                   <ButtonNew
    //                     type="actionButton"
    //                     variation="secondary"
    //                     label={t("MP_ACTIONS_FOR_MICROPLAN_SEARCH")}
    //                     title={t("MP_ACTIONS_FOR_MICROPLAN_SEARCH")}
    //                     options={options}
    //                     style={{ width: "20rem" }}
    //                     optionsKey="name"
    //                     showBottom={true}
    //                     isSearchable={false}
    //                     onOptionSelect={(item) => onActionSelect(item, row)}
    //                   />
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //           {showToast && <Toast type={showToast?.type || "warning"} label={showToast?.label} onClose={handleToast} />}
    //         </>
    //       );

    //     case "NAME_OF_MICROPLAN":
    //       if (value && value !== "NA") {
    //         return (
    //           <div
    //             style={{
    //               maxWidth: "15rem", // Set the desired maximum width
    //               wordWrap: "break-word", // Allows breaking within words
    //               whiteSpace: "normal", // Ensures text wraps normally
    //               overflowWrap: "break-word", // Break long words at the edge
    //             }}
    //           >
    //             <p>{t(value)}</p>
    //           </div>
    //         );
    //       } else {
    //         return (
    //           <div>
    //             <p>{t("NA")}</p>
    //           </div>
    //         );
    //       }

    //     case "MICROPLAN_STATUS":
    //       if (value && value != "NA") {
    //         return <p>{t(Digit.Utils.locale.getTransformedLocale("MICROPLAN_STATUS_" + value))}</p>;
    //       } else {
    //         return (
    //           <div>
    //             <p>{t("NA")}</p>
    //           </div>
    //         );
    //       }

    //     case "CAMPAIGN_DISEASE":
    //       if (value && value != "NA") {
    //         return <p>{t(Digit.Utils.locale.getTransformedLocale("MICROPLAN_DISEASE_" + value))}</p>;
    //       } else {
    //         return (
    //           <div>
    //             <p>{t("NA")}</p>
    //           </div>
    //         );
    //       }

    //     case "CAMPAIGN_TYPE":
    //       if (value && value != "NA") {
    //         return <p>{t(Digit.Utils.locale.getTransformedLocale("MICROPLAN_TYPE_" + value))}</p>;
    //       } else {
    //         return (
    //           <div>
    //             <p>{t("NA")}</p>
    //           </div>
    //         );
    //       }

    //     case "DISTIRBUTION_STRATEGY":
    //       if (value && value != "NA") {
    //         return <p>{t(Digit.Utils.locale.getTransformedLocale("MICROPLAN_DISTRIBUTION_" + value))}</p>;
    //       } else {
    //         return (
    //           <div>
    //             <p>{t("NA")}</p>
    //           </div>
    //         );
    //       }

    //     default:
    //       return null; // Handle any unexpected keys here if needed
    //   }
    },
  }
};


