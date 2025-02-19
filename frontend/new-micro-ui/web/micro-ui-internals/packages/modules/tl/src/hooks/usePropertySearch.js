import { useQuery, useQueryClient } from "react-query";
import { Digit } from "@egovernments/digit-ui-libraries";

const usePropertySearch = ({ tenantId, filters, auth, searchedFrom = "" }, config = {}) => {
  const client = useQueryClient();

  const defaultSelect = (data) => {
    if (data.Properties.length > 0) data.Properties[0].units = data.Properties[0].units || [];
    if (data.Properties.length > 0) data.Properties[0].units = data.Properties[0].units.filter((unit) => unit.active);
    if (data.Properties.length > 0) data.Properties[0].owners = data.Properties[0].owners || [];
    if (searchedFrom == "myPropertyCitizen") {
      data.Properties.map((property) => {
        property.owners = property.owners.filter((owner) => owner.status === (property.creationReason == "MUTATION" ? "INACTIVE" : "ACTIVE"));
      });
    }
    return data;
  };

  const { isLoading, error, data, isSuccess } = useQuery(
    ["propertySearchList", tenantId, filters, auth, config],
    () =>
      Digit.CustomService.getResponse({
        url: `/property-services/property/_search`,
        method: "POST",
        params: { tenantId, ...filters },
        auth: auth === false ? auth : true,
        useCache: false,
        userService: auth === false ? auth : true,
      }),
    {
      select: defaultSelect,
      ...config,
    }
  );

  return {
    isLoading,
    error,
    data,
    isSuccess,
    revalidate: () => client.invalidateQueries(["propertySearchList", tenantId, filters, auth]),
  };
};

export default usePropertySearch;
