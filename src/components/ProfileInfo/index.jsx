import { privateRequest } from "@/config/axios.config";
import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Toastify } from "../toastify";
import Image from "next/image";

const ProfileInfo = ({ profile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profile_pic: "",
    role: profile?.role,
  });

  // Set form data when profile prop changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile?.name || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        role: profile?.role, // Ensure role is correctly set
      });
    }
  }, [profile]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, profile_pic: file }));
    }
  };

  const handleSaveChanges = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.role
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const formDataObj = new FormData();
      // Make sure role is included

      if (formData.profile_pic) {
        formDataObj.append("profile_pic", formData?.profile_pic); // File object
      }
      console.log(formData?.profile_pic);
      const res = await privateRequest.post("user/profile", {
        name: formData?.name,
        email: formData?.email,
        phone: formData?.phone,
        role: formData?.role,
        profile_pic: formData?.profile_pic,
        _method: "PUT",
      });
      if (res?.status == 200) {
        Toastify.Success(res.data?.message);
      }
      handleCloseModal();
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-10">Manage Your Account</h1>
      <hr className="border-2" />

      <div className="flex flex-col  md:flex-row-reverse items-center  justify-between ">
        
        <div className="flex flex-col justify-center me-20 items-center">
          <Image src={`${process?.env.NEXT_PUBLIC_API_SERVER}/${profile?.profile_pic}`}  height={150} width={150} alt="" className="rounded-full" />
          <h1 className="text-xl font-semibold">{profile?.name}</h1>
        </div>
        <div>
          <h3 className="text-xl font-semibold flex items-center  py-5">
            Personal Profile
          </h3>
          <p className="flex pb-2 font-medium text-lg">
            Name:
            <span className="flex font-light ps-2 gap-5 items-center">
              {profile?.name}
            </span>
          </p>
          <p className="flex pb-2 font-medium text-lg">
            Phone:
            <span className="flex font-light ps-2 gap-5 items-center">
              {profile?.phone}
            </span>
          </p>
          <p className="flex pb-2 font-medium text-lg">
            Email:
            <span className="flex font-light ps-2 gap-5 items-center">
              {profile?.email}
            </span>
          </p>
          <button
            onClick={handleOpenModal}
            className="text-lg bg-primary px-5 py-2  gap-2 mt-10 flex items-center text-white rounded-3xl"
          >
            Edit <AiFillEdit className="cursor-pointer" />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input w-full border rounded px-3 py-2"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: JPEG, PNG. Max size: 2MB.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
