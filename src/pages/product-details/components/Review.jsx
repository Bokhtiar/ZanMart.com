import Modal from '@/components/modal';
import React, { useState } from 'react';
import ReviewModal from './ReviewModal';

const ProductReview = ({product}) => {
    const [lineClamp,setLineClampTrue] = useState(false);
    return (
        <div className="  bg-gray-100  px-2 my-2 rounded-md py-2">
          <h1>Ratings & Reviews of  {product?.title}</h1>
          <div className={`${lineClamp && 'line-clamp-3'}`}>
            {
            Array.from({length:9}).map((_ , idx)=><div key={idx}>
                item {idx}
            </div>)
          }
          </div>
          <button onClick={()=>setLineClampTrue(!lineClamp)}>see more</button>
           {/* <ReviewModal>
                   
           </ReviewModal> */}
        </div>
    );
};

export default ProductReview;

