export const createConfig = (TradeLicenseData, applicationNumber, tenantId) => {
  if (!TradeLicenseData || !Array.isArray(TradeLicenseData)) {
    return {
      cards: [],
      apiResponse: {},
      additionalDetails: {},
    };
  }

  const config = {
    cards: [
      {
        sections: [
          {
            type: "DATA",
            values: Array.isArray(TradeLicenseData?.find((item) => item.title === "")?.values)
              ? TradeLicenseData?.find((item) => item.title === "")?.values.map((valueItem) => ({
                  key: valueItem?.title || "",
                  value: valueItem?.value || "",
                }))
              : [],
          },
          {
            type: "DATA",
            sectionHeader: { value: "TL_COMMON_TR_DETAILS", inlineStyles: { marginTop: "3rem" } },
            values: Array.isArray(TradeLicenseData?.find((item) => item.title === "TL_COMMON_TR_DETAILS")?.values)
              ? TradeLicenseData?.find((item) => item.title === "TL_COMMON_TR_DETAILS")?.values.map((valueItem) => ({
                  key: valueItem?.title || "",
                  value: valueItem?.value || "",
                }))
              : [],
          },
          {
            type: "DATA",
            sectionHeader: { value: "TL_TRADE_UNITS_HEADER", inlineStyles: { marginTop: "3rem" } },
            values:
              TradeLicenseData?.find((item) => item.title === "TL_TRADE_UNITS_HEADER")?.additionalDetails?.units?.flatMap((unit) =>
                Array.isArray(unit.values)
                  ? unit.values.map((valueItem) => ({
                      key: valueItem?.title || "",
                      value: valueItem?.value || "",
                    }))
                  : []
              ) || [],
          },

          {
            type: "DATA",
            sectionHeader: { value: "TL_NEW_TRADE_DETAILS_HEADER_ACC", inlineStyles: { marginTop: "3rem" } },
            values:
              TradeLicenseData?.find((item) => item.title === "TL_NEW_TRADE_DETAILS_HEADER_ACC")?.additionalDetails?.accessories?.flatMap(
                (accessory) =>
                  Array.isArray(accessory.values)
                    ? accessory.values.map((valueItem) => ({
                        key: valueItem?.title || "",
                        value: valueItem?.value || "",
                      }))
                    : []
              ) || [],
          },

          {
            type: "DATA",
            sectionHeader: { value: "TL_CHECK_ADDRESS", inlineStyles: { marginTop: "3rem" } },
            values: Array.isArray(TradeLicenseData?.find((item) => item.title === "TL_CHECK_ADDRESS")?.values)
              ? TradeLicenseData?.find((item) => item.title === "TL_CHECK_ADDRESS")?.values.map((valueItem) => ({
                  key: valueItem?.title || "",
                  value: valueItem?.value || "",
                }))
              : [],
          },
          {
            type: "DATA",
            sectionHeader: { value: "ES_NEW_APPLICATION_OWNERSHIP_DETAILS", inlineStyles: { marginTop: "3rem" } },
            values:
              TradeLicenseData?.find((item) => item.title === "ES_NEW_APPLICATION_OWNERSHIP_DETAILS")?.additionalDetails?.owners?.flatMap((owner) =>
                Array.isArray(owner.values)
                  ? owner.values.map((valueItem) => ({
                      key: valueItem?.title || "",
                      value: valueItem?.value || "",
                    }))
                  : []
              ) || [],
          },

          {
            type: "WFHISTORY",
            businessService: "TL",
            applicationNo: applicationNumber,
            tenantId: tenantId,
            timelineStatusPrefix: "WF_TL_",
          },
          {
            type: "WFACTIONS",
            forcedActionPrefix: "WF_TL_ACTION",
            businessService: "TL",
            applicationNo: applicationNumber,
            tenantId: tenantId,
            applicationDetails: {},
            url: "/tl-services/v1/_update",
            moduleCode: "TL",
            editApplicationNumber: undefined,
          },
        ],
      },
    ],
    apiResponse: {},
    additionalDetails: TradeLicenseData?.find((item) => item.title === "TL_TRADE_UNITS_HEADER")?.additionalDetails || {},
  };

  return config;
};
