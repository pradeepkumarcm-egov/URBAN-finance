const ApplicationUpdateActions = async (applicationData, tenantId) => {
  try {
    const response = await Digit.CustomService.getResponse({
      url: `/tl-services/v1/_update`,
      method: "POST",
      data: applicationData,
      params: {},
      auth: true,
      useCache: false,
      setTimeParam: false,
      userService: true,
    });
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.Errors[0].message);
  }
};

export default ApplicationUpdateActions;
