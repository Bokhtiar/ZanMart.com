import ChangePass from '@/components/changePass';
import ProfileLayout from '@/components/layouts/ProfileLayout/ProfileLayout';
import React from 'react';

const ChangePassword = () => {
    return (
        <div>
            <ChangePass />
        </div>
    );
};
ChangePassword.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default ChangePassword;