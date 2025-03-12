import { CardHeader } from "@egovernments/digit-ui-react-components";
import { Component } from "react";
import { useTranslation } from "react-i18next";

export const createConfig = (TradeLicenseData, applicationNumber, tenantId) => {
  const { t } = useTranslation();

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
                  key: t(valueItem?.title) || "",
                  value: t(valueItem?.value) || "",
                }))
              : [],
          },
          {
            type: "DATA",
            cardHeader: { value: t("TL_COMMON_TR_DETAILS"), inlineStyles: { marginTop: "3rem" } },
            values: Array.isArray(TradeLicenseData?.find((item) => item.title === "TL_COMMON_TR_DETAILS")?.values)
              ? TradeLicenseData?.find((item) => item.title === "TL_COMMON_TR_DETAILS")?.values.map((valueItem) => ({
                  key: t(valueItem?.title) || "",
                  value: t(valueItem?.value) || "",
                }))
              : [],
          },

          ...(TradeLicenseData?.find((item) => item.title === "TL_TRADE_UNITS_HEADER")?.additionalDetails?.units || []).map((unit, index) => ({
            type: "COMPONENT",
            component: "TLViewUnit",
            props: {
              count_prefix: "Unit",
              index: index + 1,
              values: unit.values,
            },
            cardHeader: index === 0 ? { value: t("TL_TRADE_UNITS_HEADER"), inlineStyles: { marginTop: "3rem" } } : undefined,
          })),

          ...(TradeLicenseData?.find((item) => item.title === "TL_NEW_TRADE_DETAILS_HEADER_ACC")?.additionalDetails?.accessories || []).map(
            (accessory, index) => ({
              type: "COMPONENT",
              component: "TLViewUnit",
              props: {
                count_prefix: "Accessory",
                index: index + 1,
                values: accessory.values,
              },
              cardHeader: index === 0 ? { value: t("TL_NEW_TRADE_DETAILS_HEADER_ACC"), inlineStyles: { marginTop: "3rem" } } : undefined,
            })
          ),

          {
            type: "DATA",
            cardHeader: { value: t("TL_CHECK_ADDRESS"), inlineStyles: { marginTop: "3rem" } },
            values: Array.isArray(TradeLicenseData?.find((item) => item.title === "TL_CHECK_ADDRESS")?.values)
              ? TradeLicenseData?.find((item) => item.title === "TL_CHECK_ADDRESS")?.values.map((valueItem) => ({
                  key: t(valueItem?.title) || "",
                  value: t(valueItem?.value) || "",
                }))
              : [],
          },
          ...(TradeLicenseData?.find((item) => item.title === "ES_NEW_APPLICATION_OWNERSHIP_DETAILS")?.additionalDetails?.owners || []).map(
            (owner, index) => ({
              type: "COMPONENT",
              component: "TLViewUnit",
              cardHeader: { value: "ES_NEW_APPLICATION_OWNERSHIP_DETAILS", inlineStyles: {} },
              props: {
                count_prefix: "Owner",
                index: index + 1,
                values: owner.values,
              },
              cardHeader: index === 0 ? { value: t("ES_NEW_APPLICATION_OWNERSHIP_DETAILS"), inlineStyles: { marginTop: "3rem" } } : undefined,
            })
          ),

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
