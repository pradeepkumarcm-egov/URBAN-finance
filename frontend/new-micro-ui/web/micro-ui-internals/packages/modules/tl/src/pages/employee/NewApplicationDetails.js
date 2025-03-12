import React, { useEffect, useState } from "react";
import { Header, MultiLink, ViewComposer } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { createConfig } from "../../utils/CreateViewConfig";
import { Toast, Button, ActionBar } from "@egovernments/digit-ui-components";

export const NewApplicationDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { id: applicationNumber } = useParams();
  const [toast, setToast] = useState({ show: false, label: "", type: "" });

  const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.tl.useApplicationDetail(t, tenantId, applicationNumber);
  const config = createConfig(applicationDetails?.applicationDetails, applicationNumber, tenantId);

  const handleToastClose = () => {
    setToast({ show: false, label: "", type: "" });
  };

  return (
    <div>
      <div className={"employee-application-details"} style={{ marginBottom: "15px" }}>
        <Header>
          {applicationDetails?.applicationData?.workflowCode == "NewTL" && applicationDetails?.applicationData?.status !== "APPROVED"
            ? t("TL_TRADE_APPLICATION_DETAILS_LABEL")
            : t("TL_TRADE_LICENSE_DETAILS_LABEL")}
        </Header>
        <Button
          label={t("CS_COMMON_DOWNLOAD")}
          // onClick={() => HandleDownloadPdf()}
          className={"employee-download-btn-className"}
          variation={"teritiary"}
          type="button"
          icon={"FileDownload"}
        />
      </div>
      {toast?.show && <Toast label={toast?.label} type={toast?.type} isDleteBtn={true} onClose={handleToastClose}></Toast>}

      {!isLoading && <ViewComposer data={config} />}
    </div>
  );
};
