import { Toastify } from '@/components/toastify';
import { publicRequest } from '@/config/axios.config';
import { networkErrorHandeller } from '@/utils/helpers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    const newData = {

      name: data.fullName,
      email: data.email,
      phone: data.phoneNumber,
      role: 'user', // Can be dynamic based on your form
      password: data.password,

    }
    setLoading(true);
    try {
      const response = await publicRequest.post("register", newData);  // Use the endpoint 'register' (modify if necessary)
      console.log('succesas---', response);
      if (response.data.data.token || response.status == 200) {
        setToken(response?.data?.data?.token)
        console.log(response)
        router.forward('/')
        Toastify.Success('Registered successfully')
      }

    } catch (error) {
      networkErrorHandeller(error)
    }
    finally {
      setLoading(false);  // Set loading back to false after API call
    }

  };

  return (
    <div className='container mt-36  mx-auto py-10 justify-center flex'>
      <div className='items-center flex flex-col'>
        <h1 className='font-semibold text-2xl text-center pb-10 leading-4'>
          Create your Zanmart Account
        </h1>
        <div className='bg-primary w-full max-w-md md:max-w-lg lg:max-w-xl p-6 md:p-8 lg:p-10 rounded-xl flex flex-col items-center justify-center'>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-center'>

            {/* Full Name Input */}
            <div className='mt-5'>
              <label
                htmlFor='fullName'
                className='text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold'
              >
                Full Name*
              </label>
              <input
                className={`px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${errors.fullName ? 'border-red-500' : ''
                  }`}
                type='text'
                id='fullName'
                placeholder='Enter your full name'
                {...register('fullName', { required: 'Full name is required' })}
              />
              {errors.fullName && (
                <p className='text-red-500 text-sm mt-1'>{errors.fullName.message}</p>
              )}
            </div>
            {/* Email Input */}
            <div className='mt-5'>
              <label
                htmlFor='email'
                className='text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold'
              >
                Email*
              </label>
              <input
                className={`px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${errors.email ? 'border-red-500' : ''
                  }`}
                type='email'
                id='email'
                placeholder='Enter your email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number Input */}

            <div className='mt-5'>
              <label
                htmlFor='phoneNumber'
                className='text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold'
              >
                Phone Number*
              </label>
              <input
                className={`px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${errors.phoneNumber ? 'border-red-500' : ''
                  }`}
                type='text'
                id='phoneNumber'
                placeholder='Enter your phone number'
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  pattern: { value: /^[0-9]{11}$/, message: 'Invalid phone number' }
                })}
              />
              {errors.phoneNumber && (
                <p className='text-red-500 text-sm mt-1'>{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className='mt-5'>
              <label
                htmlFor='password'
                className='text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold'
              >
                Password
              </label>
              <input
                className={`px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${errors.password ? 'border-red-500' : ''
                  }`}
                type='password'
                id='password'
                placeholder='Enter your password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
              />
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
              )}
            </div>

            {/* Re-Type Password Input */}
            <div className='mt-5'>
              <label
                htmlFor='retypePassword'
                className='text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold'
              >
                Re-Type Password
              </label>
              <input
                className={`px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${errors.retypePassword ? 'border-red-500' : ''
                  }`}
                type='password'
                id='retypePassword'
                placeholder='Re-enter your password'
                {...register('retypePassword', {
                  required: 'Please re-enter your password',
                  validate: (value, { password }) =>
                    value === password || 'Passwords do not match'
                })}
              />
              {errors.retypePassword && (
                <p className='text-red-500 text-sm mt-1'>{errors.retypePassword.message}</p>
              )}
            </div>

            {/* Birth Date Input */}
            <div className='mt-5'>
              <label
                htmlFor='birthDate'
                className='text-sm px-2 md:px-4 flex pb-3 items-center text-white gap-4 font-semibold'
              >
                Birth Date
              </label>
              <div className='flex gap-2 md:gap-4 lg:gap-5'>
                <input
                  className={`px-4 md:px-6 lg:px-10 text-center w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${errors.birthDay ? 'border-red-500' : ''
                    }`}
                  type='text'
                  id='birthDay'
                  placeholder='Day'
                  {...register('birthDay', { required: 'Day is required' })}
                />
                <input
                  className={`px-4 md:px-6 lg:px-10 text-center w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${errors.birthMonth ? 'border-red-500' : ''
                    }`}
                  type='text'
                  id='birthMonth'
                  placeholder='Month'
                  {...register('birthMonth', { required: 'Month is required' })}
                />
                <input
                  className={`px-4 md:px-6 lg:px-10 text-center w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${errors.birthYear ? 'border-red-500' : ''
                    }`}
                  type='text'
                  id='birthYear'
                  placeholder='Year'
                  {...register('birthYear', { required: 'Year is required' })}
                />
              </div>
              {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
                <p className='text-red-500 text-sm mt-1'>Birth date is required</p>
              )}
            </div>

            <p className='mt-10 text-white text-md font-normal text-start'>
              By clicking &quot;SIGN UP&quot; I agree to the{' '}
              <strong>Terms of Use</strong> and <strong>Privacy Policy</strong>
            </p>
            <div className='flex justify-center'>
              <button type='submit' className='mt-10 text-center text-primary bg-white rounded-lg text-xs md:text-sm font-bold py-4 px-16 lg:px-20'>
                SIGN UP
              </button>
            </div>
            <div className='mt-5'>
              <Link href={'/auth/forget-pass'} className='text-white font-semibold text-sm p-4 leading-6 text-center'>
                Forgot password?
              </Link>
              <p className='text-white font-light text-sm leading-6 text-center'>
                Already have an account?{' '}
                <Link href='/auth/signin'>
                  <p className='text-sm font-semibold'>Sign In Now</p>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

    </div>

  );
};

export default Register;
