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


const Banner = () => {
  const [banner, setBanner] = useState([])
  const fetchBanner = async () => {
try{
  const response = await publicRequest.get('banner')
  setBanner(response.data.data)

}
catch(error){
console.log(error)
}
  }
  useEffect(()=>{
    fetchBanner()
  },[])
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
          <SwiperSlide><div  className='relative h-80  bg-[#F5F5F5] '>
            <div className='absolute  top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 '>
              <h1 className='text-primary text-2xl md:text-3xl lg:text-[35px] font-extrabold'>Flat Discount</h1>
              <p className='text-md mb-2'>On the selected items</p>
              <button className='rounded-full btn text-sm bg-primary text-white px-5  py-2'>Shop Now</button>
            </div>
            <img className='w-full h-full bg-cover' src={`http://127.0.0.1:8000/${item.image}`} alt="" />
          </div></SwiperSlide>
        )
      }


    </Swiper>


  );
};

export default Banner;