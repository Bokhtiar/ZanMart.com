import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { privateRequest, publicRequest } from '@/config/axios.config';
import Link from 'next/link';
import { useProduct } from '@/hooks/useProducts';
import Image from 'next/image';

const Banner = () => {
  const [banner, setBanner] = useState([])
  const fetchBanner = async () => {
    try {
      
      const response = await publicRequest.get('banner')
      setBanner(response.data.data)
      console.log(response.data.data)

    }
    catch (error) {
      console.log(error)
    }
  }
 
  const { setProducts } = useProduct()
  const bannerProduct = async (id) => {
    try {
      const response = await publicRequest.get(`banner-product/${id}`)
      setProducts(response?.data?.data?.products)


    } catch (error) {

    }
  }
  useEffect(() => {
    fetchBanner()
  }, [])
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      speed={1000}

      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {
        banner?.map(item =>
          <SwiperSlide key={item?.banner_id}>
            <div className="relative h-80 bg-[#F5F5F5]">
              {/* Static Content Container */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center">
                  <h1 className="text-primary text-2xl md:text-3xl lg:text-[35px] font-extrabold">
                    {item?.name}
                  </h1>
                  <p className="text-md mb-2">On the selected items</p>
                  <Link
                    href={`products?category=${item?.name}`}
                    onClick={() => bannerProduct(item?.banner_id)}
                    className="rounded-full btn text-sm bg-primary text-white px-5 py-2"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              {/* Sliding Image */}
              <Image height={1000} width={1000} priority        
                className="w-full h-full object-cover"
                src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.image}`}
                alt={item?.name}
              />
            </div>
          </SwiperSlide>

        )
      }


    </Swiper>


  );
};

export default Banner;