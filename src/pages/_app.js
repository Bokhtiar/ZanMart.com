import "@/styles/globals.css";
import { LayoutPageWrapper } from "@/components/layouts";
import { ToastContainer } from 'react-toastify'
import { Inter, Poppins } from "next/font/google";
import { MyProvider } from "@/contex/ProductsContex";

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900",], subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <MyProvider><LayoutPageWrapper >
    <Component {...pageProps} />
    <ToastContainer />
  </LayoutPageWrapper></MyProvider>
  )
}
