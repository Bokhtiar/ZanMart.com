 
import { Inter, Poppins } from "next/font/google";
import { Navbar } from "./navbar";
import Footer from "./footer";

const poppins = Poppins({ weight:[ "100", "200","300","400","500", "600" ,"700","800","900",], subsets: ["latin"] });

export const LayoutPageWrapper = ({ children }) => {
    return (
        <section className={`flex flex-col min-h-screen ${poppins.className}`}>
            <Navbar/>
            <main className="flex-grow">{children}</main>
            <Footer/>
        </section>
    )
}