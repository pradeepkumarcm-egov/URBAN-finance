import { Toast, FormComposerV2 } from "@egovernments/digit-ui-components";
import React, { useState, useEffect, useRef } from "react";
import createDeathConfig from "./createDeathConfig";
import { useHistory } from "react-router-dom";
import { Header } from "@egovernments/digit-ui-react-components";

export const CreateDeath = () => {
  const [permanent, setPermanent] = useState(false);
  const [sameAddressChecked, setSameAddressChecked] = useState(false);
  const [formConfig, setFormConfig] = useState(createDeathConfig);
  const setValueRef = useRef(null);
  const prevLegacyCheckboxRef = useRef(false);
  const prevCheckboxRef = useRef(false);

  // New state to control submit button disable specifically for date validation error
  const [isSubmitDisabledByDateError, setIsSubmitDisabledByDateError] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const history = useHistory();


  // Helper function to check date order validity
  // Returns true if valid or not enough info, false if invalid order
  const checkDateOrderValidity = (formData) => {
    const dobStr = formData.dob; // Assuming 'dob' is key for Date of Death
    const doRegStr = formData.doRegistration; // Assuming 'doRegistration' is key for Date of Registration

    if (dobStr && doRegStr) {
      const deathDate = new Date(dobStr);
      const regDate = new Date(doRegStr);

      if (isNaN(deathDate.getTime()) || isNaN(regDate.getTime())) {
        // If either input string is not a valid date, consider it "valid" for order checking.
        // Format validation should be handled by the field itself or FormComposerV2.
        return true;
      }
      return regDate >= deathDate;
    }
    // If one or both dates are not filled yet, the order validation doesn't apply.
    return true;
  };

  const updateConfigBasedOnCheckbox = (sameAddressChecked) => {
    return createDeathConfig.map((section) => {
      if (section.head === "Address of Deceased at the Time of Death") {
        return {
          ...section,
          body: section.body.map((field) => ({
            ...field,
            isMandatory: sameAddressChecked ? true : field.isMandatory,
          })),
        };
      }
      if (section.head === "Permanent Address of Deceased" && sameAddressChecked) {
        return null;
      }
      return section;
    }).filter(Boolean);
  };

  useEffect(() => {
    setFormConfig(createDeathConfig);
  }, []);

  const transformFormData = (formData) => {
    const toEpoch = (dateStr) => dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : undefined;

    const address = {
      buildingno: formData?.buildingNumber || "",
      houseno: formData?.houseNo || "",
      district: formData?.district || "",
      streetname: formData?.streetName || "",
      tehsil: formData?.tehsil || "",
      city: formData?.city || "",
      country: formData?.country || "",
      locality: formData?.locality || "",
      pinno: formData?.pincode || "",
      state: formData?.state || "",
    };

    const permanentAddress = {
      buildingno: formData?.permanentBuildingNumber || "",
      houseno: formData?.permanentHouseNo || "",
      district: formData?.permanentDistrict || "",
      streetname: formData?.permanentStreetName || "",
      tehsil: formData?.permanentTehsil || "",
      city: formData?.permanentCity || "",
      country: formData?.permanentCountry || "",
      locality: formData?.permanentLocality || "",
      pinno: formData?.permanentPincode || "",
      state: formData?.permanentState || "",
    };

    return {
      age: String(formData?.age || ""),
      checkboxforaddress: !!formData["checkboxlabel"],
      counter: 1,
      dateofdeathepoch: toEpoch(formData?.dob),
      dateofreportepoch: toEpoch(formData?.doRegistration),
      deathFatherInfo: {
        firstname: formData?.["FirstName3"] || "",
        middlename: formData?.["MiddleName3"] || "",
        lastname: formData?.["LastName3"] || "",
        emailid: formData?.["EmailID2"] || "",
        mobileno: formData?.["MobileNumber2"] || "",
        aadharno: formData?.["AadharNumber3"] || "",
      },
      deathMotherInfo: {
        firstname: formData?.["FirstName4"] || "",
        middlename: formData?.["MiddleName4"] || "",
        lastname: formData?.["LastName4"] || "",
        emailid: formData?.["emailId3"] || "",
        mobileno: formData?.["mobileNumber3"] || "",
        aadharno: formData?.["AadharNumber4"] || "",
      },
      deathSpouseInfo: {
        firstname: formData?.["FirstName2"] || "",
        middlename: formData?.["MiddleName2"] || "",
        lastname: formData?.["LastName2"] || "",
        emailid: formData?.["EmailID"] || "",
        mobileno: formData?.["MobileNumber"] || "",
        aadharno: formData?.["AadharNumber2"] || "",
      },
      deathPermaddr: formData?.sameAddressCheckbox ? address : permanentAddress,
      deathPresentaddr: address,
      eidno: formData?.["EIDNumber"] || "",
      excelrowindex: -1,
      firstname: formData?.["FirstName"] || "",
      middlename: formData?.["MiddleName"] || "",
      lastname: formData?.["LastName"] || "",
      genderStr: formData?.["Gender"]?.code || "",
      hospitalname: formData?.["HospitalName"] || "Unknown",
      icdcode: formData?.["ICDCode"] || "",
      informantsname: formData?.["informantName"] || "",
      informantsaddress: formData?.["informantAddress"] || "",
      isLegacyRecord: !!formData["checkboxlabel"],
      registrationno: formData["checkboxlabel"] ? formData?.["RegistrationNumber"] || "" : "",
      nationality: formData?.["Nationality"] || "",
      placeofdeath: formData?.["DeathPlace"] || "",
      aadharno: formData?.["AadharNumber"] || "",
      religion: formData?.["Religion"] || "",
      remarks: formData?.["remarks"] || "",
      tenantid: Digit.ULBService.getCurrentTenantId(),
    };
  };

  const reqCreate = {
    url: "/birth-death-services/common/savedeathimport",
    params: { tenantId: Digit.ULBService.getCurrentTenantId() },
    body: {},
    config: { enabled: true }, // This usually controls if the hook is ready to fire, not the button
  };

  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCreate);

  const onSubmit = async (formData) => {
    // Perform date validation on submit
    if (!checkDateOrderValidity(formData)) {
      setShowToast({ key: "error", label: "Date of Registration must be on or after Date of Death." });
      setIsSubmitDisabledByDateError(true); // Disable button
      return; // Stop submission
    }

    // If date validation passes, ensure button is not disabled by our custom logic
    setIsSubmitDisabledByDateError(false);
    console.log("Form submitted with data:", formData);

    const payload = {
      deathCerts: [transformFormData(formData)],
    };
    console.log("Payload:.................", payload);

    await mutation.mutate(
      {
        url: "/birth-death-services/common/savedeathimport",
        params: { tenantId: Digit.ULBService.getCurrentTenantId() },
        body: payload,
      },
      {
        onSuccess: (response) => {
          console.log("API Response:", response);
          setShowToast({ key: "success", label: "Death Certificate Created Successfully" });
        },
        onError: (error) => {
          console.error("API Error:", error);
          setShowToast({ key: "error", label: "Failed to Create Death Certificate" });
        },
      }
    );
  };

  return (
    <React.Fragment>
      <Header>Create Death Certificates</Header>
      <div className="jk-header-btn-wrapper">
        <Header>New Registration</Header>
        <p>(*) marked items are mandatory</p>
      </div>
      <FormComposerV2
        config={formConfig.map((conf, i) => ({
          ...conf,
          head: conf.head,
          body: conf.body.map((field, index) => ({
            ...field,
            key: field.populators?.name || `${conf.head}-${index}`,
          })),
        }))}
        // The button is disabled if isSubmitDisabledByDateError is true.
        // FormComposerV2 might have its own internal logic for disabling based on mandatory fields,
        // which should ideally work in conjunction.
        isDisabled={isSubmitDisabledByDateError}
        label="SUBMIT"
        onSubmit={onSubmit}
        showSecondaryLabel={true}
        onFormValueChange={(setValue, formData, formState) => {
          setValueRef.current = setValue;

          // If the submit button was previously disabled due to a date error,
          // check if the dates are now valid. If so, re-enable the button.
          if (isSubmitDisabledByDateError) {
            if (checkDateOrderValidity(formData)) {
              setIsSubmitDisabledByDateError(false); // Re-enable button
            }
          }

          // --- Existing logic for checkboxes ---
          const isSameAddressChecked = !!formData["sameAddressCheckbox"];
          if (prevCheckboxRef.current !== isSameAddressChecked) {
            prevCheckboxRef.current = isSameAddressChecked;
            setSameAddressChecked(isSameAddressChecked);
            setPermanent(isSameAddressChecked);
            const updatedConfig = updateConfigBasedOnCheckbox(isSameAddressChecked);
            setFormConfig(updatedConfig);
          }

          const isLegacy = !!formData["checkboxlabel"];
          if (prevLegacyCheckboxRef.current !== isLegacy) {
            prevLegacyCheckboxRef.current = isLegacy;
            const updatedForm = formConfig.map(section => ({
              ...section,
              body: section.body.map(field => {
                if (field.populators?.name === "RegistrationNumber") {
                  return {
                    ...field,
                    disable: !isLegacy,
                    isMandatory: isLegacy,
                    validation: { ...(field.validation || {}), required: isLegacy },
                    populators: {
                      ...field.populators,
                      error: isLegacy ? (field.populators?.label ? `${field.populators.label} is Required!` : "Registration Number is Required!") : undefined,
                    },
                  };
                }
                return field;
              })
            }));
            setFormConfig(updatedForm);
          }
        }}
        secondaryLabel={"Reset"}
        actionClassName={"actionBarClass microplan-actionbar"}
        onSecondayActionClick={() => {
          if (setValueRef.current) {
            const allNames = formConfig.flatMap(section =>
              section.body.map(field => field.populators?.name).filter(Boolean)
            );
            const defaultValues = { "sameAddressCheckbox": false, "checkboxlabel": false };
            allNames.forEach(name => {
              setValueRef.current(name, defaultValues[name] !== undefined ? defaultValues[name] : "");
            });
            setValueRef.current("sameAddressCheckbox", false);
            setValueRef.current("checkboxlabel", false);

            setSameAddressChecked(false);
            setPermanent(false);
            prevCheckboxRef.current = false;
            prevLegacyCheckboxRef.current = false;

            const originalConfig = createDeathConfig;
            const resetConfigAfterAddress = updateConfigBasedOnCheckbox(false);
            const finalResetConfig = resetConfigAfterAddress.map(section => ({
                ...section,
                body: section.body.map(field => {
                  if (field.populators?.name === "RegistrationNumber") {
                    return {
                      ...field,
                      disable: true,
                      isMandatory: false,
                      validation: { ...(field.validation || {}), required: false },
                      populators: { ...field.populators, error: undefined },
                    };
                  }
                  return field;
                })
              }));
            setFormConfig(finalResetConfig);
            setIsSubmitDisabledByDateError(false); 
          }
        }}
      />
      {showToast && (
        <Toast
          style={{ zIndex: 10001 }}
          label={showToast.label}
          type={showToast.key}
          error={showToast.key === "error"}
          onClose={() => setShowToast(null)}
        />
      )}
    </React.Fragment>
  );
};