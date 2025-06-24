import React from "react"; 
import CreateAddress from "@/components/Address/CreateAddress";
import ProfileLayout from "@/components/layouts/ProfileLayout/ProfileLayout";
const AddressForm = () => { 
  return (
     <CreateAddress/>
  );
};

AddressForm.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default AddressForm;
