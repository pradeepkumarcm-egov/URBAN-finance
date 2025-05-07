// const searchDeathConfig = () => {
//   return {
//     headerLabel: "Search Registry",
//     type: "search",
//     actions: {
//       actionLabel: "DEATH REGISTRATION",
//       actionRoles: ["DEATH_APPLICATION_CREATOR"],
//       actionLink: "death/death-common/create-death",
//     },
//     apiDetails: {
//       serviceName: "/birth-death-services/death/_search",
//       requestParam: {
//         tenantId: Digit.ULBService.getCurrentTenantId(),
//       },
//       requestBody: {
//         RequestInfo: {
//           apiId: "Mihy",
//           ver: ".01",
//           action: "_search",
//           did: "1",
//           key: "",
//           msgId: "20170310130900|en_IN",
//           requesterId: "",
//           authToken: Digit.UserService.getUser()?.accessToken || "",
//         },
//       },
//       minParametersForSearchForm: 3,
//       masterName: "Death",
//       moduleName: "SearchDeathConfig",
//       tableFormJsonPath: "requestParam",
//       filterFormJsonPath: "requestBody.RequestInfo",
//       searchFormJsonPath: "requestBody.RequestInfo",
//     },
//     sections: {
//       search: {
//         uiConfig: {
//           formClassName: "custom-both-clear-search",
//           primaryLabel: "ES_COMMON_SEARCH",
//           secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
//           minReqFields: 1,
//           defaultValues: {
//             city: Digit.ULBService.getCurrentTenantId(),
//             createdFrom: "",
//             createdTo: "",
//             nameofdeceased: "",
//             spouseName: "",
//           },
//           fields: [
//             {
//               label: "City",
//               key: "city",
//               type: "dropdown",
//               isMandatory: true,
//               disable: true,
//               populators: {
//                 name: Digit.ULBService.getCurrentTenantId(),
//                 type: "dropdown",
//                 optionsKey: "i18nKey",
//                 allowMultiSelect: false,
//               },
//             },
//             {
//               label: "From (Death Date)",
//               key: "createdFrom",
//               type: "date",
//               isMandatory: true,
//               preProcess: { updateDependent: ["populators.max"] },
//               populators: {
//                 name: "createdFrom",
//                 placeholder: "dd-mm-yyyy",
//                 max: "currentDate",
//               },
//             },
//             {
//               label: "To (Death Date)",
//               key: "createdTo",
//               type: "date",
//               isMandatory: true,
//               preProcess: { updateDependent: ["populators.max"] },
//               populators: {
//                 name: "createdTo",
//                 placeholder: "dd-mm-yyyy",
//                 max: "currentDate",
//                 error: "DATE_VALIDATION_MSG",
//               },
//               additionalValidation: {
//                 type: "date",
//                 keys: { start: "createdFrom", end: "createdTo" },
//               },
//             },
//             {
//               label: "Gender",
//               key: "gender",
//               type: "dropdown",
//               isMandatory: false,
//               populators: {
//                 name: "gender",
//                 optionsKey: "name",
//                 mdmsConfig: {
//                   masterName: "GenderType",
//                   moduleName: "common-masters",
//                   localePrefix: "COMMON_GENDER",
//                 },
//               },
//             },
//             {
//               label: "Name of Deceased",
//               key: "nameofdeceased",
//               type: "text",
//               isMandatory: false,
//               populators: {
//                 name: "nameofdeceased",
//               },
//             },
//             {
//               label: "Spouse Name",
//               key: "spouseName",
//               type: "text",
//               isMandatory: false,
//               populators: {
//                 name: "spouseName",
//               },
//             },
//             {
//               label: "Place of Death",
//               key: "placeofdeath",
//               type: "dropdown",
//               isMandatory: false,
//               populators: {
//                 name: "placeofdeath",
//                 type: "dropdown",
//                 optionsKey: "i18nKey",
//                 allowMultiSelect: false,
//                 mdmsConfig: {
//                   masterName: "hospitalList",
//                   moduleName: "birth-death-service",
//                   localePrefix: "COMMON_HOSPITAL",
//                 },
//               },
//             },
//             {
//               label: "Registration Number",
//               key: "registrationno",
//               type: "text",
//               isMandatory: false,
//               populators: {
//                 name: "registrationno",
//               },
//             },
//             {
//               label: "Father's Name",
//               key: "FatherName",
//               type: "text",
//               isMandatory: false,
//               populators: {
//                 name: "FatherName",
//                 validation: { pattern: /^[A-Za-z ]+$/i },
//               },
//             },
//             {
//               label: "Mother's Name",
//               key: "MotherName",
//               type: "text",
//               isMandatory: false,
//               populators: {
//                 name: "MotherName",
//                 validation: { pattern: /^[A-Za-z ]+$/i },
//               },
//             },
//           ],
//         },
//         show: true,
//       },
//       searchResult: {
//         uiConfig: {
//           columns: [
//             { label: "Full Name", jsonPath: "fullName" },
//             {
//               label: "Date of Death",
//               jsonPath: "dateofdeath",
//               additionalCustomization: true,
//               format: "date",
//             },
//             { label: "Registration No", jsonPath: "registrationno" },
//             { label: "Gender", jsonPath: "genderStr" },
//             { label: "Tenant ID", jsonPath: "tenantid" },
//           ],
//           selectionProps: {
//             showCheckBox: true,
//             showSelectedState: true,
//             selectableRowsNoSelectAll: false,
//           },
//           tableProps: {
//             showTableDescription: "List of death registrations",
//             showTableTitle: "Death Registry Search Results",
//             tableClassName: "custom-classname-resultsdatatable",
//           },
//           enableGlobalSearch: true,
//           enableColumnSort: true,
//           resultsJsonPath: "deathCerts", // Ensure this matches the response data structure
//           defaultSortAsc: false,
//         },
//         children: {},
//         show: true,
//       },
//     },
//   };
// };

// export default searchDeathConfig;

// const searchDeathConfig = () => {
//   return {
//     headerLabel: "Search Registry",
//     type: "search",
//     actions: {
//       actionLabel: "DEATH REGISTRATION",
//       actionRoles: ["DEATH_APPLICATION_CREATOR"],
//       actionLink: "death/death-common/create-death",
//     },
//     apiDetails: {
//       serviceName: "/birth-death-services/death/_search",
//       requestParam: {
//       },
//       requestBody: {
//         RequestInfo: {
//           apiId: "Mihy",
//           ver: ".01",
//           action: "_search",
//           did: "1",
//           key: "",
//           msgId: "20170310130900|en_IN",
//           requesterId: "",
//           authToken: Digit.UserService.getUser()?.accessToken || "",
//         },
//         tenantId: Digit.ULBService.getCurrentTenantId(),
//       },
//       minParametersForSearchForm: 1,
//       masterName: "uiCommonConstants",
//       moduleName: "common-masters",
//       tableFormJsonPath: "requestBody",
//       filterFormJsonPath: "requestBody",
//       searchFormJsonPath: "requestBody",
//     },
//     sections: {
//       search: {
//         uiConfig: {
//           formClassName: "custom-both-clear-search",
//           primaryLabel: "ES_COMMON_SEARCH",
//           secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
//           minReqFields: 1,
//           defaultValues: {
//             city: Digit.ULBService.getCurrentTenantId(),
//             createdFrom: "",
//             createdTo: "",
//             nameofdeceased: "",
//             spouseName: "",
//           },
//           fields: [
//             {
//               label: "City",
//               key: "city",
//               type: "dropdown",
//               isMandatory: true,
//               disable: true,
//               populators: {
//                 name: "city",
//                 type: "dropdown",
//                 optionsKey: "i18nKey",
//                 allowMultiSelect: false,
//                 mdmsConfig: {
// masterName: "StateInfo",
// moduleName: "common-masters",
// localePrefix: "COMMON_CITY",
//                 },
//               },
//             },
//             {
//               label: "From (Death Date)",
//               key: "createdFrom",
//               type: "date",
//               isMandatory: true,
//               preProcess: { updateDependent: ["populators.max"] },
//               populators: {
//                 name: "createdFrom",
//                 placeholder: "dd-mm-yyyy",
//                 max: "currentDate",
//               },
//               preProcess: {
//                 convertToEpoch: true,
//               },
//             },
//             {
//               label: "To (Death Date)",
//               key: "createdTo",
//               type: "date",
//               isMandatory: true,
//               preProcess: { updateDependent: ["populators.max"] },
//               populators: {
//                 name: "createdTo",
//                 placeholder: "dd-mm-yyyy",
//                 max: "currentDate",
//                 error: "DATE_VALIDATION_MSG",
//               },
//               additionalValidation: {
//                 type: "date",
//                 keys: { start: "createdFrom", end: "createdTo" },
//               },
//               preProcess: {
//                 convertToEpoch: true,
//               },
//             },
//             {
//               label: "Gender",
//               key: "gender",
//               type: "dropdown",
//               isMandatory: false,
//               populators: {
//                 name: "gender",
//                 optionsKey: "code",
//                 mdmsConfig: {
//                   masterName: "GenderType",
//                   moduleName: "common-masters",
//                   localePrefix: "COMMON_GENDER",
//                 },
//               },
//             },
//             {
//               label: "Name of Deceased",
//               key: "nameofdeceased",
//               type: "text",
//               isMandatory: false,
//               populators: { name: "nameofdeceased" },
//             },
//             {
//               label: "Spouse Name",
//               key: "spouseName",
//               type: "text",
//               isMandatory: false,
//               populators: { name: "spouseName" },
//             },
//             {
//               label: "Place of Death",
//               key: "placeofdeath",
//               type: "dropdown",
//               isMandatory: false,
//               populators: {
//                 name: "placeofdeath",
//                 optionsKey: "i18nKey",
//                 allowMultiSelect: false,
//                 mdmsConfig: {
//                   masterName: "hospitalList",
//                   moduleName: "birth-death-service",
//                   localePrefix: "COMMON_HOSPITAL",
//                 },
//               },
//             },
//             {
//               label: "Registration Number",
//               key: "registrationno",
//               type: "text",
//               isMandatory: false,
//               populators: { name: "registrationno" },
//             },
//             {
//               label: "Father's Name",
//               key: "FatherName",
//               type: "text",
//               isMandatory: false,
//               populators: {
//                 name: "FatherName",
//                 validation: { pattern: /^[A-Za-z ]+$/i },
//               },
//             },
//             {
//               label: "Mother's Name",
//               key: "MotherName",
//               type: "text",
//               isMandatory: false,
//               populators: {
//                 name: "MotherName",
//                 validation: { pattern: /^[A-Za-z ]+$/i },
//               },
//             },
//           ],
//         },
//         show: true,
//       },
//       searchResult: {
//         uiConfig: {
//           columns: [
//             { label: "Registration No.", jsonPath: "registrationno" },
//             { label: "Name", jsonPath: "fullName" },
//             {
//               label: "Death Date",
//               jsonPath: "dateofdeath",
//               format: "date",
//               additionalCustomization: true,
//             },
//             {label:"Mother's Name", jsonPath:"motherName"},
//             {label:"Father's Name", jsonPath:"fatherName"},
//             {label:"Spouse Name", jsonPath:"spouseName"},
//             { label: "Gender", jsonPath: "genderStr" },
//             {View: "View", jsonPath: "view" },
//           ],
//           selectionProps: {
//             showCheckBox: true,
//             showSelectedState: true,
//             selectableRowsNoSelectAll: false,
//           },
//           tableProps: {
//             showTableTitle: "Death Registry Search Results",
//             showTableDescription: "List of death registrations",
//             tableClassName: "custom-classname-resultsdatatable",
//           },
//           enableGlobalSearch: true,
//           enableColumnSort: true,
//           resultsJsonPath: "deathCerts",
//           defaultSortAsc: false,
//         },
//         children: {},
//         show: true,
//       },
//     },
//   };
// };

// export default searchDeathConfig;

// const searchDeathConfig = () => {
//   return {
//     headerLabel: "Search Registry",
//     type: "search",
//     actions: {
//       actionLabel: "DEATH REGISTRATION",
//       actionRoles: ["DEATH_APPLICATION_CREATOR"],
//       actionLink: "death/death-common/create-death",
//     },
//     apiDetails: {
//     serviceName: "/birth-death-services/death/_search",
//     requestParam: {
//       tenantId: "city", // key from form
//       fromDate: "createdFrom", // key from form
//       toDate: "createdTo", // key from form
//       gender: "gender", // optional
//       nameofdeceased: "nameofdeceased",
//       spouseName: "spouseName",
//       SpouseMobileNo: "SpouseMobileNo",
//       FatherName: "FatherName",
//       FatherMobileNo: "FatherMobileNo",
//       MotherName: "MotherName",
//       MotherMobileNo: "MotherMobileNo",
//       registrationno: "registrationno",
//       placeofdeath: "placeofdeath"
//     },
//     requestBody: {
//       RequestInfo: {
//         apiId: "Mihy",
//         ver: ".01",
//         action: "_search",
//         did: "1",
//         key: "",
//         msgId: "20170310130900|en_IN",
//         requesterId: "",
//         authToken: Digit.UserService.getUser()?.accessToken || "",
//       },
//       tenantId: Digit.ULBService.getCurrentTenantId(),
//     },
//     minParametersForSearchForm: 1,
//     masterName: "uiCommonConstants",
//     moduleName: "common-masters",
//     tableFormJsonPath: "requestBody",
//     filterFormJsonPath: "requestBody",
//     searchFormJsonPath: "requestBody",
//   },
//     sections: {
//       search: {
//         uiConfig: {
//           formClassName: "custom-both-clear-search",
//           primaryLabel: "ES_COMMON_SEARCH",
//           secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
//           minReqFields: 1,
//           defaultValues: {
//             city: Digit.ULBService.getCurrentTenantId(),
//             createdFrom: "",
//             createdTo: "",
//             nameofdeceased: "",
//             spouseName: "",
//           },
//           fields: [
//             {
//               label: "City",
//               key: "city",
//               type: "dropdown",
//               isMandatory: true,
//               // disable: true,
//               populators: {
//                 name: "city",
//                 type: "dropdown",
//                 options: [
//                   {
//                     code: Digit.ULBService.getCurrentTenantId(),
//                     i18nKey: Digit.ULBService.getCurrentUlb()?.name || "City", // shows "Victoria"
//                   },
//                 ],
//                 defaultValue: Digit.ULBService.getCurrentTenantId(),
//                 optionsKey: "i18nKey",
//                 allowMultiSelect: false,
//               },
//             },
//             {
//               label: "From (Death Date)",
//               key: "createdFrom",
//               type: "date",
//               isMandatory: true,
//               preProcess: { updateDependent: ["populators.max"] },
//               populators: {
//                 name: "createdFrom",
//                 placeholder: "dd-mm-yyyy",
//                 max: "currentDate",
//               },
//               preProcess: {
//                 convertToEpoch: true,
//               },
//             },
//             {
//               label: "To (Death Date)",
//               key: "createdTo",
//               type: "date",
//               isMandatory: true,
//               preProcess: { updateDependent: ["populators.max"] },
//               populators: {
//                 name: "createdTo",
//                 placeholder: "dd-mm-yyyy",
//                 max: "currentDate",
//                 error: "DATE_VALIDATION_MSG",
//               },
//               additionalValidation: {
//                 type: "date",
//                 keys: { start: "createdFrom", end: "createdTo" },
//               },
//               preProcess: {
//                 convertToEpoch: true,
//               },
//             },
//             {
//               label: "Gender",
//               key: "gender",
//               type: "dropdown",
//               isMandatory: false,
//               populators: {
//                 name: "gender",
//                 optionsKey: "code",
//                 mdmsConfig: {
//                   masterName: "GenderType",
//                   moduleName: "common-masters",
//                   localePrefix: "COMMON_GENDER",
//                 },
//               },
//             },
//             {
//               label: "Name of Deceased",
//               key: "nameofdeceased",
//               type: "text",
//               isMandatory: false,
//               populators: { name: "nameofdeceased" },
//             },
//             {
//               label: "Spouse Name",
//               key: "spouseName",
//               type: "text",
//               isMandatory: false,
//               populators: { name: "spouseName" },
//             },
//             {
//               label: "Place of Death",
//               key: "placeofdeath",
//               type: "dropdown",
//               isMandatory: false,
//               populators: {
//                 name: "placeofdeath",
//                 optionsKey: "i18nKey",
//                 allowMultiSelect: false,
//                 mdmsConfig: {
//                   masterName: "hospitalList",
//                   moduleName: "birth-death-service",
//                   localePrefix: "COMMON_HOSPITAL",
//                 },
//               },
//             },
//             {
//               label: "Registration Number",
//               key: "registrationno",
//               type: "text",
//               isMandatory: false,
//               populators: { name: "registrationno" },
//             },
//             {
//               label: "Father's Name",
//               key: "FatherName",
//               type: "text",
//               isMandatory: false,
//               populators: {
//                 name: "FatherName",
//                 validation: { pattern: /^[A-Za-z ]+$/i },
//               },
//             },
//             {
//               label: "Mother's Name",
//               key: "MotherName",
//               type: "text",
//               isMandatory: false,
//               populators: {
//                 name: "MotherName",
//                 validation: { pattern: /^[A-Za-z ]+$/i },
//               },
//             },
//           ],
//         },
//         show: true,
//       },
//       searchResult: {
//         uiConfig: {
//           columns: [
//             { label: "Registration No.", jsonPath: "registrationno" },
//             { label: "Name", jsonPath: "fullName" },
//             {
//               label: "Death Date",
//               jsonPath: "dateofdeath",
//               format: "date",
//               additionalCustomization: true,
//             },
//             { label: "Mother's Name", jsonPath: "deathMotherInfo.fullName" },
//             { label: "Father's Name", jsonPath: "deathFatherInfo.fullName" },
//             { label: "Spouse Name", jsonPath: "deathSpouseInfo.fullName" },
//             { label: "Gender", jsonPath: "genderStr" },
//             // { View: "View", jsonPath: "view" },
//           ],
//           selectionProps: {
//             showCheckBox: true,
//             showSelectedState: true,
//             selectableRowsNoSelectAll: false,
//           },
//           tableProps: {
//             showTableTitle: "Death Registry Search Results",
//             showTableDescription: "List of death registrations",
//             tableClassName: "custom-classname-resultsdatatable",
//           },
//           enableGlobalSearch: true,
//           enableColumnSort: true,
//           resultsJsonPath: "deathCerts",
//           defaultSortAsc: false,
//         },
//         children: {},
//         show: true,
//       },
//     },
//   };
// };

// export default searchDeathConfig;

const searchDeathConfig = () => {
  const id = Digit.ULBService.getCurrentTenantId();
  return {
    commonUiConfig: {
      searchDeathConfig: [
        {
          label: "Search Registry",
          type: "search",
          actions: {
            actionLabel: "DEATH REGISTRATION",
            actionRoles: ["DEATH_APPLICATION_CREATOR"],
            actionLink: "death/death-common/create-death",
          },
          apiDetails: {
            serviceName: "/birth-death-services/death/_search",
            requestParam: {
              // tenantId: id,
              // limit: 100,
              // offset: 0,
              // fromDate:"29-04-2025",
              // toDate:"29-04-2025",
              // gender:1
            },
            requestBody: {
              example:{}
            },
            // minParametersForSearchForm: 3,
            masterName: "commonUiConfig",
            moduleName: "searchDeathConfig",
            tableFormJsonPath: "requestParam",
            searchFormJsonPath: "requestParam",
          },
          sections: {
            search: {
              uiConfig: {
                formClassName: "custom-both-clear-search",
                primaryLabel: "ES_COMMON_SEARCH",
                secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
                minReqFields: 3,
                defaultValues: {
                  city: id,
                  fromDate: "",
                  toDate: "",
                  gender:"",
                },
                fields: [
                  {
                    label: "City",
                    key: "city",
                    type: "dropdown",
                    isMandatory: true,
                    populators: {
                      name: "city",
                      type: "dropdown",
                      options: [
                        {
                          code: id,
                          i18nKey: id?.name || "City",
                        },
                      ],
                      defaultValue: id,
                      optionsKey: "i18nKey",
                      allowMultiSelect: false,
                    },
                  },
                  {
                    label: "From (Death Date)",
                    key: "fromDate",
                    type: "date",
                    isMandatory: true,
                    populators: {
                      name: "fromDate",
                      placeholder: "dd-mm-yyyy",
                      max: "currentDate",
                    },
                  },
                  {
                    label: "To (Death Date)",
                    key: "toDate",
                    type: "date",
                    isMandatory: true,
                    populators: {
                      name: "toDate",
                      placeholder: "dd-mm-yyyy",
                      max: "currentDate",
                      error: "DATE_VALIDATION_MSG",
                    },
                    additionalValidation: {
                      type: "date",
                      keys: { start: "fromDate", end: "toDate" },
                    },
                  },
                  {
                    label: "Gender",
                    key: "gender",
                    type: "dropdown",
                    isMandatory: false,
                    populators: {
                      name: "gender",
                      optionsKey: "code",
                      mdmsConfig: {
                        masterName: "GenderType",
                        moduleName: "common-masters",
                        localePrefix: "COMMON_GENDER",
                      },
                    },
                  },
                  {
                    label: "Name of Deceased",
                    key: "nameofdeceased",
                    type: "text",
                    isMandatory: false,
                    populators: { name: "nameofdeceased" },
                  },
                  {
                    label: "Spouse Name",
                    key: "spouseName",
                    type: "text",
                    isMandatory: false,
                    populators: { name: "spouseName" },
                  },
                  {
                    label: "Place of Death",
                    key: "placeofdeath",
                    type: "dropdown",
                    isMandatory: false,
                    populators: {
                      name: "placeofdeath",
                      optionsKey: "i18nKey",
                      allowMultiSelect: false,
                      mdmsConfig: {
                        masterName: "hospitalList",
                        moduleName: "birth-death-service",
                        localePrefix: "COMMON_HOSPITAL",
                      },
                    },
                  },
                  {
                    label: "Registration Number",
                    key: "registrationno",
                    type: "text",
                    isMandatory: false,
                    populators: { name: "registrationno" },
                  },
                  {
                    label: "Father's Name",
                    key: "FatherName",
                    type: "text",
                    isMandatory: false,
                    populators: {
                      name: "FatherName",
                      validation: { pattern: /^[A-Za-z ]+$/i },
                    },
                  },
                  {
                    label: "Mother's Name",
                    key: "MotherName",
                    type: "text",
                    isMandatory: false,
                    populators: {
                      name: "MotherName",
                      validation: { pattern: /^[A-Za-z ]+$/i },
                    },
                  },
                ],
              },
              show: true,
            },
            searchResult: {
              uiConfig: {
                columns: [
                  { label: "Registration No.", jsonPath: "registrationno" },
                  { label: "Name", jsonPath: "fullName" },
                  {
                    label: "Death Date",
                    jsonPath: "dateofdeath",
                    format: "date",
                    additionalCustomization: true,
                  },
                  { label: "Mother's Name", jsonPath: "deathMotherInfo.fullName" },
                  { label: "Father's Name", jsonPath: "deathFatherInfo.fullName" },
                  { label: "Spouse Name", jsonPath: "deathSpouseInfo.fullName" },
                  { label: "Gender", jsonPath: "genderStr" },
                ],
                selectionProps: {
                  showCheckBox: true,
                  showSelectedState: true,
                  selectableRowsNoSelectAll: false,
                },
                tableProps: {
                  showTableTitle: "Death Registry Search Results",
                  showTableDescription: "List of death registrations",
                  tableClassName: "custom-classname-resultsdatatable",
                },
                enableGlobalSearch: true,
                enableColumnSort: true,
                resultsJsonPath: "deathCerts",
                defaultSortAsc: false,
              },
              children: {},
              show: true,
            },
          },
        },
      ],
    },
  };
};

export default searchDeathConfig;

// const tenantId = Digit.ULBService.getCurrentTenantId();

// const CampaignsInboxConfig = () => {
//   return {
//     tenantId: "dev",
//     moduleName: "CampaignsInboxConfig",
//     CampaignsInboxConfig: [
//       {
//         // headerLabel: headerLabel,
//         type: "inbox",
//         apiDetails: {
//           // serviceName: `/birth-death-services/death/_search`,
//           serviceName: `/birth-death-services/birth/_search`,
//           requestParam: {
//             tenantId: "pg.citya",
//             limit: 100,
//             offset: 0,
//           },
//           requestBody: {
//             ProjectStaff: {},
//           },
//           minParametersForSearchForm: 0,
//           minParametersForFilterForm: 0,
//           masterName: "commonUiConfig",
//           moduleName: "CampaignsInboxConfig",
//           tableFormJsonPath: "requestBody.ProjectStaff",
//           filterFormJsonPath: "requestBody.ProjectStaff",
//           searchFormJsonPath: "requestBody.ProjectStaff",
//         },
//         sections: {
//           search: {
//             uiConfig: {
//               headerLabel: "ES_COMMON_SEARCH",
//               type: "search",
//               typeMobile: "filter",
//               // searchWrapperStyles: {
//               //   flexDirection: "column-reverse",
//               //   marginTop: "1.4rem",
//               //   alignItems: "center",
//               //   justifyContent: "end",
//               //   gridColumn: "3",
//               // },
//               headerStyle: null,
//               primaryLabel: "Search",
//               secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
//               minReqFields: 0,
//               defaultValues: {
//                 name: "",
//                 phone: "",
//               },
//               fields: [
//                 {
//                   label: "NAME",
//                   type: "text",
//                   isMandatory: false,
//                   disable: false,
//                   populators: {
//                     name: "name",
//                     error: "ERR_INVALID_NAME",
//                     style: {
//                       marginBottom: "0px",
//                     },
//                   },
//                 },
//                 {
//                   label: "CONTACT_NUMBER",
//                   type: "number",
//                   isMandatory: false,
//                   disable: false,
//                   populators: {
//                     name: "phone",
//                     error: "ERR_INVALID_PHONE_NUMBER",
//                     style: {
//                       marginBottom: "0px",
//                     },
//                   },
//                 },
//               ],
//             },
//             label: "",
//             children: {},
//             show: true,
//           },
//           searchResult: {
//             uiConfig: {
//               columns: [
//                 {
//                   label: "MP_USER_MANAGEMENT_NAME",
//                   jsonPath: "user.name",
//                 },
//                 {
//                   label: "MP_USER_MANAGEMENT_EMAIL",
//                   jsonPath: "user.emailId",
//                 },
//                 {
//                   label: "MP_USER_MANAGEMENT_MOBILE_NO",
//                   jsonPath: "user.mobileNumber",
//                 },
//                 {
//                   label: "MP_USER_MANAGEMENT_ROLE",
//                   jsonPath: "user.roles",
//                   additionalCustomization: true,
//                 },
//               ],
//               enableGlobalSearch: false,
//               enableColumnSort: true,
//               resultsJsonPath: "Employees",
//               // tableClassName: "table pqm-table",
//               // rowClassName: "table-row-mdms table-row-mdms-hover",
//             },
//             children: {},
//             show: true,
//           },
//           links: {
//             uiConfig: {
//               links: [
//                 {
//                   text: "BULK_UPLOAD_USERS",
//                   url: "/employee/microplan/upload-user",
//                   roles: ["MICROPLAN_ADMIN"],
//                 },
//                 {
//                   text: "DOWNLOAD_USER_DATA",
//                   url: "/employee/microplan/user-download",
//                   roles: ["MICROPLAN_ADMIN"],
//                 },
//               ],
//               label: "LIVE_CAMPAIGNS",
//               logoIcon: {
//                 component: "Population",
//                 customClass: "inbox-links-icon",
//               },
//             },
//             children: {},
//             show: true,
//           },
//           filter: {
//             uiConfig: {
//               // headerLabel: "ROLES",
//               secondaryLabel: "ES_COMMON_CLEAR_FILTER",
//               formClassName: "filter",
//               type: "filter",
//               typeMobile: "sort",
//               headerStyle: null,
//               primaryLabel: "ES_COMMON_FILTER",
//               minReqFields: 0,
//               defaultValues: {
//                 roleschosen: "",
//               },
//               fields: [],
//             },
//             show: true,
//           },
//         },
//         additionalSections: {},
//         persistFormData: true,
//       },
//     ],
//   };
// };

// export default CampaignsInboxConfig;
// const searchDeathConfig = () => {
//   return {
//     label: "DEATH_SEARCH_APPLICATIONS",
//     type: "search",
//     apiDetails: {
//       serviceName: "/birth-death-services/death/_search",
//       requestBody: {},
//       requestParam:{},
//       minParametersForSearchForm: 1,
//       masterName: "commonUiConfig",
//       moduleName: "SearchDeathConfig",
//       tableFormJsonPath: "requestBody",
//       filterFormJsonPath: "requestBody",
//       searchFormJsonPath: "requestBody",
//       responseJsonPath: "deathCerts",
//     },
//     sections: {
//       search: {
//         uiConfig: {
//           headerStyle: null,
//           formClassName: "",
//           primaryLabel: "ES_COMMON_SEARCH",
//           secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
//           minReqFields: 1,
//           defaultValues: {
//             tenantId: Digit.ULBService.getCurrentTenantId(),
//             registrationNo: "",
//             name: "",
//             fromDate: "",
//             toDate: "",
//             gender: "",
//             spouseName: "",
//             placeOfDeath: "",
//             fatherName: "",
//             motherName: ""
//           },
//           fields: [
//             {
//               label: "City",
//               key: "city",
//               type: "dropdown",
//               isMandatory: true,
//               populators: {
//                 name: "city",
//                 type: "dropdown",
//                 options: [
//                   {
//                     code: Digit.ULBService.getCurrentTenantId(),
//                     i18nKey: Digit.ULBService.getCurrentUlb()?.name || "City",
//                   },
//                 ],
//                 defaultValue: Digit.ULBService.getCurrentTenantId(),
//                 optionsKey: "i18nKey",
//                 allowMultiSelect: false,
//               },
//             },
//             {
//               label: "From (Death Date)",
//               key: "fromDateFormatted",
//               type: "date",
//               isMandatory: true,
//               populators: {
//                 name: "fromDateFormatted",
//                 placeholder: "dd-mm-yyyy",
//                 max: "currentDate",
//               },
//               postProcess: {
//                 convertToCustomFormat: (value) => {
//                   if (!value) return "";
//                   const date = new Date(value);
//                   const day = String(date.getDate()).padStart(2, "0");
//                   const month = String(date.getMonth() + 1).padStart(2, "0");
//                   const year = date.getFullYear();
//                   return `${day}-${month}-${year}`;
//                 },
//               },
//             },
//             {
//               label: "To (Death Date)",
//               key: "toDateFormatted",
//               type: "date",
//               isMandatory: true,
//               populators: {
//                 name: "toDateFormatted",
//                 placeholder: "dd-mm-yyyy",
//                 max: "currentDate",
//                 error: "DATE_VALIDATION_MSG",
//               },
//               additionalValidation: {
//                 type: "date",
//                 keys: { start: "fromDateFormatted", end: "toDateFormatted" },
//               },
//               postProcess: {
//                 convertToCustomFormat: (value) => {
//                   if (!value) return "";
//                   const date = new Date(value);
//                   const day = String(date.getDate()).padStart(2, "0");
//                   const month = String(date.getMonth() + 1).padStart(2, "0");
//                   const year = date.getFullYear();
//                   return `${day}-${month}-${year}`;
//                 },
//               },
//             },
//             {
//               label: "Gender",
//               key: "gender",
//               type: "dropdown",
//               isMandatory: false,
//               populators: {
//                 name: "gender",
//                 optionsKey: "code",
//                 mdmsConfig: {
//                   masterName: "GenderType",
//                   moduleName: "common-masters",
//                   localePrefix: "COMMON_GENDER",
//                 },
//               },
//             },
//             {
//               label: "Name of Deceased",
//               key: "nameofdeceased",
//               type: "text",
//               isMandatory: false,
//               populators: { name: "nameofdeceased" },
//             },
//             {
//               label: "Spouse Name",
//               key: "spouseName",
//               type: "text",
//               isMandatory: false,
//               populators: { name: "spouseName" },
//             },
//             {
//               label: "Place of Death",
//               key: "placeofdeath",
//               type: "dropdown",
//               isMandatory: false,
//               populators: {
//                 name: "placeofdeath",
//                 optionsKey: "i18nKey",
//                 allowMultiSelect: false,
//                 mdmsConfig: {
//                   masterName: "hospitalList",
//                   moduleName: "birth-death-service",
//                   localePrefix: "COMMON_HOSPITAL",
//                 },
//               },
//             },
//             {
//               label: "Registration Number",
//               key: "registrationno",
//               type: "text",
//               isMandatory: false,
//               populators: { name: "registrationno" },
//             },
//             {
//               label: "Father's Name",
//               key: "FatherName",
//               type: "text",
//               isMandatory: false,
//               populators: {
//                 name: "FatherName",
//                 validation: { pattern: /^[A-Za-z ]+$/i },
//               },
//             },
//             {
//               label: "Mother's Name",
//               key: "MotherName",
//               type: "text",
//               isMandatory: false,
//               populators: {
//                 name: "MotherName",
//                 validation: { pattern: /^[A-Za-z ]+$/i },
//               },
//             },
//           ],
//         },
//         label: "",
//         children: {},
//         show: true,
//       },
//       searchResult: {
//         uiConfig: {
//           columns: [
//             { label: "Registration No.", jsonPath: "registrationno" },
//             { label: "Name", jsonPath: "fullName" },
//             {
//               label: "Death Date",
//               jsonPath: "dateofdeath",
//               format: "date",
//               additionalCustomization: true,
//             },
//             { label: "Mother's Name", jsonPath: "deathMotherInfo.fullName" },
//             { label: "Father's Name", jsonPath: "deathFatherInfo.fullName" },
//             { label: "Spouse Name", jsonPath: "deathSpouseInfo.fullName" },
//             { label: "Gender", jsonPath: "genderStr" },
//             { label: "View", jsonPath: "view" },
//           ],
//           enableGlobalSearch: false,
//           enableColumnSort: true,
//           resultsJsonPath: "deathCerts",
//         },
//         children: {},
//         show: true,
//       },
//     },
//     additionalSections: {},
//   };
// };

// export default searchDeathConfig;

// const searchDeathConfig = () => {
//   return {
//     label: "DEATH_SEARCH_APPLICATIONS",
//     type: "search",
//     actions: {
//       actionLabel: "DEATH REGISTRATION",
//       actionRoles: ["DEATH_APPLICATION_CREATOR"],
//       actionLink: "death/death-common/create-death",
//     },
//     apiDetails: {
//       serviceName: "/birth-death-services/death/_search",
//       // requestParam: {
//       //   limit: 10,
//       //   offset: 0,
//       // },
//       // minParametersForSearchForm: 1,
//       masterName: "commonUiConfig",
//       moduleName: "searchDeathConfig",
//       // customfn: "getDeathSearchApiDetails",
//       tableFormJsonPath: "requestParam",
//       filterFormJsonPath: "requestParam",
//       searchFormJsonPath: "requestParam",
//     },
//     sections: {
//       search: {
//         uiConfig: {
//           headerStyle: null,
//           formClassName: "custom-both-clear-search",
//           primaryLabel: "ES_COMMON_SEARCH",
//           secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
//           minReqFields: 1,
//           defaultValues: {
//             fromDateFormatted: "",
//             toDateFormatted: "",
//             gender: "",
//             nameofdeceased: "",
//             spouseName: "",
//             placeofdeath: "",
//             registrationno: "",
//             FatherName: "",
//             MotherName: "",
//           },
//           fields: [
//             {
//               label: "City",
//               type: "apidropdown",
//               isMandatory: true,
//               disable: false,
//               populators: {
//                 name: "city",
//                 optionsKey: "name",
//                 allowMultiSelect: false,
//                 masterName: "commonUiConfig",
//                 moduleName: "searchDeathConfig",
//                 customfn: "getCityOptions",
//                 // mdmsConfig:{
//                 //   masterName: "StateInfo",
//                 //   moduleName: "common-masters",
//                 //   localePrefix: "COMMON_CITY",
//                 // }
//               },
//             },
//             {
//               label: "TL_APPLICATION_FROM_DATE",
//               type: "date",
//               isMandatory: false,
//               disable: false,
//               key: "fromDate",
//               populators: {
//                 name: "fromDate",
//                 max: "currentDate",
//               },
//             },
//             {
//               label: "TL_APPLICATION_TO_DATE",
//               type: "date",
//               isMandatory: false,
//               disable: false,
//               key: "toDate",
//               populators: {
//                 name: "toDate",
//                 error: "DATE_VALIDATION_MSG",
//                 max: "currentDate",
//               },
//               additionalValidation: {
//                 type: "date",
//                 keys: {
//                   start: "fromDate",
//                   end: "toDate",
//                 },
//               },
//             },
//             {
//               label: "Gender",
//               type: "dropdown",
//               isMandatory: false,
//               disable: false,
//               key: "gender",
//               populators: {
//                 name: "gender",
//                 optionsKey: "name",
//                 mdmsConfig: {
//                   masterName: "GenderType",
//                   moduleName: "common-masters",
//                   localePrefix: "COMMON_GENDER",
//                 }
//               },
//             },
//             {
//               label: "Name of Deceased",
//               type: "text",
//               isMandatory: false,
//               disable: false,
//               populators: {
//                 name: "nameofdeceased",
//               },
//             },
//             {
//               label: "Spouse Name",
//               type: "text",
//               isMandatory: false,
//               disable: false,
//               populators: {
//                 name: "spouseName",
//               },
//             },
//             {
//               label: "Place of Death",
//               type: "apidropdown",
//               isMandatory: false,
//               disable: false,
//               populators: {
//                 name: "placeofdeath",
//                 optionsKey: "i18nKey",
//                 masterName: "commonUiConfig",
//                 moduleName: "searchDeathConfig",
//                 customfn: "getPlaceOfDeathList",
//                 // mdmsConfig:{
//                 //   masterName: "hospitalList",
//                 //   moduleName: "birth-death-service",
//                 //   localePrefix: "COMMON_HOSPITAL",
//                 // }
//               },
//             },
//             {
//               label: "Registration Number",
//               type: "text",
//               isMandatory: false,
//               disable: false,
//               populators: {
//                 name: "registrationno",
//               },
//             },
//             {
//               label: "Father's Name",
//               type: "text",
//               isMandatory: false,
//               disable: false,
//               populators: {
//                 name: "FatherName",
//                 validation: {
//                   pattern: /^[A-Za-z ]+$/i,
//                 },
//               },
//             },
//             {
//               label: "Mother's Name",
//               type: "text",
//               isMandatory: false,
//               disable: false,
//               populators: {
//                 name: "MotherName",
//                 validation: {
//                   pattern: /^[A-Za-z ]+$/i,
//                 },
//               },
//             },
//           ],
//         },
//         label: "",
//         children: {},
//         show: true,
//       },
//       searchResult: {
//         uiConfig: {
//           columns: [
//             {
//               key: "registrationno",
//               label: "Registration No.",
//               jsonPath: "registrationno",
//               additionalCustomization: true,
//             },
//             {
//               key: "fullName",
//               label: "Name",
//               jsonPath: "fullName",
//             },
//             {
//               key: "dateofdeath",
//               label: "Death Date",
//               jsonPath: "dateofdeath",
//               additionalCustomization: true,
//             },
//             {
//               key: "deathMotherInfo.fullName",
//               label: "Mother's Name",
//               jsonPath: "deathMotherInfo.fullName",
//             },
//             {
//               key: "deathFatherInfo.fullName",
//               label: "Father's Name",
//               jsonPath: "deathFatherInfo.fullName",
//             },
//             {
//               key: "deathSpouseInfo.fullName",
//               label: "Spouse Name",
//               jsonPath: "deathSpouseInfo.fullName",
//             },
//             {
//               key: "genderStr",
//               label: "Gender",
//               jsonPath: "genderStr",
//             },
//           ],
//           enableGlobalSearch: false,
//           enableColumnSort: true,
//           resultsJsonPath: "deathCerts",
//         },
//         children: {},
//         show: true,
//       },
//     },
//     additionalSections: {},
//   };
// };

// export default searchDeathConfig;
