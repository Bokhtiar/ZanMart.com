import ProductDetailsSkeleton from "@/components/loader/productDetailSkeleton";
import { Toastify } from "@/components/toastify";
import { privateRequest, publicRequest } from "@/config/axios.config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { FaCheck, FaCheckCircle, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { networkErrorHandeller } from "@/utils/helpers";
import SingleCart from "@/components/singleCart";
import { PiDotsThreeVertical } from "react-icons/pi";
import { PiDotsNineBold } from "react-icons/pi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import ProductSkeleton from "@/components/loader/ProductSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import style from "./style.module.css";
import { MdOutlineFullscreen } from "react-icons/md";
import Paginations from "@/components/pagination";
import useStickyFetch from "@/hooks/sticky";
import { TbCurrencyTaka } from "react-icons/tb";
import ConfirmModal from "@/components/confirmModal";
import ProductReview from "./components/Review";
import { useSearchParams } from "next/navigation";
import { magnify } from "../../utils/magnify";
const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();
  const [product, setProduct] = useState({});
  const id = searchParams.get("id");
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
  const [currentPage, setCurrentPage] = useState(1);
  const [modalLoading, setModalLoading] = useState(false);
  const [avialableQty, setAvialableQty] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const router = useRouter();
  const handleModalClose = () => {
    setIsModalOpen(false);
    // setModalAction(null);
  };
  const [addressData, setAddressData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setAvialableQty(productVariants[0]?.available_quantity);
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
  const reletedProductCategory = useCallback(
    async (page = 1) => {
      try {
        setReletedProductLoading(true);
        const response = await publicRequest.get(
          `category/product/${product?.category_id}?page=${page}`
        );

        if (response && response.status === 200) {
          setReletedProduct(response?.data?.data?.data);
          setCurrentPage(response?.data?.data?.current_page);
          setLastPage(response?.data?.data?.last_page);
          setReletedProductLoading(false);
        }
      } catch (error) {
        networkErrorHandeller(error);
        setReletedProductLoading(false);
      }
    },
    [product?.category_id]
  );

  const handelIncriment = () => {
    if( avialableQty >= quantity) {
      setQuantity(quantity + 1);
    }
  }
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
    available_quantity: item?.available_quantity,
  }));

  const handelCart = () => {
    // Find the selected variant based on the selected color and attribute
    const selectedVariant = product?.product_variants.find(
      (item) =>
        item?.color_id === selectdColor_id &&
        item?.attribute_id === selectdAtribute_id
    );

    if (
      product?.product_variants.length !== 0 &&
      selectedVariant &&
      avialableQty > 0
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
        product_variant_id: selectedVariant?.product_variant_id,
        attribute_discount_price: selectedDiscount || 0, // Include the variant ID
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
    } else if (product?.product_variants?.length == 0 && product?.qty > 0) {
      const cartItem = {
        product_id: product?.product_id,
        sell_price: selectedPrice,
        weight: product?.weight || selectedWeight || 1,
        attribute_id: selectdAtribute_id || null,
        color_id: selectdColor_id || null,
        attribute_weight: selectedWeight || null,
        attribute_price: selectedPrice,
        qty: quantity,
        image: product?.thumbnail_image,
        category: categoryName,
        title: product?.title,
        payment: product?.delivery_status,
        attribute_discount_price: selectedDiscount || 0,
        product_variant_id: 0, // Include the variant ID
      };

      let cart = localStorage.getItem("cart");
      cart = cart ? JSON.parse(cart) : { cart_items: [] };

      const isProductInCart = cart?.cart_items?.some(
        (item) => item?.product_id === cartItem?.product_id
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
  const [orderData, setorderData] = useState([]);
  const handleBuyNow = () => {
      // Find the selected variant based on the selected color and attribute
    const selectedVariant = product?.product_variants.find(
      (item) =>
        item?.color_id === selectdColor_id &&
        item?.attribute_id === selectdAtribute_id
    );

    if (product?.product_variants.length !== 0 && (selectedVariant && avialableQty > 0)) {
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
        product_variant_id: selectedVariant?.product_variant_id,
        attribute_discount_price: selectedDiscount || 0, // Include the variant ID
      };

      let cart = localStorage.getItem("cart");
      cart = cart ? JSON.parse(cart) : { cart_items: [] };

      const isProductInCart = cart?.cart_items?.some(
        (item) =>
          item?.product_id === cartItem?.product_id &&
          item?.product_variant_id === cartItem?.product_variant_id
      );

      if (isProductInCart) {
        router.push('/my-cart?modal=true')
      } else {
        cart.cart_items.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
         router.push('/my-cart?modal=true')
      }
    }
    else if (product?.product_variants?.length == 0 && product?.qty > 0) {
      const cartItem = {
        product_id: product?.product_id,
        sell_price: selectedPrice,
        weight: product?.weight || selectedWeight || 1,
        attribute_id: selectdAtribute_id || null,
        color_id: selectdColor_id || null,
        attribute_weight: selectedWeight || null,
        attribute_price: selectedPrice,
        qty: quantity,
        image: product?.thumbnail_image,
        category: categoryName,
        title: product?.title,
        payment: product?.delivery_status,
        attribute_discount_price: selectedDiscount || 0,
           product_variant_id: 0 , // Include the variant ID
      };

      let cart = localStorage.getItem("cart");
      cart = cart ? JSON.parse(cart) : { cart_items: [] };

      const isProductInCart = cart?.cart_items?.some(
        (item) => item?.product_id === cartItem?.product_id
      );

      if (isProductInCart) {
        Toastify.Warning("Already in Cart");
      } else {
        cart.cart_items.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        Toastify.Success("Product added successfully");
      }
    }
    else {
      Toastify.Warning(
        "Selected size and color is not available.Please select another color or size"
      );
    }
  };
  const handleConfirm = async () => {
    const newMyOrder = {
      cart_items: [orderData],
      billing_address_id: addressData?.address_id,
      shipping_address_id: addressData?.address_id,
    };
    try {
      if (newMyOrder?.shipping_address_id && newMyOrder?.billing_address_id) {
        setModalLoading(true);
        const res = await privateRequest.post("user/orders", newMyOrder);

        if (res?.status === 200 || res?.status === 201) {
          Toastify.Success(res.data?.message);
          // const emptyCart = { ...cart, cart_items: [] };
          // setCart(emptyCart);
          // localStorage.setItem("cart", JSON.stringify(emptyCart));
          // window.dispatchEvent(new Event("cartUpdated"));
          router.push(
            `/profile/confirm-order/${res?.data?.order_id?.order_id}`
          );
          setModalLoading(false);
        }
      } else {
        // Toastify.Error("Please select an address");
      }
    } catch (error) {
      Toastify.Error(error.response?.data?.message);
      setModalLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.category_id) {
      reletedProductCategory(1);
    }
  }, [product?.category_id]);
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
    setSelectedPrice(newColor?.price || product?.sell_price);
    setSelectedWeight(newColor?.weight || product?.weight);
    setSelectedDiscount(newColor?.discount_price || product?.discount_price); // Updated line
    setAvialableQty(newColor?.available_quantity); // Updated line
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
    setAvialableQty(newAttribute?.available_quantity);
  };

  //change thumbnile image base on galllery
  const handleThumb = (img) => {
    setThumb(img);
  };
  const [isOpen, setIsOpen] = useState(false);
  const { isSticky } = useStickyFetch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex); // Update current index when slide changes
  };
  
  if (loading) {
    return <ProductDetailsSkeleton />;
  }
  return (
    <div className={`container-custom px-2 ${isSticky && "mt-14"} pt-5`}>
      {/* start single product design  */}
      <div className="flex md:justify-between flex-col lg:flex-row lg:justify-between gap-4">
        <div className="flex flex-col contents-between ">
          <div className="flex justify-center items-center">
            <div className=" relative group">
              <button
                onClick={() => setIsOpen(true)}
                className="absolute top-3 right-3 z-10 cursor-zoom-in text-4xl text-gray-500  group-hover:block"
              >
                <MdOutlineFullscreen />
              </button>
              {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                  <button
                    className="absolute top-5 right-5 text-white text-2xl"
                    onClick={() => setIsOpen(false)}
                  >
                    ✖
                  </button>
                  <span className="absolute top-5 left-5 text-gray-50 text-sm">
                    {currentIndex + 1}/
                    {[product?.thumbnail_image, imageArray].flat().length}
                  </span>
                  {/* image sliding show here  */}
                  <div className="h-full py-20 w-full flex items-center justify-center">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      lazy={true}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      modules={[Navigation]}
                      className={style.swiper}
                      onSlideChange={handleSlideChange}
                    >
                      {[product?.thumbnail_image, imageArray]
                        .flat()
                        .map((item, idx) => (
                          <SwiperSlide
                            className={style["swiper-slide"]}
                            key={idx}
                          >
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_SERVER}${item}`}
                              alt="loading..."
                              loading="lazy"
                              className={style["swiper-slide img"]}
                              width={1000}
                              height={1000}
                            />
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                </div>
              )}

         <div className="relative max-w-md ">
      <Image
         src={`${process.env.NEXT_PUBLIC_API_SERVER}${thumb}`}
        alt={'title'}
        width={1000}
        height={1000}
        unoptimized
        className="rounded-lg"
      />
    </div>
            </div>
          </div>

          {imageArray.length > 0 && (
            <div className="flex py-5 gap-4 overflow-x-auto">
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
          )}
        </div>
        <div className="flex flex-col content-between  w-full lg:w-1/2 space-y-3">
          <>
            <h1 className="  font-medium text-2xl text-start leading-10 text-gray-800">
              {product?.title}
            </h1>
            {/* sort description  */}
            <div
              dangerouslySetInnerHTML={{ __html: product?.short_description }}
              className="line-clamp-6"
            />
            {/* variant size  size  */}
            {variant?.length > 0 && (
              <p className="text-base font-bold leading-6   text-[#494949] flex items-center gap-2">
                Size:
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
                      className={`font-medium text-xs leading-4  p-1 me-1 border rounded ${
                        selectedAttribute === attribute?.attribute
                          ? "bg-primary text-white"
                          : "bg-transparent"
                      }`}
                      key={index}
                    >
                      {attribute?.attribute.toLowerCase()}
                    </button>
                  ))}
              </p>
            )}

            {variant?.length > 0 && (
              <p className="text-base font-bold leading-6 text-[#494949] flex items-center gap-2">
                Color:
                {!have && <p>color not available</p>}
                {data
                  ?.filter(
                    (obj, index, self) =>
                      index ===
                      self.findIndex((o) => o.color_id === obj.color_id)
                  )
                  .map((color, index) => (
                    <span
                      key={index}
                      className="h-6 w-6 rounded-full flex justify-center items-center relative"
                    >
                      <button
                        onClick={() => handleColor(color)}
                        className={`font-bold h-4 w-4 rounded-full shadow-md relative ${
                          selectedColor === color?.color_name
                            ? "bg-primary text-white h-5 w-5 border-2 border-blue-400"
                            : ""
                        }`}
                        style={{
                          background: color?.color_name,
                        }}
                      ></button>
                      {selectedColor === color?.color_name && (
                        <span className="absolute   text-xs font-bold">
                          <FaCheck calssName="h-4 w-4 " />
                        </span>
                      )}
                    </span>
                  ))}
              </p>
            )}
            <div className="flex gap-3 justify-between">
              <p className=" text-center    text-primary flex items-center gap-2">
                <span className="font-bold  leading-6   text-[#494949]">
                  Stock:
                </span>
                {avialableQty > 0 ? (
                  <span className="flex items-center gap-1 ">
                    <IoMdCheckmarkCircleOutline />
                    In stock
                  </span>
                ) : (
                  <span className="text-red-500">Sold Out</span>
                )}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-bold  leading-6   text-[#494949]">
                  Delivery:
                </span>
                {product?.delivery_status === "cash" ? (
                  <p className="flex text-center items-center text-primary ">
                    <IoMdCheckmarkCircleOutline /> Cash on Delivery
                  </p>
                ) : (
                  <p className="flex text-center  items-center text-primary rounded-sm ">
                    <IoMdCheckmarkCircleOutline /> Online Payment
                  </p>
                )}
              </div>
            </div>
            {/* price field implement  */}
            <div className="flex gap-4  w-full lg:w-3/5  ">
              <span className="text-primary leading-5 text-nowrap  flex text-2xl   font-semibold flex items-center ">
                <span className="  font-semibold text-primary leading-5 -ml-1 ">
                  <TbCurrencyTaka />
                </span>
                {Math.ceil(selectedPrice)}{" "}
              </span>
              <span className="flex items-center text-secondary text-xl  font-base ">
                {selectedDiscount && (
                  <span className="text-secondary  line-through flex  items-center">
                    <TbCurrencyTaka />
                    {Math.ceil(selectedDiscount)}
                  </span>
                )}
                {selectedDiscount && (
                  <span className="text-secondary text-sm bg-gray-100 p-1 ms-5">
                    {" "}
                    -
                    {Math.ceil(
                      ((selectedDiscount - selectedPrice) * 100) /
                        selectedDiscount
                    )}
                    %
                  </span>
                )}
              </span>
            </div>
            {/* quantity set  */}
            <div className="flex gap-8">
              <div className="flex items-center font-semibold gap-2">
                Quantity:
                <span className="border text-xl  flex items-center justify-between gap-5 rounded-md border-[#D9D9D9]">
                  <button onClick={handelDiccriment} className="p-1">
                    -
                  </button>{" "}
                  <span className="font-medium"> {quantity}</span>
                  <button onClick={handelIncriment} className="p-1">
                    +
                  </button>
                </span>
              </div>
              {/* product rating  */}
              {product?.rating && (
                <span className="flex justify-start items-center">
                  {Array.from({ length: Math.floor(product.rating) }).map(
                    (_, i) => (
                      <FaStar key={i} className="text-secondary" />
                    )
                  )}
                  {!Number.isInteger(product.rating) && (
                    <FaStarHalfAlt className="text-secondary" />
                  )}
                  <span className="text-secondary pl-2">{product.rating}</span>
                </span>
              )}
            </div>
            {/* responsive button  */}
            <div className="md:hidden fixed bottom-0 md:static flex w-full bg-white">
              {/* Store Button (with skew) */}
              {/*   */}

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-l from-sky-400 to-sky-600 text-white font-bold py-3 transform -skew-x-[20deg]"
              >
                <span className="skew-x-[20deg] block text-center">
                  Buy Now
                </span>
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={handelCart}
                className="flex-1 bg-gradient-to-l from-orange-400 to-orange-500 text-white font-bold py-3 transform -skew-x-[20deg] w-1/2"
              >
                <span className="skew-x-[20deg] block text-center">
                  Add to Cart
                </span>
              </button>
            </div>
            {/* normal button  */}
            <div className="hidden md:flex gap-2 md:gap-6 my-5 ">
              <button
                onClick={handleBuyNow}
                className="p-1 lg:py-2 text-base w-full hover:opacity-75 lg:px-3 text-white bg-secondary rounded-xl"
              >
                Buy Now
              </button>
              <button
                onClick={handelCart}
                className="p-1 lg:py-2 text-base w-full hover:opacity-75 lg:px-3 text-white bg-primary rounded-xl"
              >
                Add To Cart
              </button>
            </div>
          </>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: product?.description }}
        className="  bg-gray-100  px-2 my-2 rounded-md py-2"
      />
      {/* product design end  */}
      {/* product review section  */}
      {product?.review?.length > 0 ? <ProductReview product={product} /> : ""}

      <section>
        <div className="flex items-center justify-between bg-gray-50 px-2 my-2 rounded">
          <h1 className="font-extrabold text-primary md:text-xl py-2 flex items-center gap-1">
            <HiClipboardDocumentList /> You may also like
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

        <div
          className={`bg-gray-50 p-5 w-full grid grid-cols-2 gap-2 md:grid-cols-${gridCount} lg:grid-cols-${gridCount} lg:gap-4 md:gap-4 justify-between`}
        >
          {reletedProduct.map((product) => (
            <SingleCart key={product?.product_id} item={product} />
          ))}
        </div>
        <Paginations page={1} setPage={currentPage} totalPage={lastPage} />
      </section>
      <ConfirmModal
        isOpen={isModalOpen}
        loading={modalLoading}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        message="Are you sure you want to confirm the order?"
        title="Confirm Order"
        setAddressData={setAddressData}
      />
    </div>
  );
};

export default ProductDetails;
