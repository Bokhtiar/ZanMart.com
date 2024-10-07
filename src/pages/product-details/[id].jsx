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

    const [quantity, setQuantity] = useState(1)
    const router = useRouter();
    const [product, setProduct] = useState({})
    const { id } = router.query;
    const { products } = useProduct()
   const [categoryName,setCategoryName]=useState('')
    useEffect(() => {
        const fetchProduct = async () => {
            try {
              // Fetch product by ID
              const res = await publicRequest.get(`product/${id}`);
              console.log('Product:', res.data?.data);
              setProduct(res?.data?.data);
          
              // Fetch categories
              const categoryResponse = await publicRequest.get(`categories`);
              const categories = categoryResponse?.data?.data;
              console.log('Categories:', categories);
        
              // Find category by the product's categopry name by category_id
              const productCategoryId = res?.data?.data?.category_id;
              const categoryName = categories?.find(itm => itm.category_id === productCategoryId)?.category_name;
              setCategoryName(categoryName)
              console.log('Category Name:', categoryName); // Should now log the correct category name
          
            } catch (error) {
              console.error('Failed to fetch product:', error);
            }
          };
          
          

        fetchProduct();
    }, [id]); // Add `id` as a dependency if it's dynamic

    const handelIncriment = () => {
        setQuantity(quantity + 1)
    }
    const handelDiccriment = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    const shipping_address_id = 1
    const billing_address_id = 1
    const handelCart = () => {
        const cartItem = {
            product_id: product?.id,
            sell_price: product?.discount_price || product?.price,
            weight: product?.weight || 1, // Add weight if available
            attribute_id: null,
            color_id: null,
            attribute_weight: null,
            attribute_price: null,
            qty: quantity,
            image: product?.image,
            category: product?.category,
            title: product?.name
        };

        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : { cart_items: [], shipping_address_id: 1, billing_address_id: 1 };

        const isProductInCart = cart.cart_items.some(item => item.product_id === cartItem.product_id);

        if (isProductInCart) {
            Toastify.Warning('Already in Cart');
        } else {
            cart.cart_items.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));

            // Trigger a custom event to notify the navbar about the cart update
            window.dispatchEvent(new Event('cartUpdated'));

            Toastify.Success('Product added successfully');
        }
    };


    return (
        <div className='mx-auto container px-2 mt-36 pt-5'>
            <div className='flex md:justify-between  flex-col lg:flex-row lg:justify-between  '>
                <div className='flex flex-col contents-between' >
                    <div className='max-w-[540px] max-h-[540px]'>
                        <Image
                            src={`http://127.0.0.1:8000/${product?.thumbnail_image}`}
                            alt={product?.title}
                            width={540}
                            height={540}
                            className='w-full  h-full'
                        />
                    </div>
                    <div className='flex py-5 gap-4 w-1/2'>
                        <Image height={500} width={500} className='h-20 w-20' src="/images/single.svg" alt="Thumbnail 1" />
                        <Image height={500} width={500} className='h-20 w-20' src="/images/single.svg" alt="Thumbnail 2" />
                        <Image height={500} width={500} className='h-20 w-20' src="/images/single.svg" alt="Thumbnail 3" />
                    </div>
                </div>
                <div className='flex flex-col content-between items- w-full lg:w-1/2'>
                    <div>
                        <h1 className='font-medium text-3xl text-start leading-10'>{product?.title}</h1>
                        <p className='text-lg pt-4 pb-3 leading-4 font-bold text-secondary'>{categoryName}</p>
                        {/* <p className='text-base font-light leading-6 pb-3 text-[#AAAAAA]'>
                            Available Size: <br />
                            {product?.sizes.map((size, index) => (
                                <span className='font-semibold' key={index}>{size}, </span>
                            ))}
                        </p> */}
                        {/* <p className='text-base font-light leading-6 pb-3 text-[#AAAAAA]'>
                            Available Colors: <br />
                            {product?.colors.map((color, index) => (
                                <span className='font-bold ' key={index}>{color}, </span>
                            ))}
                        </p> */}
                        <div className='flex gap-3'>
                        <p className='flex text-center w-24 border items-center  text-primary rounded-sm border-[#D9D9D9] px-1'>
                            <IoMdCheckmarkCircleOutline /> In Stock
                        </p>
                        {
                            product.delivery_status== 'cash'? <p className='flex text-center  border items-center text-primaryrounded-sm text-primary border-[#D9D9D9] px-1'>
                            <IoMdCheckmarkCircleOutline /> Cash on delivery Avialable
                        </p> :<p className='flex text-center  border items-center text-primaryrounded-sm text-primary border-[#D9D9D9] px-1'>
                            <IoMdCheckmarkCircleOutline /> Online Payment
                        </p>

                        }
                        </div>
                        <p className='flex py-3 flex-row items-center w-1/2 lg:w-2/5 justify-between'>
                            <span className='text-primary md:text-3xl text-2xl lg:text-5xl font-bold'>
                                {product?.sell_price} <span className='md:text-2xl text-lg lg:text-2xl  font-normal text-black'>tk</span>
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
                    </div>
                 {/*    <div className='flex flex-col  lg:w-1/2 justify-center'>
                        <h1 className='font-normal py-2 lg:p-2 text-xl'>Share this item to social media:</h1>
                        <p className="flex lg:text-[40px] gap-5 text-[#AAAAAA]">
                            <FaFacebookF />
                            <FaLinkedinIn />
                            <FaInstagram />
                            <FaTwitter />
                        </p>
                    </div> */}
                </div>
            </div>
            <div>
                <h1 className='text-2xl font-medium'>Detail</h1>
                <hr className='border-2 my-5' />
                <p className='font-normal text-xl'>
                    Beyond taking 1,400 gallons less water than traditional denim to make a pair of jeans, Warp + Weft also treats and recycles 98% of the water they do use, and commits to ethical practices, fair wages, and positive working conditions for all of their operations. Perfectly detailed with classic styling and an innovative performance denim with a modern fit, SEA is a year-round jean jacket.
                    100% cotton
                    Standard-fit denim jacket with chest pockets and button closure
                    Gender-neutral sizing
                    GOTS® and Oeko-Tex® Standard 100 certified
                    Made responsibly in a vertically-integrated factory in Pakistan.
                </p>
            </div>
            <TopFeature title={"You May Also like"} itemLimit={5} dataUrl={'/data.json'}></TopFeature>
        </div>
    );
};

export default ProductDetails;
