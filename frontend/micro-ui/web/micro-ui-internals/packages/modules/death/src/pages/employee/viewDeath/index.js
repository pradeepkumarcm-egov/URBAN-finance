// import React from "react";
// import { useLocation } from "react-router-dom";
// import { DisplayPhotos } from "@egovernments/digit-ui-components";

// const ViewDeath = () => {
//   const location = useLocation();
//   const id = location.state?.myData;

//   if (!id) return <div>Error: No certificate ID found</div>;

//   const tenantId = Digit.ULBService.getCurrentTenantId();
//   const authToken = window?.Digit?.UserService?.getUser()?.access_token;

//   const { data, isLoading, error } = Digit.Hooks.useCustomAPIHook({
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
//     headers: {
//       "Content-Type": "application/json",
//     },
//     changeQueryName: "deathCertData",
//   });

//   if (isLoading) return <div>Loading certificate data...</div>;
//   if (error) return <div>Error fetching certificate data</div>;

//   console.log("Certificate Data:", data);

//   return (
//     <div>
//       <h1>View Death Certificate</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default ViewDeath;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ViewComposer, Loader } from "@egovernments/digit-ui-components";
import viewDeathConfig from "./viewDeathConfig";

const ViewDeath = () => {
  const location = useLocation();
  const id = location.state?.myData;

  if (!id) return <div>Error: No certificate ID found</div>;

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const authToken = window?.Digit?.UserService?.getUser()?.access_token;

  const { data, isLoading, error } = Digit.Hooks.useCustomAPIHook({
    url: "/birth-death-services/death/_viewfullcertdata",
    method: "POST",
    params: { tenantId, id },
    body: {
      RequestInfo: {
        apiId: "Rainmaker",
        ver: ".01",
        action: "_viewcertdata",
        did: "1",
        key: "",
        msgId: "20170310130900|en_IN",
        requesterId: "",
        authToken,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
    changeQueryName: "deathCertData",
  });

  const [config, setConfig] = useState(null);

  useEffect(() => {
    console.log("Full API Response:", data);
    const certs = data?.DeathCertificate[0];
    console.log("Certificates:", certs);
    if(certs){
        const viewConfig = viewDeathConfig(certs, id, tenantId);
        console.log("Generated Config:", viewConfig);
        setConfig(viewConfig);
    }     
  }, [data]);

//   if (isLoading || !config) return <Loader />;
  if (error) return <div>Error fetching certificate data</div>;

  return (
    <div>
      <h1>View Death Certificate</h1>
      {/* <ViewComposer configs={config} /> */}
    </div>
  );
};

export default ViewDeath;
