import Link from 'next/link';
import React from 'react';

const Register = () => {
    return (
        <div className='container mt-36  mx-auto px-2 py-10 justify-center flex'>
            <div className='items-center flex flex-col'>
                <h1 className='font-semibold text-2xl text-center pb-10 leading-4'>
                    Set your new Password
                </h1>
                <div className='bg-primary w-full max-w-md md:max-w-lg lg:max-w-xl p-6 md:p-8 lg:p-10 rounded-xl flex flex-col items-center justify-center'>
                    <form action='' className='w-full flex flex-col justify-center'>
                        <h1 className='text-center text-white text-sm font-semibold '>
                            Hello, Muhtasim Shakil <br /> <span className='font-thin'>Please set a new password for your account</span>
                        </h1>

                        <div className='mt-5'>
                            <label
                                htmlFor='password'
                                className='text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold'
                            >
                                Password
                            </label>
                            <input
                                className='px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg'
                                type='password'
                                id='password'
                                placeholder='Enter your password'
                            />
                        </div>
                        <div className='mt-5'>
                            <label
                                htmlFor='retypePassword'
                                className='text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold'
                            >
                                Re-Type Password
                            </label>
                            <input
                                className='px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg'
                                type='password'
                                id='retypePassword'
                                placeholder='Re-enter your password'
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button className='mt-10 text-center text-primary bg-white rounded-lg text-xs md:text-sm font-bold py-4 px-8 lg:px-12'>
                                Reset Password
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
