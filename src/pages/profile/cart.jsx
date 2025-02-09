import ProfileLayout from '@/components/layouts/ProfileLayout/ProfileLayout';
import MyCart from '@/components/MyCart';
import React from 'react';

const Cart = () => {
    return (
        <div>
            <MyCart/>
        </div>
    );
};
Cart.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default Cart;