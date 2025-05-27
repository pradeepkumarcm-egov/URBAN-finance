
import { useState, useEffect } from 'react';

export const usePdfDownloader = (certificateId) => {
  const [filestoreIdToFetch, setFilestoreIdToFetch] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false); 
  const [downloadError, setDownloadError] = useState(null);

  // Mutation to get filestoreId
  const downloadIdMutation = Digit.Hooks.useCustomAPIMutationHook({
    url: "/birth-death-services/death/_download", 
  });

  // Hook to get actual file URL
  const {
    data: fileStoreLinkData,
    isLoading: isFileLinkLoading,
    isFetching: isFileLinkFetching,
    error: fileStoreLinkError,
    
  } = Digit.Hooks.useCustomAPIHook({
    url: "/filestore/v1/files/url",
    method: "GET",
    params: {
      tenantId: Digit.ULBService.getStateId(), 
      fileStoreIds: filestoreIdToFetch,
    },
    config: {
      enabled: !!filestoreIdToFetch,
    },
    changeQueryName: `fileUrl_${filestoreIdToFetch || "initial"}_${certificateId}`, 
  });

  // Effect to trigger the actual browser download
  useEffect(() => {
    if (fileStoreLinkError) {
      console.error("Error fetching file link from filestore:", fileStoreLinkError);
      setDownloadError("Error fetching file link.");
      setIsDownloading(false);
      setFilestoreIdToFetch(null);
      return;
    }

    if (fileStoreLinkData?.fileStoreIds && fileStoreLinkData.fileStoreIds.length > 0) {
      const fileData = fileStoreLinkData.fileStoreIds[0];
      const fileUrl = fileData?.url;

      if (fileUrl) {
        console.log("File URL obtained for download:", fileUrl);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.target = '_blank';
        link.download = `death_certificate_${certificateId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadError(null);
      } else {
        console.error("Filestore response did not contain a valid URL:", fileData);
        setDownloadError("Could not retrieve download link.");
      }
      setIsDownloading(false);
      setFilestoreIdToFetch(null); // Reset for next download
    } else if (fileStoreLinkData && filestoreIdToFetch && !isFileLinkLoading && !isFileLinkFetching) {
      // This condition means we got a response, but it wasn't what we expected
      console.error("Filestore API response is not in the expected format or empty:", fileStoreLinkData);
      setDownloadError("Invalid download response.");
      setIsDownloading(false);
      setFilestoreIdToFetch(null);
    }
  }, [fileStoreLinkData, certificateId, filestoreIdToFetch, fileStoreLinkError, isFileLinkLoading, isFileLinkFetching]);


  // Function to initiate the download process
  const initiateDownload = (currentTenantId, certId) => { // Pass tenantId and certId at the time of call
    if (!certId || !currentTenantId) {
      console.error("Cannot download PDF: Certificate ID or Tenant ID is missing.");
      setDownloadError("Missing required information for download.");
      return;
    }

    setIsDownloading(true);
    setDownloadError(null);
    setFilestoreIdToFetch(null); // Clear previous before new attempt

    console.log(`Initiating download for certificate: ${certId} with tenant: ${currentTenantId}`);
    downloadIdMutation.mutate(
      {
        params: {
          tenantId: currentTenantId,
          id: certId,
          source: "web", // Or make this a parameter
        },
      },
      {
        onSuccess: (response) => {
          console.log("Filestore ID mutation successful:", response);
          if (!response?.filestoreId) {
            console.error("No filestoreId received");
            setDownloadError("Failed to get download reference.");
            setIsDownloading(false);
            return;
          }
          setFilestoreIdToFetch(response.filestoreId);
          // setIsDownloading will be set to false in the useEffect once fileStoreLinkData is processed
        },
        onError: (error) => {
          console.error("Error getting filestore ID:", error);
          setDownloadError("Error preparing download.");
          setIsDownloading(false);
        },
      }
    );
  };

  
  useEffect(() => {
    if (downloadIdMutation.isLoading || (filestoreIdToFetch && (isFileLinkLoading || isFileLinkFetching))) {
      setIsDownloading(true);
    }
   
  }, [downloadIdMutation.isLoading, filestoreIdToFetch, isFileLinkLoading, isFileLinkFetching]);


  return {
    initiateDownload,
    isDownloading, 
    downloadError,
  };
};