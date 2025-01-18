import React, {  useEffect, useState } from "react";
import SingleCart from "@/components/singleCart";
import dynamic from "next/dynamic";
import { publicRequest } from "@/config/axios.config";
import { useProduct } from "@/hooks/useProducts";
import { useRouter } from "next/router";
import { FiFilter } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { PiRectangle } from "react-icons/pi";
import style from "./style.module.css";
import Image from "next/image";
import ProductSkeleton from "@/components/loader/ProductSkeleton";
import PriceFilter from "@/components/priceFilter";
import { Toastify } from "@/components/toastify";
import UnitFilter from "./components/UnitFilter"; 
import ColorFilter from "./components/ColorFilter";
// const ColorFilter = dynamic(() => import("./components/ColorFilter"),  {
//   loading: () => <p>Loading...</p>,
// });
const CategoryProducts = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { category_id, category_name } = router.query;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [colors, setColors] = useState([]);
  const [subCategory, setSubcategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [units, setUnits] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const categoryFetch = async () => {
    try {
      setLoading(false);
      const response = await publicRequest.get("categories");
      const fetchedCategories = response?.data?.data || [];
      const selectedCategory = fetchedCategories?.find(
        (item) => item?.category_id === category_id
      );
      console.log(selectedCategory ,"selectedCategory ================>");
      setSubcategory(selectedCategory?.childs || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const { products, setProducts, loading: productLoading } = useProduct();
  console.log(products);

  // Function to fetch colors
  const fetchColors = async () => {
    try {
      setLoading(false);
      const response = await publicRequest.get("color");
      setColors(response?.data?.data || []);
      // console.log('', response?.data?.data)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };
  useEffect(() => {
    categoryFetch();
  }, []);
  useEffect(() => {
    fetchColors();
  }, [selectedSubCategory]); // Updated dependencies
  useEffect(() => {
     
     if(category_id){
      publicRequest
      .get(`category/show/${category_id}`)
      .then((res) => {
        setUnits(res?.data?.data?.units);
        setLoading(false);
      })
      .catch((error) => {
        Toastify.Error("Error fetching sizes:");
      });
     }
  }, [category_id]);
  console.log(category_id,"this is category id");
  //Product unit and color Filter
  const [variantData, setVariantData] = useState({
    attributes: {
      // Example: unit_key id 1,6,7
      // Start with an empty array for color ids
    },
  });
  const [selectedColors, setSelectedColors] = useState([]);
  const handleColorChange = async (colorId) => {
    // Determine the new selected colors based on the current selection
    const newSelectedColors = selectedColors.includes(colorId)
      ? selectedColors.filter((id) => id !== colorId) // Unselect
      : [...selectedColors, colorId]; // Select

    // Update selected colors state
    setSelectedColors(newSelectedColors);
    // Update variantData with the new selected colors
    const updatedVariantData = {
      ...variantData,
      attributes: {
        ...variantData.attributes,
        color: newSelectedColors, // Update color attribute
      },
    };
    setVariantData(updatedVariantData);

    // Log the updated variantData directly
    try {
      setLoading(false); 
      const res = await publicRequest.post(
        "product/variant-color-filter",
        updatedVariantData
      ); 
      setProducts(res?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAttributeChange = async (unitId, attributeId) => {
    // Manually calculate the new state
    const newSelectedAttributes = selectedAttributes[unitId] || [];
    const updatedAttributes = newSelectedAttributes.includes(attributeId)
      ? newSelectedAttributes.filter((id) => id !== attributeId) // Unselect
      : [...newSelectedAttributes, attributeId]; // Select

    // Update the selectedAttributes state manually
    const updatedSelectedAttributes = {
      ...selectedAttributes,
      [unitId]: updatedAttributes,
    };

    // Update variantData based on the manually updated attributes
    const updatedVariantData = {
      ...variantData,
      attributes: {
        ...variantData.attributes,
        [`unit_${unitId}`]: updatedAttributes, // Update specific unit attribute
      },
    };

    // Set the updated states
    setSelectedAttributes(updatedSelectedAttributes); // Update selectedAttributes state
    setVariantData(updatedVariantData); // Update variantData state

    // Now call the API with the updated variantData
    try {
      setLoading(false);
      const res = await publicRequest.post(
        "product/variant-color-filter",
        updatedVariantData
      );
      setProducts(res?.data?.data); // Update products based on API response
      console.log("API Response:", res);
      setLoading(false);
    } catch (error) {
      // console.error("Error calling API:", error);
      Toastify.Error("Error fetching products");
    }

    // console.log("Updated variantData:", updatedVariantData);
  };

  if (loading || productLoading  ) {
    return <ProductSkeleton />;
  } 

  return (
    <div className="mt-36 px-5">
      {/* product banner--------------------------- */}
      <div className="text-center py-10">
        <h1 className="font-extrabold text-primary text-4xl py-2">
          {category_name}
        </h1>
        <p className="font-normal text-xl leading-7">
          Choose form the best collections
        </p>
        <p className="py-10 gap-10 flex justify-center">
          {subCategory?.map((sub) => (
            <button
              key={sub.index}
              className="shadow-lg font-normal rounded-sm py-2  text-xs px-10 "
            >
              {sub.category_name}
            </button>
          ))}
        </p>
      </div>

      <div className="flex container container-custom mx-auto items-start gap-10 w-full">
        {/* Filter options */}
        <div className="w-1/4 hidden lg:flex md:flex flex-col mt-24">
          <PriceFilter api="products" setProducts={setProducts} />
          {/* unit field map here  */}
          {units?.map((unit, index) => (
            <UnitFilter
              unit={unit}
              key={unit?.unit_id}
              selectedAttributes={selectedAttributes}
              handleAttributeChange={handleAttributeChange}
            />
          ))}

          <ColorFilter colors={colors} selectedColors={selectedColors} handleColorChange={handleColorChange}/>
          <Image
            height={1000} 
            width={300}
            className="mt-10 w-full"
            src="/images/filterbanner.svg"
            alt=""
          />
        </div>

        <div className="w-full">
          <div className="flex lg:hidden md:hidden shadow-custom rounded-lg justify-between p-2 mb-2">
            <button onClick={toggleDrawer} className="text-xl">
              <FiFilter />
            </button>
          </div>
          {/* All product show */}
          <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 md:gap-8 justify-between">
            {products && Array.isArray(products) ? (
              products.map((product) => (
                <SingleCart key={product?.product_id} item={product} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>

      {/* Drawer for mobile filters */}
      <div
        className={`fixed top-36 right-0 h-[calc(100vh-144px)] z-20 bg-white transition-transform transform ${
          isDrawerOpen ? "-translate-x-0" : "translate-x-full"
        } w-2/3`}
      >
        <div className="p-4 h-full flex flex-col">
          <button onClick={toggleDrawer} className="text-xl ">
            <MdClose />
          </button>

          <div className="flex-grow mt-4 overflow-y-auto">
            {" "}
            {/* Ensures the content area has scrollable overflow */}
            <div className="flex-col">
              <PriceFilter api="products" setProducts={setProducts} />

              {units?.map((unit) => (
                <div key={unit?.unit_id} className="mt-10">
                  <p className="text-base font-semibold leading-6">
                    Filter by {unit?.unit_name}
                  </p>
                  {unit?.attributes?.map((attribute) => (
                    <p
                      key={attribute?.attribute_id}
                      className="flex py-1 text-xs font-normal leading-4 items-center gap-2"
                    >
                      <input
                        className="border-[#AAAAAA]"
                        type="checkbox"
                        onChange={() =>
                          handleAttributeChange(
                            unit?.unit_id,
                            attribute?.attribute_id
                          )
                        }
                        checked={selectedAttributes[unit?.unit_id]?.includes(
                          attribute?.attribute_id
                        )}
                      />
                      {attribute?.attribute_name}
                    </p>
                  ))}
                </div>
              ))}

              <div className="mt-10">
                <p className="text-base font-semibold leading-6">
                  Filter by color
                </p>
                {colors.map((color) => (
                  <button
                    key={color?.color_id}
                    className="flex py-1 text-xs font-normal leading-4 items-center gap-2"
                  >
                    <span className="h-[13px] border overflow-hidden w-[13px]">
                      <PiRectangle
                        className={`${color.color} w-[30px] h-[50px]`}
                      />
                    </span>
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  CategoryProducts;
