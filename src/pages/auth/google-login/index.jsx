import { useProduct } from '@/hooks/useProducts';
import { setToken } from '@/utils/helpers';
import { useSearchParams } from 'next/navigation'; 
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const GoogleLoginSuccess = () => {
    const router = useRouter();
    const userInfo = useProduct() 
      useEffect(()=>{
        if(router?.query?.token){
            userInfo.setToken(router?.query?.token)
            setToken(router?.query?.token);
            router.replace(router?.query?.route)
          } 
      },[router])
    return (
        <div className='bg-gray-100 h-screen flex items-center justify-center'>
           <div class="flex items-center justify-center">
    <div class="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
        </div>
    );
};

export default GoogleLoginSuccess;