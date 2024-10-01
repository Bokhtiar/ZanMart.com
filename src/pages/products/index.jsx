import ProductsBanner from '@/components/productsBanner';
import SingleCart from '@/components/singleCart';
import { privateRequest, publicRequest } from '@/config/axios.config';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { PiRectangle } from 'react-icons/pi';
import { TbAlignLeft, TbAlignRight } from 'react-icons/tb';

const Products = () => {
    const subCategory = ['Mens clothing', 'Womens Clothing'];
    const router = useRouter();
    const { category } = router.query;

    const [products, setProducts] = useState([]);
    const [minValue, setMinValue] = useState(10);
    const [maxValue, setMaxValue] = useState(90);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [size, setSize] = useState([]);
    const [colors, setColors] = useState([]);
    const [page, setPage] = useState(1); // Add page state
    const [perPage, setPerPage] = useState(20); // Per page state

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

       // Function to fetch products with pagination
    //    const fetchProducts = async () => {
    //     try {
    //         const response = await publicRequest.get(`products?per_page=${perPage}&page=${page}`);
    //         setProducts(response?.data?.data?.data || []);
    //         console.log('Products:', response.data);
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //     }
    // };
    const fetchProducts=async()=>{
        fetch('/data.json')
        .then(res=>res.json())
        .then(data=>setProducts(data))

    }

    // Function to fetch sizes (attributes)
    const fetchSizes = async () => {
        try {
            const response = await privateRequest.get('/admin/attribute');
            setSize(response?.data?.data?.data || []);
            console.log('Sizes:', response.data);
        } catch (error) {
            console.error('Error fetching sizes:', error);
        }
    };

    // Function to fetch colors
    const fetchColors = async () => {
        try {
            const response = await privateRequest.get('/admin/color');
            setColors(response?.data?.data?.data || []);
            console.log('Colors:', response.data);
        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    };

    // UseEffect to call all fetching functions at once
    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchProducts(), fetchSizes(), fetchColors()]);
        };
        fetchData();
    }, [page, perPage]);


    

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue - 1);
        setMinValue(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue + 1);
        setMaxValue(value);
    };

    // Handle Pagination (Next/Previous)
    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="mt-36">
            <ProductsBanner category={category} subCategory={subCategory} />

            <div className="flex container mx-auto items-start gap-10 w-full">
                <div className="w-1/4 hidden lg:flex md:flex flex-col mt-24">
                    <div>
                        <p className="text-base font-semibold leading-6">Price Range</p>
                        <div className="flex items-center gap-5">
                            <input
                                className="border text-xs font-normal w-16 text-center"
                                type="text"
                                name="min"
                                value={minValue}
                                onChange={handleMinChange}
                                placeholder="Min"
                            />
                            <hr className="w-5 border" />
                            <input
                                className="border text-xs font-normal w-16 text-center"
                                type="text"
                                name="max"
                                value={maxValue}
                                onChange={handleMaxChange}
                                placeholder="Max"
                            />
                        </div>
                    </div>

                    <div className="mt-10">
                        <p className="text-base font-semibold leading-6">Filter by Size</p>
                        {/* Iterate over the size array */}
                        {size.map(s => (
                            <p key={s.attribute_id} className="flex py-1 text-xs font-mormal leading-4 items-center gap-2">
                                <input className="border-[#AAAAAA]" type="checkbox" /> {s.name}
                            </p>
                        ))}
                    </div>

                    <div className="mt-10">
                        <p className="text-base font-semibold leading-6">Filter by color</p>
                        {colors.map(color => (
                            <button key={color.index} className="flex py-1 text-xs font-normal leading-4 items-center gap-2">
                                <input type="checkbox" />
                                {/* <span className="h-[13px] border overflow-hidden w-[13px]">
                                    <PiRectangle className={`${color.color} w-[30px] h-[50px]`} />
                                </span> */}
                                {color.name}
                            </button>
                        ))}
                    </div>
                    <img className="mt-10 w-full" src="/images/filterbanner.svg" alt="" />
                </div>

                <div className="w-full">
                    <div className="flex lg:hidden md:hidden shadow-custom rounded-lg justify-between p-2 mb-2">
                        <button onClick={toggleDrawer} className="text-xl">
                            <FiFilter />
                        </button>
                        <p>
                            Sort By :{" "}
                            <select className="ml-2 border rounded">
                                <option value="">Default</option>
                                <option value="price">Low to High</option>
                                <option value="popularity">High to Low</option>
                            </select>
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 md:gap-8 justify-between">
                        {products.map(product => (
                            <SingleCart key={product.id} item={product} />
                        ))}
                    </div>

                    <div className="flex justify-center  gap-10 mt-8">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-md"
                            onClick={handlePreviousPage}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-md"
                            onClick={handleNextPage}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Drawer for mobile filters */}
            <div className={`fixed top-36 right-0 h-full z-20 bg-white transition-transform transform ${isDrawerOpen ? '-translate-x-0' : 'translate-x-full'} w-2/3`}>
                <div className="p-4">
                    <button onClick={toggleDrawer} className="text-xl">
                        <MdClose />
                    </button>

                    <div className="flex-col mt-24">
                        <div>
                            <p className="text-base font-semibold leading-6">Price Range</p>
                            <div className="flex items-center gap-5">
                                <input className="border text-xs font-normal w-16 text-center" type="text" placeholder="Min" />
                                <hr className="w-5 border" />
                                <input className="border text-xs font-normal w-16 text-center" type="text" placeholder="Max" />
                            </div>
                        </div>

                        <div className="mt-10">
                            <p className="text-base font-semibold leading-6">Filter by Size</p>
                            {size.map(s => (
                                <p key={s.attribute_id} className="flex py-1 text-xs font-mormal leading-4 items-center gap-2">
                                    <input className="border-[#AAAAAA]" type="checkbox" /> {s.name}
                                </p>
                            ))}
                        </div>

                        <div className="mt-10">
                            <p className="text-base font-semibold leading-6">Filter by color</p>
                            {colors.map(color => (
                                <button key={color.index} className="flex py-1 text-xs font-normal leading-4 items-center gap-2">
                                    <span className="h-[13px] border overflow-hidden w-[13px]">
                                        <PiRectangle className={`${color.color} w-[30px] h-[50px]`} />
                                    </span>
                                    {color.name}
                                </button>
                            ))}
                        </div>
                        <img className="mt-10 w-full" src="/images/filterbanner.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
