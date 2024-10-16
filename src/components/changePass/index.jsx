import React from 'react';

const ChangePass = () => {
    return (
        <div>
            <h1 className='text-2xl font-bold my-10 '>Manage  Your Password</h1>
            <hr className='border-2' />
            <form action='' className='w-1/2 flex flex-col justify-center'>
                <h1 className='text-center text-white text-sm font-semibold '>
                    Hello, Muhtasim Shakil <br /> <span className='font-thin'>Please set a new password for your account</span>
                </h1>

                <div className='mt-5'>
                    <label
                        htmlFor='password'
                        className='text-base px-2 md:px-4 lg:px-10 flex pb-3 items-center gap-4 font-semibold'
                    >
                        Your Current Password*
                    </label>
                    <input
                        className='px-4 md:px-6 lg:px-10 w-full py-3 border-2  md:py-4 lg:py-5 text-sm font-light rounded-xl'
                        type='password'
                        id='password'
                        placeholder='Enter your password'
                    />
                </div>
                <div className='mt-5'>
                    <label
                        htmlFor='password'
                        className='text-base px-2 md:px-4 lg:px-10 flex pb-3 items-center gap-4 font-semibold'
                    >
                        New Password*
                    </label>
                    <input
                        className='px-4 md:px-6 border-2  lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-xl'
                        type='password'
                        id='password'
                        placeholder='Enter your password'
                    />
                </div>
                <div className='mt-5'>
                    <label
                        htmlFor='retypePassword'
                        className='text-base px-2 md:px-4 lg:px-10 flex pb-3 items-center gap-4 font-semibold'
                    >
                        Re-Type Password*
                    </label>
                    <input
                        className='px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 border-2 lg:py-5 text-sm font-light rounded-xl'
                        type='password'
                        id='retypePassword'
                        placeholder='Re-enter your password'
                    />
                </div>
                <div className='flex justify-start'>
                    <button className='mt-10 text-center bg-primary text-white rounded-lg text-xs md:text-sm font-bold py-4 px-8 lg:px-12'>
                        Reset Password
                    </button>
                </div>

            </form>

        </div>
    );
};

export default ChangePass;