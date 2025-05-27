
// import React from "react";

// const formatDate = (epoch) => {
//   if (!epoch) return "NA";
//   try {
//     const date = new Date(parseInt(epoch, 10));
//     if (isNaN(date.getTime())) return "NA"; // Invalid date
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", e);
//     return "NA";
//   }
// };

// export const viewApplicationConfig = (applicationData, t) => {
//   console.log("Inside viewDeathApplicationDetailsConfig, applicationData:", applicationData);

//   if (!applicationData) {
//     return { 
//       // Default empty structure if ViewComposer expects it
//       cards: [{ sections: [{ type: "DATA", cardHeader: { value: t("ES_COMMON_NO_DATA") }, values: [] }] }],
//       apiResponse: {}, 
//       additionalDetails: {} 
//     };
//   }

//   // Helper to ensure a value is displayed or a placeholder if null/undefined/empty
//   const getValue = (value) => {
//     return value !== null && value !== undefined && String(value).trim() !== "" ? String(value) : t("ES_COMMON_NA"); // Use "NA" from common translations
//   };

//   const config = {

//     cards: [
//       {
//         sections: [
//           {
//             type: "DATA", 
//             cardHeader: { value: t("BND_APPLICATION_DETAILS_HEADER"), inlineStyles: { marginTop: "1rem", marginBottom: "1rem"} }, // Section header
//             values: [ 
//               { key: t("BND_APPLICATION_NO"), value: getValue(applicationData.applicationNumber) },
//               { key: t("BND_COMMON_NAME"), value: getValue(applicationData.name) }, // Name of deceased or applicant
//               { key: t("BND_REG_NO_LABEL"), value: getValue(applicationData.regNo) },
//               { key: t("BND_APPLICATION_DATE"), value: formatDate(applicationData.applicationDate) },
//               { key: t("BND_STATUS"), value: getValue(t(`WF_STATUS_${applicationData.status?.toUpperCase()}`)|| applicationData.status) }, // Attempt to translate status
//               { key: t("BND_TENANT_ID"), value: getValue(applicationData.tenantId) },
//               { key: t("BND_APPLICATION_CATEGORY"), value: getValue(applicationData.applicationCategory) },
//               { key: t("BND_APPLICATION_TYPE"), value: getValue(applicationData.applicationType) },
//               { key: t("BND_FILE_STORE_ID"), value: getValue(applicationData.fileStoreId) }, // Often relevant if there are attachments
//             ],
//           },
          
//         ],
//       },
//     ],
//     apiResponse: applicationData, 
//     additionalDetails: {
//     },
//   };

//   return config;
// };

// viewDeathApplicationDetailsConfig.js (MODIFIED to handle an array)


// import React from "react";

// const formatDate = (epoch) => {
//   if (!epoch) return "NA";
//   try {
//     const date = new Date(parseInt(epoch, 10));
//     if (isNaN(date.getTime())) return "NA";
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", e);
//     return "NA";
//   }
// };

// // Helper to ensure a value is displayed or a placeholder
// const getValue = (value, t) => { // Pass t here
//   return value !== null && value !== undefined && String(value).trim() !== "" ? String(value) : t("ES_COMMON_NA");
// };

// // This function now takes an array of applicationData objects
// export const viewApplicationConfig = (applicationsArray, t) => {
//   console.log("Inside viewMultipleApplicationsConfig, applicationsArray:", applicationsArray);

//   if (!applicationsArray || applicationsArray.length === 0) {
//     return {
//       cards: [{ sections: [{ type: "DATA", cardHeader: { value: t("ES_COMMON_NO_RESULTS_FOUND") }, values: [] }] }],
//       apiResponse: {},
//       additionalDetails: {}
//     };
//   }

//   // Map each application in the array to a card structure
//   const applicationCards = applicationsArray.map((applicationData, index) => {
//     // For each application, create a card with its details
//     return {
//       // Optional: Add a header to each application's card, e.g., with the application number
//       cardHeader: { 
//         value: `${t("BND_APPLICATION_NO")}: ${getValue(applicationData.applicationNumber, t)}`, 
//         inlineStyles: { backgroundColor: "#f0f0f0", padding: "10px", marginTop: index > 0 ? "20px" : "0" } // Style to distinguish cards
//       },
//       sections: [
//         {
//           type: "DATA",
//           // No cardHeader needed here if the outer card has one, or make it more specific
//           // cardHeader: { value: t("BND_DETAILS"), inlineStyles: { marginTop: "1rem", marginBottom: "1rem"} },
//           values: [
//             // Common details you want to show for each application in the list
//             { key: t("BND_COMMON_NAME"), value: getValue(applicationData.name, t) },
//             { key: t("BND_REG_NO_LABEL"), value: getValue(applicationData.regNo, t) },
//             { key: t("BND_APPLICATION_DATE"), value: formatDate(applicationData.applicationDate) },
//             { key: t("BND_STATUS"), value: getValue(t(`WF_STATUS_${applicationData.status?.toUpperCase()}`) || applicationData.status, t) },
//             { key: t("BND_TENANT_ID"), value: getValue(applicationData.tenantId, t) },
//             { key: t("BND_APPLICATION_CATEGORY"), value: getValue(applicationData.applicationCategory, t) },
//             { key: t("BND_APPLICATION_TYPE"), value: getValue(applicationData.applicationType, t) },
//             { key: t("BND_FILE_STORE_ID"), value: getValue(applicationData.fileStoreId, t) },
//             // You might want to add an action here too, like a "View Full Details" link/button
//             // { 
//             //   key: t("BND_ACTIONS"), 
//             //   value: (
//             //     <Link to={`/path/to/full-details/${applicationData.applicationNumber}`}>
//             //       {t("BND_VIEW_FULL_DETAILS")}
//             //     </Link>
//             //   ),
//             //   isComponent: true // Flag if the value is a React component
//             // }
//           ],
//         },
//         // You could add more sections PER application if needed,
//         // but for a list view, usually fewer details are shown per item.
//       ],
//     };
//   });

//   const config = {
//     // title: t("BND_APPLICATION_LIST_HEADER"), // Optional overall title for the ViewComposer
//     cards: applicationCards, // This is now an array of card objects
//     apiResponse: applicationsArray, // Store the full array
//     additionalDetails: {},
//   };

//   return config;
// };


// viewMultipleApplicationsConfig.js (or a suitable name)


// import React from "react";
// import { Link } from "react-router-dom"; // If you want to add links later

// // Helper to format epoch timestamp to dd-mm-yyyy
// const formatDate = (epoch) => {
//   if (!epoch && epoch !== 0) return "NA"; // Handle 0 epoch if valid, else NA
//   try {
//     const date = new Date(parseInt(epoch, 10));
//     if (isNaN(date.getTime())) return "NA";
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", epoch, e);
//     return "NA";
//   }
// };

// // Helper to ensure a value is displayed or a placeholder
// const getValue = (value, t) => {
//   const naString = t("ES_COMMON_NA") || "NA"; // Get translated "NA" or default
//   return value !== null && value !== undefined && String(value).trim() !== "" ? String(value) : naString;
// };

// export const viewApplicationConfig = (applicationsArray, t, props = {}) => {
//   // props could include things like navigate function for actions
//   console.log("viewMultipleApplicationsConfig - Input applicationsArray:", applicationsArray);

//   if (!applicationsArray || applicationsArray.length === 0) {
//     return {
//       cards: [
//         {
//           sections: [
//             {
//               type: "DATA",
//               cardHeader: { value: t("ES_COMMON_NO_RESULTS_FOUND") },
//               values: [],
//             },
//           ],
//         },
//       ],
//       apiResponse: [],
//       additionalDetails: {},
//     };
//   }

//   const applicationCards = applicationsArray.map((appData, index) => {
//     // For each application, create a card
//     return {
//       // You can add a key here if ViewComposer or the rendering loop needs it,
//       // though the parent mapping usually handles keys.
//       // key: appData.applicationNumber || `app-${index}`, 
      
//       // No cardHeader for individual cards if you want a cleaner list.
//       // If you want a title per card, uncomment and adjust:
//       // cardHeader: { 
//       //   value: `${t("BND_APPLICATION_NO")}: ${getValue(appData.applicationNumber, t)}`,
//       //   inlineStyles: { backgroundColor: "#f9f9f9", padding: "10px", borderBottom: "1px solid #eee" } 
//       // },
//       sections: [
//         {
//           type: "DATA", // This type usually renders key-value pairs
//           // No section-specific cardHeader needed if the card itself is the container
//           values: [
//             {
//               key: t("BND_APPL_DATE"), // "Application Date"
//               value: formatDate(appData.applicationDate),
//             },
//             {
//               key: t("BND_CERT_REG_NO"), // "Certificate Registration Number"
//               value: getValue(appData.regNo, t),
//             },
//             {
//               key: t("BND_CERT_NAME"), // "Name on the Certificate"
//               value: getValue(appData.name, t),
//             },
//             {
//               key: t("BND_APPL_TYPE"), // "Application Type"
//               value: getValue(appData.applicationType, t), // You might want to translate this if it's a code
//                                                             // e.g., t(`BND_APP_TYPE_${appData.applicationType?.toUpperCase()}`) || appData.applicationType
//             },
//             {
//               key: t("BND_APPL_STATUS"), // "Application Status"
//               value: getValue(t(`WF_STATUS_${appData.status?.toUpperCase()}`) || appData.status, t), // Attempt to translate status
//             },
//             // Example: Action to view full details (if you have a separate page for that)
//             // This assumes your ViewComposer can handle a 'isComponent: true' or similar
//             // to render JSX directly as a value.
//             // {
//             //   key: t("BND_ACTIONS_TABLE"),
//             //   value: (
//             //     <Link 
//             //       to={`/${window.contextPath}/citizen/death/view-application/${appData.applicationNumber}?tenantId=${appData.tenantId}`}
//             //       style={{ color: "#F47738", textDecoration: "underline" }}
//             //     >
//             //       {t("BND_VIEW_DETAILS_LINK")}
//             //     </Link>
//             //   ),
//             //   isComponent: true, // Important: Tells the renderer this value is a React component
//             //   inlineStyles: {alignItems:"center"} // Example for styling if needed
//             // }
//           ],
//           inlineStyles: { paddingBottom: "10px", marginBottom:"10px", borderBottom: applicationsArray.length -1 === index ? "none" :"1px solid #d6d5d4" } // Style between cards if needed
//         },
//       ],
//       // Add a gap between cards using CSS on the card container in the parent, or here if ViewComposer supports it
//       // styles: { marginBottom: "20px" } 
//     };
//   });

//   const config = {
//     // title: t("BND_MY_APPLICATIONS_HEADER"), // Overall title for the ViewComposer page, if any
//     cards: applicationCards,
//     apiResponse: applicationsArray, // Pass the original array
//     additionalDetails: {},
//   };

//   console.log("viewMultipleApplicationsConfig - Generated config:", config);
//   return config;
// };

// import React from "react";
// import { Link } from "react-router-dom"; // If you want to add links later

// // Helper to format epoch timestamp to dd-mm-yyyy
// const formatDate = (epoch) => {
//   if (!epoch && epoch !== 0) return "NA";
//   try {
//     const date = new Date(parseInt(epoch, 10));
//     if (isNaN(date.getTime())) return "NA";
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", epoch, e);
//     return "NA";
//   }
// };

// // Helper to ensure a value is displayed or a placeholder
// const getValue = (value, t) => {
//   const naString = t("ES_COMMON_NA") || "NA";
//   return value !== null && value !== undefined && String(value).trim() !== "" ? String(value) : naString;
// };

// // Function to get the translated application type
// const getTranslatedApplicationType = (applicationType, t) => {
//   if (!applicationType) {
//     return getValue(null, t); // Return "NA"
//   }
//   switch (applicationType.toUpperCase()) { // Convert to uppercase for robust matching
//     case "CERT_DOWNLOAD":
//       return t("BND_CERT_DOWNLOAD"); // Your specific key for "Certificate Download"
//     // Add more cases if you have other specific application types to translate
//     // case "NEW_REGISTRATION":
//     //   return t("BND_NEW_REGISTRATION_TYPE_LABEL"); // Example
//     default:
//       // Fallback: try a generic pattern or show the raw value
//       const genericKey = `BND_APP_TYPE_${applicationType.toUpperCase()}`;
//       const translatedGeneric = t(genericKey);
//       // If the generic key wasn't found, t() returns the key itself. So check against that.
//       return translatedGeneric !== genericKey ? translatedGeneric : getValue(applicationType, t);
//   }
// };

// // Renamed function to reflect it handles multiple applications
// export const viewApplicationConfig = (applicationsArray, t, props = {}) => {
//   console.log("viewApplicationsListConfig - Input applicationsArray:", applicationsArray);

//   if (!applicationsArray || applicationsArray.length === 0) {
//     return {
//       cards: [ { sections: [ { type: "DATA", cardHeader: { value: t("ES_COMMON_NO_RESULTS_FOUND") }, values: [] } ] } ],
//       apiResponse: [],
//       additionalDetails: {},
//     };
//   }

//   const applicationCards = applicationsArray.map((appData, index) => {
//     return {
//       // key: appData.applicationNumber || `app-${index}`, // Optional key for React if needed by map parent
//       sections: [
//         {
//           type: "DATA",
//           values: [
//             {
//               key: t("BND_APPL_DATE"), 
//               value: formatDate(appData.applicationDate),
//             },
//             {
//               key: t("BND_CERT_REG_NO"), 
//               value: getValue(appData.regNo, t),
//             },
//             {
//               key: t("BND_CERT_NAME"), 
//               value: getValue(appData.name, t),
//             },
//             {
//               key: t("BND_APPL_TYPE"), 
//               value: getTranslatedApplicationType(appData.applicationType, t), // Use the helper here
//             },
//             {
//               key: t("BND_APPL_STATUS"), 
//               value: getValue(t(`WF_STATUS_${appData.status?.toUpperCase()}`) || appData.status, t),
//             },
//             // Example Action Link:
//             // {
//             //   key: t("BND_ACTIONS"), // New translation key for "Actions" column header
//             //   value: (
//             //     <Link 
//             //       to={`/${window.contextPath}/citizen/death/view-application-details/${appData.applicationNumber}?tenantId=${appData.tenantId}`} // Example path
//             //       style={{ color: "#F47738", textDecoration: "underline" }}
//             //     >
//             //       {t("BND_VIEW_DETAILS_LINK_TEXT")} {/* e.g., "View Details" */}
//             //     </Link>
//             //   ),
//             //   isComponent: true, 
//             // }
//           ],
//           // Apply styling to create separation between cards if ViewComposer doesn't do it.
//           // This style applies to the section *within* each card.
//           inlineStyles: { 
//             paddingBottom: "15px", 
//             marginBottom: "15px", 
//             borderBottom: applicationsArray.length - 1 === index ? "none" : "1px solid #e0e0e0" 
//           }
//         },
//       ],
//       // If you want each application to truly be a distinct visual card,
//       // ViewComposer might need styling hints or you apply styles to the container
//       // that renders multiple ViewComposer instances (if using Option 1 from before).
//       // For this Option 2 (single ViewComposer, multiple cards in its config),
//       // the distinction between "cards" is primarily in the data structure.
//       // The visual separation comes from the `inlineStyles` on the section or styling the root of each item.
//     };
//   });

//   const config = {
//     // title: t("BND_MY_APPLICATIONS_HEADER"), // Optional overall title
//     cards: applicationCards,
//     apiResponse: applicationsArray,
//     additionalDetails: {},
//   };

//   console.log("viewApplicationsListConfig - Generated config:", config);
//   return config;
// };


// viewApplicationsListConfig.js (or your config file name)
import React from "react";
// import { Link } from "react-router-dom"; // If you want to add links later

// Helper to format epoch timestamp to dd-mm-yyyy
const formatDate = (epoch) => {
  if (!epoch && epoch !== 0) return "NA";
  try {
    const date = new Date(parseInt(epoch, 10));
    if (isNaN(date.getTime())) return "NA";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (e) {
    console.error("Error formatting date:", epoch, e);
    return "NA";
  }
};

// Helper to ensure a value is displayed or a placeholder
const getValue = (value, t) => {
  const naString = t("ES_COMMON_NA") || "NA";
  return value !== null && value !== undefined && String(value).trim() !== "" ? String(value) : naString;
};

// Function to get the translated application type
const getTranslatedApplicationType = (applicationType, t) => {
  if (!applicationType) {
    return getValue(null, t);
  }
  switch (applicationType.toUpperCase()) {
    case "CERT_DOWNLOAD":
      return t("BND_CERT_DOWNLOAD");
    default:
      const genericTypeKey = `BND_APP_TYPE_${applicationType.toUpperCase()}`;
      const translatedGenericType = t(genericTypeKey);
      return translatedGenericType !== genericTypeKey ? translatedGenericType : getValue(applicationType, t);
  }
};

// Function to get the translated application status
const getTranslatedApplicationStatus = (status, t) => {
  if (!status) {
    return getValue(null, t);
  }

  // Assuming the 'status' field from your API directly matches the localization key suffix
  // or is one of the specific cases you've identified.
  
  let translationKey = "";
  const upperStatus = status.toUpperCase();

  // First, check for specific known status strings from API that map to your BND_STATUS keys
  if (upperStatus === "ACTIVE") {
    translationKey = "BND_STATUS_ACTIVE";
  } else if (status.toLowerCase() === "free download complete") { // API might send this exact string
    translationKey = "BND_STATUS_FREE_DOWNLOAD"; 
  } else if (upperStatus === "PAID") { // Assuming API sends "PAID"
    translationKey = "BND_STATUS_PAID";
  } else if (status.toLowerCase() === "paid and downloaded") { // Assuming API sends this
    translationKey = "BND_STATUS_PAID_DOWNLOAD";
  } else if (status.toLowerCase() === "certificate generated") { // Assuming API sends this
    translationKey = "BND_STATUS_PAID_PDF_GENERATED"; // Or BND_STATUS_CERTIFICATE_GENERATED if key is different
  } else {
    // If it's not one of the special direct string matches,
    // try to construct the key assuming the status string IS the suffix
    // e.g., if API status is "PENDINGPAYMENT", key becomes BND_STATUS_PENDINGPAYMENT
    translationKey = `BND_STATUS_${upperStatus}`;
  }

  const translatedStatus = t(translationKey);

  // If the specific BND_STATUS_... key isn't found, t() returns the key itself.
  if (translatedStatus !== translationKey) {
    return translatedStatus;
  } else {
    // Fallback to general workflow status if specific BND_STATUS_ isn't found
    // (This WF_STATUS_ prefix is common in Digit)
    const genericWfStatusKey = `WF_STATUS_${upperStatus}`;
    const translatedWfStatus = t(genericWfStatusKey);
    return translatedWfStatus !== genericWfStatusKey ? translatedWfStatus : getValue(status, t); // Last resort, show raw status
  }
};


export const viewApplicationConfig = (applicationsArray, t, props = {}) => {
  // ... (console.log and early return for empty array as before) ...
  if (!applicationsArray || applicationsArray.length === 0) {
    return {
      cards: [ { sections: [ { type: "DATA", cardHeader: { value: t("No Results Found..") }, values: [] } ] } ],
      apiResponse: [],
      additionalDetails: {},
    };
  }

  const applicationCards = applicationsArray.map((appData, index) => {
    return {
      sections: [
        {
          type: "DATA",
          values: [
            {
              key: t("BND_APPL_DATE"),
              value: formatDate(appData.applicationDate),
            },
            {
              key: t("BND_CERT_REG_NO"),
              value: getValue(appData.regNo, t),
            },
            {
              key: t("BND_CERT_NAME"),
              value: getValue(appData.name, t),
            },
            {
              key: t("BND_APPL_TYPE"),
              value: getTranslatedApplicationType(appData.applicationType, t),
            },
            {
              key: t("BND_APPL_STATUS"),
              value: getTranslatedApplicationStatus(appData.status, t), // Use the updated helper
            },
          ],
          inlineStyles: { 
            paddingBottom: "15px", 
            marginBottom: "15px", 
            borderBottom: applicationsArray.length - 1 === index ? "none" : "1px solid #e0e0e0" 
          }
        },
      ],
    };
  });

  const config = {
    cards: applicationCards,
    apiResponse: applicationsArray,
    additionalDetails: {},
  };

  // ... (console.log for generated config as before) ...
  return config;
};