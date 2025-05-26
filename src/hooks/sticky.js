import { privateRequest } from '@/config/axios.config';
import { useState, useCallback, useEffect } from 'react';

const useStickyFetch = (idOrSlug) => {
   
 const [isSticky, setIsSticky] = useState(false);
   useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return { isSticky };
};

export default useStickyFetch;
