import React from 'react';

const OfferBanner = () => {
    return (
        <div className='container mx-auto flex justify-between gap-5 my-10'>
            <div className='w-full '>
                <img className='w-full h-auto max-w-[587px] object-contain' src="images/summer.svg" alt="summer" />
            </div>
            <div className='w-full'>
                <img className='w-full h-auto max-w-[587px] object-contain' src="images/sneker.svg" alt="sneaker" />
            </div>
        </div>
    );
};

export default OfferBanner;
