import React, { useCallback, useEffect, useState } from "react";
import { publicRequest } from "@/config/axios.config";
import { useRouter } from "next/router";
import { networkErrorHandeller } from "@/utils/helpers";
import SingleCart from "@/components/singleCart";
import { PiDotsNineBold } from "react-icons/pi";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { PiDotsThreeVertical } from "react-icons/pi";
import { RiFilterOffLine } from "react-icons/ri";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { Pagination } from "swiper/modules";

const CategoryProducts = () => {
  const router = useRouter();
  const { category_id } = router.query;

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [expandedUnits, setExpandedUnits] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [gridCount, setGridCount] = useState(4);

  /** Fetch category */
  const fetchCategory = useCallback(async () => {
    if (!category_id) return;
    setLoading(true);
    try {
      const response = await publicRequest.get(`category/show/${category_id}`);
      if (response && response.status === 200) {
        setCategory(response?.data?.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setLoading(false);
    }
  }, [category_id]);

  /** fetch category product */
  const fetchCategoryProduct = useCallback(async () => {
    if (!category_id) return;
    setLoading(true);
    try {
      const response = await publicRequest.post(
        `category/product/with-filter`,
        generatePayload()
      );
      if (response && response.status === 200) {
        setProducts(response?.data?.data?.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setLoading(false);
    }
  }, [category_id, selectedAttributes]);

  // Generate payload
  const generatePayload = () => ({
    category_id: category_id,
    attributes: selectedAttributes ? selectedAttributes : {},
  });
  console.log("generatePayload", generatePayload());
  /** filter product */
  // const fetchFilterCategoryProduct = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await publicRequest.post(
  //       `product/variant-color-filter`,
  //       generatePayload()
  //     );
  //     if (response && response.status === 200) {
  //       setProducts(response?.data?.data?.data);
  //     }
  //   } catch (error) {
  //     networkErrorHandeller(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [category_id, selectedAttributes]);

  // useEffect(() => {
  //   fetchFilterCategoryProduct();
  // }, [selectedAttributes]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    if (category_id) {
      fetchCategoryProduct();
    }
  }, [fetchCategoryProduct]);

  console.log("category", category);

  // Toggle expand/collapse for units
  const toggleUnit = (unitId) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  // Handle checkbox selection
  // const handleCheckboxChange = (unitKey, attributeId) => {
  //   setSelectedAttributes((prev) => {
  //     const updatedUnit = prev[unitKey] || [];
  //     const updatedAttributes = updatedUnit.includes(attributeId)
  //       ? updatedUnit.filter((id) => id !== attributeId) // Remove attribute
  //       : [...updatedUnit, attributeId]; // Add attribute
  //     return { ...prev, [unitKey]: updatedAttributes };
  //   });
  // };
  // Handle checkbox selection
  const handleCheckboxChange = (unitKey, attributeId) => {
    setSelectedAttributes((prev) => {
      const updatedUnit = prev[unitKey] || [];
      const updatedAttributes = updatedUnit.includes(attributeId)
        ? updatedUnit.filter((id) => id !== attributeId) // Remove attribute
        : [...updatedUnit, attributeId]; // Add attribute

      // Update state with filtered units, excluding empty arrays
      const updatedState = { ...prev, [unitKey]: updatedAttributes };
      if (updatedAttributes.length === 0) {
        delete updatedState[unitKey]; // Remove unit if its array is empty
      }
      return updatedState;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>No category data available.</div>;
  }

  return (
    <div className="mx-auto container px-2 mt-36 pt-5">
      <section className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* left side */}
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Category: {category.category_name}
          </h1>
          {category.units.map((unit) => (
            <div key={unit.unit_id} className="border-b pb-4 mb-4">
              <div
                onClick={() => toggleUnit(`unit_${unit.unit_id}`)}
                className="cursor-pointer font-semibold text-lg flex justify-between items-center"
              >
                {unit.unit_name}
                <span>{expandedUnits[`unit_${unit.unit_id}`] ? "▲" : "▼"}</span>
              </div>
              {expandedUnits[`unit_${unit.unit_id}`] && (
                <div className="mt-2 pl-4">
                  {unit.attributes.map((attribute) => (
                    <label
                      key={attribute.attribute_id}
                      className="block cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        value={attribute.attribute_id}
                        checked={
                          selectedAttributes[`unit_${unit.unit_id}`]?.includes(
                            attribute.attribute_id
                          ) || false
                        }
                        onChange={() =>
                          handleCheckboxChange(
                            `unit_${unit.unit_id}`,
                            attribute.attribute_id
                          )
                        }
                      />
                      {attribute.attribute_name}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4">
            <h2 className="font-semibold text-lg">Payload:</h2>
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(generatePayload(), null, 2)}
            </pre>
          </div>
        </div>

        {/* right side product section */}
        <section className=" col-span-5">
          <div className="flex items-center justify-between bg-gray-50 px-2 my-2 rounded">
            <h1 className="font-extrabold text-primary text-xl py-2 flex items-center gap-1">
              <HiClipboardDocumentList /> All Products
            </h1>

            <p className="flex items-center gap-2">
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
                className={`border border-primary text-2xl  ${
                  gridCount === 2 ? "bg-primary text-white" : ""
                } rounded-md cursor-pointer`}
              />
            </p>
          </div>

          <div
            className={`w-full grid grid-cols-2 gap-2 md:grid-cols-${gridCount} lg:grid-cols-${gridCount} lg:gap-4 md:gap-4 justify-between`}
          >
            {products && Array.isArray(products) ? (
              products.map((product) => (
                <SingleCart key={product?.product_id} item={product} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
          {/* <Pagination api="products" data={setProducts} /> */}
        </section>
      </section>
    </div>
  );
};

export default CategoryProducts;
