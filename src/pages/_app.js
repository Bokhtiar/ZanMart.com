import "@/styles/globals.css";
import { LayoutPageWrapper } from "@/components/layouts";
import { ToastContainer } from "react-toastify";
import { Inter, Poppins } from "next/font/google";
import { MyProvider } from "@/contex/ProductsContex";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../utils/gtag';

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);


  // gogle analtic
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);



  return (
    <div className={poppins.className}>
      <MyProvider>
        <LayoutPageWrapper>
          {getLayout(<Component {...pageProps} />)}
        </LayoutPageWrapper>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // transition={Bounce}
        />
      </MyProvider>
    </div>
  );
}
