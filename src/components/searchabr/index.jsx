import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdKeyboardArrowRight } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { TbShoppingBag } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import Link from 'next/link';

const Searchbar = () => {
    const [openCategory, setOpenCategory] = useState(false);
    const handleCategory = () => {
        setOpenCategory(!openCategory);
    };
    const categoris = [
        { name: "Clothing" },
        { name: "Stationary" },
        { name: "Medical Equipment" },
        { name: "Handicraft" },
        { name: "Others" },
    ]

    return (
        <div className='bg-primary '>
            <div className='flex justify-between items-center container mx-auto py-2'>
                <div className='relative'>
                    <button onClick={handleCategory} className='flex items-center text-white text-base'>
                        <span className='me-2'>Categories</span>
                        {openCategory ? <MdOutlineKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                    </button>
                    <div
                        className={`absolute z-10 top-12 transition-all duration-500  ${openCategory ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <ul className='bg-white'>
                            {
                                categoris.map(category =>
                                    <Link href={`/products/?category=${category.name}`} className='flex items-center shadow-md mt-2 h-16 w-64 justify-between px-4'>
                                        {category.name} <MdKeyboardArrowRight />
                                    </Link>
                                )
                            }

                        </ul>
                    </div>
                </div>
                <div className='flex rounded-full relative items-center'>
                    <input className='rounded-full text-center w-[658px] h-12' type="text" name="search" id="" />
                    <button className='flex absolute right-0 rounded-full bg-black h-12 text-white w-40 items-center justify-center gap-2'>
                        search <IoSearch className='h-4 w-4' />
                    </button>
                </div>
                <div>
                    <p className='flex items-center gap-5'>
                        <TbShoppingBag className='h-5 w-5' />
                        <RxAvatar className='h-5 w-5' />
                    </p>
                </div>
            </div>


        </div>
    );
};

export default Searchbar;
