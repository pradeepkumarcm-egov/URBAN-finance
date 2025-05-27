import React, { useEffect, useState,useMemo,useCallback ,useRef} from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  Footer,
  FormComposerV2,
  SummaryCard,
  Tag
} from "@egovernments/digit-ui-components";
import {
  ViewComposer,
  Loader,
  Header
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import payandDownloadConfig from "./payandDownloadConfig";

const PayandDownload = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const id = location.state?.myData;
  const tenantId = location.state?.mytenantId;
  const preloadedConsumerCode = location.state?.consumerCode;
  const authToken = window?.Digit?.UserService?.getUser()?.access_token;

  const [consumerCode, setConsumerCode] = useState(preloadedConsumerCode || null);
  const [billDetails, setBillDetails] = useState(null);


  console.log("edewfwe", id, tenantId);

   const initialPaidByFromStaticConfig = useMemo(() => (
    payandDownloadConfig
      .find(s => s.head === "Payer Details")
      ?.body.find(f => f.key === "paidBy")
      ?.populators.defaultValue || { code: "OWNER", name: "OWNER" }
  ), []);

  const [selectedPaidBy, setSelectedPaidBy] = useState(initialPaidByFromStaticConfig);
  const prevSelectedPaidByRef = useRef(initialPaidByFromStaticConfig);

  const configs = payandDownloadConfig;

  const reqDownload = {
    url: "/birth-death-services/death/_download",
    params: {
      tenantId: tenantId,
      id: id,
      source: "web"
    },
    body: {},
    config: {
      enabled: true
    }
  };

  const downloadMutation = Digit.Hooks.useCustomAPIMutationHook(reqDownload);

  const reqDownload2 = {
    url: "/billing-service/bill/v2/_fetchbill",
    params: {
      tenantId: tenantId,
      consumerCode: consumerCode,
      businessService: "DEATH_CERT"
    },
    body: {},
    config: {
      enabled: true
    }
  };

  const fetchBillMutation = Digit.Hooks.useCustomAPIMutationHook(reqDownload2);

  const Downloadapi = async () => {
    await downloadMutation.mutate(
      {
        url: "/birth-death-services/death/_download",
        params: {
          tenantId: tenantId,
          id: id,
          source: "web"
        }
      },
      {
        onSuccess: (response) => {
          const code = response?.consumerCode;
          if (code) {
            setConsumerCode(code);
            history.replace({
              ...location,
              state: {
                ...location.state,
                consumerCode: code
              }
            });
          }
        },
        onError: (error) => {
          console.error("API Error:", error);
        }
      }
    );
  };

  const fetchBill = async () => {
    await fetchBillMutation.mutate(
      {
        url: "/billing-service/bill/v2/_fetchbill",
        params: {
          tenantId: tenantId,
          consumerCode: consumerCode,
          businessService: "DEATH_CERT"
        }
      },
      {
        onSuccess: (response) => {
          setBillDetails(response);
        },
        onError: (error) => {
          console.error("Fetch Bill API Error:", error);
        }
      }
    );
  };

  useEffect(() => {
    if (!consumerCode && id && tenantId) {
      Downloadapi();
    }
  }, [id, tenantId, consumerCode]);

  useEffect(() => {
    if (consumerCode) {
      fetchBill();
    }
  }, [consumerCode]);

  console.log("Consumer Code:", consumerCode);


  const User=Digit.UserService.getUser();

 const defaultValues = useMemo(() => {
    const defaults = {
      paidBy: selectedPaidBy,
    };
    if (selectedPaidBy?.code === "OWNER") {
      defaults.payerName = User?.info?.name || "";
      defaults.payermobileNumber = User?.info?.mobileNumber || "";
    } else { // OTHERS
      defaults.payerName = "";
      defaults.payermobileNumber = "";
    }
    console.log("Generated defaultValues:", defaults);
    return defaults;
  }, [selectedPaidBy]);


   const dynamicFormConfig = useMemo(() => {
    console.log("dynamicFormConfig recalculating. Selected Paid By:", selectedPaidBy?.code);
    const newConfig = JSON.parse(JSON.stringify(payandDownloadConfig));
    const payerDetailsSection = newConfig.find(section => section.head === "Payer Details");

    if (payerDetailsSection) {
      const payerNameField = payerDetailsSection.body.find(field => field.key === "payerName");
      const payerMobileField = payerDetailsSection.body.find(field => field.key === "payermobileNumber");

      console.log("cdscfcs",payerNameField, payerMobileField);

      if (selectedPaidBy?.code === "OWNER") {
        if (payerNameField) { payerNameField.disable = true; payerNameField.isMandatory = false; }
        if (payerMobileField) { payerMobileField.disable = true; payerMobileField.isMandatory = false; }
      } else { // OTHERS or any other default
        if (payerNameField) { payerNameField.disable = false; payerNameField.isMandatory = true; }
        if (payerMobileField) { payerMobileField.disable = false; payerMobileField.isMandatory = true; }
      }
    }
    return newConfig;
  }, [selectedPaidBy]); // This config depends ONLY on the `selectedPaidBy` state

  const onFormValueChange = useCallback((setValue, formData, formState, reset, setError, clearErrors, trigger, getValues) => {
    const currentPaidByInForm = formData?.paidBy; // This is the {code, name} object from RHF's current state
    const previousPaidByCodeInRef = prevSelectedPaidByRef.current?.code;
    const currentPaidByCodeInForm = currentPaidByInForm?.code;

    if (currentPaidByCodeInForm !== previousPaidByCodeInRef) {
      console.log(`PaidBy changed from ${previousPaidByCodeInRef} to ${currentPaidByCodeInForm}. Updating state & ref.`);
      setSelectedPaidBy(currentPaidByInForm); // Update state --> triggers config recalculation
      prevSelectedPaidByRef.current = currentPaidByInForm; // Update ref for the next call

      // Step 2: Update dependent field VALUES using setValue, but ONLY if necessary.
      const currentFormPayerName = getValues("payerName");
      const currentFormPayerMobile = getValues("payermobileNumber");

      if (currentPaidByCodeInForm === "OTHERS") {
        if (currentFormPayerName !== "") {
          console.log("Setting payerName to '' for OTHERS");
          setValue("payerName", "");
        }
        if (currentFormPayerMobile !== "") {
          console.log("Setting payermobileNumber to '' for OTHERS");
          setValue("payermobileNumber", "");
        }
      } else if (currentPaidByCodeInForm === "OWNER") {
        const ownerName = User?.info?.name || "";
        const ownerMobile = User?.info?.mobileNumber || "";
        if (currentFormPayerName !== ownerName) {
          console.log(`Setting payerName to '${ownerName}' for OWNER`);
          setValue("payerName", ownerName);
        }
        if (String(currentFormPayerMobile) !== String(ownerMobile)) {
          console.log(`Setting payermobileNumber to '${ownerMobile}' for OWNER`);
          setValue("payermobileNumber", ownerMobile);
        }
      }
    }
  }, []); // User is stable. getValues is from RHF.

  const onSubmit = async (data) => {
    console.log("Submitted form data:", data);
  };


  return (
    // <React.Fragment>
    //   <div style={{ display: "flex", alignItems: "center" }}>
    //       <Header>Payment Information</Header>
    //       <Button
    //         className="custom-class"
    //         label={`Consumer Code ${consumerCode}`}  // Dynamic label from state
    //         variation="secondary"
    //         style={{ 
    //           marginLeft: "16px", 
    //           whiteSpace: "nowrap", 
    //         }}
    //        />
    //   </div>
    //   <FormComposerV2
    //   label={t( "Make Payment")}
    //       config={configs.map((config) => ({
    //                 ...config,
    //               }))}
    //       defaultValues={defaultValues}
    //       onSubmit={(data) => onSubmit(data)}
    //       onFormValueChange={onFormValueChange}
    //       labelfielddirectionvertical={false}
    //   />
    // </React.Fragment>
  <React.Fragment>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Header>Payment Information</Header>
      <Button
        className="custom-class"
        label={`Consumer Code ${consumerCode}`}
        variation="secondary"
        style={{ 
          marginLeft: "16px", 
          whiteSpace: "nowrap", 
        }}
      />
    </div>
    <FormComposerV2
      key={`form-${selectedPaidBy?.code}`} // This forces re-render when paidBy changes
      label={t("Make Payment")}
      config={dynamicFormConfig} // Use the dynamic config instead of static configs
      defaultValues={defaultValues}
      onSubmit={(data) => onSubmit(data)}
      onFormValueChange={onFormValueChange}
      labelfielddirectionvertical={false}
    />
  </React.Fragment>

  );
};

export default PayandDownload;