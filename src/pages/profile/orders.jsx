import ProfileLayout from '@/components/layouts/ProfileLayout/ProfileLayout';
import Orders from '@/components/Orders';
import React from 'react';

const Order = () => {
    return (
        <div>
            <Orders />
        </div>
    );
};
Order.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default Order;