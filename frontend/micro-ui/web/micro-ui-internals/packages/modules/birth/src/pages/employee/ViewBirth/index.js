import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import useBirthConfig from "../../../utils/useBirthConfig";
import { ViewComposer, Loader } from "@egovernments/digit-ui-react-components";
const ViewBirth = () => {
  const { id } = useParams();
  if (!id) return <div>Error: Unauthorized access</div>;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const authToken = window?.Digit?.UserService?.getUser()?.access_token;


  const { data, isLoading, error } = Digit.Hooks.useCustomAPIHook({
    url: "/birth-death-services/birth/_viewfullcertdata",
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
  });


  const config = useBirthConfig(data);


 

  return (
    <React.Fragment>
      <ViewComposer data={config} />
    </React.Fragment>
  );
};

export default ViewBirth;
