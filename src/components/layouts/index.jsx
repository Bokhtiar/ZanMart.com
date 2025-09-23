 
import { Inter, Poppins } from "next/font/google";
import { Navbar } from "./navbar";
import Footer from "./footer";
import Products from "@/pages/products";

const poppins = Poppins({ weight:[ "100", "200","300","400","500", "600" ,"700","800","900",], subsets: ["latin"] });

export const LayoutPageWrapper = ({ children }) => {
    return (
        <section className={`flex flex-col min-h-screen mt-28 ${poppins.className}`}>
            <Navbar/>
            
            <main className="flex-grow">{children}</main>
            {/* <Products></Products> */}
            <Footer/>
        </section>
    )
}