import { useHistory } from "react-router-dom";
import _ from "lodash";
import React, { useState, Fragment, useEffect } from "react";
import { Button as ButtonNew} from "@egovernments/digit-ui-components";

export const PayAndDownloadButton = ({ tenantId, certificateId, hospitalName }) => {
  const useBirthDownload= Digit.ComponentRegistryService.getComponent("useBirthDownload");
  const history = useHistory();
  const { consumerCode } = useBirthDownload(tenantId, certificateId);
  const handleClick = async () => {
    const businessService = "BIRTH_CERT";
    const encodedConsumerCode = encodeURIComponent(consumerCode);
    history.push(`/${window.contextPath}/citizen/payment/my-bills/${businessService}/${encodedConsumerCode}?workflow=birth`);
  };

  return (
     <ButtonNew
    className="custom-class"
    label="Pay and Download"
    onClick={handleClick}
    variation="link"
  />
  );
};