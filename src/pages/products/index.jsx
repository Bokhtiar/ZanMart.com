
import SingleCart from '@/components/singleCart';
import { privateRequest, publicRequest } from '@/config/axios.config';
import { useProduct } from '@/hooks/useProducts';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { PiRectangle } from 'react-icons/pi';

const Products = () => {
    const router = useRouter();
    const { category } = router.query;
    // const [products, setProducts] = useState([]);
    const [minValue, setMinValue] = useState(10);
    const [maxValue, setMaxValue] = useState(90);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [size, setSize] = useState([]);
    const [colors, setColors] = useState([]);
    const [subCategory, setSubcategory] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const categoryFetch = async () => {
        try {
            const response = await publicRequest.get('categories');
            const fetchedCategories = response?.data?.data || [];
            const selectedCategory = fetchedCategories?.find(item => item.category_name === category);
            setSubcategory(selectedCategory?.childs || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const { products,setProducts } = useProduct()
    console.log(products)
    // Function to fetch sizes (attributes)
    const fetchSizes = async () => {
        try {
            const response = await privateRequest.get('admin/attribute');
            setSize(response?.data?.data?.data || []);
            console.log('size--------->', response?.data?.data?.data)
        } catch (error) {
            console.error('Error fetching sizes:', error);
        }
    };

    // Function to fetch colors
    const fetchColors = async () => {
        try {
            const response = await privateRequest.get('admin/color');
            setColors(response?.data?.data?.data || []);
            console.log('', response?.data?.data?.data)
        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    };
    
    const PriceFilter = async () => {
        console.log('click')
        try {
            const response = await publicRequest.post('product/price/filter',{min_price:minValue,max_price:maxValue});
            setProducts(response?.data?.data || []);
            console.log('price Filtered---->', response)
        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    };


    useEffect(() => {
        fetchSizes();
        fetchColors();
        categoryFetch();
    }, [category, selectedSubCategory]); // Updated dependencies

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue - 1);
        setMinValue(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue + 1);
        setMaxValue(value);
    };

    return (
        <div className="mt-36">
            {/* product banner--------------------------- */}
            <div className='text-center py-10'>
                <h1 className='font-extrabold text-primary text-4xl py-2'>{category}</h1>
                <p className='font-normal text-xl leading-7'>Choose form the best collections</p>
                <p className='py-10 gap-10 flex justify-center'>
                    {
                        subCategory?.map(sub => <button className='shadow-lg font-normal rounded-sm py-2  text-xs px-10 '>{sub.category_name}</button>)
                    }
                </p>
            </div>

            <div className="flex container mx-auto items-start gap-10 w-full">
                {/* Filter options */}
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
                        <button onClick={PriceFilter} className='mt-4  border rounded-md px-4 text-white  bg-primary text-sm '>Filter</button>
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
                                <input type="checkbox" />
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
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 md:gap-8 justify-between">
                        {products?.map(product => (
                            <SingleCart key={product.product_id} item={product} />
                        ))}
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
                                <button key={color.color_id} className="flex py-1 text-xs font-normal leading-4 items-center gap-2">
                                    <span className="h-[13px] border overflow-hidden w-[13px]">
                                        <PiRectangle className={`${color.color} w-[30px] h-[50px]`} />
                                    </span>
                                    {color.name}
                                </button>
                            ))}
                        </div>
                        {/* <img className="mt-10 w-full" src="/images/filterbanner.svg" alt="" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
