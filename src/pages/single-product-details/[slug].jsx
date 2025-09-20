import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineFullscreen } from "react-icons/md";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

import { publicRequest } from "@/config/axios.config";
import { Toastify } from "@/components/toastify";
import ProductDetailsSkeleton from "@/components/loader/productDetailSkeleton";
import SingleCart from "@/components/singleCart";
import {
  PiDotsThreeVerticalBold,
  PiDotsNineBold,
  PiDotsSixVerticalBold,
} from "react-icons/pi";
import { HiClipboardDocumentList } from "react-icons/hi2";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [thumb, setThumb] = useState("");
  const [imageArray, setImageArray] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [variant, setVariant] = useState([]);
  const [gridCount, setGridCount] = useState(5);
  const [reletedProduct, setReletedProduct] = useState([]);
  const [reletedProductLoading, setReletedProductLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // console.log("reletedProduct", reletedProduct);

  /** Fetch product details */
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get(`product/${id}`);
      const data = res?.data?.data;
      setProduct(data);
      setThumb(data?.thumbnail_image);

      // Set default price
      setSelectedPrice(data?.sell_price);
      setSelectedDiscount(data?.flat_discount);
      setSelectedWeight(data?.weight);

      // Set variants
      setVariant(data?.product_variants || []);

      // Fetch category name
      const categoriesRes = await publicRequest.get(`categories`);
      const categoryName = categoriesRes?.data?.data?.find(
        (cat) => cat.category_id === data?.category_id
      )?.category_name;
      setCategoryName(categoryName);

      // Parse gallery images
      let galleryImages = [];
      if (data?.gallery_image) {
        if (typeof data.gallery_image === "string") {
          try {
            galleryImages = JSON.parse(data.gallery_image);
          } catch (err) {}
        } else {
          galleryImages = data.gallery_image;
        }
      }
      setImageArray(galleryImages.map((img) => img.replace(/\\/g, "")));
    } catch (err) {
      Toastify.Error(err);
    }
    setLoading(false);
  };

  /** Fetch related products */
  const fetchRelated = useCallback(async () => {
    if (!product?.category_id) return;
    try {
      setReletedProductLoading(true);
      const res = await publicRequest.get(
        `category/product/${product.category_id}`
      );
      setReletedProduct(res?.data?.data?.data || []);
      setReletedProductLoading(false);
    } catch (err) {
      Toastify.Error(err);
    }
  }, [product?.category_id]);

  useEffect(() => {
    fetchProduct();
  }, [id]);
  useEffect(() => {
    fetchRelated();
  }, [product?.category_id]);

  const handleThumb = (img) => setThumb(img);

  const renderRating = (rating) => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="flex items-center gap-1">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
      </div>
    );
  };

  if (loading || reletedProductLoading) return <ProductDetailsSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main product section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Images */}
        <div className="lg:w-1/2 flex flex-col items-center">
          <div className="relative">
            <button
              onClick={() => setIsOpen(true)}
              className="absolute top-2 right-2 text-3xl text-gray-500 z-10"
            >
              <MdOutlineFullscreen />
            </button>
            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
                <button
                  className="absolute top-5 right-5 text-white text-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  ✖
                </button>
                <InnerImageZoom
                  src={`${process.env.NEXT_PUBLIC_API_SERVER}${thumb}`}
                  zoomSrc={`${process.env.NEXT_PUBLIC_API_SERVER}${thumb}`}
                  zoomType="hover"
                  zoomPreload
                  zoomPosition="left"
                  className="max-h-[80vh] rounded"
                />
              </div>
            )}
            <InnerImageZoom
              src={`${process.env.NEXT_PUBLIC_API_SERVER}${thumb}`}
              zoomSrc={`${process.env.NEXT_PUBLIC_API_SERVER}${thumb}`}
              zoomType="hover"
              zoomPreload
              zoomPosition="left"
              className="max-h-[500px] rounded w-full"
            />
          </div>
          {/* Gallery thumbnails */}
          <div className="flex gap-2 mt-4">
            {[product?.thumbnail_image, ...imageArray].map((img, idx) => (
              <Image
                key={idx}
                src={`${process.env.NEXT_PUBLIC_API_SERVER}${img}`}
                alt={`thumb ${idx}`}
                width={60}
                height={60}
                className="cursor-pointer border rounded"
                onClick={() => handleThumb(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product info */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-gray-700">
            {product?.title}
          </h1>
          <p className="text-lg text-gray-500">{categoryName}</p>
          {/* Short Description */}
          {product?.short_description && (
            <p className="text-gray-600 mt-2">
              {product.short_description.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
          )}
          <div>{renderRating(product?.rating)}</div>

          {/* Price */}
          {/* <div className="flex items-center gap-4 mt-2">
            <span className="text-3xl font-bold text-primary">
              {selectedPrice} tk
            </span>
            {selectedDiscount && (
              <span className="line-through text-gray-400">
                {selectedDiscount} tk
              </span>
            )}
          </div> */}
          {/* <div className="flex items-center gap-4 mt-2">
            <span className="text-3xl font-bold text-primary">
              {Math.round(selectedDiscount)} tk
            </span>
            {selectedPrice && (
              <span className="line-through text-gray-400">
                {Math.round(selectedPrice)} tk
              </span>
            )}
            {product?.offer_price && (
              <span className="text-xl font-semibold text-red-600">
                Offer: {product.offer_price} tk
              </span>
            )}
          </div> */}
          <div className="flex items-center gap-4 mt-2">
            {selectedDiscount ? (
              <>
                {/* Offer Price */}
                <span className="text-3xl font-bold text-primary">
                  {Math.round(selectedDiscount)} tk
                </span>

                {/* Original Price */}
                {selectedPrice && (
                  <span className="line-through text-gray-400">
                    {Math.round(selectedPrice)} tk
                  </span>
                )}

                {/* Discount Percentage */}
                {selectedPrice && selectedDiscount && (
                  <span className="text-green-600 font-semibold">
                    {Math.round(
                      ((selectedPrice - selectedDiscount) / selectedPrice) * 100
                    )}
                    % Off
                  </span>
                )}
              </>
            ) : (
              <span className="text-3xl font-bold text-primary">
                {Math.round(selectedPrice)} tk
              </span>
            )}
          </div>

          {/* Color & Size */}
          {variant?.length > 0 && (
            <>
              <div className="flex gap-2 mt-2">
                {variant.map((v, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1 border rounded ${
                      selectedAttribute === v.attribute?.name
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => {
                      setSelectedAttribute(v.attribute?.name);
                      setSelectedAttribute_id(v.attribute?.attribute_id);
                    }}
                  >
                    {v.attribute?.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                {variant.map((v, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1 border rounded ${
                      selectedColor === v.color?.name
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => {
                      setSelectedColor(v.color?.name);
                      setSelectedColor_id(v.color?.color_id);
                    }}
                  >
                    {v.color?.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <Link
              href={`/product-details/${product?.slug}?id=${product?.product_id}`}
            >
              <button className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {product?.description && (
        <>
          <h1 className="text-xl font-bold mt-10">Description</h1>
          <p className="text-gray-600 mt-2">
            {product.description.replace(/<\/?[^>]+(>|$)/g, "")}
          </p>
        </>
      )}

      {/* Related Products */}
      {reletedProduct?.length > 0 && (
        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <HiClipboardDocumentList /> Related Products
            </h2>
            <div className="flex gap-2">
              <PiDotsNineBold
                onClick={() => setGridCount(5)}
                className={`cursor-pointer ${
                  gridCount === 5 ? "bg-primary text-white" : ""
                }`}
              />
              <PiDotsSixVerticalBold
                onClick={() => setGridCount(4)}
                className={`cursor-pointer ${
                  gridCount === 4 ? "bg-primary text-white" : ""
                }`}
              />
              <PiDotsThreeVerticalBold
                onClick={() => setGridCount(3)}
                className={`cursor-pointer ${
                  gridCount === 3 ? "bg-primary text-white" : ""
                }`}
              />
            </div>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-${gridCount} gap-4`}>
            {reletedProduct.map((p) => (
              <SingleCart key={p.product_id} item={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
