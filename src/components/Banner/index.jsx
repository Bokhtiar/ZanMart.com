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
  let campaignBanner = banner.filter((item) => item.is_campaign);
  if (loading) {
    return <BannerSkeleton></BannerSkeleton>;
  }
  return (
    <div className="container-custom     ">
      <div className="flex flex-col md:flex-row gap-2">
        {/* Main Swiper Container */}
        <div className="w-full md:w-4/5  bg-[#F5F5F5] rounded-lg overflow-hidden">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            speed={1000}
            modules={[Autoplay, Pagination, Navigation]}
            className=""
          >
            {banner
              .filter((item) => !item?.is_campaign)
              .map((banner) => (
                <SwiperSlide key={banner?.banner_id}>
                  <Link
                    href={`/wow/offer/${banner?.name?.replace(
                      /\s+/g,
                      "-"
                    )}?sale=${encodeURIComponent(banner?.name)}&offer_id=${
                      banner?.banner_id
                    }`}
                    className="relative block  w-full"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_SERVER}${banner?.image}`}
                      alt={banner?.name || "Banner"}
                      width={1000} // Set width and height to maintain ratio
                      height={500} // 2:1 ratio
                      priority
                      sizes="(max-width: 768px) 100vw, 1024px"
                      className="object-contain rounded-lg bg-white  w-full h-auto"
                    />
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* Side Images Container */}
        <div className="w-full md:w-2/5 flex flex-row md:flex-col gap-1">
          {campaignBanner.slice(0, 2).map((banner) => (
            <div
              key={banner?.banner_id}
              className="bg-[#F5F5F5] rounded-lg  overflow-hidden w-1/2 md:w-full"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_SERVER}${banner?.image}`}
                alt={banner?.name || "Campaign Banner"}
                width={1000}
                height={500} // 2:1 ratio
                priority
                sizes="(max-width: 768px) 50vw, 512px"
                className="object-contain bg-white w-full  h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
