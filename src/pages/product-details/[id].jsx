import { Toastify } from '@/components/toastify';
import TopFeature from '@/components/TopFeature';
import { publicRequest } from '@/config/axios.config';
import { useProduct } from '@/hooks/useProducts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();
    const [product, setProduct] = useState({});
    const { id } = router.query;
    const [categoryName, setCategoryName] = useState('');
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedAttribute, setSelectedAttribute] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(product?.sell_price);
    const [variant, setvarient] = useState()
    const [selectdColor_id, setSelectedColor_id] = useState()
    const [selectdAtribute_id, setSelectedAttribute_id] = useState()
    const[selectedWeight,setSelectedWeight]=useState()
    console.log(selectedWeight,selectedPrice)
    const fetchProduct = async () => {
        try {
            // Fetch product by ID
            const res = await publicRequest.get(`product/${id}`);
            setProduct(res?.data?.data);
            console.log(res?.data?.data);

            // Fetch categories
            const categoryResponse = await publicRequest.get(`categories`);
            const categories = categoryResponse?.data?.data;
            const productCategoryId = res?.data?.data?.category_id;
            const categoryName = categories?.find(itm => itm.category_id === productCategoryId)?.category_name;
            setCategoryName(categoryName);

            // Set default selected color and attribute if product_variants exist
            const productVariants = res?.data?.data?.product_variants;
            setvarient(productVariants)
            console.log(productVariants)
            if (productVariants?.length > 0) {
                setSelectedColor(productVariants[0]?.color?.name);
                setSelectedAttribute(productVariants[0]?.attribute?.name);
                setSelectedPrice(productVariants[0]?.price);
                setSelectedAttribute_id(productVariants[0]?.attribute?.attribute_id)
                setSelectedColor_id(productVariants[0]?.color_id)
                setSelectedWeight(productVariants[0]?.weight)
            } else {
                setSelectedPrice(res?.data?.data?.sell_price);
                setSelectedWeight(res?.data?.data?.weight)
            }

        } catch (error) {
            console.error('Failed to fetch product:', error);
        }
    };

    const handelIncriment = () => setQuantity(quantity + 1);
    const handelDiccriment = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handelCart = () => {
        const cartItem = {
            product_id: product?.product_id,
            sell_price: selectedPrice, // Use selectedPrice instead of product?.sell_price
            weight: product?.weight || 1,
            attribute_id: selectdAtribute_id,
            color_id: selectdColor_id,
            attribute_weight: null,
            attribute_price: selectedPrice,
            qty: quantity,
            image: product?.thumbnail_image,
            category: categoryName,
            title: product?.title,
            payment: product.delivery_status,
        };

        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : { cart_items: [], shipping_address_id: 1, billing_address_id: 1 };

        const isProductInCart = cart?.cart_items?.some(item => item?.product_id === cartItem?.product_id);

        if (isProductInCart) {
            Toastify.Warning('Already in Cart');
        } else {
            cart.cart_items.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('cartUpdated'));
            Toastify.Success('Product added successfully');
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const data = product?.product_variants?.map(item => ({
        color_name: item?.color?.name,
        color_id: item?.color?.color_id,
        unit: item?.unit?.name,
        price: item?.price,
        product_qty: item?.product_qty,
        attribute: item?.attribute?.name,
        attribute_id: item?.attribute?.attribute_id,
        weight: item?.weight
    }));
    console.log(data)
    //     let obj = { };
    //     let obj1 = {};
    //   let arr = [];

    //      data?.map((item)=>{
    //           const key = item?.attribute;
    //           const key2 = item?.color_name;
    //           obj[key+key2] = item;
    //           obj[key] = item;
    //           obj1[key] = item?.color_name
    //          return item;
    //      })
    //      console.log(obj1,obj)
    //      const sz = 'L';
    //      const clr = 'red' 
    //      console.log(obj[sz+clr]) 
    //  if(obj1[sz] == clr){
    //      console.log(obj[sz+clr])
    //  }else{
    //      if(!obj[sz+clr]){
    //         console.log(obj[sz]) 
    //      }else{
    //          console.log(obj[sz+clr])
    // }

    //  }
    const [imageArray, setImageArray] = useState([]);
    useEffect(() => {
        // Ensure the gallery images are available and parse them if necessary
        if (product?.gallery_image) {
            // Assuming gallery_image is a string (or stringified array) that needs to be parsed
            let galleryImages = [];
            if (typeof product.gallery_image === 'string') {
                try {
                    // Attempt to parse the string if it is JSON-formatted
                    galleryImages = JSON.parse(product.gallery_image);
                } catch (error) {
                    // If it's not JSON, assume it's a malformed string and handle it
                    console.error('Invalid JSON format for gallery_image', error);
                }
            } else {
                galleryImages = product.gallery_image; // If it's already an array
            }

            // Clean the image paths by removing backslashes
            const cleanedImages = galleryImages.map(image => image.replace(/\\/g, ''));
            setImageArray(cleanedImages); // Update state with cleaned image paths
        }
    }, [product?.gallery_image]); // Run when product.gallery_image changes
    console.log("Cleaned imageArray:", imageArray);
    const [have, setHave] = useState(true)
    const handleColor = (colordata) => {
        setSelectedColor(colordata?.color_name);
        setSelectedColor_id(colordata.color_id)
        const newColor = data?.find(item => item?.color_name === colordata?.color_name && item?.attribute === selectedAttribute);

        setSelectedPrice(newColor?.price || product?.sell_price);
        setSelectedWeight(newColor?.weight || product?.weight);
        console.log(colordata)
    };
    const attributeHandle = (attributedata) => {
        console.log(attributedata)
        setSelectedAttribute(attributedata?.attribute);
        setSelectedAttribute_id(attributedata?.attribute_id)

        const newAttribute = data?.find(item => item?.attribute === attributedata?.attribute && item?.color_name === selectedColor);

        setSelectedPrice(newAttribute?.price || product?.sell_price);
        setSelectedWeight(newAttribute?.weight || product?.weight);

    };

    return (
        <div className='mx-auto container px-2 mt-36 pt-5'>
            <div className='flex md:justify-between flex-col lg:flex-row lg:justify-between'>
                <div className='flex flex-col contents-between'>
                    <div className='max-w-[540px] max-h-[540px]'>

                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_SERVER}${product?.thumbnail_image}`}
                            alt={product?.title}
                            width={540}
                            height={540}
                            className='w-full h-full'
                        />
                    </div>
                    <div className='flex py-5 gap-4 w-1/2'>
                        {imageArray?.map((img, index) => (
                            <Image
                                key={index}
                                height={500}
                                width={500}
                                className='h-20 w-20'
                                src={`${process.env.NEXT_PUBLIC_API_SERVER}${img}`}  // Assuming the path is correct
                                alt={`Thumbnail ${index + 1}`}
                            />
                        ))}
                    </div>

                </div>
                <div className='flex flex-col content-between items- w-full lg:w-1/2'>
                    <>
                        <h1 className='font-medium text-3xl text-start leading-10'>{product?.title}</h1>
                        <p className='text-lg pt-4 pb-3 leading-4 font-bold text-secondary'>{categoryName}</p>
                        {variant?.length > 0 && <p className='text-base font-light leading-6 pb-3 text-[#AAAAAA]'>
                            Available Size: <br />
                            {
                                !have && <p>size not avialable</p>
                            }
                            {data?.map((attribute, index) => (
                                <button
                                    onClick={() => attributeHandle(attribute)}
                                    className={`font-semibold px-2 py-1 me-1 border rounded-md ${selectedAttribute === attribute?.attribute ? 'bg-primary text-white' : 'bg-transparent'}`}
                                    key={index}
                                >
                                    {attribute?.attribute}
                                </button>
                            ))}
                        </p>}
                        {variant?.length > 0 && <p className='text-base font-light leading-6 pb-3 text-[#AAAAAA]'>
                            Available Colors: <br />
                            {
                                !have && <p>color not avialable</p>
                            }
                            {data?.map((color, index) => (
                                <button
                                    onClick={() => handleColor(color)}
                                    className={`font-bold p-2 border rounded-md ${selectedColor === color?.color_name ? 'bg-primary text-white' : 'bg-transparent'}`}
                                    key={index}
                                >
                                    {color?.color_name}
                                </button>
                            ))}
                        </p>}
                        <div className='flex gap-3'>
                            <p className='flex text-center w-24 border items-center text-primary rounded-sm border-[#D9D9D9] px-1'>
                                <IoMdCheckmarkCircleOutline /> In Stock
                            </p>
                            {product.delivery_status === 'cash' ? (
                                <p className='flex text-center border items-center text-primary rounded-sm border-[#D9D9D9] px-1'>
                                    <IoMdCheckmarkCircleOutline /> Cash on delivery Available
                                </p>
                            ) : (
                                <p className='flex text-center border items-center text-primary rounded-sm border-[#D9D9D9] px-1'>
                                    <IoMdCheckmarkCircleOutline /> Online Payment
                                </p>
                            )}
                        </div>
                        <p className='flex py-3 flex-row items-center w-1/2 lg:w-3/5 justify-between'>
                            <span className='text-primary md:text-3xl text-2xl lg:text-5xl font-bold'>
                                {selectedPrice} <span className='md:text-2xl text-lg lg:text-2xl font-normal text-black'>tk</span>
                            </span>
                            <span className='text-secondary flex lg:text-2xl line-through'>10 tk</span>
                        </p>
                        <div className=''>
                            <p className='rounded-xl font-medium lg:items-center text-lg lg:text-xl md:border flex-col gap-2 lg:flex-row lg:justify-between flex w-3/5 border-[#D9D9D9] lg:p-3'>
                                <span className='flex items-center gap-2'>
                                    Qty:
                                    <span className='border flex items-center justify-between gap-5 rounded-xl border-[#D9D9D9]'>
                                        <button onClick={handelDiccriment} className='p-1'>-</button> {quantity}
                                        <button onClick={handelIncriment} className='p-1'>+</button>
                                    </span>
                                </span>
                                <button onClick={handelCart} className='p-1 lg:py-2 text-base lg:px-3 text-white bg-primary rounded-xl'>Add To Cart</button>
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
            <TopFeature />
        </div>
    );
};

export default ProductDetails;
