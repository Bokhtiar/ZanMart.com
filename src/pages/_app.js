import "@/styles/globals.css";
import { LayoutPageWrapper } from "@/components/layouts";
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps }) {
  return (
    <LayoutPageWrapper>
      <Component {...pageProps} />
      <ToastContainer/>
    </LayoutPageWrapper>
  )
}
