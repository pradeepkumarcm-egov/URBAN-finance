import React, { useEffect, useState } from "react";
import { useLocation,useHistory } from "react-router-dom";
import {Button,Footer} from "@egovernments/digit-ui-components";
import { ViewComposer,Loader } from "@egovernments/digit-ui-react-components";
import viewDeathConfig from "./viewDeathConfig";
import { useTranslation } from "react-i18next";

const ViewDeath = () => {
  
  const { t } = useTranslation();
  console.log("asdfghjk",ViewComposer)
  const location = useLocation();
    const history = useHistory();
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
  const handleEditClick = () => {
    history.push(`/${window.contextPath}/employee/death/death-common/update-death?action=EDIT&certificateId=${id}&module=death`,
        {
         editdata: data?.DeathCertificate?.[0],
         certificateId: id,
         module: "death"
        }
    );
  };

  useEffect(() => {
    console.log("Full API Response:", data);
    const certs = data?.DeathCertificate;
    console.log("Certificates:", certs);
    if(certs){
        const viewConfig = viewDeathConfig(certs, id, tenantId,t);
        console.log("Generated Config:", viewConfig);
        setConfig(viewConfig);
    }     
  }, [data]);

  if (isLoading || !config) return <Loader />;
  if (error) return <div>Error fetching certificate data</div>;

    return (
      <div>
        {ViewComposer && config ? <ViewComposer data={config} /> : <div>Loading View...</div>}
        <Footer
          actionFields={[
            <Button icon="Edit" label="UPDATE" onClick={handleEditClick} type="button" variation="secondary"/>,
          ]}
          className=""
          maxActionFieldsAllowed={5}
          setactionFieldsToLeft="Left"
          setactionFieldsToRight
          sortActionFields
          style={{}}
        />
      </div>
    );
};

export default ViewDeath;
