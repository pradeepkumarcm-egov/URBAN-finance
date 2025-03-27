
export const createConfig = {
  "form": [
    {
      "head": "TL_COMMON_TR_DETAILS",
      "body": [
        {
          isMandatory: true,
          type: "dropdown",
          key: "financialYear",
          label: "TL_FINANCIAL_YEAR_LABEL",
          disable: false,
          populators: {
            name: "financialYear",
            optionsKey: "name",
            error: "",
            required: true,
            mdmsConfig: {
              masterName: "FinancialYear",
              moduleName: "egf-master",
              localePrefix: "FY",
              filter: "[?(@.module == \"TL\")]"
            },
          },
        },  
        {
          isMandatory: true,
          type: "dropdown",
          key: "licenseType",
          label: "TL_NEW_TRADE_DETAILS_LIC_TYPE_LABEL",
          disable: true,
          populators: {
            name: "licenseType",
            optionsKey: "name",
            error: "",
            required: true,
            options: [
              {
                code: "PERMANENT",
                name: "TRADELICENSE_LICENSETYPE_PERMANENT",
              },
            ]
          },
        },
        {
          inline: true,
          label: "TL_COMMON_TABLE_COL_TRD_NAME",
          isMandatory: true,
          type: "text",
          disable: false,
          populators: { name: "tradeName", error: "Error!" },
        },
        {
          isMandatory: true,
          type: "dropdown",
          key: "structureType",
          label: "TL_NEW_TRADE_DETAILS_STRUCT_TYPE_LABEL",
          disable: false,
          preProcess: {
            updateDependent : ["populators.options"]
          },
          populators: {
            name: "structureType",
            optionsKey: "name",
            error: "",
            required: true,
            options: []
          },
        },
        {
          isMandatory: true,
          type: "dropdown",
          key: "structureSubType",
          label: "TL_NEW_TRADE_DETAILS_STRUCT_SUB_TYPE_LABEL",
          disable: false,
          preProcess: {
            updateDependent : ["populators.options"]
          },
          populators: {
            name: "structureSubType",
            optionsKey: "name",
            error: "",
            required: true,
            options: []
          },
        },
        {
          inline: true,
          label: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL",
          isMandatory: true,
          description: "",
          type: "date",
          disable: false,
          populators: { name: "commencementDate", error: "Error!" },
        },
        {
          inline: true,
          label: "TL_NEW_GST_NUMBER_LABEL",
          isMandatory: false,
          type: "text",
          disable: false,
          populators: { name: "gstNo", error: "Error!" },
        },
        {
          inline: true,
          label: "TL_NEW_OPERATIONAL_SQ_FT_AREA_LABEL",
          isMandatory: false,
          type: "text",
          disable: false,
          populators: { name: "operationalArea", error: "Error!" },
        },
        {
          inline: true,
          label: "TL_NEW_NUMBER_OF_EMPLOYEES_LABEL",
          isMandatory: false,
          type: "text",
          disable: false,
          populators: { name: "noOfEmployees", error: "Error!" },
        }
      ]
    },
    {
      head: "TL_TRADE_UNITS_HEADER",
      body: [
        {
          type: "component",
          component: "TLTradeUnitsEmployee",
          key: "tradeUnits",
          withoutLabel: true,
          // hideInCitizen: true,
          "populators": {
            "name": "projectName",
            "error": "PROJECT_PATTERN_ERR_MSG",
            "validation": {
              "pattern": "^[^\\$\"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,50}$",
              "minlength": 2
            }
          }
        }
      ]
    },
    {
      head: "TL_NEW_TRADE_DETAILS_HEADER_ACC",
      body: [
        {
          type: "component",
          component: "TLAccessoriesEmployee",
          key: "accessories",
          withoutLabel: true,
          hideInCitizen: true,
          "populators": {
            "name": "projectName",
            "error": "PROJECT_PATTERN_ERR_MSG",
            "validation": {
              "pattern": "^[^\\$\"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,50}$",
              "minlength": 2
            }
          }
        }
      ]
    },
    // {
    //   head: "MB_NONSOR",
    //   subHead: "",
    //   sectionClassName:"table-included-section",
    //   body: [
    //     {
    //       type: "component",
    //       component: "MeasureTable",
    //       withoutLabel: true,
    //       key: "NONSOR",
    //       mode: "CREATE",
    //       useFieldArray: true,
    //       "populators": {
    //         "name": "projectName",
    //         "error": "PROJECT_PATTERN_ERR_MSG",
    //         "validation": {
    //           "pattern": "^[^\\$\"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,50}$",
    //           "minlength": 2
    //         }
    //       }
    //     },
    //   ],
    // },
    {
      "head": "TL_CHECK_ADDRESS",
      "body": [
        {
          inline: true,
          label: "CORE_COMMON_PINCODE",
          isMandatory: false,
          type: "text",
          disable: false,
          populators: { name: "pincode", error: "Error!" },
        },
        {
          isMandatory: true,
          type: "dropdown",
          key: "city",
          label: "TL_LOCALIZATION_CITY",
          disable: true,
          populators: {
            name: "city",
            optionsKey: "name",
            error: "",
            required: true,
            options: []
          },
        },
        {
          isMandatory: true,
          type: "dropdown",
          key: "locality",
          label: "TL_LOCALIZATION_LOCALITY",
          disable: false,
          preProcess: {
            updateDependent : ["populators.options"]
          },
          populators: {
            name: "locality",
            optionsKey: "name",
            error: "",
            required: true,
            options: []
          },
        },
        {
          inline: true,
          label: "TL_LOCALIZATION_BUILDING_NO",
          isMandatory: false,
          type: "text",
          disable: false,
          populators: { name: "doorNo", error: "Error!" },
        },
        {
          inline: true,
          label: "TL_LOCALIZATION_STREET_NAME",
          isMandatory: false,
          type: "text",
          disable: false,
          populators: { name: "street", error: "Error!" },
        }
      ]
    },
    {
      "head": "TL_OWNERSHIP_DETAILS_HEADER",
      "body": [
        {
          isMandatory: false,
          type: "dropdown",
          key: "ownershipCategory",
          label: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL",
          disable: false,
          preProcess: {
            updateDependent : ["populators.options"]
          },
          populators: {
            name: "ownershipCategory",
            optionsKey: "name",
            error: "",
            required: true,
            options: [],
            // mdmsConfig: {
            //   masterName: "OwnerShipCategory",
            //   moduleName: "common-masters",
            //   localePrefix: "COMMON_MASTERS_OWNERSHIPCATEGORY",
            //   // filter: "[?(@.module == \"TL\")]"
            // },
          },
        }
      ]
    },
    {
        "head": "TL_OWNERSHIP_DETAILS_HEADER",
        // "subHead": "",
        // "navLink": "Ownership Details",
        // "sectionClassName":"",
        "body": [
            {
              type: "component",
              component: "TLOwnerDetailsEmployee",
              key: "owners",
              withoutLabel: true,
              hideInCitizen: true,
              "populators": {
                "name": "projectName",
                "error": "PROJECT_PATTERN_ERR_MSG",
                "validation": {
                  "pattern": "^[^\\$\"<>?\\\\~`!@$%^()+={}\\[\\]*:;“”‘’]{1,50}$",
                  "minlength": 2
                }
              }
            },
        ]
    },
    {
      "head": "",
      "body": [
        {
          type: "documentUpload",
          withoutLabel: true,
          module: "Trade License",
          error: "WORKS_REQUIRED_ERR",
          name: "documents",
          // key: "documentDetails",
          customClass: "",
          localePrefix: "TL",
        },
      ]
    }
  ]
};