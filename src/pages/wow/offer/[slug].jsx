import BannerSkeleton from "@/components/loader/bannerSkaleton";
import SingleCart from "@/components/singleCart";
import useDynamicIdFetch from "@/hooks/api/useFetch";
import { useProduct } from "@/hooks/useProducts";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const OfferBanner = () => {
  const router = useRouter();
  const bannarId = router.query.offer_id; 
  const {data:banner,loading} = useDynamicIdFetch(bannarId); 
  if(loading) return <BannerSkeleton/>;
  return (
    <div className=" container-custom mx-auto ">
      {/* <div className="text-center py-10">
        <h1 className="font-extrabold text-primary text-4xl py-2">
          {bannarName}
        </h1>
        <p className="font-normal text-xl leading-7">
          Choose form the best collections
        </p>
      </div> */}
      <div className="relative  w-full bg-[#F5F5F5] block aspect-[2/1]">
        {/* Static Content Container */}
        <Image 
          height={1000}
          width={500}
          priority
          className="w-full object-cover rounded-lg"
          src={`${process.env.NEXT_PUBLIC_API_SERVER}${banner?.image}`}
          alt={banner?.name}
        />
      </div>
      <div className="flex container mx-auto items-start gap-10 w-full mt-2">
        <div className="w-full">
          {/* All product show */}
          <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 md:gap-8 justify-between">
            {banner?.products && Array.isArray(banner?.products) ? (
              banner?.products.map((product) => (
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

export default OfferBanner;
