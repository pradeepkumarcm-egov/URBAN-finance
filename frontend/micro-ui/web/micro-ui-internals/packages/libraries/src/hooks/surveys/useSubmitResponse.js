import { Surveys } from "../../services/elements/Surveys";
import { useMutation } from "react-query";

const useSubmitResponse = (filters, config) => {
  const params = { tenantId: Digit.ULBService.getCurrentTenantId() };
  return useMutation((filters) => Surveys.submitResponse(filters, params));
};

export default useSubmitResponse;
