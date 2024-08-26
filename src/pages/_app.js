import "@/styles/globals.css";
import { LayoutPageWrapper } from "@/components/layouts";
import { ToastContainer } from 'react-toastify'
import { Inter, Poppins } from "next/font/google";

const poppins = Poppins({ weight:[ "100", "200","300","400","500", "600" ,"700","800","900",], subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <LayoutPageWrapper >
      <Component {...pageProps} />
      <ToastContainer/>
    </LayoutPageWrapper>
  )
}
