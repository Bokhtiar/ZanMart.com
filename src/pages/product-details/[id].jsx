import Loader from "@/components/loader";
import ProductDetailsSkeleton from "@/components/loader/productDetailSkeleton";
import SingleCartSkeleton from "@/components/loader/singleCartSkeleton";
import { Toastify } from "@/components/toastify";
import TopFeature from "@/components/TopFeature";
import { publicRequest } from "@/config/axios.config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { networkErrorHandeller } from "@/utils/helpers";
import SingleCart from "@/components/singleCart";
import { PiDotsThreeVertical } from "react-icons/pi";
import { PiDotsNineBold } from "react-icons/pi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import ProductSkeleton from "@/components/loader/ProductSkeleton";

const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [product, setProduct] = useState({});
  const { id } = router.query;
  const [categoryName, setCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(product?.sell_price);
  const [variant, setvarient] = useState();
  const [selectdColor_id, setSelectedColor_id] = useState();
  const [selectdAtribute_id, setSelectedAttribute_id] = useState();
  const [selectedWeight, setSelectedWeight] = useState();
  const [thumb, setThumb] = useState();
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [reletedProduct, setReletedProduct] = useState([]);
  const [gridCount, setGridCount] = useState(5);
  const [reletedProductLoading, setReletedProductLoading] = useState(false);

  /** product details */
  const fetchProduct = async () => {
    setLoading(true);
    try {
      // Fetch product by ID
      const res = await publicRequest.get(`product/${id}`);
      setProduct(res?.data?.data);

      setThumb(res?.data?.data?.thumbnail_image);

      // Fetch categories
      const categoryResponse = await publicRequest.get(`categories`);
      const categories = categoryResponse?.data?.data;
      const productCategoryId = res?.data?.data?.category_id;
      const categoryName = categories?.find(
        (itm) => itm.category_id === productCategoryId
      )?.category_name;
      setCategoryName(categoryName);

      // Set default selected color and attribute if product_variants exist
      const productVariants = res?.data?.data?.product_variants;
      setvarient(productVariants);

      if (productVariants?.length > 0) {
        setSelectedColor(productVariants[0]?.color?.name);
        setSelectedAttribute(productVariants[0]?.attribute?.name);
        setSelectedPrice(productVariants[0]?.price);
        setSelectedAttribute_id(productVariants[0]?.attribute?.attribute_id);
        setSelectedColor_id(productVariants[0]?.color_id);
        setSelectedWeight(productVariants[0]?.weight);
        setSelectedDiscount(productVariants[0]?.discount_price);
      } else {
        setSelectedPrice(res?.data?.data?.sell_price);
        setSelectedWeight(res?.data?.data?.weight);
      }
    } catch (error) {
      Toastify.Error(error);
    }
    setLoading(false);
  };

  /** category releted product */
  const reletedProductCategory = useCallback(async () => {
    try {
      setReletedProductLoading(true);
      const response = await publicRequest.get(
        `category/product/${product?.category_id}`
      );
      if (response && response.status === 200) {
        setReletedProduct(response?.data?.data?.data);
        setReletedProductLoading(false);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, [product?.category_id]);

  const handelIncriment = () => setQuantity(quantity + 1);
  const handelDiccriment = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const data = product?.product_variants?.map((item) => ({
    color_name: item?.color?.name,
    color_id: item?.color?.color_id,
    unit: item?.unit?.name,
    price: item?.price,
    product_qty: item?.product_qty,
    attribute: item?.attribute?.name,
    attribute_id: item?.attribute?.attribute_id,
    weight: item?.weight,
    attribute_weight: item?.attribute?.attribute_weight,
    discount_price: item?.discount_price,
  }));
  console.log(product);
  console.log(data);
  const handelCart = () => {
    // Find the selected variant based on the selected color and attribute
    const selectedVariant = product?.product_variants.find(
      (item) =>
        item?.color_id === selectdColor_id &&
        item?.attribute_id === selectdAtribute_id
    );

    if (
      selectedVariant &&
      product?.low_stock_quantity_warning <= selectedVariant?.product_qty
    ) {
      const cartItem = {
        product_id: product?.product_id,
        sell_price: selectedPrice,
        weight: product?.weight || selectedWeight || 1,
        attribute_id: selectdAtribute_id,
        attribute: selectedAttribute,
        color_id: selectdColor_id,
        color: selectedColor,
        attribute_weight: selectedWeight || null,
        attribute_price: selectedPrice,
        qty: quantity,
        image: product?.thumbnail_image,
        category: categoryName,
        title: product?.title,
        payment: product?.delivery_status,
        product_variant_id: selectedVariant?.product_variant_id, // Include the variant ID
      };

      let cart = localStorage.getItem("cart");
      cart = cart ? JSON.parse(cart) : { cart_items: [] };

      const isProductInCart = cart?.cart_items?.some(
        (item) =>
          item?.product_id === cartItem?.product_id &&
          item?.product_variant_id === cartItem?.product_variant_id
      );

      if (isProductInCart) {
        Toastify.Warning("Already in Cart");
      } else {
        cart.cart_items.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        Toastify.Success("Product added successfully");
      }
    } else {
      Toastify.Warning(
        "Selected size and color is not available.Please select another color or size"
      );
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.category_id) {
      reletedProductCategory();
    }
  }, [product?.category_id]);

  console.log(product?.product_variants);
  const [imageArray, setImageArray] = useState([]);
  useEffect(() => {
    // Ensure the gallery images are available and parse them if necessary
    if (product?.gallery_image) {
      // Assuming gallery_image is a string (or stringified array) that needs to be parsed
      let galleryImages = [];
      if (typeof product.gallery_image === "string") {
        try {
          // Attempt to parse the string if it is JSON-formatted
          galleryImages = JSON.parse(product.gallery_image);
        } catch (error) {
          // If it's not JSON, assume it's a malformed string and handle it
        }
      } else {
        galleryImages = product.gallery_image; // If it's already an array
      }

      // Clean the image paths by removing backslashes
      const cleanedImages = galleryImages.map((image) =>
        image.replace(/\\/g, "")
      );
      setImageArray(cleanedImages); // Update state with cleaned image paths
    }
  }, [product?.gallery_image]); // Run when product.gallery_image changes

  const [have, setHave] = useState(true);
  const handleColor = (colordata) => {
    setSelectedColor(colordata?.color_name);
    setSelectedColor_id(colordata.color_id);

    const newColor = data?.find(
      (item) =>
        item?.color_name === colordata?.color_name &&
        item?.attribute === selectedAttribute
    );
    console.log(newColor);
    setSelectedPrice(newColor?.price || product?.sell_price);
    setSelectedWeight(newColor?.weight || product?.weight);
    setSelectedDiscount(newColor?.discount_price || product?.discount_price); // Updated line
  };

  const attributeHandle = (attributedata) => {
    setSelectedAttribute(attributedata?.attribute);
    setSelectedAttribute_id(attributedata?.attribute_id);

    const newAttribute = data?.find(
      (item) =>
        item?.attribute === attributedata?.attribute &&
        item?.color_name === selectedColor
    );

    setSelectedPrice(newAttribute?.price || product?.sell_price);
    setSelectedWeight(newAttribute?.weight || product?.weight);
    setSelectedDiscount(
      newAttribute?.discount_price || product?.discount_price
    ); // Updated line
  };

  //change thumbnile image base on galllery
  const handleThumb = (img) => {
    setThumb(img);
  };
  if (loading) {
    return <ProductDetailsSkeleton />;
  }
  return (
    <div className="mx-auto container px-2 mt-36 pt-5">
      <div className="flex md:justify-between flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col contents-between">
          <div className="flex justify-center items-center">
            <div className=" relative">
              <InnerImageZoom
                src={`${process.env.NEXT_PUBLIC_API_SERVER}${thumb}`} // Image source
                zoomSrc={`${process.env.NEXT_PUBLIC_API_SERVER}${thumb}`} // High-res image for zoom
                alt="Product Thumbnail"
                zoomType="hover" // Enable zoom on hover
                zoomPreload={true} // Preload the zoomed image to avoid flickering
                // Ensure the zoomed image is displayed only on hover
                zoomPosition="left" // Position of the zoom effect (you can change to 'left', 'top', 'bottom')
                fillAvailableSpace={true}
                className=" max-h-[550px] w-[550px] rounded" // Make the image fill the available space
              />
            </div>
          </div>

          <div className="flex py-5 gap-4 w-1/2">
            {imageArray?.map((img, index) => (
              <Image
                onClick={() => handleThumb(img)}
                key={index}
                height={500}
                width={500}
                className="h-20 w-20 cursor-pointer"
                src={`${process.env.NEXT_PUBLIC_API_SERVER}${img}`} // Assuming the path is correct
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col content-between items- w-full lg:w-1/2">
          <>
            <h1 className="font-medium text-3xl text-start leading-10 text-gray-600">
              {product?.title}
            </h1>

            <p className="text-lg pt-4 pb-3 leading-4 font-bold text-secondary">
              {categoryName}
            </p>
            {variant?.length > 0 && (
              <p className="text-base font-light leading-6 pb-3 text-[#AAAAAA]">
                Available Size: <br />
                {!have && <p>size not avialable</p>}
                {data
                  ?.filter(
                    (obj, index, self) =>
                      index ===
                      self.findIndex((o) => o.attribute_id === obj.attribute_id)
                  )
                  .map((attribute, index) => (
                    <button
                      onClick={() => attributeHandle(attribute)}
                      className={`font-semibold px-2 py-1 me-1 border rounded-md ${
                        selectedAttribute === attribute?.attribute
                          ? "bg-primary text-white"
                          : "bg-transparent"
                      }`}
                      key={index}
                    >
                      {attribute?.attribute}
                    </button>
                  ))}
              </p>
            )}
            {variant?.length > 0 && (
              <p className="text-base font-light  leading-6 pb-3 text-[#AAAAAA]">
                Available Colors: <br />
                {!have && <p>color not avialable</p>}
                {data
                  ?.filter(
                    (obj, index, self) =>
                      index ===
                      self.findIndex((o) => o.color_id === obj.color_id)
                  )
                  .map((color, index) => (
                    <button
                      onClick={() => handleColor(color)}
                      // onClick={()=>setcm(color?.color_name)}
                      className={`font-bold p-2 me-1 border rounded-md ${
                        selectedColor === color?.color_name
                          ? "bg-primary text-white"
                          : "bg-transparent"
                      }`}
                      key={index}
                    >
                      {color?.color_name}
                    </button>
                  ))}
              </p>
            )}
            <div className="flex gap-3">
              <p className="flex text-center w-24 border items-center text-primary rounded-sm border-[#D9D9D9] px-1">
                <IoMdCheckmarkCircleOutline /> in stock
              </p>
              {product?.delivery_status === "cash" ? (
                <p className="flex text-center border items-center text-primary rounded-sm border-[#D9D9D9] px-1">
                  <IoMdCheckmarkCircleOutline /> Cash on delivery Available
                </p>
              ) : (
                <p className="flex text-center border items-center text-primary rounded-sm border-[#D9D9D9] px-1">
                  <IoMdCheckmarkCircleOutline /> Online Payment
                </p>
              )}
            </div>
            <p className="flex py-3 flex-row items-center w-1/2 lg:w-3/5 justify-between">
              <span className="text-primary md:text-3xl text-2xl lg:text-5xl font-bold">
                {selectedPrice}{" "}
                <span className="md:text-2xl text-lg lg:text-2xl font-normal text-black">
                  tk
                </span>
              </span>
              {selectedDiscount && (
                <span className="text-secondary flex lg:text-2xl line-through">
                  {selectedDiscount}
                </span>
              )}
            </p>
            {product?.rating && (
              <span className="flex justify-start py-2">
                {product &&
                  Array(Math.floor(product?.rating) - 1)
                    .fill(null)
                    .map((_, index) => (
                      <FaStar key={index} className="text-secondary" />
                    ))}
                {product?.rating % 2 !== 0 ? (
                  <FaStar className="text-secondary" />
                ) : (
                  <FaStarHalfAlt className="text-secondary" />
                )}
              </span>
            )}
            <div className="">
              <p className="rounded-xl font-medium lg:items-center text-lg lg:text-xl border flex-col gap-2 lg:flex-row lg:justify-between flex w-3/5 lg:p-3">
                <span className="flex items-center gap-2">
                  Qty:
                  <span className="border flex items-center justify-between gap-5 rounded-xl border-[#D9D9D9]">
                    <button onClick={handelDiccriment} className="p-1">
                      -
                    </button>{" "}
                    {quantity}
                    <button onClick={handelIncriment} className="p-1">
                      +
                    </button>
                  </span>
                </span>
                <button
                  onClick={handelCart}
                  className="p-1 lg:py-2 text-base lg:px-3 text-white bg-primary rounded-xl"
                >
                  Add To Cart
                </button>
              </p>
            </div>
          </>

          {/* <div className='py-8 flex gap-3'>
                        <FaFacebookF className='text-2xl border-2 p-2 border-gray-200 hover:bg-gray-100 rounded-full' />
                        <FaInstagram className='text-2xl border-2 p-2 border-gray-200 hover:bg-gray-100 rounded-full' />
                        <FaLinkedinIn className='text-2xl border-2 p-2 border-gray-200 hover:bg-gray-100 rounded-full' />
                        <FaTwitter className='text-2xl border-2 p-2 border-gray-200 hover:bg-gray-100 rounded-full' />
                    </div> */}
        </div>
      </div>
      {/* <TopFeature
        key={id}
        categoryid={id}
        title="Related Products"
        dataUrl={"home-page-category"}
      ></TopFeature> */}
      <section>
        <div className="flex items-center justify-between bg-gray-50 px-2 my-2 rounded">
          <h1 className="font-extrabold text-primary text-xl py-2 flex items-center gap-1">
            <HiClipboardDocumentList /> Releted Products
          </h1>

          <p className="flex items-center gap-2">
            <PiDotsNineBold
              onClick={() => setGridCount(5)}
              className={`border border-primary text-2xl rounded-md ${
                gridCount === 5 ? "bg-primary text-white" : ""
              } cursor-pointer`}
            />
            <PiDotsSixVerticalBold
              onClick={() => setGridCount(4)}
              className={`border border-primary text-2xl ${
                gridCount === 4 ? "bg-primary text-white" : ""
              } rounded-md cursor-pointer`}
            />
            <PiDotsThreeVertical
              onClick={() => setGridCount(3)}
              className={`border border-primary text-2xl  ${
                gridCount === 3 ? "bg-primary text-white" : ""
              } rounded-md cursor-pointer`}
            />
          </p>
        </div>

        {reletedProductLoading ? (
          <ProductSkeleton />
        ) : (
          <div
            className={`bg-gray-50 p-5 w-full grid grid-cols-2 gap-2 md:grid-cols-${gridCount} lg:grid-cols-${gridCount} lg:gap-4 md:gap-4 justify-between`}
          >
            {reletedProduct.map((product) => (
              <SingleCart key={product?.product_id} item={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductDetails;
