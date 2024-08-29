import ProductsBanner from '@/components/productsBanner';
import SingleCart from '@/components/singleCart';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PiRectangle } from 'react-icons/pi';
const Products = () => {
    const subCategory = ['Mens clothing', 'Womens Clothing']
    const router = useRouter()
    const { category } = router.query;
    const [products, setProducts] = useState([]);
    const [minValue, setMinValue] = useState(10);
    const [maxValue, setMaxValue] = useState(90);
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
        <div className=''>
            <ProductsBanner category={category} subCategory={subCategory}></ProductsBanner>
            <div className='flex container mx-auto gap-5 w-full'>
                <div className='w-1/4  mt-24'>
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
                            colors.map(color => <p key={color.index} className='flex py-1 text-xs font-normal leading-4 items-center gap-2'>
                                <span className='h-[13px] overflow-hidden w-[13px]'><PiRectangle className={`${color.color}  border-none  w-[20px] h-[20px] `} /></span>
                                {color.name}
                            </p>)
                        }

                    </div>
                </div>
                <div className='w-full  gap-10 grid grid-cols-4 justify-between'>
                    {
                        products.map(product => <SingleCart key={product.id} item={product}></SingleCart>)
                    }

                </div>
            </div>
        </div>
    );
};

export default Products;