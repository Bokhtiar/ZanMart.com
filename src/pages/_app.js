import "@/styles/globals.css";
import { LayoutPageWrapper } from "@/components/layouts";
import { ToastContainer } from "react-toastify";
import { Inter, Poppins } from "next/font/google";
import { MyProvider } from "@/contex/ProductsContex";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((page) => page );
  return (
    <div className={poppins.className}>
      <MyProvider>
      <LayoutPageWrapper>
        {getLayout(<Component {...pageProps} />)}
        </LayoutPageWrapper>
        <ToastContainer bodyClassName={"bg-primary"} 
          />
      </MyProvider>
    </div>
  );
}
