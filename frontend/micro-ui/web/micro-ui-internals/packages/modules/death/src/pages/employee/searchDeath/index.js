import React from "react";
import { Header, InboxSearchComposer, Loader } from "@egovernments/digit-ui-components";
import { searchDeathConfig } from "./searchDeathConfig";
import { useTranslation } from "react-i18next";

const SearchDeath = () => {
    // const config = searchDeathConfig();
console.log(InboxSearchComposer, "InboxSearchComposer")

    const { t } = useTranslation();
   
        const tenant= Digit.ULBService.getStateId(); 
        // const { isLoading, data } =Digit.Hooks.useCustomMDMS( 
        //     tenant, 
        //     "commonUiConfig", 
        //     [ 
        //         { 
        //             "name": "searchDeathConfig" 
        //         } 
        //     ]       
        // );
        // console.log(data, "Data from MDMS: ")
        // const configs = data?.commonUiConfig?.searchDeathConfig?.[0] 

        console.log(searchDeathConfig(), "searchDeathConfig")
        const configs =  searchDeathConfig()?.commonUiConfig?.DeathInboxConfig?.[0];
        console.log("Configs ", configs)

        // const main = CampaignsInboxConfig().CampaignsInboxConfig[0];
        // console.log(main,"mainnnnnnnn")
    
    // if(isLoading)  return <Loader variant={"PageLoader"}/>
    return (
        <React.Fragment>
        <Header styles={{ fontSize: "32px" }}>{t(configs?.label)}</Header>
            <div className="digit-inbox-search-wrapper">
                <InboxSearchComposer configs={configs}></InboxSearchComposer>
            </div>
        </React.Fragment>
    )
}
export default SearchDeath;