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
import Loader from "@/components/loader";
import Image from "next/image";
import NavSkleton from "@/components/loader/navSkleton";
import ProductSkeleton from "@/components/loader/ProductSkeleton";
import CategoriesList from "./components/CategoryRender";
import style from "./components/style.module.css";
import { CategoryItem } from "./components/LargCategory";
import { getToken } from "@/utils/helpers";
import { BiCategoryAlt } from "react-icons/bi";

const navList = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Best Selling", href: "/best-selling" },
  { name: "Track Order", href: "/track-order" },
];

export const Navbar = () => {
  const pathName = usePathname();
  const [openCategory, setOpenCategory] = useState(false);
  const [selected, setSelected] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({
    cart_items: [],
    shipping_address_id: 1,
    billing_address_id: 1,
  });

  const [categories, setCategories] = useState([]);
  const categoryFetch = async () => {
    try {
      setLoading(true);
      const response = await publicRequest.get("categories");
      setCategories(response?.data?.data);
      setLoading(false);
    } catch (error) {}
    // console.log(response)
  };
  // console.log(categories);
  const handleSearchQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };
  const { setLoading: updateLoading, setProducts } = useProduct();
  const handleSearch = async () => {
    try {
      updateLoading(true);
      const SearchFilter = await publicRequest.get(
        `products-search?search=${searchQuery}`
      );
      setProducts(SearchFilter?.data?.data || []); // Default to an empty array if no data
      updateLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
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
  useEffect(() => {
    const updateCart = () => {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };

    updateCart();
    categoryFetch();
    handleSearch();
    handleSelect();
    setLoading(false);

    window.addEventListener("cartUpdated", updateCart);
    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  const handleCategory = () => {
    setOpenCategory(!openCategory);
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // if (loading) {
  //   return <NavSkleton></NavSkleton>;
  // }
  /*   if (productLoading) {
    //return <ProductSkeleton/>
  } */
  const [token, setToken] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(getToken() ? true : false);
    }
  }, []);
  // my code
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
  return (
    <div ref={dropdownRef}>
      <div className="fixed h w-full h z-10 bg-white  ">
        <nav className="py-3 flex container-custom mx-auto justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Drawer Toggle Button for Small Devices */}
            <button
              onClick={toggleDrawer}
              className="lg:hidden md:hidden text-xl"
            >
              <TbAlignLeft />
            </button>
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
          <div className="hidden md:flex gap-10">
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
              <p>+880969654312</p>
              <p className="text-primary">info@zanmart.com</p>
            </div>
          </div>
        </nav>
        {/* bottom navbar start  */}
        <section className="bg-primary ">
          <div className="flex gap-3 justify-between items-center container-custom container mx-auto py-2">
            <div className="relative lg:flex md:flex hidden">
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
                className={`absolute h-80    top-10 transition-all duration-700 ${
                  openCategory
                    ? " opacity-100 pointer-events-auto"
                    : " pointer-events-none opacity-0"
                }`}
              >
                <ul className=" bg-white shadow-lg  ">
                  {categories.map((category) => (
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
                        {category.category_name} <MdKeyboardArrowRight />
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
                              {child?.category_name} <MdKeyboardArrowRight />
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
                                  {subChild?.category_name}{" "}
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
            <div className="flex rounded-full md:w-[658px] w-80 relative items-center">
              <input
                onChange={handleSearchQuery}
                className="rounded-full  text-xs md:text-sm  text-start md:text-start lg:text-center px-2  w-full
                 h-12 outline-none"
                type="text"
                placeholder="Search your product here"
              />
              <Link
                href={`/search-products/?search=${searchQuery}`}
                onClick={handleSearch}
                className="flex absolute right-0 rounded-full bg-black md:text-sm lg:text-sm text-xs h-12 text-white 
                w-[75px] lg:w-40 md:w-40 items-center justify-center sm:px-2 gap-1 md:gap-2"
              >
                Search <IoSearch className="h-4 w-4" />
              </Link>
            </div>
            <div>
              <p className="flex items-center md:gap-4  lg:gap-5 gap-2">
                <Link href="/profile/?section=My Cart" className="relative">
                  <span
                    className="absolute text-xs -top-1 -right-1 bg-yellow-500 leading-0 px-1 py-.5 text-center 
                  rounded-full"
                  >
                    {cart.cart_items.length}
                  </span>
                  <TbShoppingBag className="h-5 w-5" />
                </Link>
                <Link href="/profile/?section=Profile">
                  <RxAvatar className="h-5 w-5" />
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
                className={`text-md flex flex-col text-center py-2 leading-7 font-normal relative hover:border-none 
                  after:absolute after:w-0 after:h-[5px] after:bottom-0 after:bg-primary after:transition-all 
                  after:duration-200 after:ease-in-out after:rounded-full hover:after:w-full hover:after:left-0 ${
                    pathName === nav?.href
                      ? "after:w-full after:left-0"
                      : "after:left-1/2"
                  }`}
              >
                {nav.name}
              </Link>
            ))}

            {!token && (
              <Link
                href={"/auth/log-in"}
                className={`text-md flex flex-col text-center py-2 leading-7 font-normal relative hover:border-none 
    after:absolute after:w-0 after:h-[5px] after:bottom-0 after:bg-primary after:transition-all 
    after:duration-200 after:ease-in-out after:rounded-full hover:after:w-full hover:after:left-0 ${
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
