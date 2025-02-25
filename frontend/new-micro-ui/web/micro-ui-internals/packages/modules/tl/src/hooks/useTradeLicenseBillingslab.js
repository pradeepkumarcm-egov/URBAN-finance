import { useQuery, useQueryClient } from "react-query";

const useTradeLicenseBillingslab = ({ tenantId, filters, auth }, config = {}) => {
  const client = useQueryClient();
  const queryKey = ["TLbillingSlabSearch", tenantId, filters];

  const { isLoading, error, data } = useQuery(
    queryKey,
    () =>
      Digit.CustomService.getResponse({
        url: `/tl-calculator/billingslab/_search`,
        method: "POST",
        params: { tenantId },
        auth: true,
      }),
    config
  );

  return {
    isLoading,
    error,
    data,
    revalidate: () => client.invalidateQueries(queryKey),
  };
};

export default useTradeLicenseBillingslab;
