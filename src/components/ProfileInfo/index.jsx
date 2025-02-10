import { privateRequest } from "@/config/axios.config";
import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Toastify } from "../toastify";
import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { ImageUpload, TextInput } from "../input";
import { useProduct } from "@/hooks/useProducts";
import ProfileSkeleton from "../loader/ProfileSkeleton";

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
      }
    } catch (error) {
      Toastify.Error(error.response?.data[0]);
    }
  };

  return (
    <div className="">
      {(loading || !profile) ? (
        <ProfileSkeleton />
      ) : (
        <>
          <div className="flex items-center justify-between bg-gray-100 px-2 mb-3 ">
            <h1 className="text-2xl font-bold  py-1 rounded-md flex items-center gap-2 text-gray-700">
              <MdAccountCircle /> Manage Your Account
            </h1>
            <button
              onClick={handleOpenModal}
              className="text-lg bg-primary px-9 py-1  gap-2 flex items-center text-white rounded-3xl"
            >
              <AiFillEdit className="cursor-pointer" /> Edit
            </button>
          </div>
          <div className="flex flex-col  md:flex-row-reverse items-center  justify-between bg-gray-100 p-4 rounded-md">
            <div className="flex flex-col justify-center me-20 items-center">
              <Image
                src={`${process?.env.NEXT_PUBLIC_API_SERVER}${profile?.profile_pic}`}
                height={150}
                width={150}
                alt=""
                className="rounded-full"
              />
              <h1 className="text-xl font-semibold">{profile?.name}</h1>
            </div>
            <div className="w-96">
              {/* <h3 className="text-lg font-semibold flex items-center ">
            Personal Profile
          </h3> */}
              <p className="flex justify-between items-center pb-2 font-medium text-lg">
                <CgProfile />
                <span className="flex font-light ps-2 gap-5 items-center">
                  {profile?.name}
                </span>
              </p>
              <p className="flex justify-between items-center pb-2 font-medium text-lg">
                <p className="flex items-center">
                  <FaPhoneAlt />
                </p>
                <span className="flex font-light ps-2 gap-5 items-center">
                  {profile?.phone}
                </span>
              </p>
              <p className="flex justify-between items-center pb-2 font-medium text-lg">
                <MdEmail />
                <span className="flex font-light ps-2 gap-5 items-center">
                  {profile?.email}
                </span>
              </p>
            </div>
          </div>
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
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
