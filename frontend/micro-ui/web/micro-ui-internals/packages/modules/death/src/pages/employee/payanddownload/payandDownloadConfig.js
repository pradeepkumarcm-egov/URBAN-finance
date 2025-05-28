
const payandDownloadConfig = [
    {
    head: "Payment Collection Details",
    body: [
        {
              isMandatory: false,
              key: "PaymentCollectionDetailsCard",
              type: "component", 
              component: "PaymentCollectionDetailsCard", 
              withoutLabel: true,
              disable: false,
              customProps: {
              }, 
              populators: { name: "PaymentCollectionDetailsCard", required: true },
        },
    ],
    },
    {
    head: "Payer Details",
    body: [
    {
        "isMandatory": false,
        "key": "paidBy",
        "type": "dropdown",
        "label": "Paid By",
        "disable": false,
        isMandatory: true,
        "populators": {
            name: "paidBy", // Matches the key
            optionsKey: "name", // Display 'name' from options array
            valueKey: "code",   // Use 'code' as the value
            options: [
              { code: "OWNER", name: "OWNER" },
              { code: "OTHERS", name: "OTHERS" },
            ],
            defaultValue: { code: "OWNER", name: "OWNER" },
        }
    },
    {
        inline: true,
        label: "Payer Name",
        type: "text",
        key: "payerName",
        isMandatory: true,
        placeholder: "Enter Payer Name",
        disable:true,
        populators: {
          name: "payerName",
          error: "Payer Name is Required!",
          defaultValue: "",
          validation: {
            minLength: 3,
            maxLength: 100,
          },
        },
      },
      {
        inline: true,
        label: "Payer Mobile No.",
        type: "text",
        isMandatory: true,
        key: "payermobileNumber",
        placeholder: "Enter Payer Mobile Number",
        disable:true,
        populators: {
          name: "payermobileNumber",
          error: "Payer Mobile Number is Required!",
          defaultValue: "",
          validation: {
            minLength: 10,
            maxLength: 10,
            pattern: /^[0-9]+$/i, 
          },
        },
      },
    ],
    },
];

export default payandDownloadConfig;


