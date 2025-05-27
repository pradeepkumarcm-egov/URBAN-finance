
import {React, useState, useCallback } from "react";


const usePreFetchPayData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const downloadMutation = Digit.Hooks.useCustomAPIMutationHook({
    url: "/birth-death-services/death/_download",
   
  });

  const fetchBillMutation = Digit.Hooks.useCustomAPIMutationHook({
    url: "/billing-service/bill/v2/_fetchbill",
   
  });

  const fetchData = useCallback(async (tenantId, certificateId) => {
    setIsLoading(true);
    setError(null);

    try {
     
      const downloadResponse = await new Promise((resolve, reject) => {
        downloadMutation.mutate(
          {
            
            params: {
              tenantId: tenantId,
              id: certificateId,
              source: "web",
            },
            body: {}, 
          },
          {
            onSuccess: (response) => resolve(response),
            onError: (err) => {
              console.error("Download API Error:", err);
              const errorMessage = err?.response?.data?.Errors?.[0]?.message || "Failed to fetch consumer code.";
              reject(new Error(errorMessage));
            },
          }
        );
      });

      const consumerCode = downloadResponse?.consumerCode;
     
      const apiTenantId = downloadResponse?.tenantId || tenantId;

      if (!consumerCode) {
        throw new Error("Consumer code not found in download response.");
      }

     
      const billApiResponse = await new Promise((resolve, reject) => {
        fetchBillMutation.mutate(
          {
           
            params: {
              tenantId: apiTenantId,
              consumerCode: consumerCode,
              businessService: "DEATH_CERT",
            },
            body: {}, 
          },
          {
            onSuccess: (response) => resolve(response),
            onError: (err) => {
              console.error("Fetch Bill API Error:", err);
              const errorMessage = err?.response?.data?.Errors?.[0]?.message || "Failed to fetch bill details.";
              reject(new Error(errorMessage));
            },
          }
        );
      });

      const billDetailsArray = billApiResponse?.Bill; 
      let extractedBusinessService = null;

      if (billDetailsArray && billDetailsArray.length > 0) {
        
        extractedBusinessService = billDetailsArray[0]?.businessService;
        if(!extractedBusinessService) {
            console.warn("BusinessService field not found in the first bill item of the response:", billDetailsArray[0]);
        }
      } else {
        console.warn("No bill details (Bill array) found in fetch bill response or it is empty. Business service cannot be extracted.");
        
      }

      setIsLoading(false);
      return {
        consumerCode: consumerCode,
        billDetails: billDetailsArray,    
        businessService: extractedBusinessService, 
      };

    } catch (err) {
      
      console.error("Error in usePreFetchPayData fetchData execution:", err);
      setError(err.message || "An unexpected error occurred while pre-fetching data.");
      setIsLoading(false);
      return null; 
    }
  }, [downloadMutation, fetchBillMutation]); 

  return { fetchData, isLoading, error };
};



export default usePreFetchPayData;