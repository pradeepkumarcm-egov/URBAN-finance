
// import {React, useState, useCallback } from "react";


// const usePreFetchPayData = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

  
//   const downloadMutation = Digit.Hooks.useCustomAPIMutationHook({
//     url: "/birth-death-services/death/_download",
   
//   });

//   const fetchBillMutation = Digit.Hooks.useCustomAPIMutationHook({
//     url: "/billing-service/bill/v2/_fetchbill",
   
//   });

//   const fetchData = useCallback(async (tenantId, certificateId) => {
//     setIsLoading(true);
//     setError(null);

//     try {
     
//       const downloadResponse = await new Promise((resolve, reject) => {
//         downloadMutation.mutate(
//           {
            
//             params: {
//               tenantId: tenantId,
//               id: certificateId,
//               source: "web",
//             },
//             body: {}, 
//           },
//           {
//             onSuccess: (response) => resolve(response),
//             onError: (err) => {
//               console.error("Download API Error:", err);
//               const errorMessage = err?.response?.data?.Errors?.[0]?.message || "Failed to fetch consumer code.";
//               reject(new Error(errorMessage));
//             },
//           }
//         );
//       });

//       const consumerCode = downloadResponse?.consumerCode;
     
//       const apiTenantId = downloadResponse?.tenantId || tenantId;

//       if (!consumerCode) {
//         throw new Error("Consumer code not found in download response.");
//       }

     
//       const billApiResponse = await new Promise((resolve, reject) => {
//         fetchBillMutation.mutate(
//           {
           
//             params: {
//               tenantId: apiTenantId,
//               consumerCode: consumerCode,
//               businessService: "DEATH_CERT",
//             },
//             body: {}, 
//           },
//           {
//             onSuccess: (response) => resolve(response),
//             onError: (err) => {
//               console.error("Fetch Bill API Error:", err);
//               const errorMessage = err?.response?.data?.Errors?.[0]?.message || "Failed to fetch bill details.";
//               reject(new Error(errorMessage));
//             },
//           }
//         );
//       });

//       const billDetailsArray = billApiResponse?.Bill; 
//       let extractedBusinessService = null;

//       if (billDetailsArray && billDetailsArray.length > 0) {
        
//         extractedBusinessService = billDetailsArray[0]?.businessService;
//         if(!extractedBusinessService) {
//             console.warn("BusinessService field not found in the first bill item of the response:", billDetailsArray[0]);
//         }
//       } else {
//         console.warn("No bill details (Bill array) found in fetch bill response or it is empty. Business service cannot be extracted.");
        
//       }

//       setIsLoading(false);
//       return {
//         consumerCode: consumerCode,
//         billDetails: billDetailsArray,    
//         businessService: extractedBusinessService, 
//       };

//     } catch (err) {
      
//       console.error("Error in usePreFetchPayData fetchData execution:", err);
//       setError(err.message || "An unexpected error occurred while pre-fetching data.");
//       setIsLoading(false);
//       return null; 
//     }
//   }, [downloadMutation, fetchBillMutation]); 

//   return { fetchData, isLoading, error };
// };



// export default usePreFetchPayData;




import { useState, useEffect, useCallback } from "react";


const usePreFetchPayData = ({
  id,
  tenantId,
  initialConsumerCode,
  businessService = "DEATH_CERT", // Default business service
  onConsumerCodeFetched, // Callback for when consumerCode is fetched
}) => {
  const [consumerCode, setConsumerCode] = useState(initialConsumerCode || null);
  const [billDetails, setBillDetails] = useState(null);
  const [isFetchingConsumerCode, setIsFetchingConsumerCode] = useState(false);
  const [fetchConsumerCodeError, setFetchConsumerCodeError] = useState(null);
  const [isFetchingBill, setIsFetchingBill] = useState(false);
  const [fetchBillError, setFetchBillError] = useState(null);

  // Mutation hook for downloading (which gets consumerCode)
  const downloadMutation = Digit.Hooks.useCustomAPIMutationHook({
    // The hook itself doesn't need the full request,
    // mutate will take it.
  });

  // Mutation hook for fetching the bill
  const fetchBillMutation = Digit.Hooks.useCustomAPIMutationHook({
    // Same here
  });

  const triggerDownloadAndGetConsumerCode = useCallback(async () => {
    if (!id || !tenantId) {
      console.warn("Cannot fetch consumer code: id or tenantId missing.");
      return;
    }
    setIsFetchingConsumerCode(true);
    setFetchConsumerCodeError(null);
    try {
      const response = await downloadMutation.mutateAsync( // Use mutateAsync for promise
        {
          url: "/birth-death-services/death/_download",
          params: {
            tenantId: tenantId,
            id: id,
            source: "web",
          },
          body: {},
        }
      );
      const code = response?.consumerCode;
      if (code) {
        setConsumerCode(code);
        if (onConsumerCodeFetched) {
          onConsumerCodeFetched(code); // Call the callback
        }
      } else {
        throw new Error("Consumer code not found in response");
      }
    } catch (error) {
      console.error("API Error (Download/Get Consumer Code):", error);
      setFetchConsumerCodeError(error);
    } finally {
      setIsFetchingConsumerCode(false);
    }
  }, [id, tenantId, downloadMutation, onConsumerCodeFetched]);

  const triggerFetchBill = useCallback(async (currentConsumerCode) => {
    if (!currentConsumerCode || !tenantId) {
      console.warn("Cannot fetch bill: consumerCode or tenantId missing.");
      return;
    }
    setIsFetchingBill(true);
    setFetchBillError(null);
    try {
      const response = await fetchBillMutation.mutateAsync( // Use mutateAsync
        {
          url: "/billing-service/bill/v2/_fetchbill",
          params: {
            tenantId: tenantId,
            consumerCode: currentConsumerCode,
            businessService: businessService,
          },
          body: {},
        }
      );
      setBillDetails(response);
    } catch (error) {
      console.error("Fetch Bill API Error:", error);
      setFetchBillError(error);
    } finally {
      setIsFetchingBill(false);
    }
  }, [tenantId, businessService, fetchBillMutation]);

  // Effect to fetch consumer code if not available
  useEffect(() => {
    if (!consumerCode && id && tenantId && !initialConsumerCode) {
      triggerDownloadAndGetConsumerCode();
    }
  }, [id, tenantId, consumerCode, initialConsumerCode, triggerDownloadAndGetConsumerCode]);

  // Effect to fetch bill details when consumerCode is available or changes
  useEffect(() => {
    if (consumerCode) {
      triggerFetchBill(consumerCode);
    } else {
      setBillDetails(null); // Clear bill details if consumer code is not present
    }
  }, [consumerCode, triggerFetchBill]);

  return {
    consumerCode,
    billDetails,
    isLoadingConsumerCode: isFetchingConsumerCode || downloadMutation.isLoading,
    consumerCodeError: fetchConsumerCodeError || downloadMutation.error,
    isLoadingBill: isFetchingBill || fetchBillMutation.isLoading,
    billError: fetchBillError || fetchBillMutation.error,
    refetchConsumerCode: triggerDownloadAndGetConsumerCode, // Expose for manual refetch
    refetchBill: () => consumerCode && triggerFetchBill(consumerCode), // Expose for manual refetch
  };
};

export default usePreFetchPayData;