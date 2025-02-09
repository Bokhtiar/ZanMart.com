import Address from "@/components/Address";
import ProfileLayout from "@/components/layouts/ProfileLayout/ProfileLayout";
import React from "react";

const AddressBook = () => {
  return (
    <div>
      <Address />
    </div>
  );
};
AddressBook.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default AddressBook;
