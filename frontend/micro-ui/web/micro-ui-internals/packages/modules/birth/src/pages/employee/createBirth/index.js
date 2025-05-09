import { FormComposerV2, Header, Toast } from "@egovernments/digit-ui-components";
import React, { useState, useEffect, useRef } from "react";
import { BirthConfig } from "./config/BirthConfig";

export const CreateBirth = () => {
  const [formConfig, setFormConfig] = useState(BirthConfig);
  const [permanent, setPermanent] = useState(false);
  const [sameAddressChecked, setSameAddressChecked] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [legacy, setLegacy] = useState(false);

  const setValueRef = useRef(null);
  const payloadRef = useRef(null);
  const prevCheckboxRef = useRef(false);

  const updateConfigBasedOnCheckbox = (sameAddressChecked, legacy) => {
    console.log("Updating config based on checkbox:", sameAddressChecked);
    console.log("Legacy checkbox value:", legacy);

    return BirthConfig.map((section) => {
      if (section.head === "Registration Details") {
        return {
          ...section,
          body: section.body.map((field) => {
            if (field.populators?.name === "registration_number") {
              return {
                ...field,
                disable: !legacy,
              };
            }
            return field;
          }),
        };
      }
      if (section.head === "Address of Parents at the Time of Birth") {
        return {
          ...section,
          body: section.body.map((field) => ({
            ...field,
            isMandatory: sameAddressChecked ? true : field.isMandatory,
          })),
        };
      }
      if (section.head === "Permanent Address of Parents" && sameAddressChecked) {
        return null;
      }
      return section;
    }).filter(Boolean);
  };

  const { revalidate } = Digit.Hooks.useCustomAPIHook(
    "/birth-death-services/common/savebirthimport",
    { tenantId: Digit.ULBService.getCurrentTenantId() },
    () => payloadRef.current,
    {
      manual: true,
      auth: true,
    }
  );

  const toEpoch = (dateStr) => (dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : undefined);

  const transformPayload = (formData) => {
    const address = {
      buildingno: formData?.birth_building_number || "",
      houseno: formData?.birth_house_no || "",
      district: formData?.birth_district || "",
      streetname: formData?.birth_street_name || "",
      tehsil: formData?.birth_tehsil || "",
      city: formData?.birth_city || "",
      country: formData?.birth_country || "",
      locality: formData?.birth_locality || "",
      pinno: formData?.birth_pincode || "",
      state: formData?.birth_state || "",
    };

    const permanentAddress = {
      buildingno: formData?.permanent_building_number || "",
      houseno: formData?.permanent_house_no || "",
      district: formData?.permanent_district || "",
      streetname: formData?.permanent_street_name || "",
      tehsil: formData?.permanent_tehsil || "",
      city: formData?.permanent_city || "",
      country: formData?.permanent_country || "",
      locality: formData?.permanent_locality || "",
      pinno: formData?.permanent_pincode || "",
      state: formData?.permanent_state || "",
    };

    return {
      checkboxforaddress: !!formData["same_as_permanent_address"],
      registrationno: formData["registration_number"] || "",
      hospitalname: formData["hospital_name"]?.name || "Unknown",
      dateofreportepoch: toEpoch(formData["date_of_registration"]),
      dateofbirthepoch: toEpoch(formData["date_of_birth"]),
      firstname: formData["child_first_name"] || "",
      middlename: formData["child_middle_name"] || "",
      lastname: formData["child_last_name"] || "",
      genderStr: formData["gender"]?.name || "",
      birthFatherInfo: {
        firstname: formData["father_first_name"] || "",
        middlename: formData["father_middle_name"] || "",
        lastname: formData["father_last_name"] || "",
        emailid: formData["father_email_id"] || "",
        mobileno: formData["father_mobile_number"] || "",
        nationality: formData["father_nationality"] || "",
        aadharno: formData["father_aadhar_number"] || "",
        education: formData["father_education"] || "",
        proffession: formData["father_profession"] || "",
        religion: formData["father_religion"] || "",
      },
      birthMotherInfo: {
        firstname: formData["mother_first_name"] || "",
        middlename: formData["mother_middle_name"] || "",
        lastname: formData["mother_last_name"] || "",
        emailid: formData["mother_email_id"] || "",
        mobileno: formData["mother_mobile_number"] || "",
        nationality: formData["mother_nationality"] || "",
        aadharno: formData["mother_aadhar_number"] || "",
        education: formData["mother_education"] || "",
        proffession: formData["mother_profession"] || "",
        religion: formData["mother_religion"] || "",
      },
      birthPresentaddr: address,
      birthPermaddr: formData?.same_as_permanent_address ? address : permanentAddress,
      placeofbirth: formData["birth_place"] || "",
      informantsname: formData["informant_name"] || "",
      informantsaddress: formData["informant_address"] || "",
      remarks: formData["remarks"] || "",
      tenantid: Digit.ULBService.getCurrentTenantId(),
    };
  };

  const onSubmit = async (formData) => {
    payloadRef.current = {
      RequestInfo: {
        apiId: "Mihy",
        ver: ".01",
        action: "savebirthimport",
        did: "1",
        key: "",
        msgId: "20170310130900|en_IN",
        requesterId: "",
        authToken: Digit.UserService.getUser()?.accessToken || "",
      },
      birthCerts: [transformPayload(formData)],
    };
    try {
      await revalidate();
      setShowToast({ key: "success", label: "Birth Certificate Created Successfully" });
    } catch (error) {
      console.error("API Error:", error);
      setShowToast({ key: "error", label: "Failed to Create Birth Certificate" });
    }
  };

  return (
    <React.Fragment>
      <Header>Create Birth Certificate</Header>
      <FormComposerV2
        config={formConfig.map((conf, i) => ({
          head: conf.head,
          body: conf.body.map((field, j) => {
            // Dynamically set the disable property for the registration_number field based on the legacy state
            if (field.populators?.name === "registration_number") {
              return { ...field, disable: !legacy };
            }
            return { ...field, key: `${i}-${j}` };
          }),
        }))}
        label="Submit"
        showSecondaryLabel={true}
        secondaryLabel="Reset"
        actionClassName="actionBarClass microplan-actionbar"
        onSubmit={onSubmit}
        onFormValueChange={(setValue, formData) => {
          setValueRef.current = setValue;
          const isLegacy = !!formData["checkbox_legacy"];

          // Update the legacy state only when it changes
          if (legacy !== isLegacy) {
            setLegacy(isLegacy);
          }
        }}
        onSecondayActionClick={() => {
          if (setValueRef.current) {
            const allNames = formConfig.flatMap((section) => section.body.map((field) => field.populators?.name).filter(Boolean));
            allNames.forEach((name) => {
              setValueRef.current(name, "");
            });
            setLegacy(false); // Reset legacy state
            setSameAddressChecked(false);
            setPermanent(false);
          }
        }}
        defaultValues={{
          checkbox_legacy: legacy,
          same_as_permanent_address: sameAddressChecked,
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
