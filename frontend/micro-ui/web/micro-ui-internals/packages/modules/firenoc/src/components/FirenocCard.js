import { CaseIcon, EmployeeModuleCard } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const FireNocCard = () => {
    // console.log("card");
    console.log("firenoc-card");

    // if (!Digit.Utils.NOCAccess()) {
    //     return null;
    // }
    const { t } = useTranslation();


    let links = [
        {
            count: isLoading ? "-" : inboxData?.totalCount,
            label: t("ES_COMMON_INBOX"),
            link: `/digit-ui/employee/tl/inbox`,
        },
        {
            label: t("TL_NEW_APPLICATION"),
            link: "/digit-ui/employee/tl/new-application",
            role: "TL_CEMP"
        },
        {
            label: t("TL_SEARCH_APPLICATIONS"),
            link: `/digit-ui/employee/tl/search/application`
        },
        {
            label: t("TL_SEARCH_LICENSE"),
            link: `/digit-ui/employee/tl/search/license`,
            role: "TL_CEMP"
        },
        {
            label: t("TL_DASHBOARD"),
            link: `/digit-ui/employee/dss/dashboard/tradelicense`
        }
    ]

    // links = links.filter(link => link.role ? checkForEmployee(link.role) : true);

    const propsForModuleCard = {
        Icon: <CaseIcon />,
        moduleName: t("TL_COMMON_FIRENOC"),
        links: links
    }
    return <EmployeeModuleCard {...propsForModuleCard} />
};

export default FireNocCard;

