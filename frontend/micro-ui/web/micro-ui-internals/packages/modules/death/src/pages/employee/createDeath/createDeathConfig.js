const createDeathConfig = [
  {
    body: [
      {
        inline: true,
        isMandatory: false,
        type: "checkbox",
        disable: false,
        withoutLabel: true,
        populators: {
          name: "checkbox-label",
          title: "This is a Legacy Record",
        },
      },
    ],
  },
  {
    head: "Registration Details",
    body: [
      {
        inline: true,
        label: "Registration Number",
        type: "text",
        isMandatory: false,
        placeholder: "Registration Number",
        disable:true,
        populators: {
          name: "Registration Number",
          error: "Registration Number is Required!",
          validation: {
            minLength: 5,
            maxLength: 100,
            pattern: /^[A-Za-z0-9]+$/i, 
          },
        },
      },
      {
        isMandatory: false,
        key: "Hospital Name",
        type: "dropdown",
        label: "Enter Hospital Name",
        disable: false,
        placeholder: "Don't select if NA",
        populators: {
          name: "HospitalName",
          optionsKey: "name",
          error: "Hospital Name is Required!",
          required: true,
          mdmsConfig: {
            masterName: "hospitalList",
            moduleName: "birth-death-service",
            localePrefix: "COMMON_HOSPITAL",
          },
        },
      },
      {
        inline: true,
        label: "Date of Registration",
        isMandatory: true,
        key: "doRegistration",
        type: "date",
        disable: false,
        populators: {
          name: "doRegistration",
          error: "Date of Registration is Required!",
          validation: {
            maxDate: new Date().toISOString().split("T")[0], 
          },
        },
      },
    ],
  },
  {
    head: "Information of the Deceased",
    body: [
      {
        inline: true,
        label: "Date of Death",
        isMandatory: true,
        key: "dob",
        type: "date",
        disable: false,
        populators: {
          name: "dob",
          error: "Date of Death is Required!",
          validation: {
            maxDate: new Date().toISOString().split("T")[0], // Cannot be a future date
          },
        },
      },
      {
        isMandatory: true,
        key: "Gender",
        type: "dropdown",
        label: "Gender",
        disable: false,
        populators: {
          name: "Gender",
          optionsKey: "name",
          error: "Gender is Required!",
          required: true,
          mdmsConfig: {
            masterName: "GenderType",
            moduleName: "common-masters",
            localePrefix: "COMMON_GENDER",
          },
        },
      },
      {
        inline: true,
        label: "Age",
        type: "text",
        isMandatory: true,
        placeholder: "Ex: 10 years 6 months 3 days",
        populators: {
          name: "age",
          error: "Age is Required!",
          validation: {
            pattern: /^[0-9]+( years)?( [0-9]+ months)?( [0-9]+ days)?$/, 
          },
        },
      },
      {
        inline: true,
        label: "First Name",
        type: "text",
        isMandatory: true,
        placeholder: "First Name",
        populators: {
          name: "First Name",
          error: "First Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, 
          },
        },
      },
      {
        inline: true,
        label: "Middle Name",
        type: "text",
        isMandatory: false,
        placeholder: "Middle Name",
        populators: {
          name: "Middle Name",
          error: "Middle Name is Required!",
          validation: {
            maxLength: 50,
            pattern: /^[A-Za-z\s]*$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "Last Name",
        type: "text",
        isMandatory: true,
        placeholder: "Last Name",
        populators: {
          name: "Last Name",
          error: "Last Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "EID Number",
        type: "number",
        isMandatory: false,
        placeholder: "EID Number",
        populators: {
          name: "EID Number",
          error: "EID Number is Required!",
          validation: {
            pattern: /^[0-9]{12}$/, // 12-digit number
          },
        },
      },
      {
        inline: true,
        label: "Aadhar Number",
        type: "number",
        isMandatory: false,
        placeholder: "Aadhar Number",
        populators: {
          name: "Aadhar Number",
          error: "Aadhar Number is Required!",
          validation: {
            pattern: /^[0-9]{12}$/, // 12-digit number
          },
        },
      },
      {
        inline: true,
        label: "Nationality",
        type: "text",
        isMandatory: true,
        placeholder: "Nationality",
        populators: {
          name: "Nationality",
          error: "Nationality is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "Religion",
        type: "text",
        isMandatory: false,
        placeholder: "Religion",
        populators: {
          name: "Religion",
          error: "Religion is Required!",
          validation: {
            maxLength: 50,
            pattern: /^[A-Za-z\s]*$/, // Alphabets and spaces only
          },
        },
      },
    ],
  },
  {
    head: "Information of Death",
    body: [
      {
        inline: true,
        label: "Death Place",
        type: "text",
        isMandatory: true,
        placeholder: "Death Place",
        populators: {
          name: "Death Place",
          error: "Death Place is Required!",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "ICD Code",
        type: "text",
        isMandatory: false,
        placeholder: "ICD Code",
        populators: {
          name: "ICD Code",
          error: "ICD Code is Required!",
          validation: {
            pattern: /^[A-Za-z0-9]+$/, // Alphanumeric only
          },
        },
      },
    ],
  },
  {
    head: "Spouse Information",
    body: [
      {
        inline: true,
        label: "First Name",
        type: "text",
        isMandatory: true,
        placeholder: "First Name",
        populators: {
          name: "First Name2",
          error: "First Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "Middle Name",
        type: "text",
        isMandatory: false,
        placeholder: "Middle Name",
        populators: {
          name: "Middle Name2",
          error: "Middle Name is Required!",
          validation: {
            maxLength: 50,
            pattern: /^[A-Za-z\s]*$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "Last Name",
        type: "text",
        isMandatory: true,
        placeholder: "Last Name",
        populators: {
          name: "Last Name2",
          error: "Last Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "Aadhar Number",
        type: "number",
        isMandatory: false,
        placeholder: "Aadhar Number",
        populators: {
          name: "Aadhar Number2",
          error: "Aadhar Number is Required!",
          validation: {
            pattern: /^[0-9]{12}$/, // 12-digit number
          },
        },
      },
      {
        inline: true,
        label: "Email ID",
        type: "text",
        isMandatory: false,
        placeholder: "Email ID",
        populators: {
          name: "Email ID",
          error: "Email ID is Required!",
          validation: {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email format
          },
        },
      },
      {
        inline: true,
        label: "Mobile Number",
        type: "number",
        isMandatory: false,
        placeholder: "Mobile Number",
        populators: {
          name: "Mobile Number",
          error: "Mobile Number is Required!",
          validation: {
            pattern: /^[6-9][0-9]{9}$/, // Valid Indian mobile number
          },
        },
      },
    ],
  },
  {
    head: "Father's Information",
    body: [
      {
        inline: true,
        label: "First Name",
        type: "text",
        isMandatory: true,
        placeholder: "First Name",
        populators: {
          name: "First Name3",
          error: "First Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "Middle Name",
        type: "text",
        isMandatory: false,
        placeholder: "Middle Name",
        populators: {
          name: "Middle Name3",
          error: "Middle Name is Required!",
          validation: {
            maxLength: 50,
            pattern: /^[A-Za-z\s]*$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "Last Name",
        type: "text",
        isMandatory: true,
        placeholder: "Last Name",
        populators: {
          name: "Last Name3",
          error: "Last Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "Aadhar Number",
        type: "number",
        isMandatory: false,
        placeholder: "Aadhar Number",
        populators: {
          name: "Aadhar Number3",
          error: "Aadhar Number is Required!",
          validation: {
            pattern: /^[0-9]{12}$/, // 12-digit number
          },
        },
      },
      {
        inline: true,
        label: "Email ID",
        type: "text",
        placeholder: "Email ID",
        populators: {
          name: "Email ID2",
          error: "Email ID is Required!",
          validation: {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email format
          },
        },
      },
      {
        inline: true,
        label: "Mobile Number",
        type: "number",
        placeholder: "Mobile Number",
        populators: {
          name: "Mobile Number2",
          error: "Mobile Number is Required!",
          validation: {
            pattern: /^[6-9][0-9]{9}$/, // Valid Indian mobile number
          },
        },
      },
    ],
  },
  {
    head: "Mother's Information",
    body: [
      {
        inline: true,
        label: "First Name",
        type: "text",
        isMandatory: true,
        placeholder: "First Name",
        populators: {
          name: "First Name4",
          error: "First Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "Middle Name",
        type: "text",
        isMandatory: false,
        placeholder: "Middle Name",
        populators: {
          name: "Middle Name4",
          error: "Middle Name is Required!",
          validation: {
            maxLength: 50,
            pattern: /^[A-Za-z\s]*$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "Last Name",
        type: "text",
        isMandatory: true,
        placeholder: "Last Name",
        populators: {
          name: "Last Name4",
          error: "Last Name is Required!",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Alphabets and spaces only
          },
        },
      },
      {
        inline: true,
        label: "Aadhar Number",
        type: "number",
        isMandatory: false,
        placeholder: "Aadhar Number",
        populators: {
          name: "Aadhar Number4",
          error: "Aadhar Number is Required!",
          validation: {
            pattern: /^[0-9]{12}$/, // 12-digit number
          },
      },
      },
      {
        inline: true,
        label: "Email ID",
        type: "text",
        placeholder: "Email ID",
        isMandatory: false,
        populators: {
          name: "emailId3",
          error: "Valid Email ID is required!",
          validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
          },
        },
      },
      {
        inline: true,
        label: "Mobile Number",
        type: "number",
        placeholder: "Mobile Number",
        isMandatory: false,
        populators: {
          name: "mobileNumber3",
          error: "Valid Mobile Number is required!",
          validation: {
            minLength: 10,
            maxLength: 10,
          },
        },
      },
    ]
  },
  // {
  //   head: "Parent's Information",
  //   body: [
  //     {
  //       key: "ParentInfoCard",
  //       type: "component",
  //       component: "ParentInfoCard",
  //       withoutLabel: true,
  //       disable: false,
  //       customProps: {
  //         parentType: "Father" 
  //       },
  //       populators: {
  //         name: "parentInfo", 
  //         required: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   head: "Parent's Information",
  //   body: [
  //     {
  //       key: "ParentInfoCard",
  //       type: "component",
  //       component: "ParentInfoCard",
  //       withoutLabel: true,
  //       disable: false,
  //       customProps: {
  //         parentType: "Mother" 
  //       },
  //       populators: {
  //         name: "parentInfo", 
  //         required: true
  //       }
  //     }
  //   ]
  // },
  {
    head: "Address of Deceased at the Time of Death",
    body: [
      {
        inline: true,
        label: "Building Number",
        type: "number",
        isMandatory: false,
        placeholder: "Building Number",
        populators: {
          name: "buildingNumber",
          validation: { minLength: 1 },
          error: "Building Number is required!",
        },
      },
      {
        inline: true,
        label: "House No",
        type: "number",
        isMandatory: false,
        placeholder: "House No",
        populators: {
          name: "houseNo",
          validation: { minLength: 1 },
          error: "House No is required!",
        },
      },
      {
        inline: true,
        label: "Street Name",
        type: "text",
        isMandatory: false,
        placeholder: "Street Name",
        populators: {
          name: "streetName",
          validation: { minLength: 3 },
          error: "Street Name must have at least 3 characters!",
        },
      },
      {
        inline: true,
        label: "Locality",
        type: "text",
        isMandatory: false,
        placeholder: "Locality",
        populators: {
          name: "locality",
          validation: { minLength: 2 },
          error: "Locality must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "Tehsil",
        type: "text",
        isMandatory: false,
        placeholder: "Tehsil",
        populators: {
          name: "tehsil",
          validation: { minLength: 2 },
          error: "Tehsil must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "District",
        type: "text",
        isMandatory: false,
        placeholder: "District",
        populators: {
          name: "district",
          validation: { minLength: 2 },
          error: "District must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "City",
        type: "text",
        isMandatory: false,
        placeholder: "City",
        populators: {
          name: "city",
          validation: { minLength: 2 },
          error: "City must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "State",
        type: "text",
        isMandatory: false,
        placeholder: "State",
        populators: {
          name: "state",
          validation: { minLength: 2 },
          error: "State must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "Country",
        type: "text",
        isMandatory: false,
        placeholder: "Country",
        populators: {
          name: "country",
          validation: { minLength: 2 },
          error: "Country must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "Pincode",
        type: "number",
        isMandatory: false,
        placeholder: "Pincode",
        populators: {
          name: "pincode",
          validation: { minLength: 6, maxLength: 6 },
          error: "Pincode must be 6 digits!",
        },
      }
    ],
  },
  {
    body: [
      {
        inline: true,
        type: "checkbox",
        isMandatory: false,
        disable: false,
        withoutLabel: false,
        populators: {
          name: "sameAddressCheckbox",
          title: "If Permanent Address is same as Address at time of Death",
        },
      },
    ],
  },
  {
    head: "Permanent Address of Deceased",
    body: [
      {
        inline: true,
        label: "Building Number",
        type: "number",
        isMandatory: true,
        placeholder: "Building Number",
        populators: {
          name: "permanentBuildingNumber",
          validation: { minLength: 1 },
          error: "Building Number is required!",
        },
      },
      {
        inline: true,
        label: "House No",
        type: "number",
        isMandatory: true,
        placeholder: "House No",
        populators: {
          name: "permanentHouseNo",
          validation: { minLength: 1 },
          error: "House No is required!",
        },
      },
      {
        inline: true,
        label: "Street Name",
        type: "text",
        isMandatory: true,
        placeholder: "Street Name",
        populators: {
          name: "permanentStreetName",
          validation: { minLength: 3 },
          error: "Street Name must have at least 3 characters!",
        },
      },
      {
        inline: true,
        label: "Locality",
        type: "text",
        isMandatory: true,
        placeholder: "Locality",
        populators: {
          name: "permanentLocality",
          validation: { minLength: 2 },
          error: "Locality must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "Tehsil",
        type: "text",
        isMandatory: true,
        placeholder: "Tehsil",
        populators: {
          name: "permanentTehsil",
          validation: { minLength: 2 },
          error: "Tehsil must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "District",
        type: "text",
        isMandatory: true,
        placeholder: "District",
        populators: {
          name: "permanentDistrict",
          validation: { minLength: 2 },
          error: "District must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "City",
        type: "text",
        isMandatory: true,
        placeholder: "City",
        populators: {
          name: "permanentCity",
          validation: { minLength: 2 },
          error: "City must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "State",
        type: "text",
        isMandatory: true,
        placeholder: "State",
        populators: {
          name: "permanentState",
          validation: { minLength: 2 },
          error: "State must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "Country",
        type: "text",
        isMandatory: true,
        placeholder: "Country",
        populators: {
          name: "permanentCountry",
          validation: { minLength: 2 },
          error: "Country must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "Pincode",
        type: "number",
        isMandatory: true,
        placeholder: "Pincode",
        populators: {
          name: "permanentPincode",
          validation: { minLength: 6, maxLength: 6 },
          error: "Pincode must be 6 digits!",
        },
      },
    ],
  },
  {
    head: "Informant’s Information",
    body: [
      {
        inline: true,
        label: "Name",
        type: "text",
        isMandatory: false,
        placeholder: "Name",
        populators: {
          name: "informantName",
          validation: { minLength: 2 },
          error: "Name must have at least 2 characters!",
        },
      },
      {
        inline: true,
        label: "Address",
        type: "text",
        isMandatory: false,
        placeholder: "Address",
        populators: {
          name: "informantAddress",
          validation: { minLength: 2 },
          error: "Address must have at least 2 characters!",
        },
      },
    ],
  },
  {
    body: [
      {
        inline: true,
        label: "Remarks",
        type: "text",
        isMandatory: false,
        placeholder: "Remarks",
        populators: {
          name: "remarks",
          validation: { minLength: 2 },
          error: "Remarks must have at least 2 characters!",
        },
      },
    ],
  },


];


export default createDeathConfig;