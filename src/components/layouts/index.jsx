import Footer from "./footer";
import { Navbar } from "./navbar"

import { Inter, Poppins } from "next/font/google";

const poppins = Poppins({ weight:[ "100", "200","300","400","500", "600" ,"700","800","900",], subsets: ["latin"] });

export const LayoutPageWrapper = ({ children }) => {
    return (
        <div className={`flex flex-col min-h-screen ${poppins.className}`}>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer/>
        </div>
    )
}