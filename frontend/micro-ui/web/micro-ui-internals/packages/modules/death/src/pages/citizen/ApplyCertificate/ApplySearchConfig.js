export const SearchConfig = () => {
    return {
      SearchConfig: [
        {
          form: [
            {
              head: "Search Registry",
              body: [
                {
                    isMandatory: true,
                    type: "dropdown",
                    key: "city",
                    label: "Required Field",
                    disable: false,
                    placeholder: "Select City",
                    populators: {
                      name: "city-Required Field",
                      optionsKey: "name",
                      error: "This field is mandatory!",
                      required: true,
                      options: [
                      {
                        code: "1",
                        name: "pg.citya",
                      },
                      {
                        code: "2",
                        name: "Salem",
                      },
                      {
                        code: "3",
                        name: "Victoria",
                      },
                     ],
                    },   
                },
                {
                    inline: true,
                    label: "Death Date",
                    isMandatory: true,
                    description: "",
                    type: "date",
                    disable: false,
                    placeholder: "dd-mm-yyyy",
                    populators: { 
                        name: "date-With Innerlabel",
                        error: "This field is mandatory!"
                    },
                },
                {
                    isMandatory: true,
                    type: "dropdown",
                    key: "genders",
                    label: "Gender",
                    disable: false,
                    placeholder: "Select Gender",
                    populators: {
                      name: "dropdown-Required Field",
                      optionsKey: "name",
                      error: "This field is mandatory!",
                      required: true,
                      mdmsConfig: {
                        masterName: "GenderType",
                        moduleName: "common-masters",
                        localePrefix: "COMMON_GENDER",
                      },
                    },
                  },
              ],
            },
            {
              head: "Use advanced search options provided below if required.",
              body: [
                {
                    inline: true,
                    label: "Name of Deceased",
                    isMandatory: false,
                    type: "text",
                    disable: false,
                    placeholder: "Person Name",
                    populators: { name: "text-With InnerLabel", error: "Error!" },
                },
                {
                    inline: true,
                    label: "Spouse Name",
                    isMandatory: false,
                    type: "text",
                    disable: false,
                    placeholder: "Enter Husband's/Wife's Name",
                    populators: { name: "text-With InnerLabel", error: "Error!" },
                },
                {
                    isMandatory: true,
                    type: "dropdown",
                    key: "placeofdeath",
                    label: "Place of Death",
                    disable: false,
                    placeholder: "If not at hospital select others",
                    populators: {
                      name: "city-Required Field",
                      optionsKey: "name",
                      error: "This field is mandatory!",
                      required: true,
                      options: [
                      {
                        code: "1",
                        name: "Others",
                      },
                     ],
                    },   
                },
                {
                    inline: true,
                    label: "Registration Number",
                    isMandatory: false,
                    type: "text",
                    disable: false,
                    placeholder: "Registration Number",
                    populators: { name: "text-With InnerLabel", error: "Error!" },
                },
                {
                    inline: true,
                    label: "Father's Name",
                    isMandatory: false,
                    type: "text",
                    disable: false,
                    placeholder: "Enter Father's Name",
                    populators: { name: "text-With InnerLabel", error: "Error!" },
                },
                {
                    inline: true,
                    label: "Mother's Name",
                    isMandatory: false,
                    type: "text",
                    disable: false,
                    placeholder: "Enter Mother's Name",
                    populators: { name: "text-With InnerLabel", error: "Error!" },
                },
              ],
            }
            ],
        },
      ],
    };
};