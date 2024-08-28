import Searchbar from '@/components/searchabr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
const navList = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "Best Selling",
    href: "/best-selling",
  },
  {
    name: "Track Order",
    href: "/track-order",
  },
  {
    name: "Log In",
    href: "/auth/log-in",
  },
  {
    name: "Sign Up",
    href: "/auth/register",
  },
];
export const Navbar = () => {
  const pathName=usePathname()
  const [active,setActive]=useState('')

    return <>
     <div>
     <nav className=" py-3 flex container mx-auto justify-between items-center">
     <div>
      <img className='h-14 w-14' src="/logo.png" alt="" />
     </div>
     <div className="hidden   md:flex gap-10">
            {navList.map((item, index) => (
              <Link
                href={item?.href}
                className={`text-sm -500 leading-7 font-normal   different border-none relative hover:border-none after:absolute after:w-0 after:h-[5px]  after:bottom-0 after:bg-primary after:transition-all after:duration-200 after:ease-in-out after:rounded-full hover:after:w-full hover:after:left-0 ${pathName == item?.href
                    ? "after:w-full after:left-0"
                    : "after:left-1/2"
                  }  dark:text-gray-200 dark:after:bg-gray-200`}
                key={index}
                aria-labelledby="labeldiv"
              >
                <button className="nav_link pb-2 leading-5 capitalize " aria-label='area-lavel'>
                  {" "}
                  {item?.name}
                </button>
              </Link>
            ))}
          </div>
     <div  className='flex items-center'>
       <div>
        <img src="support.svg" alt="" />
       </div>
       <div className='text-sm font-normal leading-5'>
        <p>+880969654312</p>
        <p className='text-primary'>info@zanmart.com</p>
       </div>
     </div>
    </nav>
    <Searchbar></Searchbar>
     </div>
    </>
}