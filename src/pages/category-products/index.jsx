import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { publicRequest } from "@/config/axios.config";
import { useRouter } from "next/router";
import { networkErrorHandeller } from "@/utils/helpers";
import SingleCart from "@/components/singleCart";
import { PiDotsNineBold } from "react-icons/pi";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { PiDotsThreeVertical } from "react-icons/pi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { BiCategoryAlt } from "react-icons/bi";
import { FaAngleDown, FaChevronUp } from "react-icons/fa";
import ProductSkeleton from "@/components/loader/ProductSkeleton";

const CategoryProducts = () => {
  const router = useRouter();
  const { category_id } = router.query;

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [expandedUnits, setExpandedUnits] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [gridCount, setGridCount] = useState(4);
  const [categoryLoading, setCategoryLoading] = useState(false)

  /** Fetch category */
  const fetchCategory = useCallback(async () => {
    if (!category_id) return;
    setCategoryLoading(true);
    try {
      const response = await publicRequest.get(`category/show/${category_id}`);
      if (response?.status === 200) {
        setCategory(response?.data?.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setCategoryLoading(false);
    }
  }, [category_id]);

  /** Fetch category products */
  const fetchCategoryProduct = useCallback(async () => {
    if (!category_id) return;
    setLoading(true);
    try {
      const payload = generatePayload();
      const response = await publicRequest.post(
        `category/product/with-filter`,
        payload
      );
      if (response?.status === 200) {
        setProducts(response?.data?.data?.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setLoading(false);
    }
  }, [category_id, selectedAttributes]);

  // Generate payload for API
  const generatePayload = () => ({
    category_id: category_id,
    attributes: selectedAttributes,
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    fetchCategoryProduct();
  }, [fetchCategoryProduct]);

  // Toggle expand/collapse for units
  const toggleUnit = (unitId) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  // Handle checkbox selection
  const handleCheckboxChange = (unitKey, attributeId) => {
    setSelectedAttributes((prev) => {
      const updatedUnit = prev[unitKey] || [];
      const updatedAttributes = updatedUnit.includes(attributeId)
        ? updatedUnit.filter((id) => id !== attributeId) // Remove attribute
        : [...updatedUnit, attributeId]; // Add attribute

      const updatedState = { ...prev, [unitKey]: updatedAttributes };
      if (updatedAttributes.length === 0) delete updatedState[unitKey];
      return updatedState;
    });
  };

  // Initialize expanded units
  useEffect(() => {
    if (category?.units) {
      const initialExpandedUnits = {};
      category?.units.forEach((unit) => {
        initialExpandedUnits[`unit_${unit.unit_id}`] = true;
      });
      setExpandedUnits(initialExpandedUnits);
    }
  }, [category]);

  return (
    <section className="  container-custom container">
      <section className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-4">
        {/* Left side */}
        {categoryLoading === true ? (
          <div className="col-span-2 my-2 bg-gray-50 px-2 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-2/3 my-4"></div>
            {[...Array(4)].map((_, index) => (
              <div key={index} className="mb-6">
                <div className="h-4 bg-gray-300 w-1/2 rounded mb-2"></div>
                {[...Array(3)].map((__, subIndex) => (
                  <div
                    key={subIndex}
                    className="h-3 bg-gray-200 w-3/4 rounded mb-1"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-2 my-2 bg-gray-50 px-2">
            <h1 className="font-extrabold text-primary text-xl py-2 flex items-center gap-1">
              <BiCategoryAlt /> {category?.category_name}
            </h1>
            {category?.units.map((unit) => (
              <div key={unit?.unit_id} className="border-b pb-4 mb-4">
                <div
                  onClick={() => toggleUnit(`unit_${unit?.unit_id}`)}
                  className="cursor-pointer text-md font-semibold flex justify-between items-center text-primary"
                >
                  {unit?.unit_name}
                  <span>
                    {expandedUnits[`unit_${unit?.unit_id}`] ? (
                      <FaChevronUp />
                    ) : (
                      <FaAngleDown />
                    )}
                  </span>
                </div>
                {expandedUnits[`unit_${unit?.unit_id}`] && (
                  <div className="mt-2 pl-4">
                    {unit?.attributes.map((attribute) => (
                      <label
                        key={attribute?.attribute_id}
                        className="block cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          value={attribute?.attribute_id}
                          checked={
                            selectedAttributes[
                              `unit_${unit?.unit_id}`
                            ]?.includes(attribute?.attribute_id) || false
                          }
                          onChange={() =>
                            handleCheckboxChange(
                              `unit_${unit?.unit_id}`,
                              attribute?.attribute_id
                            )
                          }
                        />
                        {attribute?.attribute_name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Right side: Products */}
        <section className="col-span-6">
         

          {loading ? (
            <ProductSkeleton count={4} />
          ) : products.length > 0 ? (
            <div> <div className="flex items-center justify-between bg-gray-50 px-2 my-2 rounded">
            <h1 className="font-extrabold  text-primary text-base md:text-xl py-2 flex items-center gap-1">
              <HiClipboardDocumentList /> {category?.category_name} 
            </h1>
            <p className="flex items-center hidden md:flex gap-2">
              <PiDotsNineBold
                onClick={() => setGridCount(4)}
                className={`border border-primary text-2xl rounded-md ${
                  gridCount === 4 ? "bg-primary text-white" : ""
                } cursor-pointer`}
              />
              <PiDotsSixVerticalBold
                onClick={() => setGridCount(3)}
                className={`border border-primary text-2xl ${
                  gridCount === 3 ? "bg-primary text-white" : ""
                } rounded-md cursor-pointer`}
              />
              <PiDotsThreeVertical
                onClick={() => setGridCount(2)}
                className={`border border-primary text-2xl ${
                  gridCount === 2 ? "bg-primary text-white" : ""
                } rounded-md cursor-pointer`}
              />
            </p>
          </div>
            <div
              className={`w-full grid grid-cols-2 gap-2 md:grid-cols-${gridCount} lg:grid-cols-${gridCount} lg:gap-4 md:gap-4 justify-between`}
            >
              {products.map((product) => (
                <SingleCart key={product?.product_id} item={product} />
              ))}
            </div></div>
          ) : (
            <Image
              height={400}
              width={600}
              className="mx-auto "
              src="/empty_product.png"
              alt="Logo"
            />
          )}
        </section>
      </section>
    </section>
  );
};

export default CategoryProducts;
