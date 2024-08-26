import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import Searchbar from "@/components/searchabr";
import Banner from "@/components/Banner";
import ServiceQuality from "@/components/ServiceQuality";

const poppins = Poppins({ weight:[ "100", "200","300","400","500", "600" ,"700","800","900",], subsets: ["latin"] });

export default function Home() {
  return (
    <section className={poppins.className}>
     <Searchbar></Searchbar>
     <Banner></Banner>
     <ServiceQuality></ServiceQuality>
    </section>
  );
}
