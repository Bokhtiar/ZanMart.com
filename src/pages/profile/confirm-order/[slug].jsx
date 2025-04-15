import ConfirmOrder from "@/components/ConfirmOrder";
import ProfileLayout from "@/components/layouts/ProfileLayout/ProfileLayout";
import React from "react";

const ConfirmOderPage = () => {
  return (
    <div>
      <ConfirmOrder />
    </div>
  );
};
// ConfirmOderPage.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default ConfirmOderPage;
