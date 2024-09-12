import ProductsBanner from '@/components/productsBanner';
import SingleCart from '@/components/singleCart';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { PiRectangle } from 'react-icons/pi';
import { TbAlignLeft, TbAlignRight } from 'react-icons/tb';
const Products = () => {
    const subCategory = ['Mens clothing', 'Womens Clothing']
    const router = useRouter()
    const { category } = router.query;
    const [products, setProducts] = useState([]);
    const [minValue, setMinValue] = useState(10);
    const [maxValue, setMaxValue] = useState(90);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const size = ['S (Small)', 'M (Medium)', 'L (Large)', 'XL (Extra Large)', 'XXL (Extra Extra Large)',]
    const colors = [
        { name: "Black", color: "bg-black" },
        { name: "Red", color: "bg-red-500" },
        { name: "White", color: "bg-white" },
        { name: "Blue", color: "bg-sky-400" },
        { name: "Navy Blue", color: "bg-blue-800" },
        { name: "Green", color: "bg-green-400" },
        { name: "Yellow", color: "bg-yellow-500" }
    ];
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };


    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);
    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue - 1);
        setMinValue(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue + 1);
        setMaxValue(value);
    };
    return (
        <div className='mt-36'>
            <ProductsBanner category={category} subCategory={subCategory}></ProductsBanner>
            <div className='flex container mx-auto items-start gap-10 w-full'>
                <div className='w-1/4 hidden lg:flex md:flex flex-col mt-24'>
                    <div>
                        <p className='text-base font-semibold leading-6'>Price Range</p>
                        <div className='flex items-center gap-5'>
                            <input className='border text-xs font-normal w-16 text-center' type="text" name="min" id="" placeholder='Min' /> <hr className='w-5 border' />
                            <input className='border text-xs font-normal w-16 text-center' type="text" name="max" id="" placeholder='Max' />
                        </div>

                    </div>
                    <div className='mt-10'>
                        <p className='text-base font-semibold leading-6'>Filter by Size</p>
                        {
                            size.map(s => <p className='flex py-1  text-xs font-mormal leading-4 items-center gap-2'><input className='border-[#AAAAAA]' type="checkbox" name="" id="" />{s}</p>)
                        }

                    </div>
                    <div className='mt-10'>
                        <p className='text-base font-semibold leading-6'>Filter by color</p>
                        {
                            colors.map(color => <button key={color.index} className='flex py-1 text-xs font-normal leading-4 items-center gap-2'>
                                <span className='h-[13px] border overflow-hidden w-[13px]'><PiRectangle className={`${color.color}     w-[30px] h-[50px] `} /></span>
                                {color.name}
                            </button>)
                        }

                    </div>
                    <img className=' mt-10 w-full' src="/images/filterbanner.svg" alt="" />
                </div>
                <div className=''>
                    <div className='flex lg:hidden md:hidden  shadow-custom rounded-lg justify-between p-2 mb-2'>
                        <button onClick={toggleDrawer} className=' text-xl'>
                            <FiFilter />
                        </button>
                        <p>Short By : <select className="ml-2 border rounded">
                            <option value="">Defalut</option>
                            <option value="price">Low Ho High</option>
                            <option value="popularity">High To Low</option>

                        </select></p>
                    </div>
                    <div className='w-full   grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 md:gap-8 justify-between'>

                        {
                            products.map(product => <SingleCart key={product.id} item={product}></SingleCart>)
                        }

                    </div>
                </div>
            </div>
            <div className={`fixed top-36 right-0 h-full z-20 bg-white transition-transform transform ${isDrawerOpen ? '-translate-x-0' : 'translate-x-full'} w-2/3`}>
                <div className='p-4'>
                    <button onClick={toggleDrawer} className='text-xl'>
                        <MdClose />
                    </button>

                    <div className='w-full  flex-col mt-24'>
                    <div>
                        <p className='text-base font-semibold leading-6'>Price Range</p>
                        <div className='flex items-center gap-5'>
                            <input className='border text-xs font-normal w-16 text-center' type="text" name="min" id="" placeholder='Min' /> <hr className='w-5 border' />
                            <input className='border text-xs font-normal w-16 text-center' type="text" name="max" id="" placeholder='Max' />
                        </div>

                    </div>
                    <div className='mt-10'>
                        <p className='text-base font-semibold leading-6'>Filter by Size</p>
                        {
                            size.map(s => <p className='flex py-1  text-xs font-mormal leading-4 items-center gap-2'><input className='border-[#AAAAAA]' type="checkbox" name="" id="" />{s}</p>)
                        }

                    </div>
                    <div className='mt-10'>
                        <p className='text-base font-semibold leading-6'>Filter by color</p>
                        {
                            colors.map(color => <button key={color.index} className='flex py-1 text-xs font-normal leading-4 items-center gap-2'>
                                <span className='h-[13px] border overflow-hidden w-[13px]'><PiRectangle className={`${color.color}     w-[30px] h-[50px] `} /></span>
                                {color.name}
                            </button>)
                        }

                    </div>
                    <img className=' mt-10 w-full' src="/images/filterbanner.svg" alt="" />
                </div>
                </div>
            </div>
        </div>
    );
};

export default Products;