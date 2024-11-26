import SingleCart from "@/components/singleCart";
import { publicRequest } from "@/config/axios.config";
import { useProduct } from "@/hooks/useProducts";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { PiRectangle } from "react-icons/pi";
import style from "./style.module.css";
import Image from "next/image";
import ProductSkeleton from "@/components/loader/ProductSkeleton";
const Products = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { category_id, category_name } = router.query;
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(200);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [colors, setColors] = useState([]);
  const [subCategory, setSubcategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [units, setUnits] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  //range function
  const minGap = 0;
  const sliderminValue = 0; // set this to your desired minimum value
  const sliderMaxValue = 5000;
  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= maxValue - minGap) {
      setMinValue(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minValue + minGap) {
      setMaxValue(value);
    }
  };
  const setArea = () => {
    const rangeStyle = {
      left: `${
        ((minValue - sliderminValue) / (sliderMaxValue - sliderminValue)) * 100
      }%`,
      right: `${
        100 -
        ((maxValue - sliderminValue) / (sliderMaxValue - sliderminValue)) * 100
      }%`,
    };
    const minTooltipStyle = {
      left: `${(minValue / sliderMaxValue) * 100}%`,
    };
    const maxTooltipStyle = {
      right: `${100 - (minValue / sliderMaxValue) * 100}%`,
    };

    return { rangeStyle, minTooltipStyle, maxTooltipStyle };
  };

  const { rangeStyle } = setArea();

  useEffect(() => {
    setArea();
  }, [minValue, maxValue]);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const categoryFetch = async () => {
    try {
      setLoading(true);
      const response = await publicRequest.get("categories");
      const fetchedCategories = response?.data?.data || [];
      const selectedCategory = fetchedCategories?.find(
        (item) => item?.category_id === category
      );
      setSubcategory(selectedCategory?.childs || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const { products, setProducts,loading:productLoading } = useProduct();
  console.log(products);
  const fetchSizes = async () => {
    try {
      setLoading(true);
      const response = await publicRequest.get(`category/show/${category_id}`);
      setUnits(response.data?.data?.units);
      setLoading(false);
      // setSize(response.data?.data?.units[0]?.attributes || []);
      //  console.log('size--------->', response?.data?.data?.data)
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  // Function to fetch colors
  const fetchColors = async () => {
    try {
      setLoading(true);
      const response = await publicRequest.get("color");
      setColors(response?.data?.data || []);
      // console.log('', response?.data?.data)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  const PriceFilter = async () => {
    // console.log('click')
    try {
      setLoading(true);
      const response = await publicRequest.post("product/price/filter", {
        min_price: minValue,
        max_price: maxValue,
      });
      setProducts(response?.data?.data || []);
      //console.log('price Filtered---->', response)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  useEffect(() => {
    fetchSizes();
    fetchColors();
    categoryFetch();
  }, [category_id, selectedSubCategory]); // Updated dependencies

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
      setLoading(true);
      console.log(updatedVariantData);
      const res = await publicRequest.post(
        "product/variant-color-filter",
        updatedVariantData
      );
      console.log(res.data.data);
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
      setLoading(true);
      const res = await publicRequest.post(
        "product/variant-color-filter",
        updatedVariantData
      );
      setProducts(res?.data?.data); // Update products based on API response
      console.log("API Response:", res);
      setLoading(false);
    } catch (error) {
      console.error("Error calling API:", error);
    }

    console.log("Updated variantData:", updatedVariantData);
  };

  if (loading || productLoading) {
    return <ProductSkeleton/>
    }
  
  return (
    <div className="mt-36">
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

      <div className="flex container mx-auto items-start gap-10 w-full">
        {/* Filter options */}
        <div className="w-1/4 hidden lg:flex md:flex flex-col mt-24">
          <div>
            <p className="text-base font-semibold leading-6">Price Range</p>
            <div className="flex items-center gap-5">
              <input
                className="border text-xs font-normal w-16 text-center"
                type="text"
                name="min"
                value={minValue}
                onChange={handleMinChange}
                placeholder="Min"
              />
              <hr className="w-5 border" />
              <input
                className="border text-xs font-normal w-16 text-center"
                type="text"
                name="max"
                value={maxValue}
                onChange={handleMaxChange}
                placeholder="Max"
              />
            </div>
            <div>
              <div
                className={`relative w-48 h-2 bg-primary ${style.range_slider} `}
              >
                <input
                  type="range"
                  className={style.minvalue}
                  min={sliderminValue}
                  max={sliderMaxValue}
                  value={minValue}
                  onChange={handleMinChange}
                />
                <input
                  type="range"
                  className={style.maxValue}
                  min={sliderminValue}
                  max={sliderMaxValue}
                  value={maxValue}
                  onChange={handleMaxChange}
                />
              </div>
              <div className="slider-track" style={rangeStyle}></div>
            </div>

            <button
              onClick={PriceFilter}
              className="mt-4  border rounded-md px-4 text-white  bg-primary text-sm "
            >
              Filter
            </button>
          </div>

          {units?.map((unit) => (
            <div key={unit?.unit_id} className="mt-10">
              <p className="text-base font-semibold leading-6">
                Filter by {unit?.unit_name}
              </p>
              {unit?.attributes?.map((attribute) => (
                <p
                  key={attribute?.attribute_id}
                  className="flex py-1 text-xs font-mormal leading-4 items-center gap-2"
                >
                  <input
                    className="border-[#AAAAAA]"
                    type="checkbox"
                    onChange={() =>
                      handleAttributeChange(
                        unit?.unit_id,
                        attribute?.attribute_id
                      )
                    } // Handle change
                    checked={selectedAttributes[unit?.unit_id]?.includes(
                      attribute?.attribute_id
                    )}
                  />{" "}
                  {attribute?.attribute_name}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-10">
            <p className="text-base font-semibold leading-6">Filter by color</p>
            {colors.map((color) => (
              <button
                key={color?.color_id}
                className="flex py-1 text-xs font-normal leading-4 items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color?.color_id)} // Check if the color is selected
                  onChange={() => handleColorChange(color?.color_id)}
                />
                {color?.name}
              </button>
            ))}
          </div>
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
          <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 md:gap-8 justify-between">
            {products?.map((product) => (
              <SingleCart key={product?.product_id} item={product} />
            ))}
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
          <button onClick={toggleDrawer} className="text-xl">
            <MdClose />
          </button>

          <div className="flex-grow mt-4 overflow-y-auto">
            {" "}
            {/* Ensures the content area has scrollable overflow */}
            <div className="flex-col">
              <div>
                <p className="text-base font-semibold leading-6">Price Range</p>
                <div className="flex items-center pb-2 gap-5">
                  <input
                    className="border text-xs font-normal w-16 text-center"
                    type="text"
                    name="min"
                    value={minValue}
                    onChange={handleMinChange}
                    placeholder="Min"
                  />
                  <hr className="w-5 border" />
                  <input
                    className="border text-xs font-normal w-16 text-center"
                    type="text"
                    name="max"
                    value={maxValue}
                    onChange={handleMaxChange}
                    placeholder="Max"
                  />
                </div>
                <div>
                  <div
                    className={`relative w-48 h-2 bg-primary ${style.range_slider}`}
                  >
                    <input
                      type="range"
                      className={style.minvalue}
                      min={sliderminValue}
                      max={sliderMaxValue}
                      value={minValue}
                      onChange={handleMinChange}
                    />
                    <input
                      type="range"
                      className={style.maxValue}
                      min={sliderminValue}
                      max={sliderMaxValue}
                      value={maxValue}
                      onChange={handleMaxChange}
                    />
                  </div>
                  <div className="slider-track" style={rangeStyle}></div>
                </div>

                <button
                  onClick={PriceFilter}
                  className="mt-4 border rounded-md px-4 text-white bg-primary text-sm"
                >
                  Filter
                </button>
              </div>

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

export default Products;
