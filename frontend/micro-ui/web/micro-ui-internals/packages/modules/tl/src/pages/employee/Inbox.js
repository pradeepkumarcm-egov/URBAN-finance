import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Header, InboxSearchComposer, Loader } from "@egovernments/digit-ui-react-components";
import MobileInbox from "../../components/inbox/MobileInbox";
import { TLInboxConfig } from "../../config/TLInboxConfig";
import preProcessMDMSConfigInboxSearch from "../../utils/preProcessMDMSConfigInboxSearch";

const Inbox = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const data = TLInboxConfig();
  const isLoading = false;

  const [pageConfig, setPageConfig] = useState(null);
  const tenant = Digit.ULBService.getStateId();

  // const { isLoading, data } = Digit.Hooks.useCustomMDMS(
  //   tenant,
  //   "commonUiConfig",
  //   [
  //     {
  //       name: "TLInboxConfig",
  //     },
  //   ],
  //   {
  //     select: (data) => {
  //       return TLInboxConfig();
  //     },
  //   }
  // );

  const updatedConfig = useMemo(() => preProcessMDMSConfigInboxSearch(t, pageConfig, "sections.search.uiConfig.fields", {}), [data, pageConfig]);
  
  useEffect(() => {
    setPageConfig(_.cloneDeep(data?.["commonUiConfig"]?.TLInboxConfig?.[0]));
  }, [location]);

  // const tlInboxSession = Digit.Hooks.useSessionStorage("TL_INBOX_SESSION", {})

  let isMobile = window.Digit.Utils.browser.isMobile();
  // useEffect(() => {
  //   console.log(data, "data is changing")
  // }, [data]);

  if (isLoading || !pageConfig) return <Loader />;

  // if (isMobile) {
  //   return (
  //     <MobileInbox
  //       data={data}
  //       isLoading={hookLoading}
  //       searchFields={getSearchFields()}
  //       onFilterChange={handleFilterChange}
  //       onSearch={handleFilterChange}
  //       onSort={handleSort}
  //       parentRoute={parentRoute}
  //       searchParams={searchParams}
  //       sortParams={sortParams}
  //     />
  //   );
  // } else {
    return (
      <React.Fragment>
        <Header styles={{ fontSize: "32px" }}>
          {t(updatedConfig?.label)}
          {data?.totalCount ? <span className="inbox-count">{data?.totalCount}</span> : null}
        </Header>
        <div className="inbox-search-wrapper">
          <InboxSearchComposer configs={updatedConfig}></InboxSearchComposer>
        </div>
      </React.Fragment>
    );
  // }
};

export default Inbox;
