


export const inboxConfig = () => {
  const id = Digit.ULBService.getCurrentTenantId();
  return {
    label: "Search Registry",
    type: "search",
    apiDetails: {
      serviceName: "/birth-death-services/birth/_search",
      requestParam: {},
      requestBody:{},
      minParametersForSearchForm: 1,
      masterName: "commonUiConfig",
      moduleName: "searchBirthConfig",
      tableFormJsonPath: "requestParam",
      filterFormJsonPath: "requestParam",
      searchFormJsonPath: "requestParam",
    },
    sections: {
      search: {
        uiConfig: {
          headerStyle: null,
          formClassName: "",
          primaryLabel: "ES_COMMON_SEARCH",
          secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
          minReqFields: 1,
          defaultValues: {
            fromDate: "",
            toDate: "",
            gender: "",
          },
          fields: [
            {
              label: "From",
              type: "date",
              isMandatory: false,
              disable: false,
              key: "fromDate",
              populators: {
                name: "fromDate",
                max: "currentDate",
              },
            },
            {
              label: "To ",
              type: "date",
              isMandatory: false,
              disable: false,
              key: "toDate",
              populators: {
                name: "toDate",
                error: "DATE_VALIDATION_MSG",
                max: "currentDate",
              },
              // additionalValidation: {
              //   type: "date",
              //   keys: {
              //     start: "fromDate",
              //     end: "toDate",
              //   },
              // },
            },
            {
              isMandatory: true,
              type: "dropdown",
              key: "gender",
              label: "Gender",
              disable: false,
              populators: {
                name: "gender",
                optionsKey: "name",
                error: "gender required !",
                required: true,
                mdmsConfig: {
                  masterName: "GenderType",
                  moduleName: "common-masters",
                  localePrefix: "COMMON_GENDER",
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
              },
            },
            {
              label: "Mother's Name",
              key: "MotherName",
              type: "text",
              isMandatory: false,
              populators: {
                name: "MotherName",
              },
            },
       
          ],
        },
        label: "",
        children: {},
        show: true,
      },
      searchResult: {
        registrationno: "",
        nameofdeceased: "",
        fromDate: "",
        MotherName: "",
        FatherName: "",
        uiConfig: {
          columns: [
            {
              key: "registrationno",
              label: "Registration No.",
              jsonPath: "registrationno",
            },
            {
              key: "fromDate",
              label: "Birth Date",
              jsonPath: "dateofbirth",
              additionalCustomization: true,
            },
            {
              key: "MotherName",
              label: "Mother's Name",
              jsonPath: "birthMotherInfo.fullName",
            },
            {
              key: "FatherName",
              label: "Father's Name",
              jsonPath: "birthFatherInfo.fullName",
            },
          
            {
              key: "view",
              label: "view",
              jsonPath: "",
              additionalCustomization: true,
            },
          ],
          enableGlobalSearch: false,
          enableColumnSort: true,
          resultsJsonPath: "birthCerts",
        },
        children: {},
        show: true,
      },
    },
    additionalSections: {},
  };
};





















export default inboxConfig;
