import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdKeyboardArrowRight, MdClose } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { TbShoppingBag, TbAlignLeft } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";

const navList = [
  { name: "home", href: "/" },
  { name: "Best Selling", href: "/best-selling" },
  { name: "Track Order", href: "/track-order" },
  { name: "Log In", href: "/auth/log-in" },
  { name: "Sign Up", href: "/auth/register" },
];

export const Navbar = () => {
  const pathName = usePathname('');
  const [active, setActive] = useState('');
  const [openCategory, setOpenCategory] = useState(false);
  const [selected, setSelected] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const handleCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleSelect = (data) => {
    setSelected(data);
    setIsDrawerOpen(false); // Close the drawer after selecting a category
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const categories = [
    { name: "Clothing" },
    { name: "Stationary" },
    { name: "Medical Equipment" },
    { name: "Handicraft" },
    { name: "Others" },
  ];

  return (
    <>
      <div className='fixed w-full z-10 bg-white'>
        <nav className="py-3 flex container mx-auto justify-between items-center">
          <div className='flex items-center gap-2'>
            {/* Drawer Toggle Button for Small Devices */}
            <button onClick={toggleDrawer} className='lg:hidden md:hidden text-xl'>
              <TbAlignLeft />
            </button>
            <img className='h-14 w-14 ml-4' src="/logo.png" alt="Logo" />
          </div>
          <div className="hidden md:flex gap-10">
            {navList.map((item, index) => (
              <Link
                href={item?.href}
                className={`text-sm leading-7 font-normal relative hover:border-none after:absolute after:w-0 after:h-[5px] after:bottom-0 after:bg-primary after:transition-all after:duration-200 after:ease-in-out after:rounded-full hover:after:w-full hover:after:left-0 ${pathName === item?.href
                  ? "after:w-full after:left-0"
                  : "after:left-1/2"
                  }`}
                key={index}
                aria-labelledby="labeldiv"
              >
                <button className="nav_link pb-2 leading-5 capitalize" aria-label='area-lavel'>
                  {item?.name}
                </button>
              </Link>
            ))}
          </div>
          <div className='flex items-center'>
            <div>
              <img src="/support.svg" alt="Support" />
            </div>
            <div className='text-sm font-normal leading-5'>
              <p>+880969654312</p>
              <p className='text-primary'>info@zanmart.com</p>
            </div>
          </div>
        </nav>
        <div className='bg-primary'>
          <div className='flex justify-between items-center container mx-auto py-2'>
            <div className='relative lg:flex md:flex hidden'>
              <button onClick={handleCategory} className='flex items-center text-white text-base'>
                <span className='me-2'>Categories</span>
                {openCategory ? <MdOutlineKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </button>
              <div
                className={`absolute  top-12 transition-all duration-500 ${openCategory ? 'max-h-full opacity-100 pointer-events-auto' : ' pointer-events-none max-h-0 opacity-0'}`}
              >
                <ul className='bg-white '>
                  {categories.map(category => (
                    <Link
                      key={category.name}
                      href={`/products/?category=${category.name}`}
                      onClick={() => handleSelect(category.name)}
                      
                      className={`flex items-center shadow-md mt-2 h-16 w-64 justify-between px-4 ${selected === category.name ? 'bg-primary text-white font-extrabold' : 'bg-white'}`}
                    >
                      {category.name} <MdKeyboardArrowRight />
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <div className='flex rounded-full md:w-[658px] w-80 relative items-center'>
              <input className='rounded-full  text-xs md:text-sm  text-start md:text-start lg:text-center px-2  w-full h-12' type="text" name="search" id="" placeholder='search your product hare' />
              <button className='flex absolute right-0 rounded-full bg-black md:text-sm lg:text-sm text-xs h-12 text-white w-[75px]  lg:w-40 md:w-40 items-center justify-center sm:px-2 gap-1 md:gap-2'>
                search <IoSearch className='h-4 w-4' />
              </button>
            </div>
            <div>
              <p className='flex items-center md:gap-4  lg:gap-5 gap-2'>
                <Link href="/profile/?section=My Cart"><TbShoppingBag className='h-5 w-5' /></Link>
                <Link href="/profile/?section=Profile"><RxAvatar  className='h-5 w-5' /></Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer for small devices */}
      <div className={`fixed top-0 left-0 h-full z-20 bg-white transition-transform transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        <div className='p-4'>
          <button onClick={toggleDrawer} className='text-xl'>
            <MdClose />
          </button>
         
          <ul className='bg-white'>
            {navList.map(nav => (
              <Link
                key={nav.name}
                onClick={() => handleSelect(nav.name)}
                href={nav.href}
                className={`text-md flex flex-col text-center py-2 leading-7 font-normal relative hover:border-none after:absolute after:w-0 after:h-[5px] after:bottom-0 after:bg-primary after:transition-all after:duration-200 after:ease-in-out after:rounded-full hover:after:w-full hover:after:left-0 ${pathName === nav?.href
                  ? "after:w-full after:left-0"
                  : "after:left-1/2"
                  }`}
              >
                {nav.name} 
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && <div className="fixed inset-0 z-10 bg-black opacity-50" onClick={toggleDrawer}></div>}
    </>
  );
};
