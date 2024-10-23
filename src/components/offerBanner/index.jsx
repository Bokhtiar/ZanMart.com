import Image from 'next/image';
import React from 'react';

const OfferBanner = () => {
    return (
        <div className='container mx-auto flex justify-between gap-5 my-10'>
            <div className='w-full '>
                <Image height={1000} width={1000} className='w-full h-auto  object-contain' src="/images/summer.svg" alt="summer" />
            </div>
            <div className='w-full'>
                <Image height={1000} width={1000} className='w-full h-auto  object-contain' src="/images/sneker.svg" alt="sneaker" />
            </div>
        </div>
    );
};

export default OfferBanner;
