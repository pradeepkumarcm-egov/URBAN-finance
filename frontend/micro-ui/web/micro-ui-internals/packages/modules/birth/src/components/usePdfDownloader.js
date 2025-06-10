import { useState, useEffect, useRef } from 'react';

export const usePdfDownloader = (initialCertificateIdForFilename) => {
  const [filestoreIdToFetch, setFilestoreIdToFetch] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [currentCertificateIdForFilename, setCurrentCertificateIdForFilename] = useState(initialCertificateIdForFilename);

  const downloadAttemptedForId = useRef(null);

  const downloadIdMutation = Digit.Hooks.useCustomAPIMutationHook({
    url: "/birth-death-services/birth/_download",
  });

  const { data: fileStoreLinkData, isLoading: isFileLinkLoading, isFetching: isFileLinkFetching, error: fileStoreLinkError } = Digit.Hooks.useCustomAPIHook({
    url: "/filestore/v1/files/url",
    method: "GET",
    params: {
      tenantId: Digit.ULBService.getStateId(),
      fileStoreIds: filestoreIdToFetch,
    },
    config: {
      enabled: !!filestoreIdToFetch,
    },
    changeQueryName: `fileUrl_${filestoreIdToFetch ? filestoreIdToFetch : "new"}_${currentCertificateIdForFilename ? currentCertificateIdForFilename : "download"}`,
  });

  useEffect(() => {
    let fileData = null;
    if (fileStoreLinkData && fileStoreLinkData.fileStoreIds && fileStoreLinkData.fileStoreIds.length > 0) {
      fileData = fileStoreLinkData.fileStoreIds[0];
    }

    const fileUrl = fileData && fileData.url;

    if (fileUrl && currentCertificateIdForFilename && filestoreIdToFetch && downloadAttemptedForId.current !== filestoreIdToFetch) {
      downloadAttemptedForId.current = filestoreIdToFetch;

      const link = document.createElement('a');
      Object.assign(link, {
        href: fileUrl,
        target: '_blank',
        download: `birth_certificate_${currentCertificateIdForFilename}.pdf`,
      });

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadError(null);
      setIsDownloading(false);
      setFilestoreIdToFetch(null);
    } else if (fileStoreLinkError && filestoreIdToFetch) {
      console.error("Download error:", fileStoreLinkError);
      setDownloadError("Error fetching file link.");
      setIsDownloading(false);
      setFilestoreIdToFetch(null);
      downloadAttemptedForId.current = null;
    }
  }, [fileStoreLinkData, currentCertificateIdForFilename, filestoreIdToFetch, fileStoreLinkError]);

  const initiateDownload = (tenantId, certificateId, directFileStoreId = null) => {
    console.log("Initiate download:", { tenantId, certificateId, directFileStoreId });

    setCurrentCertificateIdForFilename(certificateId);
    setDownloadError(null);
    setIsDownloading(true);
    downloadAttemptedForId.current = null;

    if (directFileStoreId) {
      setFilestoreIdToFetch(null);
      setTimeout(() => setFilestoreIdToFetch(directFileStoreId), 0);
      return;
    }

    if (!certificateId || !tenantId) {
      setDownloadError("Missing info for 2-step download.");
      setIsDownloading(false);
      return;
    }

    setFilestoreIdToFetch(null);

    downloadIdMutation.mutate(
      { params: { tenantId, id: certificateId, source: "web" } },
      {
        onSuccess: ({ filestoreId }) => {
          if (!filestoreId) {
            setDownloadError("Failed to get download reference.");
            setIsDownloading(false);
            return;
          }
          setFilestoreIdToFetch(filestoreId);
        },
        onError: () => {
          setDownloadError("Error in mutation step.");
          setIsDownloading(false);
        },
      }
    );
  };

  useEffect(() => {
    const mutationLoading = downloadIdMutation.isLoading;
    if (mutationLoading || (filestoreIdToFetch && (isFileLinkLoading || isFileLinkFetching))) {
      if (!isDownloading) setIsDownloading(true);
    }
  }, [downloadIdMutation.isLoading, filestoreIdToFetch, isFileLinkLoading, isFileLinkFetching, isDownloading]);

  return {
    initiateDownload,
    isDownloading,
    downloadError,
  };
};
