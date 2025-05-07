// import {  Toast,FormComposerV2} from "@egovernments/digit-ui-components";
// import React, { useState,useEffect, useRef } from "react";
// import createDeathConfig from "./createDeathConfig";
// import { useHistory } from "react-router-dom";
// import { Header, Button,SubmitBar} from "@egovernments/digit-ui-react-components";

// export const CreateDeath = () => {
//   const [permanent, setPermanent] = useState(false);
//   const [sameAddressChecked, setSameAddressChecked] = useState(false);
//   const [formConfig, setFormConfig] = useState(createDeathConfig);
//   const setValueRef = useRef(null);


//   // console.log("Permanent Address of Deceased: ", permanent);

//   const updateConfigBasedOnCheckbox = (sameAddressChecked) => {
//     // Update form configuration based on checkbox state
//     return createDeathConfig.map((section) => {
//       if (section.head === "Address of Deceased at the Time of Death") {
//         return {
//           ...section,
//           body: section.body.map((field) => ({
//             ...field,
//             isMandatory: sameAddressChecked ? true : field.isMandatory, 
//           })),
//         };
//       }
//       // Hide Permanent Address section when the checkbox is checked
//       if (section.head === "Permanent Address of Deceased" && sameAddressChecked) {
//         return null;
//       }
//       return section;
//     }).filter(Boolean); // Remove null (hidden sections)
//   };

//   useEffect(() => {
//     setFormConfig(createDeathConfig);
//   }, []);

//   const prevCheckboxRef = useRef(false);

//   const transformFormData = (formData) => {
//     const toEpoch = (dateStr) => dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : undefined;

//     const address = {
//       buildingno: formData?.buildingNumber || "",
//       houseno: formData?.houseNo || "",
//       district: formData?.district || "",
//       streetname: formData?.streetName || "",
//       tehsil: formData?.tehsil || "",
//       city: formData?.city || "",
//       country: formData?.country || "",
//       locality: formData?.locality || "",
//       pinno: formData?.pincode || "",
//       state: formData?.state || "",
//     };

//     const permanentAddress = {
//       buildingno: formData?.permanentBuildingNumber || "",
//       houseno: formData?.permanentHouseNo || "",
//       district: formData?.permanentDistrict || "",
//       streetname: formData?.permanentStreetName || "",
//       tehsil: formData?.permanentTehsil || "",
//       city: formData?.permanentCity || "",
//       country: formData?.permanentCountry || "",
//       locality: formData?.permanentLocality || "",
//       pinno: formData?.permanentPincode || "",
//       state: formData?.permanentState || "",
//     };
  
//     return {
//       age: String(formData?.age || ""),
//       checkboxforaddress: !!formData["checkbox-label"],
//       counter: 1,
//       dateofdeathepoch: toEpoch(formData?.dob), 
//       dateofreportepoch: toEpoch(formData?.doRegistration),
//       deathFatherInfo: {
//         firstname: formData?.["Father First Name"] || "",
//         lastname: formData?.["Father Last Name"] || "",
//       },
//       deathMotherInfo: {
//         firstname: formData?.["Mother First Name"] || "",
//         lastname: formData?.["Mother Last Name"] || "",
//       },
//       deathSpouseInfo: {
//         firstname: formData?.["Spouse First Name"] || "",
//         lastname: formData?.["Spouse Last Name"] || "",
//       },
//       deathPermaddr: formData?.sameAddressCheckbox ? address : permanentAddress,
//       deathPresentaddr: address,
//       excelrowindex: -1,
//       firstname: formData?.["First Name"] || "",
//       lastname: formData?.["Last Name"] || "",
//       genderStr: formData?.["2-1"]?.code || "", 
//       hospitalname: formData?.["Hospital Name"] || "Unknown",
//       isLegacyRecord: true,
//       nationality: formData?.["Nationality"] || "",
//       placeofdeath: formData?.["Death Place"] || "",
//       registrationno: formData?.["Registration Number"] || "",
//       tenantid: Digit.ULBService.getCurrentTenantId(),
//     };
//   };
  
//   const [showToast, setShowToast] = useState(null);
//   const history = useHistory();

//   const reqCreate = {
//     url: "/birth-death-services/common/savedeathimport",
//     params: { tenantId: Digit.ULBService.getCurrentTenantId() },
//     body: {},
//     config: { enabled: true },
//   };

//   const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCreate);

  

//   const onSubmit = async (formData) => {
//     console.log("Form submitted with data:", formData);

//     const payload = {
//       RequestInfo: {
//         apiId: "Mihy",
//         ver: ".01",
//         action: "savedeathimport",
//         did: "1",
//         key: "",
//         msgId: "20170310130900|en_IN",
//         requesterId: "",
//         authToken: Digit.UserService.getUser()?.accessToken || "",
//       },
//       deathCerts: [transformFormData(formData)], 
//     };

//     console.log("Payload:.................", payload);

//     await mutation.mutate(
//       {
//         url: "/birth-death-services/common/savedeathimport",
//         params: { tenantId: "pg.citya" },
//         body: payload,
//         config: { enabled: true },
//       },
//       {
//         onSuccess: (response) => {
//           console.log("API Response:", response);
//           setShowToast({ key: "success", label: "Death Certificate Created Successfully" });
//           // history.push(`/${window.contextPath}/employee/death-employee/acknowledgement`);
//         },
//         onError: (error) => {
//           console.error("API Error:", error);
//           setShowToast({ key: "error", label: "Failed to Create Death Certificate" });
//         },
//       }
//     );
//   };

//   return (
//     <React.Fragment>
//       <Header>Create Death Certificates</Header>
//       <div className="jk-header-btn-wrapper">
//         <Header>New Registration</Header>
//         <p>(*) marked items are mandatory</p>
//       </div>
//       <FormComposerV2
//         config={formConfig.map((conf, i) => ({
//           head: conf.head,
//           body: conf.body.map((field, index) => ({
//             ...field,
//             key: `${i}-${index}`,
//           })),
//         }))}
//         label="SUBMIT"
//         onSubmit={onSubmit}
//         showSecondaryLabel={true}
//         onFormValueChange={(setValue, formData) => {
//           setValueRef.current = setValue;
//           const isChecked = !!formData["sameAddressCheckbox"];

//           if (prevCheckboxRef.current !== isChecked) {
//             prevCheckboxRef.current = isChecked;
//             setSameAddressChecked(isChecked);
//             setPermanent(isChecked);

//             const updatedConfig = updateConfigBasedOnCheckbox(isChecked);
//             setFormConfig(updatedConfig);
//           }
//         }}
//         secondaryLabel={"Reset"}
//         actionClassName={"actionBarClass microplan-actionbar"}
//         onSecondayActionClick={() => {
//           if (setValueRef.current) {
//             const allNames = formConfig.flatMap(section =>
//               section.body.map(field => field.populators?.name).filter(Boolean)
//             );

//             allNames.forEach(name => {
//               setValueRef.current(name, ""); // Clear each field
//             });

//             // Reset checkbox and related state if needed
//             setSameAddressChecked(false);
//             setPermanent(false);

//             const resetConfig = updateConfigBasedOnCheckbox(false);
//             setFormConfig(resetConfig);
//           }
//         }}
//       />
//       {showToast && (
//         <Toast
//           style={{ zIndex: 10001 }}
//           label={showToast.label}
//           type={showToast.key}
//           error={showToast.key === "error"}
//           onClose={() => setShowToast(null)}
//         />
//       )}
//     </React.Fragment>
//   );
// };



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
  const payloadRef = useRef(null);
  const prevLegacyCheckboxRef = useRef(false);


  const { revalidate, data, isLoading, error } = Digit.Hooks.useCustomAPIHook(
    "/birth-death-services/common/savedeathimport",
    { tenantId: Digit.ULBService.getCurrentTenantId() },
    () => payloadRef.current,
    {
      manual: true,
      auth: true,
    }
  );

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

  const prevCheckboxRef = useRef(false);

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
      checkboxforaddress: !!formData["checkbox-label"],
      counter: 1,
      dateofdeathepoch: toEpoch(formData?.dob),
      dateofreportepoch: toEpoch(formData?.doRegistration),
      deathFatherInfo: {
        firstname: formData?.["Father First Name"] || "",
        lastname: formData?.["Father Last Name"] || "",
      },
      deathMotherInfo: {
        firstname: formData?.["Mother First Name"] || "",
        lastname: formData?.["Mother Last Name"] || "",
      },
      deathSpouseInfo: {
        firstname: formData?.["Spouse First Name"] || "",
        lastname: formData?.["Spouse Last Name"] || "",
      },
      deathPermaddr: formData?.sameAddressCheckbox ? address : permanentAddress,
      deathPresentaddr: address,
      excelrowindex: -1,
      firstname: formData?.["First Name"] || "",
      lastname: formData?.["Last Name"] || "",
      genderStr: formData?.["2-1"]?.code || "",
      hospitalname: formData?.["Hospital Name"] || "Unknown",
      isLegacyRecord: true,
      nationality: formData?.["Nationality"] || "",
      placeofdeath: formData?.["Death Place"] || "",
      registrationno: formData?.["Registration Number"] || "",
      tenantid: Digit.ULBService.getCurrentTenantId(),
    };
  };

  const [showToast, setShowToast] = useState(null);
  const history = useHistory();

  const onSubmit = async (formData) => {
    payloadRef.current = {
      RequestInfo: {
        apiId: "Mihy",
        ver: ".01",
        action: "savedeathimport",
        did: "1",
        key: "",
        msgId: "20170310130900|en_IN",
        requesterId: "",
        authToken: Digit.UserService.getUser()?.accessToken || "",
      },
      deathCerts: [transformFormData(formData)],
    };

    try {
      await revalidate();
      setShowToast({ key: "success", label: "Death Certificate Created Successfully" });
    } catch (error) {
      console.error("API Error:", error);
      setShowToast({ key: "error", label: "Failed to Create Death Certificate" });
    }
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
          head: conf.head,
          body: conf.body.map((field, index) => ({
            ...field,
            key: `${i}-${index}`,
          })),
        }))}
        label="SUBMIT"
        onSubmit={onSubmit}
        showSecondaryLabel={true}
        // onFormValueChange={(setValue, formData) => {
        //   setValueRef.current = setValue;
        //   const isChecked = !!formData["sameAddressCheckbox"];

        //   if (prevCheckboxRef.current !== isChecked) {
        //     prevCheckboxRef.current = isChecked;
        //     setSameAddressChecked(isChecked);
        //     setPermanent(isChecked);

        //     const updatedConfig = updateConfigBasedOnCheckbox(isChecked);
        //     setFormConfig(updatedConfig);
        //   }
        // }}
        onFormValueChange={(setValue, formData) => {
          setValueRef.current = setValue;

          const isSameAddressChecked = !!formData["sameAddressCheckbox"];
          if (prevCheckboxRef.current !== isSameAddressChecked) {
            prevCheckboxRef.current = isSameAddressChecked;
            setSameAddressChecked(isSameAddressChecked);
            setPermanent(isSameAddressChecked);

            const updatedConfig = updateConfigBasedOnCheckbox(isSameAddressChecked);
            setFormConfig(updatedConfig);
          }

          const isLegacy = !!formData["checkbox-label"];
          if (prevLegacyCheckboxRef.current !== isLegacy) {
            prevLegacyCheckboxRef.current = isLegacy;

            const updatedForm = formConfig.map(section => ({
              ...section,
              body: section.body.map(field => {
                if (field.populators?.name === "Registration Number") {
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

            allNames.forEach(name => {
              setValueRef.current(name, "");
            });

            setSameAddressChecked(false);
            setPermanent(false);

            const resetConfig = updateConfigBasedOnCheckbox(false);
            setFormConfig(resetConfig);
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