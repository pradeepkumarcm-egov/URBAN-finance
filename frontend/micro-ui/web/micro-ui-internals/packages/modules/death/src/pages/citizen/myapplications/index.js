import React, { useEffect, useState } from "react";
import { useLocation,useHistory } from "react-router-dom";
import {Button,Footer} from "@egovernments/digit-ui-components";
import { ViewComposer,Loader,Header } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import {viewApplicationConfig} from "./viewApplicationsConfig";

const MyApplications = () => {
  
  const { t } = useTranslation();
  const [config, setConfig] = useState(null);

  const tenantId = Digit.ULBService.getStateId();
  const authToken = window?.Digit?.UserService?.getUser()?.access_token;


  const { data, isLoading, error, revalidate } = Digit.Hooks.useCustomAPIHook({
  url: "/birth-death-services/death/_searchapplications",
  method: "POST",
  params: {
    tenantId: tenantId,
  },
  body: {},
  headers: {
  },
  changeQueryName: `deathApplicationsSearch-${tenantId}`,
});


 useEffect(() => {
    console.log("Full API Response:", data);
    const certs = data?.applications;
    console.log("Certificates:", certs);
    if(certs){
        const viewConfig = viewApplicationConfig(certs,t);
        console.log("Generated Config:", viewConfig);
        setConfig(viewConfig);
    }     
  }, [data]);

if (isLoading) {
  return <Loader />;
}

if (error) {
  return <div>Error fetching applications. Please try again.</div>;
}


  console.log("Death Applications Data:", data);

    return (
      <React.Fragment>
       <Header>{t("BND_CITIZEN_MY_APPLICATIONS")}</Header>
        <div >
            {ViewComposer && config ? <ViewComposer data={config} /> : <div>Loading View...</div>}
        </div>  
      </React.Fragment>
        
      
    );
};

export default MyApplications;


