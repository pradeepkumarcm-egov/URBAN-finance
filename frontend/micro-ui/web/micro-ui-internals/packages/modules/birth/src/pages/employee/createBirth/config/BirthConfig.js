export  const BirthConfig = [
  {
    head: "Registration Details",
    body: [
      {
        inline: true,
        isMandatory: true,
        type: "checkbox",
       
        withoutLabel: true,
        populators: {
          name: "checkbox_legacy",
          title: "This is a Legacy Record",
        },
      },
      {
        inline: true,
        label: "Registration Number",
        type: "text",
        isMandatory: false,
        disable:false,
        placeholder: "Registration Number",
        populators: {
          name: "registration_number",
          error: "Registration Number is Required!",
          validation: {
            required: true,
            pattern: /^[A-Za-z0-9-]+$/,
            minLength: 5,
            maxLength: 20,
          },
        },
      },
      {
        isMandatory: false,
        key: "Hospital Name",
        type: "dropdown",
        label: "Enter Hospital Name",
        disable: false,
        populators: {
          name: "hospital_name",
          optionsKey: "originalName",
          valueKey: "code",
          error: "Hospital Name is Required!",
          required: false
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
          name: "date_of_registration",
          error: "Required",
          validation: {
            required: true,
            max: new Date().toISOString().split("T")[0], // Cannot be future date
          },
        },
      },
    ],
  },
  {
    head: "Information of Child",
    body: [
      {
        inline: true,
        label: "Date of Birth",
        isMandatory: true,
        key: "dob",
        type: "date",
        disable: false,
        populators: {
          name: "date_of_birth",
          error: "Required",
          validation: {
            required: true,
            max: new Date().toISOString().split("T")[0], // Cannot be future date
          },
        },
      },
      {
        isMandatory: true,
        key: "Gender",
        type: "dropdown",
        label: "Enter Gender Name",
        disable: false,
        populators: {
          name: "gender",
          optionsKey: "name",
          error: "Required",
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
        label: "First Name",
        type: "text",
        isMandatory: false,
        placeholder: "First Name",
        populators: {
          name: "child_first_name",
          error: "First Name must be at least 3 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/, // Only letters and spaces
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
          name: "child_middle_name",
          error: "Middle Name must be at least 3 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "Last Name",
        type: "text",
        isMandatory: false,
        placeholder: "Last Name",
        populators: {
          name: "child_last_name",
          error: "Last Name must be at least 3 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
    ],
  },
  {
    head: "Birth Place",
    body: [
      {
        inline: true,
        label: "Birth Place",
        type: "text",
        isMandatory: true,
        placeholder: "Birth Place",
        populators: {
          name: "birth_place",
          error: "Birth Place must be 5-100 characters",
          validation: {
            required: true,
            minLength: 5,
            maxLength: 100,
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
          name: "father_first_name",
          error: "First Name must be 3-50 characters",
          validation: {
            required: true,
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
          name: "father_middle_name",
          error: "Middle Name must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
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
          name: "father_last_name",
          error: "Last Name must be 3-50 characters",
          validation: {
            required: true,
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "Aadhar Number",
        type: "text",
        placeholder: "Aadhar Number",
        populators: {
          name: "father_aadhar_number",
          error: "Invalid Aadhar Number (12 digits)",
          validation: {
            pattern: /^\d{12}$/,
            minLength: 12,
            maxLength: 12,
          },
        },
      },
      {
        inline: true,
        label: "Email ID",
        type: "text",
        placeholder: "Email ID",
        populators: {
          name: "father_email_id",
          error: "Invalid Email Address",
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
        populators: {
          name: "father_mobile_number",
          error: "Invalid Mobile Number (10 digits)",
          validation: {
            pattern: /^\d{10}$/,
            minLength: 10,
            maxLength: 10,
          },
        },
      },
      {
        inline: true,
        label: "Education",
        type: "text",
        placeholder: "Education",
        populators: {
          name: "father_education",
          error: "Education must be 3-100 characters",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Profession",
        type: "text",
        placeholder: "Profession",
        populators: {
          name: "father_profession",
          error: "Profession must be 3-100 characters",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Nationality",
        type: "text",
        placeholder: "Nationality",
        populators: {
          name: "father_nationality",
          error: "Nationality must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "Religion",
        type: "text",
        placeholder: "Religion",
        populators: {
          name: "father_religion",
          error: "Religion must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
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
          name: "mother_first_name",
          error: "First Name must be 3-50 characters",
          validation: {
            required: true,
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
          name: "mother_middle_name",
          error: "Middle Name must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
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
          name: "mother_last_name",
          error: "Last Name must be 3-50 characters",
          validation: {
            required: true,
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "Aadhar Number",
        type: "text",
        placeholder: "Aadhar Number",
        populators: {
          name: "mother_aadhar_number",
          error: "Invalid Aadhar Number (12 digits)",
          validation: {
            pattern: /^\d{12}$/,
            minLength: 12,
            maxLength: 12,
          },
        },
      },
      {
        inline: true,
        label: "Email ID",
        type: "text",
        placeholder: "Email ID",
        populators: {
          name: "mother_email_id",
          error: "Invalid Email Address",
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
        populators: {
          name: "mother_mobile_number",
          error: "Invalid Mobile Number (10 digits)",
          validation: {
            pattern: /^\d{10}$/,
            minLength: 10,
            maxLength: 10,
          },
        },
      },
      {
        inline: true,
        label: "Education",
        type: "text",
        placeholder: "Education",
        populators: {
          name: "mother_education",
          error: "Education must be 3-100 characters",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Profession",
        type: "text",
        placeholder: "Profession",
        populators: {
          name: "mother_profession",
          error: "Profession must be 3-100 characters",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Nationality",
        type: "text",
        placeholder: "Nationality",
        populators: {
          name: "mother_nationality",
          error: "Nationality must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "Religion",
        type: "text",
        placeholder: "Religion",
        populators: {
          name: "mother_religion",
          error: "Religion must be 3-50 characters",
          validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
    ],
  },
  {
    head: "Address of Parents at the Time of Birth",
    body: [
      {
        inline: true,
        label: "Building Number",
        type: "number",
        isMandatory: true,
        placeholder: "Building Number",
        populators: {
          name: "birth_building_number",
          error: "Building Number is Required!",
          validation: {
            required: true,
            min: 1,
            max: 9999,
          },
        },
      },
      {
        inline: true,
        label: "House No",
        type: "number",
        isMandatory: true,
        placeholder: "House No",
        populators: {
          name: "birth_house_no",
          error: "House No is Required!",
          validation: {
            required: true,
            min: 1,
            max: 9999,
          },
        },
      },
      {
        inline: true,
        label: "Street Name",
        type: "text",
        isMandatory: true,
        placeholder: "Street Name",
        populators: {
          name: "birth_street_name",
          error: "Street Name must be 3-100 characters",
          validation: {
            required: true,
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Locality",
        type: "text",
        isMandatory: true,
        placeholder: "Locality",
        populators: {
          name: "birth_locality",
          error: "Locality must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Tehsil",
        type: "text",
        isMandatory: true,
        placeholder: "Tehsil",
        populators: {
          name: "birth_tehsil",
          error: "Tehsil must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "District",
        type: "text",
        isMandatory: true,
        placeholder: "District",
        populators: {
          name: "birth_district",
          error: "District must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "City",
        type: "text",
        isMandatory: true,
        placeholder: "City",
        populators: {
          name: "birth_city",
          error: "City must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "State",
        type: "text",
        isMandatory: true,
        placeholder: "State",
        populators: {
          name: "birth_state",
          error: "State must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Country",
        type: "text",
        isMandatory: true,
        placeholder: "Country",
        populators: {
          name: "birth_country",
          error: "Country must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Pincode",
        type: "number",
        isMandatory: true,
        placeholder: "Pincode",
        populators: {
          name: "birth_pincode",
          error: "Invalid Pincode (6 digits)",
          validation: {
            required: true,
            pattern: /^\d{6}$/,
            minLength: 6,
            maxLength: 6,
          },
        },
      },
      {
        inline: true,
        isMandatory: false,
        type: "checkbox",
        disable: false,
        withoutLabel: true,
        populators: {
          name: "same_as_permanent_address",
          title: "If Permanent Address of Parents is same as Address of Parents at the time of Birth",
        },
      },
    ],
  },
  {
    head: "Permanent Address of Parents",
    body: [
      {
        inline: true,
        label: "Building Number",
        type: "number",
        isMandatory: true,
        placeholder: "Building Number",
        populators: {
          name: "permanent_building_number",
          error: "Building Number is Required!",
          validation: {
            required: true,
            min: 1,
            max: 9999,
          },
        },
      },
      {
        inline: true,
        label: "House No",
        type: "number",
        isMandatory: true,
        placeholder: "House No",
        populators: {
          name: "permanent_house_no",
          error: "House No is Required!",
          validation: {
            required: true,
            min: 1,
            max: 9999,
          },
        },
      },
      {
        inline: true,
        label: "Street Name",
        type: "text",
        isMandatory: true,
        placeholder: "Street Name",
        populators: {
          name: "permanent_street_name",
          error: "Street Name must be 3-100 characters",
          validation: {
            required: true,
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Locality",
        type: "text",
        isMandatory: true,
        placeholder: "Locality",
        populators: {
          name: "permanent_locality",
          error: "Locality must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Tehsil",
        type: "text",
        isMandatory: true,
        placeholder: "Tehsil",
        populators: {
          name: "permanent_tehsil",
          error: "Tehsil must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "District",
        type: "text",
        isMandatory: true,
        placeholder: "District",
        populators: {
          name: "permanent_district",
          error: "District must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "City",
        type: "text",
        isMandatory: true,
        placeholder: "City",
        populators: {
          name: "permanent_city",
          error: "City must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "State",
        type: "text",
        isMandatory: true,
        placeholder: "State",
        populators: {
          name: "permanent_state",
          error: "State must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Country",
        type: "text",
        isMandatory: true,
        placeholder: "Country",
        populators: {
          name: "permanent_country",
          error: "Country must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Pincode",
        type: "number",
        isMandatory: true,
        placeholder: "Pincode",
        populators: {
          name: "permanent_pincode",
          error: "Invalid Pincode (6 digits)",
          validation: {
            required: true,
            pattern: /^\d{6}$/,
            minLength: 6,
            maxLength: 6,
          },
        },
      },
    ],
  },
  {
    head: "Informant's Information",
    body: [
      {
        inline: true,
        label: "Name",
        type: "text",
        isMandatory: true,
        placeholder: "Name",
        populators: {
          name: "informant_name",
          error: "Name must be 2-100 characters",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 100,
            pattern: /^[A-Za-z\s]+$/,
          },
        },
      },
      {
        inline: true,
        label: "Address",
        type: "text",
        isMandatory: true,
        placeholder: "Address",
        populators: {
          name: "informant_address",
          error: "Address must be 5-200 characters",
          validation: {
            required: true,
            minLength: 5,
            maxLength: 200,
          },
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
          error: "Remarks must be less than 500 characters",
          validation: {
            maxLength: 500,
          },
        },
      },
    ],
  },
];
