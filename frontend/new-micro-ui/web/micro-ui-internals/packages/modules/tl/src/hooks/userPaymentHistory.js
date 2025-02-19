import { useQuery } from "react-query";

const useTLPaymentHistory = (tenantId, id, config = {}) => {
  return useQuery(
    ["PAYMENT_HISTORY", id],
    () =>
      Digit.CustomService.getResponse({
        url: `/collection-services/payments/_search`,
        method: "POST",
        params: { tenantId, consumerCodes: id },
        auth: true,
        useCache: false,
        userService: true,
      }),
    { ...config }
  );
};

export default useTLPaymentHistory;
