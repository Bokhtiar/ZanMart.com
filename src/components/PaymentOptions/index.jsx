import Image from 'next/image';
import React from 'react';

const PaymentOptions = () => {
  return (
    <div className='container mx-auto '>
      <h1 className='font-medium mt-12 mb-6 text-base  text-center '>Secure payment by</h1>
     <div className='flex justify-center  w-full'>
     <Image height={200} width={1000} className=' w-3/4 mr-16' src="/images/payment.png" alt="payment" />
     </div>
    </div>
  );
};

export default PaymentOptions;