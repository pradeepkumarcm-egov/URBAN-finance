export const searchTLInboxData = async ({ tenantId, filters, USER_UUID }) => {
  const { applicationStatus, mobileNumber, applicationNumber, sortBy, sortOrder, locality, uuid, limit, offset } = filters;

  const _filters = {
    tenantId,
    processSearchCriteria: {
      moduleName: "tl-services",
      businessService: ["NewTL", "DIRECTRENEWAL", "EDITRENEWAL"],
      ...(applicationStatus?.length > 0 ? { status: applicationStatus } : {}),
      ...(uuid && Object.keys(uuid).length > 0 ? { assignee: uuid.code === "ASSIGNED_TO_ME" ? USER_UUID : "" } : {}),
    },
    moduleSearchCriteria: {
      ...(mobileNumber ? { mobileNumber } : {}),
      ...(applicationNumber ? { applicationNumber } : {}),
      ...(sortBy ? { sortBy } : {}),
      ...(sortOrder ? { sortOrder } : {}),
      ...(locality?.length > 0 ? { locality: locality?.map((item) => item.code.split("_").pop()).join(",") } : {}),
    },
    limit,
    offset,
  };

  const response = await Digit.CustomService.getResponse({
    url: "/inbox/v2/_search",
    method: "POST",
    auth: true,
    userService: true,
    body: { inbox: { ..._filters } },
  });

  return {
    statuses: response.statusMap,
    table: response?.items?.map((application) => ({
      applicationId: application.businessObject.applicationNumber,
      date: application.businessObject.applicationDate,
      businessService: application?.ProcessInstance?.businessService,
      locality: `${application.businessObject?.tenantId
        ?.toUpperCase()
        ?.split(".")
        ?.join("_")}_REVENUE_${application.businessObject?.tradeLicenseDetail?.address?.locality?.code?.toUpperCase()}`,
      status: application.businessObject.status,
      owner: application.ProcessInstance?.assigner?.name,
      sla: application?.businessObject?.status?.match(/^(EXPIRED|APPROVED|CANCELLED)$/)
        ? "CS_NA"
        : Math.round(application.ProcessInstance?.businesssServiceSla / (24 * 60 * 60 * 1000)),
    })),
    totalCount: response.totalCount,
    nearingSlaCount: response?.nearingSlaCount,
  };
};
