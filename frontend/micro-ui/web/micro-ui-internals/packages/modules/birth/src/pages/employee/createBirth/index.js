import React, { useEffect, useRef, useState } from "react";
import { Header, Toast } from "@egovernments/digit-ui-react-components";
import { FormComposerV2 } from "@egovernments/digit-ui-components";
import { BirthConfig } from "./config/BirthConfig";
import { useHistory } from "react-router-dom";

export const CreateBirth = () => {
  const [permanent, setPermanent] = useState(false);
  const [sameAddressChecked, setSameAddressChecked] = useState(false);
  const [formConfig, setFormConfig] = useState(BirthConfig);
  const setValueRef = useRef(null);
  const prevLegacyCheckboxRef = useRef(false);
  const [showToast, setShowToast] = useState(null);
  const history = useHistory();

  const prevCheckboxRef = useRef(false);

  const hospitalTenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading: hospitalListLoading, data: hospitalListData } = Digit.Hooks.useCustomMDMS(
    hospitalTenantId,
    "birth-death-service",
    [{ name: "hospitalList" }],
    {
      select: (data) => {
        const hospitalOptions = data?.["birth-death-service"]?.hospitalList
          ?.filter((hospital) => hospital.active === "true" || hospital.active === true)
          .map((hospital) => ({
            code: hospital.hospitalName,
            name: `COMMON_HOSPITAL_${hospital.hospitalName.replace(/\s+/g, "_").toUpperCase()}`,
            originalName: hospital.hospitalName,
          }));
        return {
          hospitalListOptions: hospitalOptions || [],
        };
      },
    }
  );

  useEffect(() => {
    if (hospitalListData?.hospitalListOptions) {
      setFormConfig((prevConfig) =>
        prevConfig.map((section) => ({
          ...section,
          body: section.body.map((field) => {
            if (field.populators?.name === "hospital_name") {
              return {
                ...field,
                populators: {
                  ...field.populators,
                  options: hospitalListData.hospitalListOptions,
                  optionsKey: field.populators.optionsKey || "name",
                  valueKey: field.populators.valueKey || "code",
                },
              };
            }
            return field;
          }),
        }))
      );
    }
  }, [hospitalListData]);

  const updateConfigBasedOnCheckbox = (sameAddressChecked) => {
    // Update form configuration based on checkbox state
    return BirthConfig.map((section) => {
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
  const reqCreate = {
    url: "/birth-death-services/common/savebirthimport",
    params: { tenantId: Digit.ULBService.getCurrentTenantId() },
    body: {},
    config: { enabled: true },
  };

  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCreate);

  const toEpoch = (dateStr) => (dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : undefined);

  const transformFormData = (formData) => {
    // Address fields based on input data
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
    const permanentAddrr = {
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

    // // If "same_as_permanent_address" is true, we will use the permanent address fields
    // if (formData?.same_as_permanent_address) {
    //   address.buildingno = formData?.birth_building_number || formData?.permanent_building_number;
    //   address.houseno = formData?.birth_house_no || formData?.permanent_house_no;
    //   address.district = formData?.birth_district || formData?.permanent_district;
    //   address.streetname = formData?.birth_street_name || formData?.permanent_street_name;
    //   address.tehsil = formData?.birth_tehsil || formData?.permanent_tehsil;
    //   address.city = formData?.birth_city || formData?.permanent_city;
    //   address.country = formData?.birth_country || formData?.permanent_country;
    //   address.locality = formData?.birth_locality || formData?.permanent_locality;
    //   address.pinno = formData?.birth_pincode || formData?.permanent_pincode;
    //   address.state = formData?.birth_state || formData?.permanent_state;
    // }

    return {
 
      dateofbirthepoch: toEpoch(formData?.date_of_birth),
      dateofreportepoch: toEpoch(formData?.date_of_registration),
      firstname: formData?.child_first_name || "",
      lastname: formData?.child_last_name || "",
      genderStr: formData?.gender?.code || "",
      checkboxforaddress: formData?.same_as_permanent_address | "",

      birthFatherInfo: {
        firstname: formData?.father_first_name || "",
        middlename: formData?.father_middle_name || "",
        lastname: formData?.father_last_name || "",
        aadharno: formData?.father_aadhar_number || "",
        emailid: formData?.father_email_id || "",
        mobileno: formData?.father_mobile_number || "",
        education: formData?.father_education || "",
        proffession: formData?.father_profession || "",
        nationality: formData?.father_nationality || "",
        religion: formData?.father_religion || "",
      },

      birthMotherInfo: {
        firstname: formData?.mother_first_name || "",
        middlename: formData?.mother_middle_name || "",
        lastname: formData?.mother_last_name || "",
        aadharno: formData?.mother_aadhar_number || "",
        emailid: formData?.mother_email_id || "",
        mobileno: formData?.mother_mobile_number || "",
        education: formData?.mother_education || "",
        proffession: formData?.mother_profession || "",
        nationality: formData?.mother_nationality || "",
        religion: formData?.mother_religion || "",
      },

      placeofbirth: formData?.birth_place || "",
      registrationno: formData?.registration_number || "",
      tenantid: Digit.ULBService.getCurrentTenantId(),
      birthPermaddr: address,
      informantsname: formData?.informant_name || "",
      informantsaddress: formData?.informant_address || "",

      birthPresentaddr: formData?.same_as_permanent_address ? address : permanentAddrr,
      hospitalname: formData?.hospital_name.code || "Unknown",
      nationality: formData?.father_nationality || formData?.mother_nationality || "",
      isLegacyRecord: !!formData?.checkbox_legacy,
      excelrowindex: -1,
      counter: 1,
      tenantid: Digit.ULBService.getCurrentTenantId(),
    };
  };

  const onSubmit = async (formData) => {
    console.log("Form submitted with data:", formData);

    const payload = {
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
      birthCerts: [transformFormData(formData)],
    };

    console.log("Payload:.................", payload);

    await mutation.mutate(
      {
        url: "/birth-death-services/common/savebirthimport",
        params: { tenantId: Digit.ULBService.getCurrentTenantId() },
        body: payload,
        config: { enabled: true },
      },
      {
        onSuccess: (response) => {
          console.log("API Response:", response);
          setShowToast({ key: "success", label: "Birth Certificate Created Successfully" });
        },
        onError: (error) => {
          console.error("API Error:", error);
          setShowToast({ key: "error", label: "Failed to Create Birth Certificate" });
        },
      }
    );
  };

  useEffect(() => {
    setFormConfig(BirthConfig);
  }, []);

  return (
    <React.Fragment>
      <Header>Create Birth Certificates</Header>
      <FormComposerV2
        config={formConfig.map((conf, i) => ({
          head: conf.head,
          body: conf.body.map((field, j) => ({
            ...field,
            key: `${i}-${j}`,
          })),
        }))}
        label="SUBMIT"
        onSubmit={onSubmit}
        showSecondaryLabel={true}
        onFormValueChange={(setValue, formData) => {
          setValueRef.current = setValue;

          const isLegacy = !!formData["checkbox_legacy"];
          const isSameAddressChecked = !!formData["same_as_permanent_address"];
          console.log("UPDATEING THE FORM", isLegacy, "*****", isSameAddressChecked);

          if (prevCheckboxRef.current !== isSameAddressChecked) {
            prevCheckboxRef.current = isSameAddressChecked;
            setSameAddressChecked(isSameAddressChecked);
            setPermanent(isSameAddressChecked);
            const updatedConfig = updateConfigBasedOnCheckbox(isSameAddressChecked);
            setFormConfig(updatedConfig);
          }
          if (prevLegacyCheckboxRef.current !== isLegacy) {
            prevLegacyCheckboxRef.current = isLegacy;

            const updatedForm = formConfig.map((section) => ({
              ...section,

              body: section.body.map((field) => {
                console.log("update form is called", field.populators?.name);
                if (field.populators?.name === "registration_number") {
                  console.log("update Registration Number form is called");
                  return {
                    ...field,
                    disable: !isLegacy,
                    isMandatory: isLegacy,
                    populators: {
                      ...field.populators,
                      error: isLegacy ? "Registration Number is Required!" : undefined,
                    },
                  };
                }

                return field;
              }),
            }));

            setFormConfig(updatedForm);
          }
        }}
        secondaryLabel="Reset"
        onSecondayActionClick={() => {
          if (setValueRef.current) {
            const allNames = formConfig.flatMap((section) => section.body.map((field) => field.populators?.name).filter(Boolean));
            allNames.forEach((name) => {
              setValueRef.current(name, "");
            });
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
