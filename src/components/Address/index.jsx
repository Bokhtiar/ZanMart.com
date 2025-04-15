import { privateRequest } from "@/config/axios.config";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Toastify } from "../toastify";
import { FaAddressBook } from "react-icons/fa";
import AddressSkeleton from "../loader/AddressSkeleton";

const Address = () => {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    country: "Bangladesh", // Default value
    type: "home", // Default value
  });
  const [address, setAddress] = useState([]);
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [union, setUnion] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null); // To store the ID of the address being edited

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressModal = () => {
    setModal(!modal);
    setIsEdit(false); // Reset edit state when opening the modal for a new address
    setFormData({
      country: "Bangladesh", // Default value
      type: "home", // Default value
    }); // Reset form data
  };

  const onClose = () => {
    setModal(false);
  }; 
  const handleEditModal = (address) => {
    setIsEdit(true);
    setModal(true);
    setEditAddressId(address?.address_id); // Set the address ID for editing
    setFormData({
      name: address?.name || "",
      email: address?.email || "",
      phone: address?.phone || "",
      address_line1: address?.address_line1 || "",
      address_line2: address?.address_line2 || "",
      division_id: address?.division?.id || "",
      district_id: address?.district?.id || "",
      upazila_id: address?.upazila?.id || "",
      union_id: address?.union?.id || "",
      postal_code: address?.postal_code || "",
      country: address?.country || "Bangladesh",
      type: address?.type || "home",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // log(formData);

    try {
      const updatedFormData = {
        ...formData,
        name: formData.name || "", // Ensure name is provided
        phone: formData.phone || "", // Ensure phone is provided
        email: formData.email || "", // Ensure email is provided
        address_line1: formData.address_line1 || "",
        address_line2: formData.address_line2 || "",
        division_id: formData.division_id || "",
        district_id: formData.district_id || "",
        upazila_id: formData.upazila_id || "",
        union_id: formData.union_id || "",
        postal_code: formData.postal_code || "",
        type: formData.type || "", // Example: 'home', 'office'
        _method: "PUT",
      };

      if (isEdit) { 
        const res = await privateRequest.post(
          `user/address/${editAddressId}`,
          updatedFormData
        );

        if (res.status === 200) {
          setAddress((prevAddresses) =>
            prevAddresses.map((item) =>
              item.address_id === editAddressId ? res.data.data : item
            )
          );
          userAddresses();
          Toastify.Success("Address updated successfully!");
        }
      } else {
        const response = await privateRequest.post("user/address", formData);

        if (response.data?.success === true) {
          setAddress((prevAddresses) => [...prevAddresses, response.data.data]);
          userAddresses();
          Toastify.Success(response.data.message);
        } else {
          Toastify.Error(response.errors);
        }
      }
    } catch (error) {
    
      Toastify.Error("Failed to submit address.");
    }

    // Close the modal
    setModal(false);
  };

  // Fetch divisions
  const handleDivision = async () => {
    try {
      const res = await privateRequest.get("division");
      setDivision(res.data?.data);
    } catch (error) { 
    }
  };

  // Fetch districts based on selected division
  const handleDistrict = async (divisionId) => {
    try {
      const res = await privateRequest.get(`district/${divisionId}`);
      setDistrict(res.data?.data);
    } catch (error) { 
    }
  };

  // Fetch upazilas based on selected district
  const handleUpazila = async (districtId) => {
    try {
      const res = await privateRequest.get(`upazila/${districtId}`);
      setUpazila(res.data?.data);
    } catch (error) { 
    }
  };

  // Fetch unions based on selected upazila
  const handleUnion = async (upazilaId) => {
    try {
      const res = await privateRequest.get(`union/${upazilaId}`);
      setUnion(res.data?.data);
    } catch (error) { 
    }
  };

  const handleDivisionChange = (e) => {
    const divisionId = e.target.value;
    setFormData({
      ...formData,
      division_id: divisionId,
      district_id: "",
      upazila_id: "",
      union_id: "",
    });
    handleDistrict(divisionId);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData({
      ...formData,
      district_id: districtId,
      upazila_id: "",
      union_id: "",
    });
    handleUpazila(districtId);
  };

  const handleUpazilaChange = (e) => {
    const upazilaId = e.target.value;
    setFormData({ ...formData, upazila_id: upazilaId, union_id: "" });
    handleUnion(upazilaId);
  };

  // Get all addresses
  const userAddresses = async () => {
    try {
      const res = await privateRequest.get("user/address");
      setAddress(res.data?.data);
    } catch (error) { 
    }
  };

  // Delete an address
  const handleDelete = async (id) => {
    try {
      const res = await privateRequest.delete(`user/address/${id}`);
      if (res.status === 200) {
        setAddress((prevAddresses) =>
          prevAddresses.filter((item) => item.address_id !== id)
        );
        Toastify.Success(res.data.message);
      }
    } catch (error) {
      Toastify.Error(error.message || "Failed to delete address.");
    }
  };
    
  useEffect(() => {
    handleDivision();
    userAddresses();
     
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between bg-gray-100 px-2 mb-3 ">
        <h1 className="text-2xl font-bold  py-1 rounded-md flex items-center gap-2 text-gray-700">
          <FaAddressBook /> Address List
        </h1>
        <button
          onClick={handleAddressModal}
          className="flex  items-center gap-2 text-lg bg-primary px-9 py-1 text-white rounded-3xl"
        >
          <FaPlusCircle /> Add New
        </button>
      </div>

      {/* Existing Addresses */}
      <div>
        {address.length > 0 ? (
          <>
            {address?.map((item, index) => (
              <div
                key={item?.address_id}
                className="bg-gray-100 p-3  flex flex-col md:grid md:grid-cols-3 justify-between items-start md:items-center gap-6 md:gap-10 mb-3"
              >
                <div className="flex  w-full gap-2">
                  <p className="font-light space-y-2 text-start  md:text-sm leading-4 md:leading-4">
                    <strong className="font-medium whitespace-nowrap">
                      Address {index + 1}:
                    </strong>
                    {item?.address_line1} {item?.address_line2}{" "}
                    {item?.union?.name} {item?.upazila?.name},{" "}
                    {item?.district?.name}, {item?.division?.name}
                  </p>
                </div>
                <div className="flex w-full justify-start md:justify-center items-center gap-2"></div>
                <div className="flex justify-start md:justify-center gap-2">
                  <button
                    onClick={() => handleEditModal(item)}
                    className="self-start mt-2 md:mt-0 bg-primary text-white px-2 rounded-md py-1 "
                  >
                    <AiFillEdit className=" h-5 w-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.address_id)}
                    className="flex font-semibold items-center text-base md:text-lg gap-3 md:gap-5 bg-red-500 px-2 rounded-md py-1  text-white"
                  >
                    <RiDeleteBin6Line className="font-semibold" />
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <AddressSkeleton key={i} />
            ))}
          </>
        )}
      </div>

      {/* Add New Address Button */}

      {/* Modal */}
      {modal && (
        <div className=" ">
          <div className="fixed inset-0  bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white   p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Select Location</h2>
              <form onSubmit={handleSubmit}>
                {/* Address Type */}
                <div className="mb-4">
                  <span className="block mb-2 font-semibold">Address Type</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="home"
                        checked={formData.type === "home"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Home
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="office"
                        checked={formData.type === "office"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Office
                    </label>
                  </div>
                </div>

                {/* Address Fields */}
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full border p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="address_line1"
                    value={formData.address_line1}
                    onChange={handleChange}
                    placeholder="Address Line 1"
                    className="w-full border p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="address_line2"
                    value={formData.address_line2}
                    onChange={handleChange}
                    placeholder="Address Line 2"
                    className="w-full border p-2"
                  />
                </div>

                {/* Division, District, Upazila, Union */}
                <div className="mb-4">
                  <select
                    name="division_id"
                    value={formData.division_id}
                    onChange={handleDivisionChange}
                    className="w-full border p-2"
                    required
                  >
                    <option value="">Select Division</option>
                    {division.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <select
                    name="district_id"
                    value={formData.district_id}
                    onChange={handleDistrictChange}
                    className="w-full border p-2"
                    required
                  >
                    <option value="">Select District</option>
                    {district.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <select
                    name="upazila_id"
                    value={formData.upazila_id}
                    onChange={handleUpazilaChange}
                    className="w-full border p-2"
                    required
                  >
                    <option value="">Select Upazila</option>
                    {upazila.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <select
                    name="union_id"
                    value={formData.union_id}
                    onChange={handleChange}
                    className="w-full border p-2"
                  >
                    <option value="">Select Union</option>
                    {union.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Postal Code */}
                <div className="mb-4">
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    className="w-full border p-2"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="mr-4 bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded"
                  >
                    {isEdit ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
