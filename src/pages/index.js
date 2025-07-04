import { Poppins } from "next/font/google";
import Banner from "@/components/Banner";
import ServiceQuality from "@/components/ServiceQuality";
import { useEffect, useState } from "react";
import { publicRequest } from "@/config/axios.config";
import HomePageCategorySkeletonLoader from "@/components/loader/homePageCategorySkeleton";
import Link from "next/link";
import { AllViewButton } from "@/components/button";
import SingleCart from "@/components/singleCart";
import useStickyFetch from "@/hooks/sticky";
import Image from "next/image";
import { BiCategory } from "@/icons";
import ServiceQualitySkeleton from "@/components/loader/QualitySkeleton";
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
      setCategories(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    categoryFetch();
  }, []);

  const viewAll = async (id) => {
    try {
      const categoryFilterd = await publicRequest.get(`category/product/${id}`);
      setProducts(categoryFilterd?.data?.data?.data);
    } catch (error) {}
  };
  const { isSticky } = useStickyFetch();
  return (
    <section className={`${poppins.className} px-2  ${isSticky && "mt-14"}`}>
      <Banner></Banner>
      {loading ?  <ServiceQualitySkeleton/>:<ServiceQuality/> }
      {loading ? (
        <section>
          <HomePageCategorySkeletonLoader />
          <HomePageCategorySkeletonLoader />
          <HomePageCategorySkeletonLoader />
          <HomePageCategorySkeletonLoader />
        </section>
      ) : (
        <section>
          {/* {categories.map((category) => (
            <TopFeature
              key={category?.category_id}
              categoryid={category?.category_id}
              title={category?.category_name}
              dataUrl={"home-page-category"}
              itemLimit={dataLimit(category)}
            ></TopFeature>
          ))} */}

          {categories.map((category, i) => (
            <div
              key={i}
              className="container-custom pb-5 mx-auto mt-6 bg-gray-50 py-2 rounded"
            >
              <h1 className="font-bold  my-1 md:text-[25px]  lg:text-[25px]  flex items-center justify-between text-primary capitalize">
                <div className="flex items-center gap-1">
                  {category?.thumbnail ? (
                    <Image
                      height={400}
                      width={4000}
                      className="w-5 h-5 rounded-lg"
                      src={`${process.env.NEXT_PUBLIC_API_SERVER}${category?.thumbnail}`}
                      alt=""
                    />
                  ) : (
                    <BiCategory />
                  )}

                  <span> {category?.category_name}</span>
                </div>
                <Link
                  href={`/category-products/?category_id=${category?.category_id}&category_name=${category?.category_name}`}
                  onClick={() => viewAll(category?.category_id)}
                >
                  <AllViewButton />
                </Link>
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-4 lg:gap-4">
                {category?.products?.slice(0, 10).map((item) => (
                  <SingleCart item={item} key={item?.product_id}></SingleCart>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
      {/* <PaymentOptions></PaymentOptions> */}

      {/* <CookieConsent /> */}
    </section>
  );
}
