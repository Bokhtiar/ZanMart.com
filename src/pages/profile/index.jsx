import Address from '@/components/Address';
import MyCart from '@/components/MyCart';
import Orders from '@/components/Orders';
import ProfileInfo from '@/components/ProfileInfo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import OptionsPayment from '@/components/OptionsPayment';
import Image from 'next/image';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";
import { IoLocationOutline, IoLogOut } from "react-icons/io5";
import { TbShoppingBag } from 'react-icons/tb';
import { TiDocumentText } from "react-icons/ti";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbCircleKey } from "react-icons/tb";
import ChangePass from '@/components/changePass';
import PaymetnProceed from '@/components/PaymentProceed';
import ConfirmOrder from '@/components/ConfirmOrder';
import { Toastify } from '@/components/toastify';
const Profile = () => {
    const router = useRouter();
    const { section } = router.query;
    const sections = [
        { logo: <CgProfile />, name: 'Profile' },
        { logo: <IoLocationOutline />, name: 'Address Book' },
        { logo: <TbShoppingBag />, name: 'My Cart' },
        { logo: <TiDocumentText />, name: 'Orders' },
        { logo: <TbCircleKey />, name: 'Change Password' }]
    const renderContent = () => {
        switch (section) {
            case 'Profile':
                return <ProfileInfo />;

            case 'Address Book':
                return <Address />;
           
            case 'My Cart':
                return <MyCart />;
            case 'Orders':
                return <Orders />;
            case 'Change Password':
                return <ChangePass />;
            case 'Payment Proceed':
                return < PaymetnProceed/>;
            case 'confirm-order':
                return <ConfirmOrder/>;
            default:
                return <ProfileInfo />
        }
    };
    const handleLogOut = () => {
        localStorage.removeItem('token')
        Toastify.Success('Logout Succesfully')
        router.push('/')
    }
    return (
        <div className='container  mx-auto flex  mt-36'>

            <div className='w-1/4 p-4 '>
                <div className='flex left-0  flex-col pb-10 justify-center '>
                    <div className='flex justify-center pb-4'>
                        <Image height={400} width={400}  className='rounded-full  h-16 w-16 ' src='/images/tshirt2.png' al='true' alt="Profile Image"></Image>
                    </div>
                    <p className='text-base py-2 text-center'> <span className='font-light border-b border-dashed '>Hello, <br /></span> Muhtasim Shakil</p>
                    <div className='flex justify-center'>
                        <p className='bg-[#00E381] flex items-center px-3 py-1 rounded-full  text-center text-white text-xs font-semibold '><MdOutlineVerifiedUser />{' '}Verified Account</p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <ul className='space-y-4  flex flex-col'>
                        {
                            sections?.map(data => <li key={data?.name}>
                                <Link href={`/profile?section=${data?.name}`}>
                                    <p className={`flex px-10 py-1 rounded-xl teext-xs leading-7 font-medium items-center gap-1  ${section === data.name ? 'bg-primary text-white  ' : 'text-primary'}`}> {data.logo} {data.name}</p>
                                </Link>
                            </li>)
                        }



                        <li>
                            <button onClick={handleLogOut} className='flex  px-10 py-1 teext-xs leading-7 items-center gap-1 text-red-500'> <IoLogOut /> Logout</button>

                        </li>
                    </ul>
                </div>
            </div>

            {/* Content Section */}
            <div className='w-3/4 p-8'>
                {renderContent()} {/* Render the selected component */}
            </div>
        </div>
    );
};

export default Profile;
