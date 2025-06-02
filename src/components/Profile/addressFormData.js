export const addressFormData = [
  {
    name: "name",
    type: "text",
    label: "Full Name",
    rules: "Full Name Required",
    placeholder: "Enter Your Full Name",
  },
    
  {
    name: "phone",
    type: "text",
    label: "Phone",
    rules: "Phone Number Required",
    placeholder: "Enter Your Phone Number",
  },
  {
    name: "address_line1",
    type: "text",
    label: "Address",
    rules: "Address  Required",
    placeholder: "Enter H.no, R. no, block/sector",
    className:"col-span-2"
  },
  {
    label: "Division",
    name: "division_id",
    type: "select",
    placeholder: "Select Division",
    rules: "Division is required",
  },
  {
    label: "City",
    name: "district_id",
    type: "select",
    placeholder: "Select City",
    rules: "City is required",
  },
  {
    label: "Area",
    name: "upazila_id",
    type: "select",
    placeholder: "Select Area",
    rules: "Area is required",
    // url:''
  },
  // {
  //   label: "Union",
  //   name: "union_id",
  //   type: "select",
  //   placeholder: "Enter Union name",
  //   rules: "Union is required",
  // },
  
  // {
  //   name: "address_line2",
  //   type: "text",
  //   label: "Full Address Line 2",
  //   rules: "",
  //   placeholder: "Enter Your Address Line2",
  // },
  {
    name: "postal_code",
    type: "text",
    label: "Postal Code ",
    rules: "Postal Code Required",
    placeholder: "Enter Postal Code",
  },
];
