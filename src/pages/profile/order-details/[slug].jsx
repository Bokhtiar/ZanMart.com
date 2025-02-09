import ProfileLayout from '@/components/layouts/ProfileLayout/ProfileLayout';
import OrderDetails from '@/components/order_details';
import React from 'react';

const OrderDetail = () => {
    return (
        <div className=' '>
          <OrderDetails/>  
        </div>
    );
};
OrderDetail.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default OrderDetail;