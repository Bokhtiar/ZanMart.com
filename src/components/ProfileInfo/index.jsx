import { privateRequest } from "@/config/axios.config";
import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Toastify } from "../toastify";
import Image from "next/image"; 
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa"; 
import { useForm } from "react-hook-form";
import { ImageUpload, TextInput } from "../input";
import { useProduct } from "@/hooks/useProducts";
import ProfileSkeleton from "../loader/ProfileSkeleton";
import Spinner from "../spinner";

const ProfileInfo = () => {
  const { user: profile, loading } = useProduct();
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [updateLoading,setUpdateLoading]=useState(false)
  // Set form data when profile prop changes
  useEffect(() => {
    if (profile) {
      setValue("name", profile?.name);
      setValue("email", profile?.email);
      setValue("phone", profile?.phone);
      setValue("role", profile?.role); // Ensure role is correctly set
    }
  }, [profile]);
 

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  //  edit profile
  const onSubmit = async (data) => {
    if (!data?.name || !data?.email || !data?.phone || !data?.role) {
      Toastify.Error("Please fill up missing value");
      return;
    }
    try {
      setUpdateLoading(true)
      const formDataObj = new FormData();
      // Make sure role is included
      if (data.profile_pic) {
        formDataObj.append("profile_pic", data?.profile_pic); // File object
      }
      const res = await privateRequest.post("user/profile", {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        role: data?.role,
        profile_pic: data?.profile_pic,
        _method: "PUT",
      });
      if (res?.status == 200) {
        Toastify.Success(res.data?.message);
        handleCloseModal();
        userAddresses();
        setUpdateLoading(false)
      }
    } catch (error) {
      Toastify.Error(error.response?.data[0]);
      setUpdateLoading(false)
    }
  };
  const [address, setAddress] = useState([]);

  // address fetch api here
  const userAddresses = async () => {
    try {
      setAddressLoading(true);
      const res = await privateRequest.get("user/address");
     
      setAddress(res.data?.data);
    } catch (error) { 
    }
    setAddressLoading(false);
  };
  useEffect(() => {
    userAddresses();
  }, []); 
  return (
    <div className="space-y-4">
      <h1 className="text-xl text-gray-700 font-medium">My Profile</h1>
      {/* profile basic info section  */}
      {loading || !profile || addressLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          {" "}
          <section className="border rounded-lg p-4 flex justify-between ">
            <div className="flex flex-col md:flex-row gap-3 ">
              <Image
                src={profile?.profile_pic? `${process?.env.NEXT_PUBLIC_API_SERVER}${profile?.profile_pic}`: '/profile_avatar/profile_avater.png'}
                height={60}
                width={60}
                alt=""
                className="rounded-full"
              />
              <div>
                <p>{profile?.name}</p>
                {/* <p>{profile?.name}</p> */}
                <span className="text-gray-500">{profile?.email}</span>
              </div>
            </div>
            <div>
              <button
                onClick={handleOpenModal}
                className="text-sm bg-gray-50 px-3 py-1  gap-2 flex items-center text-gray-700 rounded-lg border -ml-3"
              >
                <AiFillEdit className="cursor-pointer" /> Edit
              </button>
            </div>
          </section>
          {/* personal info detials page  */}
          <section className="border rounded-lg p-4 space-y-1.5  ">
            <h1 className="text-xl text-gray-700 font-medium pb-2.5">
              Personal Information
            </h1>
            <div className="flex flex-col md:flex md:flex-row  ">
              <p className="w-1/2 text-gray-600 font-medium  ">Name:</p>
              <p className="w-1/2 text-gray-500  ">{profile?.name}</p>
            </div>
            <div className="flex flex-col md:flex md:flex-row  ">
              <p className="w-1/2 text-gray-600 font-medium  ">Phone:</p>
              <p className="w-1/2 text-gray-500  ">{profile?.phone}</p>
            </div>
            <div className="flex flex-col md:flex md:flex-row   ">
              <p className="w-1/2 text-gray-600 font-medium  ">Email:</p>
              <p className="w-1/2 text-gray-500 mt-0 ">{profile?.email}</p>
            </div>
          </section>
          {/* address show using list  */}
          {address?.length > 0 ? (
            <section className="border rounded-lg px-2 pb-4 space-y-2">
              <h1 className="text-xl text-gray-700 font-medium py-3 px-2">
                Adress List
              </h1>
              {address?.length > 0 &&
                address?.filter(item=>item?.default_address===1)?.map((addressInfo, index) => (
                  <div
                    className="space-y-1.5 border px-2 py-4 rounded-lg text-sm"
                    key={addressInfo?.address_id}
                  > 
                    <div className="flex flex-col md:flex md:flex-row  ">
                      <p className="w-1/2 text-gray-600 font-medium  ">
                        Division
                      </p>
                      <p className="w-1/2 text-gray-500  ">
                        {addressInfo?.division?.name}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex md:flex-row   ">
                      <p className="w-1/2 text-gray-600 font-medium  ">
                        District
                      </p>
                      <p className="w-1/2 text-gray-500 mt-0 ">
                        {addressInfo?.district?.name}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex md:flex-row   ">
                      <p className="w-1/2 text-gray-600 font-medium  ">
                        Upazila
                      </p>
                      <p className="w-1/2 text-gray-500 mt-0 ">
                        {addressInfo?.upazila?.name}
                      </p>
                    </div> 
                    <div className="flex flex-col md:flex md:flex-row   ">
                      <p className="w-1/2 text-gray-600 font-medium  ">
                        Postal Code
                      </p>
                      <p className="w-1/2 text-gray-500 mt-0 ">
                        {addressInfo?.postal_code}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex md:flex-row   ">
                      <p className="w-1/2 text-gray-600 font-medium  ">
                        Address 
                      </p>
                      <p className="w-1/2 text-gray-500 mt-0 ">
                        {addressInfo?.address_line1}
                      </p>
                    </div> 
                  </div>
                ))}
            </section>
          ) : (
            <div>
              <div className="flex flex-col items-center justify-center text-gray-500 py-10">
                <FaMapMarkerAlt className="text-4xl mb-2" />
                <p className="text-lg">No addresses found</p>
                <p className="text-sm text-gray-400">
                  Add a new address to see it listed here
                </p>
              </div>
            </div>
          )}
        </>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            className="bg-white rounded-lg shadow-lg p-8 w-96"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="flex flex-col gap-4">
              <div>
                <TextInput
                  name="name"
                  control={control}
                  trigger={trigger}
                  label={<span className="pl-3.5">Name</span>}
                  rules={{ required: "Name is required" }}
                  placeholder="Enter your name"
                  error={errors?.name?.message}
                />
              </div>
              <div>
                <TextInput
                  name="email"
                  control={control}
                  trigger={trigger}
                  label={<span className="pl-3.5">Email</span>}
                  rules={{ required: "email is required" }}
                  placeholder="Enter your email"
                  error={errors?.email?.message}
                />
              </div>
              <div>
                <TextInput
                  name="phone"
                  control={control}
                  trigger={trigger}
                  label={<span className="pl-3.5">Phone</span>}
                  rules={{ required: "phone is required" }}
                  placeholder="Enter your Phone Number"
                  error={errors?.phone?.message}
                />
              </div>
              <div>
                <ImageUpload
                  name="profile_pic"
                  control={control}
                  label="Profile Picture"
                  // required="false"
                  onUpload={(file) => setValue("profile_pic", file)}
                  imgUrl={profile?.profile_pic}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700  hover:opacity-80 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button className="bg-primary text-white hover:bg-secondary px-4 py-2 rounded">
              {updateLoading ? <Spinner color='secondary'/>:'Update'} 
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
