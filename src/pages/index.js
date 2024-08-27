import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import Searchbar from "@/components/searchabr";
import Banner from "@/components/Banner";
import ServiceQuality from "@/components/ServiceQuality";
import TopFeature from "@/components/TopFeature";
import OfferBanner from "@/components/offerBanner";
import SpecialDiscount from "@/components/specialDiscount";
import PaymentOptions from "@/components/PaymentOptions";

const poppins = Poppins({ weight:[ "100", "200","300","400","500", "600" ,"700","800","900",], subsets: ["latin"] });

export default function Home() {
  return (
    <section className={poppins.className}>
     <Banner></Banner>
     <ServiceQuality></ServiceQuality>
    <TopFeature title="FLASH SALE" dataUrl={'/data.json'} itemLimit={5}></TopFeature>
    <TopFeature title="MAN'S CLOTHING" dataUrl={'/data.json'} itemLimit={10} ></TopFeature>
    <OfferBanner></OfferBanner>
    <TopFeature title="WOMEN'S  CLOTHING" dataUrl={'/data.json'} itemLimit={10} ></TopFeature>
    <SpecialDiscount></SpecialDiscount>
    <TopFeature title="MEDICAL EQUIPMENT" dataUrl={'/data.json'} itemLimit={5} ></TopFeature>
    <TopFeature title="STATIONARY" dataUrl={'/data.json'} itemLimit={5} ></TopFeature>
    <TopFeature title="OTHERS PRODUCTS" dataUrl={'/data.json'} itemLimit={5} ></TopFeature>
<PaymentOptions></PaymentOptions>
    </section>
  );
}
