import ProductDetailsSkeleton from "@/components/loader/productDetailSkeleton";
import { Toastify } from "@/components/toastify";
import { privateRequest, publicRequest } from "@/config/axios.config";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import style from "./style.module.css";
import { MdOutlineFullscreen } from "react-icons/md";
import Paginations from "@/components/pagination";
import useStickyFetch from "@/hooks/sticky";
import { TbCurrencyTaka } from "react-icons/tb";
import ConfirmModal from "@/components/confirmModal";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [modalLoading, setModalLoading] = useState(false);
  const [avialableQty, setAvialableQty] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const handleModalClose = () => {
    setIsModalOpen(false);
    // setModalAction(null);
  };
  const [addressData, setAddressData] = useState({});
  console.log(addressData.address_id);
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
  console.log("============================", avialableQty);
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
    available_quantity: item?.available_quantity,
  }));

  const handelCart = () => {
    // Find the selected variant based on the selected color and attribute
    const selectedVariant = product?.product_variants.find(
      (item) =>
        item?.color_id === selectdColor_id &&
        item?.attribute_id === selectdAtribute_id
    );

    if (selectedVariant && avialableQty > 0)  {
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
    } else {
      Toastify.Warning(
        "Selected size and color is not available.Please select another color or size"
      );
    }
  };
  const [orderData, setorderData] = useState([]);
  console.log(orderData);
  const handleBuyNow = () => {
    const selectedVariant = product?.product_variants.find(
      (item) =>
        item?.color_id === selectdColor_id &&
        item?.attribute_id === selectdAtribute_id
    );

    if (selectedVariant && avialableQty > 0) {
      setIsModalOpen(true);
      const cartItem = {
        product_id: product?.product_id,
        sell_price: selectedPrice,
        weight: product?.weight || selectedWeight || 1,
        attribute_id: selectdAtribute_id,
        // attribute: selectedAttribute,
        color_id: selectdColor_id,
        // color: selectedColor,
        attribute_weight: selectedWeight || null,
        attribute_price: selectedPrice,
        qty: quantity,
        // image: product?.thumbnail_image,
        // category: categoryName,
        // title: product?.title,
        // payment: product?.delivery_status,
        product_variant_id: selectedVariant?.product_variant_id,
        attribute_discount_price: selectedDiscount || 0, // Include the variant ID
      };
      setorderData(cartItem);
    } else {
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
    console.log("================>>>>>>>>>", newMyOrder);
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
      Toastify.Error(error.response.data.message);
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
    setAvialableQty(newAttribute?.available_quantity); // Updated line
    console.log(newAttribute?.available_quantity);
  };

  //change thumbnile image base on galllery
  const handleThumb = (img) => {
    setThumb(img);
  };
  const [isOpen, setIsOpen] = useState(false);
  const {isSticky} = useStickyFetch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex); // Update current index when slide changes
  };

 

  const l = false;
  if (l) {
    return <ProductDetailsSkeleton />;
  }
  console.log(variant);
  return (
    <div className={`container-custom px-2 ${isSticky&&'mt-14'} pt-5`}>
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

              <InnerImageZoom
                src={`${process.env.NEXT_PUBLIC_API_SERVER}${thumb}`}
                zoomSrc={`${process.env.NEXT_PUBLIC_API_SERVER}${thumb}`}
                alt="Product Thumbnail"
                zoomType="hover"
                zoomPreload={true}
                zoomPosition="left"
                fillAvailableSpace={true}
                className=" max-h-[550px] w-[550px] rounded"
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
              <p className=" text-center w-24 border  text-primary rounded-sm border-[#D9D9D9] px-1">
                {avialableQty > 0 ? (
                  <span className="flex items-center gap-1 ">
                    <IoMdCheckmarkCircleOutline />
                    In stock
                  </span>
                ) : (
                  <span>Out of Stock</span>
                )}
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
            <p className="flex py-3 flex-row items-center w-full lg:w-3/5  ">
              <span className="text-primary text-nowrap md:text-lg text-base lg:text-xl font-bold flex items-center">
               
                <span className="  font-normal text-primary">
                <TbCurrencyTaka />
                </span>
                 {Math.ceil(selectedPrice)}{" "}
              </span>
              {selectedDiscount && (
                <sub className="text-secondary    text-xs md:text-sm line-through flex items-center">
                  <TbCurrencyTaka />{Math.ceil(selectedDiscount)}  
                </sub>
              )}
            </p>
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
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
              </div>
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
            </div>
            <div className=" flex gap-2 md:gap-6 my-5 ">
              <button
                onClick={handelCart}
                className="p-1 lg:py-2 text-base w-full hover:opacity-75 lg:px-3 text-white bg-primary rounded-xl"
              >
                Add To Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="p-1 lg:py-2 text-base w-full hover:opacity-75 lg:px-3 text-white bg-secondary rounded-xl"
              >
                Buy Now
              </button>
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
          <h1 className="font-extrabold text-primary md:text-xl py-2 flex items-center gap-1">
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
