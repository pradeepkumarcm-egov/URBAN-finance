import { useMutation } from "react-query";

const TRADE_LICENSE_URLS = {
  create: "/tl-services/v1/_create",
  update: "/tl-services/v1/_update",
};

const useTradeLicenseAPI = (tenantId, type = true) => {
  const apiUrl = type ? TRADE_LICENSE_URLS.create : TRADE_LICENSE_URLS.update;

  return useMutation((data) =>
    Request({
      url: apiUrl,
      data,
      useCache: false,
      setTimeParam: false,
      userService: true,
      method: "POST",
      params: {},
      auth: true,
    })
  );
};

export default useTradeLicenseAPI;
