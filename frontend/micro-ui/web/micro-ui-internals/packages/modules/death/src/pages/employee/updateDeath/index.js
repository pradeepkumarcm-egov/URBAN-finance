import React, { useEffect, useState ,useRef} from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FormComposerV2, Header, Toast } from "@egovernments/digit-ui-components";
import createDeathConfig from "../createDeath/createDeathConfig";

const UpdateDeath = () => {
  const location = useLocation();
  const history = useHistory();
  const editData = location.state?.editdata;
  const certificateId = location.state?.certificateId;
  const [formConfig, setFormConfig] = useState(createDeathConfig);
  const [initialValues, setInitialValues] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [sameAddressChecked, setSameAddressChecked] = useState(false);
  const prevCheckboxRef = useRef(false);


  // API mutation for update
  const reqUpdate = {
    url: "/birth-death-services/common/updatedeathimport",
    params: { tenantId: Digit.ULBService.getCurrentTenantId() },
    body: {},
    config: { enabled: false } // Disable auto-call
  };
  
  const mutation = Digit.Hooks.useCustomAPIMutationHook(reqUpdate);

  const updateConfigBasedOnCheckbox = (sameAddressChecked) => {
    // Update form configuration based on checkbox state
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
      // Hide Permanent Address section when the checkbox is checked
      if (section.head === "Permanent Address of Deceased" && sameAddressChecked) {
        return null;
      }
      return section;
    }).filter(Boolean); // Remove null (hidden sections)
  };


  const genderOptions = [
        { code: "MALE", name: "COMMON_GENDER_MALE" },
        { code: "FEMALE", name: "COMMON_GENDER_FEMALE" },
        { code: "TRANSGENDER", name: "COMMON_GENDER_TRANSGENDER" }
      ];

      const getMdmsGenderOption = (genderNum) => {
        switch (genderNum) {
          case 1: return genderOptions.find(opt => opt.code === "MALE");
          case 2: return genderOptions.find(opt => opt.code === "FEMALE");
          case 3: return genderOptions.find(opt => opt.code === "TRANSGENDER");
          default: return undefined;
        }
      };


       useEffect(() => {
  if (editData) {
    const transformedData = transformApiDataToForm(editData);

    // Overwrite Gender field with the correct MDMS object
    transformedData.Gender = getMdmsGenderOption(editData.gender);

    setInitialValues(transformedData);

    const sameAddress = !!transformedData.sameAddressCheckbox;
    setSameAddressChecked(sameAddress);

    const isLegacy = !!editData?.isLegacyRecord;

    const updatedConfig = createDeathConfig.map((section) => ({
      ...section,
      body: section.body.map((field) => {
        if (field.populators?.name === "RegistrationNumber") {
          return {
            ...field,
            disable: !isLegacy,
            isMandatory: isLegacy,
          };
        }

        if (field.populators?.name === "HospitalName") {
          return {
            ...field,
            disable: true,
          };
        }

        return field;
      }),
    }));

    const finalConfig = updateConfigBasedOnCheckbox(sameAddress, updatedConfig);

    setFormConfig(finalConfig);
  }
}, [editData]);



      function filterConfig(config, hidePermanentFields) {
        return config.map(section => ({
          ...section,
          body: section.body.filter(field => {
            if (hidePermanentFields && field.populators?.name?.startsWith("permanent")) {
              return false;
            }
            return true;
          }),
        }));
      }

      const filteredConfig = filterConfig(formConfig, sameAddressChecked);

  const transformApiDataToForm = (apiData) => {

    const genderOptions = [
        { code: "MALE", name: "COMMON_GENDER_MALE" },
        { code: "FEMALE", name: "COMMON_GENDER_FEMALE" },
        { code: "TRANSGENDER", name: "COMMON_GENDER_TRANSGENDER" }
      ];

      const getMdmsGenderOption = (genderNum) => {
        switch (genderNum) {
          case 1: return genderOptions.find(opt => opt.code === "TRANSGENDER");
          case 2: return genderOptions.find(opt => opt.code === "MALE");
          case 3: return genderOptions.find(opt => opt.code === "FEMALE");
          default: return undefined;
        }
      };

  const convertToDate = (epoch) => {
      if (!epoch) return "";
      const date = new Date(epoch);
      return date.toISOString().split("T")[0]; // '2025-04-29'
    };

    const getGenderCode = (genderNum) => {
        switch (genderNum) {
          case 1:
            return "TRANSGENDER";
          case 2:
            return "MALE";
          case 3:
            return "FEMALE";
          default:
            return "";
        }
      };


  return {
    // Legacy
    checkboxlabel: apiData?.isLegacyRecord || false,

    // Registration Details
    RegistrationNumber: apiData?.registrationno || "",
    HospitalName: apiData?.hospitalname || "",
    doRegistration: convertToDate(apiData.dateofreport),

    // Information of the Deceased
    dob: convertToDate(apiData.dateofdeath),
    Gender: getMdmsGenderOption(apiData?.gender),
    // Gender: apiData?.genderStr && apiData?.gender
    //   ? { code: getGenderCode(apiData.gender), name: apiData.genderStr }
    //   : undefined,
    age: apiData?.age || "",
    FirstName: apiData?.firstname || "",
    MiddleName: apiData?.middlename || "",
    LastName: apiData?.lastname || "",
    EIDNumber: apiData?.eidno || "",
    AadharNumber: apiData?.aadharno || "",
    Nationality: apiData?.nationality || "",
    Religion: apiData?.religion || "",

    // Information of Death
    DeathPlace: apiData?.placeofdeath || "",
    ICDCode: apiData?.icdcode || "",

    // Spouse Information
    FirstName2: apiData?.deathSpouseInfo?.firstname || "",
    MiddleName2: apiData?.deathSpouseInfo?.middlename || "",
    LastName2: apiData?.deathSpouseInfo?.lastname || "",
    AadharNumber2: apiData?.deathSpouseInfo?.aadharno || "",
    EmailID: apiData?.deathSpouseInfo?.emailid || "",
    MobileNumber: apiData?.deathSpouseInfo?.mobileno || "",

    // Father's Information
    FirstName3: apiData?.deathFatherInfo?.firstname || "",
    MiddleName3: apiData?.deathFatherInfo?.middlename || "",
    LastName3: apiData?.deathFatherInfo?.lastname || "",
    AadharNumber3: apiData?.deathFatherInfo?.aadharno || "",
    EmailID2: apiData?.deathFatherInfo?.emailid || "",
    MobileNumber2: apiData?.deathFatherInfo?.mobileno || "",

    // Mother's Information
    FirstName4: apiData?.deathMotherInfo?.firstname || "",
    MiddleName4: apiData?.deathMotherInfo?.middlename || "",
    LastName4: apiData?.deathMotherInfo?.lastname || "",
    AadharNumber4: apiData?.deathMotherInfo?.aadharno || "",
    emailId3: apiData?.deathMotherInfo?.emailid || "",
    mobileNumber3: apiData?.deathMotherInfo?.mobileno || "",

    ...transformAddressData(apiData),
    informantName: apiData?.informantsname || "",
    informantAddress: apiData?.informantsaddress || "",
    remarks: apiData?.remarks || "",
  };
};

  
const transformAddressData = (apiData) => {
    const presentAddr = apiData?.deathPresentaddr || {};
    const permAddr = apiData?.deathPermaddr || {};
    const isSameAddress = JSON.stringify(presentAddr) === JSON.stringify(permAddr);
    console.log("isSameAddress", isSameAddress);

    return {
      buildingNumber: presentAddr?.buildingno || "",
      houseNo: presentAddr?.houseno || "",
      streetName: presentAddr?.streetname || "",
      locality: presentAddr?.locality || "",
      tehsil: presentAddr?.tehsil || "",
      district: presentAddr?.district || "",
      city: presentAddr?.city || "",
      state: presentAddr?.state || "",
      country: presentAddr?.country || "",
      pincode: presentAddr?.pinno || "",
      sameAddressCheckbox: isSameAddress,
      permanentBuildingNumber: isSameAddress ? "" : permAddr?.buildingno || "",
      permanentHouseNo: isSameAddress ? "" : permAddr?.houseno || "",
      permanentStreetName: isSameAddress ? "" : permAddr?.streetname || "",
      permanentLocality: isSameAddress ? "" : permAddr?.locality || "",
      permanentTehsil: isSameAddress ? "" : permAddr?.tehsil || "",
      permanentDistrict: isSameAddress ? "" : permAddr?.district || "",
      permanentCity: isSameAddress ? "" : permAddr?.city || "",
      permanentState: isSameAddress ? "" : permAddr?.state || "",
      permanentCountry: isSameAddress ? "" : permAddr?.country || "",
      permanentPincode: isSameAddress ? "" : permAddr?.pinno || ""
    };
  };


  const mapGenderToPayload = (genderObj) => {
  if (!genderObj || !genderObj.code) return { gender: null, genderStr: "" };
  switch (genderObj.code.toUpperCase()) {
    case "MALE": return { gender: 1, genderStr: "Male" };
    case "FEMALE": return { gender: 2, genderStr: "Female" };
    case "TRANSGENDER": return { gender: 3, genderStr: "Transgender" };
    default: return { gender: null, genderStr: "" };
  }
};



  const transformFormDataForUpdate = (formData) => {
    console.log("Form data gender:", formData?.Gender);
    console.log("Mapped gender:", mapGenderToPayload(formData?.Gender));

    const { gender, genderStr } = mapGenderToPayload(formData?.Gender);

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

    const permanentAddress = formData?.sameAddressCheckbox ? address : {
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
      id: certificateId, 
      age: String(formData?.age || ""),
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
      deathPermaddr: permanentAddress,
      deathPresentaddr: address,
      eidno: formData?.["EIDNumber"] || "",
      excelrowindex: -1,
      firstname: formData?.["FirstName"] || "",
      middlename: formData?.["MiddleName"] || "",
      lastname: formData?.["LastName"] || "",
      gender,
      genderStr,
      hospitalname: formData?.["HospitalName"] || "Unknown",
      icdcode: formData?.["ICDCode"] || "",
      informantsname: formData?.["informantName"] || "",
      informantsaddress: formData?.["informantAddress"] || "",
      isLegacyRecord: !!formData["checkboxlabel"],
      registrationno: formData["checkboxlabel"] ? formData?.["RegistrationNumber"] || "" : "",
      aadharno: formData?.["AadharNumber"] || "",
      nationality: formData?.["Nationality"] || "",
      placeofdeath: formData?.["DeathPlace"] || "",
      religion: formData?.["Religion"] || "",
      remarks: formData?.["remarks"] || "",
      tenantid: Digit.ULBService.getCurrentTenantId(),
    };
  };

  const onSubmit = async (formData) => {
    console.log("Form data before transformation:", formData);
    const payload = {
      deathCerts: [transformFormDataForUpdate(formData)]
    };

    console.log("Final payload sent:", payload);


    await mutation.mutate(
      {
        url: "/birth-death-services/common/updatedeathimport",
        params: { tenantId: Digit.ULBService.getCurrentTenantId() },
        body: payload,
        config: { enabled: true },
      },
      {
        onSuccess: (response) => {
          setShowToast({ key: "success", label: "Death Certificate Updated Successfully" });
          setTimeout(() =>history.push(`/${window.contextPath}/employee/death/death-common/getCertificate`, 1000)); 
          
        },
        onError: (error) => {
          setShowToast({ key: "error", label: "Failed to Update Death Certificate" });
        },
      }
    );
  };

  console.log("Initial form values:", initialValues);


  if (!initialValues) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <Header>Update Death Certificate</Header>
      <FormComposerV2
        config={filteredConfig}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        label="UPDATE"
        showSecondaryLabel={false}
       onFormValueChange={(setValue, formData) => {

        const isSameAddressChecked = !!formData["sameAddressCheckbox"];
        console.log("isSameAddressChecked", isSameAddressChecked);
        if (prevCheckboxRef.current !== isSameAddressChecked) {
          prevCheckboxRef.current = isSameAddressChecked;
          setSameAddressChecked(isSameAddressChecked);

          // Update config to hide/show permanent address section
          const updatedConfig = updateConfigBasedOnCheckbox(isSameAddressChecked);
          setFormConfig(updatedConfig);
        }
      }}
      />
      {showToast && (
        <Toast
          label={showToast.label}
          isDismissBtn={true}
          onClose={() => setShowToast(null)}
          error={showToast.key === "error"}
          warning={false}
        />
      )}
    </React.Fragment>
  );
};

export default UpdateDeath;