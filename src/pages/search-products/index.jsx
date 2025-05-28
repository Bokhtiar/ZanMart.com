import ProductSkeleton from "@/components/loader/ProductSkeleton"; 
import SingleCart from "@/components/singleCart";
import { publicRequest } from "@/config/axios.config"; 
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const SearchProdut = () => {
  const router = useRouter();
  const searchText = router.query.search;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchSearchProduct = useCallback(
    async (searchText) => {
      try {
        // if search text is empty then return without making request.
        setLoading(true);
        if (!searchText) return;
        setLoading(true);
        const result = await publicRequest.get(`/products?title=${searchText}`);
        setProducts(result?.data?.data);
      } catch (error) {}
      setLoading(false);
    },
    [searchText]
  );

  useEffect(() => {
    if (!searchText) return;
    fetchSearchProduct(searchText);
  }, [searchText]);
  if (loading)
    return (
      <div className="container-custom  ">
        
          <ProductSkeleton />
       
      </div>
    );
  return (
    <div className=" ">
      <div className="text-center py-10">
        <h1 className="font-extrabold text-primary text-4xl py-2">
          You search for {searchText}
        </h1>
        <p className="font-normal text-xl leading-7">
          Choose form the best collections
        </p>
      </div>

      <div className="flex container-custom mx-auto items-start gap-10 w-full">
        <div className="w-full">
          {/* All product show */}
          <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-8 md:gap-8 justify-between">
            {products?.data && Array.isArray(products?.data) ? (
              products?.data.map((product) => (
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
