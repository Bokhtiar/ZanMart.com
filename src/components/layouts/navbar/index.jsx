import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdKeyboardArrowRight,
  MdClose,
} from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { TbShoppingBag, TbAlignLeft } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import { publicRequest } from "@/config/axios.config";
import { useProduct } from "@/hooks/useProducts";
import Image from "next/image";

import CategoriesList from "./components/CategoryRender";
import style from "./components/style.module.css";
import { BiCategoryAlt } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";
import { useRouter } from "next/router";
import useStickyFetch from "@/hooks/sticky";
import { useCart } from "@/contex/CartContext";

const navList = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Best Selling", href: "/best-selling" },
  { name: "Track Order", href: "/track-order" },
];

export const Navbar = () => {
  const userInfo = useProduct();
  const { token } = userInfo;
  const pathName = usePathname();
  const [openCategory, setOpenCategory] = useState(false);
  const [selected, setSelected] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 
  // cart item find
  const { items: cartItem } = useCart();
  const [categories, setCategories] = useState([]);
  const categoryFetch = async () => {
    try {
      setLoading(true);
      const response = await publicRequest.get("categories");
      setCategories(response?.data?.data);
      setLoading(false);
    } catch (error) {}
  };
  const handleSearchQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };
  const { setLoading: updateLoading, setProducts } = useProduct();
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      updateLoading(true);
      const response = await publicRequest.get(
        `products-search?search=${searchQuery}`
      );
      if (response.status == 200) {
        setProducts(response?.data?.data || []);
        router.replace(`/search-products/?search=${searchQuery}`);
        updateLoading(false);
      }
    } catch (error) {}
  };

  const handleSelect = async (data, id) => {
    setSelected(data);
    try {
      updateLoading(true);
      const categoryFilterd = await publicRequest.get(`category/product/${id}`);
      setProducts(categoryFilterd?.data?.data?.data);
      setIsDrawerOpen(false);
      updateLoading(false);
    } catch (error) {} // Close the drawer after selecting a category
  };

  const [data, setData] = useState({
    webSetting: {},
  });
  const fetchWebSetting = async () => {
    try {
      const response = await publicRequest.get("web-setting");
      const fetchedData = response?.data?.data || {};

      setData(fetchedData);
    } catch (error) {}
  };
  useEffect(() => {
    fetchWebSetting(); 
    categoryFetch();
    handleSearch();
    handleSelect();
    setLoading(false);
  }, []);

  const handleCategory = () => {
    setOpenCategory(!openCategory);
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenCategory(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // sticky system here
  const { isSticky } = useStickyFetch();

  return (
    <div className="z-50 mb-5 shadow-md ">
      <div className="w-full h z-10 bg-white   ">
        <nav className="py-3  flex container-custom mx-auto justify-between items-center ">
          <div className="flex items-center gap-2">
            {/* Drawer Toggle Button for Small Devices */}

            <Link href="/" passHref>
              <Image
                height={400}
                width={400}
                className="h-14 w-14 ml-4 cursor-pointer"
                src="/logo.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="hidden md:flex gap-5 lg:gap-10 ">
            {navList.map((item, index) => (
              <Link
                href={item?.href}
                className={`text-sm leading-7 font-normal relative hover:border-none after:absolute after:w-0 
                  after:h-[5px] after:bottom-0 after:bg-primary after:transition-all after:duration-200 after:ease-
                  in-out after:rounded-full hover:after:w-full hover:after:left-0 ${
                    pathName === item?.href
                      ? "after:w-full after:left-0"
                      : "after:left-1/2"
                  }`}
                key={index}
              >
                <button className="nav_link pb-2 leading-5 capitalize">
                  {item?.name}
                </button>
              </Link>
            ))}
            {!token && (
              <Link
                href={"/auth/log-in"}
                className={`text-sm leading-7 font-normal relative hover:border-none after:absolute after:w-0 
                  after:h-[5px] after:bottom-0 after:bg-primary after:transition-all after:duration-200 after:ease-
                  in-out after:rounded-full hover:after:w-full hover:after:left-0 ${
                    pathName === "/auth/log-in"
                      ? "after:w-full after:left-0"
                      : "after:left-1/2"
                  }`}
              >
                <button className="nav_link pb-2 leading-5 capitalize">
                  Log In
                </button>
              </Link>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div>
              <Image
                height={28}
                width={28}
                src="/support.svg"
                alt="Support"
                className="object-fill"
              />
            </div>
            <div className="text-sm font-normal leading-5">
              <p>{data?.phone}</p>
              <a className="text-primary" href="mailto:zanvisionlabs@gmail.com">
                {data?.email}
              </a>
            </div>
          </div>
        </nav>
        {/* bottom navbar start  */}
        <section
          className={`bg-primary transition-all duration-300 ${
            isSticky && "fixed top-0 bg-primary shadow-md"
          } w-full shadow-lg`}
        >
          <div className="flex gap-3 justify-between items-center container-custom container mx-auto  ">
            <div
              ref={dropdownRef}
              className="relative lg:flex md:flex hidden  "
            >
              <button
                onClick={handleCategory}
                className="flex items-center text-white text-base"
              >
                <span className="me-2 flex items-center gap-1 font-medium">
                  <BiCategoryAlt /> Categories
                </span>
                {openCategory ? (
                  <MdOutlineKeyboardArrowUp />
                ) : (
                  <MdKeyboardArrowDown />
                )}
              </button>
              <div
                className={`absolute h-80    top-9 transition-all duration-700 ${
                  openCategory
                    ? " opacity-100 pointer-events-auto"
                    : " pointer-events-none opacity-0"
                }`}
              >
                <ul className=" bg-white shadow-lg  ">
                  {categories?.map((category) => (
                    <div
                      key={category?.category_id}
                      className="relative parent"
                    >
                      <Link
                        href={`/category-products/?category_id=${category?.category_id}&category_name=${category?.category_name}`}
                        onClick={() =>
                          handleSelect(
                            category?.category_name,
                            category?.category_id
                          )
                        }
                        className={`flex items-center hover:bg-primary font-medium text-gray-600 hover:text-white  mt-1 h-12 w-64 justify-between px-4 ${
                          selected === category?.category_name
                            ? "bg-primary text-white font-extrabold"
                            : ""
                        }`}
                      >
                        {category.category_name?.charAt(0).toUpperCase() +
                          category.category_name?.slice(1).toLowerCase()}{" "}
                        <MdKeyboardArrowRight />
                      </Link>

                      {/* Child Menu - Will appear when hovering over Parent */}
                      <div className="child-menu  shadow-md opacity-0 pointer-events-none ms-6 flex flex-col absolute top-0 -right-[155px] bg-white transition-all duration-2000">
                        {category?.children?.map((child) => (
                          <div
                            key={child?.category_id}
                            className="relative child"
                          >
                            <Link
                              href={`/category-products/?category_id=${child?.category_id}&category_name=${child?.category_name}`}
                              onClick={() =>
                                handleSelect(
                                  child?.category_name,
                                  child?.category_id
                                )
                              }
                              className="border-b  p-2 hover:bg-primary hover:text-white  text-gray-600 flex w-[155px] justify-between items-center"
                            >
                              {child?.category_name?.charAt(0).toUpperCase() +
                                child?.category_name
                                  ?.slice(1)
                                  .toLowerCase()}{" "}
                              <MdKeyboardArrowRight />
                            </Link>

                            {/* Grandchild Menu - Will appear when hovering over Child */}
                            <div className="grandchild-menu  shadow-md opacity-0 pointer-events-none absolute top-0 -right-[155px] bg-white transition-all duration-2000">
                              {child?.children?.map((subChild) => (
                                <Link
                                  key={subChild?.category_id}
                                  href={`/category-products/?category_id=${subChild?.category_id}&category_name=${subChild?.category_name}`}
                                  onClick={() =>
                                    handleSelect(
                                      subChild?.category_name,
                                      subChild?.category_id
                                    )
                                  }
                                  className="grandchild  hover:bg-primary hover:text-white text-gray-600 border-b p-2 flex w-[155px] justify-between items-center"
                                >
                                  {subChild.category_name
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    subChild.category_name
                                      ?.slice(1)
                                      .toLowerCase()}
                                  <MdKeyboardArrowRight />
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex rounded-full md:w-[658px] w-80 h-14 relative items-center">
              <button
                onClick={toggleDrawer}
                className="lg:hidden md:hidden text-xl mr-2"
              >
                <TbAlignLeft />
              </button>
              <input
                onChange={handleSearchQuery}
                className="rounded-full  text-xs md:text-sm  text-start md:text-start lg:text-center px-2 w-full
                 h-9   lg:h-10 outline-none"
                type="text"
                placeholder="Search product here"
              />
              <button
                onClick={() => handleSearch()}
                className="flex absolute right-0 hover:text-secondary rounded-full bg-black md:text-sm lg:text-sm text-xs h-9   lg:h-10 text-white 
                w-[70px] lg:w-40 md:w-32 items-center justify-center sm:px-2 gap-1 md:gap-2"
              >
                Search <IoSearch className="h-4 w-4" />
              </button>
            </div>
            <div>
              <p className="flex items-center md:gap-4  lg:gap-5 gap-2">
                <Link href="/my-cart" className="relative">
                  <span
                    className="absolute text-xs -top-2 -right-1.5 bg-yellow-500 leading-0 px-1 py-.5 text-center 
                  rounded-full"
                  >
                    {cartItem?.length}
                  </span>
                  <LuShoppingCart className="h-7 w-7" />
                </Link>
                <Link href="/profile">
                  <RxAvatar className="h-7 w-7" />
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Drawer for small devices */}
      <div
        className={`fixed overflow-auto scrollbar-thin top-0 left-0 h-full z-20   bg-white transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 ${style.scrollbar_thin}`}
      >
        <div className="p-4">
          <button onClick={toggleDrawer} className="text-xl">
            <MdClose />
          </button>
          <h1 className="font-bold">Menu</h1>
          <ul className="bg-white">
            {navList.map((nav) => (
              <Link
                key={nav.name}
                onClick={() => handleSelect(nav.name)}
                href={nav.href}
                className={`text-md flex flex-col  pl-4 md:hover:after:ml-0  after:ml-4 py-2 leading-7 font-normal relative hover:border-none 
                  after:absolute after:w-0 after:h-[5px] after:bottom-0 after:bg-primary after:transition-all 
                  after:duration-200 after:ease-in-out after:rounded-full hover:after:w-1/2  md:hover:after:w-full hover:after:left-0 ${
                    pathName === nav?.href
                      ? "after:w-1/2 md:after:w-full after:left-0"
                      : "after:left-1/2"
                  }`}
              >
                {nav.name}
              </Link>
            ))}

            {!token && (
              <Link
                href={"/auth/log-in"}
                className={`text-md flex flex-col md:hover:after:ml-0  after:ml-4 pl-4  py-2 leading-7 font-normal relative hover:border-none 
    after:absolute after:w-0 after:h-[5px] after:bottom-0 after:bg-primary after:transition-all 
    after:duration-200 after:ease-in-out after:rounded-full hover:after:w-1/2  md:hover:after:w-full hover:after:left-0 ${
      pathName === "Log In" ? "after:w-full after:left-0" : "after:left-1/2"
    }`}
              >
                Log In
              </Link>
            )}
          </ul>
          {/* mobile phone category */}
          <h1 className="font-bold">Categoriss</h1>

          <div className="">
            <CategoriesList
              categories={categories}
              setDropdown={setIsDrawerOpen}
            />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};
