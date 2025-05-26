import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { publicRequest } from "@/config/axios.config";
import Link from "next/link";
import Image from "next/image";
import BannerSkeleton from "../loader/bannerSkaleton";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchBanner = async () => {
    try {
      setLoading(true);
      const response = await publicRequest.get("banner");
      setBanner(response.data.data);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchBanner();
  }, []);

  if (loading) {
    return <BannerSkeleton></BannerSkeleton>;
  }
  return (
    <div className="container-custom     ">
      <div className="flex flex-col md:flex-row h-auto md:h-72 gap-2">
        {/* Swiper Section */}
        <div className="w-full md:w-3/4   md:h-full  ">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            speed={1000}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-full"
          >
            {banner.slice(1, 2)?.map((banner) => (
              <SwiperSlide key={banner?.banner_id}>
                <Link
                  href={`/wow/offer/${banner?.name?.replace(
                    /\s+/g,
                    "-"
                  )}?sale=${encodeURIComponent(banner?.name)}&offer_id=${
                    banner?.banner_id
                  }`}
                  className="relative h-full bg-[#F5F5F5] block aspect-[3/1] "
                >
                  <Image
                    height={1000}
                    width={1000}
                    priority
                    className="   w-full h-full object-fit"
                    src={`${process.env.NEXT_PUBLIC_API_SERVER}${banner?.image}`}
                    alt={banner?.name}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Side Images */}
        <div className="w-full md:w-1/4 flex md:flex-col md:space-y-2    aspect-[3/1]">
          <Image
            height={1000}
            width={1000}
            priority
            className="w-1/2 md:w-full h-full object-fit pr-1 md:pr-0"
            src={`${process.env.NEXT_PUBLIC_API_SERVER}${banner[0]?.image}`}
            alt={banner?.name}
          />
          <Image
            height={1000}
            width={1000}
            priority
            className="w-1/2 md:w-full h-full object-fit pl-1 md:pl-0"
            src={`${process.env.NEXT_PUBLIC_API_SERVER}${banner[4]?.image}`}
            alt={banner?.name}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
