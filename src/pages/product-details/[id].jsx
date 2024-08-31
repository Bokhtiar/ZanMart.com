import TopFeature from '@/components/TopFeature';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ProductDetails = () => {
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);
    const product = products.find(p => String(p.id) === id);
    console.log(product)

    const colors = ['blue', 'red', 'black'];
    const sizes = ['M', 'L', 'XL'];

    return (
        <div className='mx-auto container mt-36 pt-5'>
            <div className='flex justify-between'>
                <div className='max-w-[540px] max-h-[540px]'>
                <Image
              src={product?.image}
              alt={product?.name}
              width={540}
              height={540}
              className='w-full  h-full'
            />
                </div>
                <div className='flex flex-col w-1/2'>
                    <h1 className='font-medium text-3xl text-start leading-10'>{product?.name}</h1>
                    <p className='text-lg pt-4 pb-3 leading-4 font-bold text-secondary'>{product?.category}</p>
                    <p className='text-base font-light leading-6 pb-3 text-[#AAAAAA]'>
                        Available Size: <br />
                        {product?.sizes.map((size, index) => (
                            <span className='font-semibold' key={index}>{size}, </span>
                        ))}
                    </p>
                    <p className='text-base font-light leading-6 pb-3 text-[#AAAAAA]'>
                        Available Colors: <br />
                        {product?.colors.map((color, index) => (
                            <span className='font-bold ' key={index}>{color}, </span>
                        ))}
                    </p>
                    <p className='flex text-center w-24 border items-center text-primary border-primary px-1'>
                        <IoMdCheckmarkCircleOutline /> In Stock
                    </p>
                    <p className='flex py-3 items-center w-2/5 justify-between'>
                        <span className='text-primary text-5xl font-bold'>
                            {product?.discount_price}<span className='text-2xl font-normal text-black'>tk</span>
                        </span>
                        <span className='text-secondary text-2xl line-through'>{product?.price} tk</span>
                    </p>
                    <div>
                        <p className='rounded-xl font-medium items-center text-xl border justify-between flex w-3/5 border-[#D9D9D9] p-3'>
                            <span className='flex items-center gap-2'>
                                Qty:
                                <span className='border flex items-center justify-between gap-5 rounded-xl border-[#D9D9D9]'>
                                    <button className='p-1'>-</button> 1
                                    <button className='p-1'>+</button>
                                </span>
                            </span>
                            <button className='py-2 px-3 text-white bg-primary rounded-xl'>Add To Cart</button>
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className='flex py-5 gap-4 w-1/2'>
                    <Image height={500} width={500} className='h-20 w-20' src="/images/single.svg" alt="Thumbnail 1" />
                    <Image height={500} width={500} className='h-20 w-20' src="/images/single.svg" alt="Thumbnail 2" />
                    <Image height={500} width={500} className='h-20 w-20' src="/images/single.svg" alt="Thumbnail 3" />
                </div>
                <div className='flex flex-col w-1/2 justify-center'>
                    <h1 className='font-normal p-2 text-xl'>Share this item to social media:</h1>
                    <p className="flex text-[40px] gap-5 text-[#AAAAAA]">
                        <FaFacebookF />
                        <FaLinkedinIn />
                        <FaInstagram />
                        <FaTwitter />
                    </p>
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
