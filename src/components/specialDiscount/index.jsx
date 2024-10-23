import Image from 'next/image';
import React from 'react';

const SpecialDiscount = () => {
  return (
    <div className='container mx-auto flex justify-center pt-10'>
      <Image height={500} width={1000} src="images/special.svg" alt="special" />
    </div>
  );
};

export default SpecialDiscount;