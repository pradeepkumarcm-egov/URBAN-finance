export const MdmsService = {
  getDataByCriteria: async (tenantId, moduleCode, type, filter = {}) => {
    const mdms_context_path = "egov-mdms-service";
    const res = await Digit.CustomService.getResponse({
      url: `/${mdms_context_path}/v1/_search`,
      params: { tenantId },
      body: {
        MdmsCriteria: {
          tenantId,
          moduleDetails: [
            {
              moduleName: moduleCode,
              masterDetails: [
                {
                  name: type,
                  filter: filter.masterDetailsFilter,
                },
              ],
            },
          ],
        },
      },
    });
    return res?.MdmsRes;
  },

  getTLDocumentRequiredScreen: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, moduleCode, "Documents");
  },

  getTLStructureType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, "common-masters", "StructureType");
  },

  getTradeUnitsData: (tenantId, moduleCode, type, filter) => {
    return MdmsService.getDataByCriteria(tenantId, moduleCode, "TradeType", { masterDetailsFilter: filter });
  },

  GetTradeOwnerShipCategory: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, "common-masters", "OwnerShipCategory");
  },

  getTLAccessoriesType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, moduleCode, "AccessoriesCategory");
  },

  getTLFinancialYear: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, "egf-master", "FinancialYear", { masterDetailsFilter: `[?(@.module == "TL")]` });
  },

  getMultipleTypes: (tenantId, moduleCode, types) => {
    return MdmsService.getDataByCriteria(tenantId, moduleCode, types);
  },
  // TLGenderType: (tenantId, moduleCode, type) => {
  //   return MdmsService.getDataByCriteria(tenantId, getGenderTypeList(tenantId, moduleCode, type), moduleCode);
  // },
};

const getGenderTypeList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "GenderType",
          },
        ],
      },
    ],
  },
});
