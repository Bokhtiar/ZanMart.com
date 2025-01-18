import Image from "next/image";
import { Poppins } from "next/font/google";
import Banner from "@/components/Banner";
import ServiceQuality from "@/components/ServiceQuality";
import TopFeature from "@/components/TopFeature";
import PaymentOptions from "@/components/PaymentOptions";
import CookieConsent from "@/components/termAndConiton";
import { useEffect, useState } from "react";
import { publicRequest } from "@/config/axios.config";
import TopFeatureSkeleton from "@/components/loader/TopFeaturSkeleton";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryFetch = async () => {
    try {
      setLoading(true);
      const response = await publicRequest.get("home-page-category");
      setCategories(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    categoryFetch();
  }, []);
  const dataLimit = (item) => {
    switch (item?.category_name) {
      case "stationary":
        return 5;
      default:
        return 10;
    }
  };

  if (loading) {
    return <TopFeatureSkeleton />;
  }

  return (
    <section className={`${poppins.className} px-2 pt-36  `}>
      <Banner></Banner>
      <ServiceQuality></ServiceQuality>
      {categories.map((category) => (
        <TopFeature
          key={category?.category_id}
          categoryid={category?.category_id}
          title={category?.category_name}
          dataUrl={"home-page-category"}
          itemLimit={dataLimit(category)}
        ></TopFeature>
      ))}
      <PaymentOptions></PaymentOptions>

      {/* <CookieConsent /> */}
    </section>
  );
}
