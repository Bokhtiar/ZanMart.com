import PriceFilter from '@/components/priceFilter';
import SingleCart from '@/components/singleCart';
import { useProduct } from '@/hooks/useProducts';
import { useRouter } from 'next/router';
import React from 'react';

const SearchProdut = () => {
  const router=useRouter()
  const searchData=router.query.search
  const { products, setProducts, loading: productLoading } = useProduct();
  return (
    <div className="mt-36">

    <div className="text-center py-10">
      <h1 className="font-extrabold text-primary text-4xl py-2">
        You search for {searchData}
      </h1>
      <p className="font-normal text-xl leading-7">
        Choose form the best collections
      </p>
   
    </div>

    <div className="flex container-custom mx-auto items-start gap-10 w-full">
   

      <div className="w-full">
        
        {/* All product show */}
        <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-8 md:gap-8 justify-between">
          {products && Array.isArray(products) ? (
            products.map((product) => (
              <SingleCart key={product?.product_id} item={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>

    
  </div>
  );
};

export default SearchProdut;