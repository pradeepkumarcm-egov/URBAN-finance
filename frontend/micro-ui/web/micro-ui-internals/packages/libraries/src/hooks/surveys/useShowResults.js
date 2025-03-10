import { Surveys } from "../../services/elements/Surveys";
import { useMutation } from "react-query";

const useShowResults = (filters, config) => {
  const params = { tenantId: Digit.ULBService.getCurrentTenantId() };
  return useMutation((filters) => Surveys.showResults(filters, params));
};

export default useShowResults;
