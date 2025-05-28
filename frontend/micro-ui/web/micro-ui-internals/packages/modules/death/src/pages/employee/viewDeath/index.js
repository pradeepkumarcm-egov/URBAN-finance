
// import React, { useEffect, useState } from "react";
// import { useLocation, useHistory } from "react-router-dom";
// import { Button, Footer } from "@egovernments/digit-ui-components";
// import { ViewComposer, Loader } from "@egovernments/digit-ui-react-components";
// import viewDeathConfig from "./viewDeathConfig";
// import { useTranslation } from "react-i18next";

// const ViewDeath = () => {
//   const { t } = useTranslation();
//   const location = useLocation();
//   const history = useHistory();
//   const id = location.state?.myData;
//   const Hospitalname = location.state?.myhospitalname;

//   const [filestoreIdToFetch, setFilestoreIdToFetch] = useState(null);
//   const tenantId = Digit.ULBService.getCurrentTenantId();
//   const authToken = window?.Digit?.UserService?.getUser()?.access_token;


//   const {
//     data: certificateViewData,
//     isLoading: isViewDataLoading,
//     error: viewDataError,
//   } = Digit.Hooks.useCustomAPIHook({
//     url: "/birth-death-services/death/_viewfullcertdata",
//     method: "POST",
//     params: { tenantId, id },
//     body: {
//       RequestInfo: {
//         apiId: "Rainmaker",
//         ver: ".01",
//         action: "_viewcertdata",
//         did: "1",
//         key: "",
//         msgId: "20170310130900|en_IN",
//         requesterId: "",
//         authToken,
//       },
//     },
//     headers: { "Content-Type": "application/json" },
//     changeQueryName: `deathCertData_${id}`,
//     config: {
//         enabled: !!id && !!tenantId,
//     }
//   });


//   const downloadMutation = Digit.Hooks.useCustomAPIMutationHook({
//     url: "/birth-death-services/death/_download", 
//   });


 
//   const {
//     data: fileStoreLinkData,
//     isLoading: isFileLinkLoading,
//     isFetching: isFileLinkFetching,
//     error: fileStoreLinkError,
//   } = Digit.Hooks.useCustomAPIHook({
//     url: "/filestore/v1/files/url",
//     method: "GET",
//     params: {
//       tenantId: Digit.ULBService.getStateId(),
//       fileStoreIds: filestoreIdToFetch,
//     },
//     config: {
//       enabled: !!filestoreIdToFetch,
//     },
//     changeQueryName: `fileUrl_${filestoreIdToFetch || "initial"}`,
//   });

//   const [config, setConfig] = useState(null);

//   const handleEditClick = () => {
//     const certs = certificateViewData?.DeathCertificate;
//     if (certs && certs.length > 0) {
//       const certToEdit = { ...certs[0] };
//       certToEdit.hospitalname = Hospitalname;
//       history.push(
//         `/${window.contextPath}/employee/death/death-common/update-death?action=EDIT&certificateId=${id}&module=death`,
//         {
//           editdata: certToEdit,
//           certificateId: id,
//           module: "death",
//         }
//       );
//     } else {
//       console.error("No certificate data found to edit.");
//     }
//   };

//   useEffect(() => {
//     if (certificateViewData?.DeathCertificate && certificateViewData.DeathCertificate.length > 0) {
//       const certs = [...certificateViewData.DeathCertificate];
//       certs[0].hospitalname = Hospitalname;
//       const viewConfig = viewDeathConfig(certs, id, tenantId, t);
//       setConfig(viewConfig);
//     }
//   }, [certificateViewData, Hospitalname, id, tenantId, t]);

//   useEffect(() => {
//     if (fileStoreLinkError) {
//         console.error("Error fetching file link from filestore:", fileStoreLinkError);
//         setFilestoreIdToFetch(null);
//     }

//     if (fileStoreLinkData?.fileStoreIds && fileStoreLinkData.fileStoreIds.length > 0) {
//       const fileData = fileStoreLinkData.fileStoreIds[0];
//       const fileUrl = fileData?.url;

//       if (fileUrl) {
//         console.log("File URL obtained:", fileUrl);
//         const link = document.createElement('a');
//         link.href = fileUrl;
//         link.target = '_blank';
//         link.download = `death_certificate_${id}.pdf`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         setFilestoreIdToFetch(null);
//       } else {
//         console.error("Filestore response did not contain a valid URL:", fileData);
//         setFilestoreIdToFetch(null);
//       }
//     } else if (fileStoreLinkData && filestoreIdToFetch && !isFileLinkLoading) {
//       console.error("Filestore API response is not in the expected format or empty:", fileStoreLinkData);
//       setFilestoreIdToFetch(null);
//     }
//   }, [fileStoreLinkData, id, filestoreIdToFetch, fileStoreLinkError, isFileLinkLoading]);

//   const HandleDownloadPdf = () => {
//     if (!id || !tenantId) {
//         console.error("Cannot download PDF: Certificate ID or Tenant ID is missing.");
//         return;
//     }

//     console.log("HandleDownloadPdf clicked, attempting to mutate...");
//     downloadMutation.mutate(
//       { 
//         params: {
//           tenantId: tenantId,
//           id: id,
//           source: "web",
//         },
//       },
//       { 
//         onSuccess: (downloadResponse) => {
//           console.log("Download mutation successful, response:", downloadResponse);
//           if (!downloadResponse?.filestoreId) {
//             console.error("No filestoreId received from download mutation");
//             return;
//           }
//           setFilestoreIdToFetch(downloadResponse.filestoreId);
//         },
//         onError: (error) => {
//           console.error("Download Mutation API Error:", error);
//         },
//       }
//     );
//   };


//   if (!id && !location.state) {
//     return <div>Error: No certificate ID found. Please go back and select a certificate.</div>;
//   }

//   const isLoading = isViewDataLoading || !config || (filestoreIdToFetch && isFileLinkLoading);

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (viewDataError) {
//     console.error("Error fetching certificate data:", viewDataError);
//     return <div>Error fetching certificate data. Please try again.</div>;
//   }

//   return (
//     <div>
//       {ViewComposer && config ? <ViewComposer data={config} /> : <div>Loading View Composer...</div>}
//       <Footer
//         actionFields={[
//           <Button
//             key="update-btn"
//             icon="Edit"
//             label={t("CORE_COMMON_UPDATE")}
//             onClick={handleEditClick}
//             type="button"
//             variation="secondary"
//           />,
//           <Button
//             key="download-btn"
//             label={t("FREE_DOWNLOAD")}
//             onClick={HandleDownloadPdf}
//             className={"employee-download-btn-className"}
//             variation="secondary"
//             type="button"
//             icon={"FileDownload"}
//             disabled={downloadMutation.isLoading || (!!filestoreIdToFetch && isFileLinkFetching)}
//           />,
//         ]}
//         className=""
//       />
//     </div>
//   );
// };

// export default ViewDeath;








// import React, { useEffect, useState } from "react";
// import { useLocation, useHistory } from "react-router-dom";
// import { Button, Footer } from "@egovernments/digit-ui-components";
// import { ViewComposer, Loader } from "@egovernments/digit-ui-react-components";
// import viewDeathConfig from "./viewDeathConfig";
// import { useTranslation } from "react-i18next";
// import { usePdfDownloader } from "../../../components/usePdfDownloader"; // Adjust path as needed

// const ViewDeath = () => {
//   const { t } = useTranslation();
//   const location = useLocation();
//   const history = useHistory();
//   const id = location.state?.myData; // This is the certificate ID
//   const Hospitalname = location.state?.myhospitalname;

//   const currentLocalTenantId = Digit.ULBService.getCurrentTenantId(); // Get it once
//   const authToken = window?.Digit?.UserService?.getUser()?.access_token;

//   // Use the custom hook for download logic
//   // Pass the certificate ID to the hook if it's stable and known at this level
//   const { initiateDownload, isDownloading, downloadError } = usePdfDownloader(id);


//   const {
//     data: certificateViewData,
//     isLoading: isViewDataLoading,
//     error: viewDataError,
//   } = Digit.Hooks.useCustomAPIHook({
//     url: "/birth-death-services/death/_viewfullcertdata",
//     method: "POST",
//     params: { tenantId: currentLocalTenantId, id }, // Use currentLocalTenantId
//     body: {
//       RequestInfo: { /* ... */ authToken },
//     },
//     headers: { "Content-Type": "application/json" },
//     changeQueryName: `deathCertData_${id}`,
//     config: {
//         enabled: !!id && !!currentLocalTenantId, // Use currentLocalTenantId
//     }
//   });

//   const [config, setConfig] = useState(null);

//   const handleEditClick = () => {
//     // ... (same as before)
//     const certs = certificateViewData?.DeathCertificate;
//     if (certs && certs.length > 0) {
//       const certToEdit = { ...certs[0] };
//       certToEdit.hospitalname = Hospitalname;
//       history.push(
//         `/${window.contextPath}/employee/death/death-common/update-death?action=EDIT&certificateId=${id}&module=death`,
//         {
//           editdata: certToEdit,
//           certificateId: id,
//           module: "death",
//         }
//       );
//     } else {
//       console.error("No certificate data found to edit.");
//     }
//   };

//   useEffect(() => {
    
//     if (certificateViewData?.DeathCertificate && certificateViewData.DeathCertificate.length > 0) {
//       const certs = [...certificateViewData.DeathCertificate];
//       certs[0].hospitalname = Hospitalname;
//       const viewConfig = viewDeathConfig(certs, id, currentLocalTenantId, t); 
//       setConfig(viewConfig);
//     }
//   }, [certificateViewData, Hospitalname, id, currentLocalTenantId, t]); 


//   // Handler for the download button
//   const HandleDownloadPdf = () => {
//     // Call the function from our custom hook
//     initiateDownload(currentLocalTenantId, id);
//   };

//   // Optional: Display download errors to the user
//   useEffect(() => {
//     if (downloadError) {
//         // You could show a toast message here, e.g., Digit.Toast.show(downloadError, "error");
//         console.error("Download Error:", downloadError);
//     }
//   }, [downloadError]);


//   if (!id && !location.state) {
//     return <div>Error: No certificate ID found. Please go back and select a certificate.</div>;
//   }

//   // Combined loading state for the page
//   const pageIsLoading = isViewDataLoading || !config;

//   if (pageIsLoading) {
//     return <Loader />;
//   }

//   if (viewDataError) {
//     console.error("Error fetching certificate data:", viewDataError);
//     return <div>Error fetching certificate data. Please try again.</div>;
//   }

//   return (
//     <div>
//       {ViewComposer && config ? <ViewComposer data={config} /> : <div>Loading View Composer...</div>}
//       {/* Optional: Display download error near the button or as a toast */}
//       {/* {downloadError && <p style={{color: 'red'}}>{downloadError}</p>} */}
//       <Footer
//         actionFields={[
//           <Button
//             key="update-btn"
//             icon="Edit"
//             label={t("CORE_COMMON_UPDATE")}
//             onClick={handleEditClick}
//             type="button"
//             variation="secondary"
//           />,
//           <Button
//             key="download-btn"
//             label={t("FREE_DOWNLOAD")}
//             onClick={HandleDownloadPdf} // Calls our simplified handler
//             className={"employee-download-btn-className"}
//             variation="secondary"
//             type="button"
//             icon={"FileDownload"}
//             disabled={isDownloading} // Use the loading state from the custom hook
//           />,
//         ]}
//         className=""
//       />
//     </div>
//   );
// };

// export default ViewDeath;




import React, { useEffect, useState, useCallback } from "react"; // Added useCallback
import { useLocation, useHistory } from "react-router-dom";
import { Button, Footer } from "@egovernments/digit-ui-components";
import { ViewComposer, Loader } from "@egovernments/digit-ui-react-components";
import viewDeathConfig from "./viewDeathConfig";
import { useTranslation } from "react-i18next";
import { usePdfDownloader } from "../../../components/usePdfDownloader"; 

const ViewDeath = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.myData; // This is the certificate ID
  const Hospitalname = location.state?.myhospitalname;
  const tenantId = location.state?.mytenantId || Digit.ULBService.getCurrentTenantId(); 
  const currentLocalTenantId = Digit.ULBService.getCurrentTenantId();
  const authToken = window?.Digit?.UserService?.getUser()?.access_token;

  // --- State for UI and Data ---
  const [config, setConfig] = useState(null);
  const [showPayAndDownload, setShowPayAndDownload] = useState(false); // To control which button to show
  

  // --- Custom Hooks ---
  const {
    initiateDownload: initiateFreeDownload, // Rename for clarity
    isDownloading: isFreeDownloading,
    downloadError: freeDownloadError,
  } = usePdfDownloader(id); // 'id' is for filename in hook


  // --- Fetch Certificate View Data ---
  const {
    data: certificateViewData,
    isLoading: isViewDataLoading,
    error: viewDataError,
  } = Digit.Hooks.useCustomAPIHook({
    url: "/birth-death-services/death/_viewfullcertdata",
    method: "POST",
    params: { tenantId: currentLocalTenantId, id },
    body: {
      RequestInfo: { apiId: "Rainmaker", ver: ".01", /* ... other RequestInfo params ... */ authToken },
    },
    headers: { "Content-Type": "application/json" },
    changeQueryName: `deathCertData_${id}`,
    config: {
      enabled: !!id && !!currentLocalTenantId,
    },
  });

  // --- Effect to set up ViewComposer config and determine button type ---
  useEffect(() => {
    if (certificateViewData?.DeathCertificate && certificateViewData.DeathCertificate.length > 0) {
      const certData = certificateViewData.DeathCertificate[0];
      console.log("ViewDeath: Certificate Data Received:", certData);

      // Prepare data for ViewComposer
      const certsForView = [{ ...certData }]; // Create a new array/object for safety
      if (Hospitalname) { // Only add if Hospitalname is present
        certsForView[0].hospitalname = Hospitalname;
      }
      const viewConfig = viewDeathConfig(certsForView, id, currentLocalTenantId, t);
      setConfig(viewConfig);

      // Determine which button to show based on counter
      if (certData.counter === 1) {
        console.log("ViewDeath: Counter is 1, showing Pay and Download button.");
        setShowPayAndDownload(true);
      } else {
        console.log("ViewDeath: Counter is not 1 (or undefined), showing Free Download button. Counter:", certData.counter);
        setShowPayAndDownload(false);
      }
    } else if (certificateViewData && (!certificateViewData.DeathCertificate || certificateViewData.DeathCertificate.length === 0)) {
        console.warn("ViewDeath: DeathCertificate array is missing or empty in the response.");
        // Handle cases where certificate data is expected but not found properly
    }
  }, [certificateViewData, Hospitalname, id, currentLocalTenantId, t]);


  // --- Event Handlers ---
  const handleEditClick = () => {
    const certs = certificateViewData?.DeathCertificate;
    if (certs && certs.length > 0) {
      const certToEdit = { ...certs[0] };
      if (Hospitalname) certToEdit.hospitalname = Hospitalname; // Ensure hospitalname is included if passed
      history.push(
        `/${window.contextPath}/employee/death/death-common/update-death?action=EDIT&certificateId=${id}&module=death`,
        { editdata: certToEdit, certificateId: id, module: "death" }
      );
    } else {
      console.error("ViewDeath: No certificate data found to edit.");
    }
  };

  const handleFreeDownload = () => {
    console.log("ViewDeath: Initiating Free Download...");
    initiateFreeDownload(currentLocalTenantId, id); // id is the certificateId
  };

  const handlePayAndDownload = ()=>{
    history.push(
      `/${window.contextPath}/employee/death/egov-common/pay`,
      {
        mytenantId: tenantId,
        myData: id ,
        myhospitalname: Hospitalname,
      }
    );

   
  };


  // --- Handle Download/Payment Errors (Optional: Show Toasts) ---
  useEffect(() => {
    if (freeDownloadError) {
      console.error("ViewDeath: Free Download Error:", freeDownloadError);
      // Digit.Toast.show(t("BND_ERROR_FREE_DOWNLOAD_FAILED", { error: freeDownloadError }), "error");
      alert(`Free Download Error: ${freeDownloadError}`);
    }
  }, [freeDownloadError, t]);


  // --- Loading and Error States for Page ---
  if (!id && !location.state) {
    return <div>Error: No certificate ID found. Please go back and select a certificate.</div>;
  }
  if (isViewDataLoading || !config) { 
    return <Loader />;
  }
  if (viewDataError) {
    console.error("ViewDeath: Error fetching certificate data:", viewDataError);
    return <div>Error fetching certificate data. Please try again.</div>;
  }

  // --- Determine which action button to render ---
  let actionButton;
  if (showPayAndDownload) {
    actionButton = (
      <Button
        key="pay-download-btn"
        label={t("BND_PAY_AND_DOWNLOAD_BUTTON_LABEL", "Pay and Download")}
        onClick={handlePayAndDownload}
        className={"employee-pay-download-btn-className"} 
        variation="secondary"
        type="button"
      />
    );
  } else {
    actionButton = (
      <Button
        key="download-btn"
        label={t("BND_FREE_DOWNLOAD_BUTTON_LABEL", "Download")}
        onClick={handleFreeDownload}
        className={"employee-download-btn-className"}
        variation="secondary"
        type="button"
        icon={"FileDownload"}
        disabled={isFreeDownloading}
      />
    );
  }

  return (
    <div>
      {ViewComposer && config ? <ViewComposer data={config} /> : <div>{t("COMMON_LOADING_VIEW", "Loading View...")}</div>}
      <Footer
        actionFields={[
          <Button
            key="update-btn"
            icon="Edit"
            label={t("CORE_COMMON_UPDATE")}
            onClick={handleEditClick}
            type="button"
            variation="secondary" // Or "primary" if it's the main non-download action
            style={{ marginRight: "1rem" }} // Space between update and download/pay button
          />,
          actionButton, 
        ]}
        className=""
      />
    </div>
  );
};

export default ViewDeath;