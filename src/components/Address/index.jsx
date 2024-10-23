import { privateRequest } from '@/config/axios.config';
import React, { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Toastify } from '../toastify';

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
    setEditAddressId(address.address_id); // Set the address ID for editing
    setFormData({
      address_line1: address.address_line1 || '',
      address_line2: address.address_line2 || '',
      division_id: address.division?.id || '',
      district_id: address.district?.id || '',
      upazila_id: address.upazila?.id || '',
      union_id: address.union?.id || '',
      postal_code: address.postal_code || '',
      country: address.country || 'Bangladesh',
      type: address.type || 'home',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        console.log(formData)
        const res = await privateRequest.put(`user/address/${editAddressId}`, formData);
        if (res.status === 200) {
          setAddress((prevAddresses) => prevAddresses.map(item => item.address_id === editAddressId ? res.data.data : item));
          Toastify.Success("Address updated successfully!");
        }
      } else {
        const response = await privateRequest.post('user/address', formData);
        if (response.data?.success === true) {
          setAddress((prevAddresses) => [...prevAddresses, response.data.data]);
          Toastify.Success(response.data.message);
        } else {
          Toastify.Error(response.error);
        }
      }
    } catch (error) {
      console.error("Error submitting address:", error.response?.data || error.message);
      Toastify.Error("Failed to submit address.");
    }

    // Close the modal
    setModal(false);
  };

  // Fetch divisions
  const handleDivision = async () => {
    try {
      const res = await privateRequest.get('division');
      setDivision(res.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch districts based on selected division
  const handleDistrict = async (divisionId) => {
    try {
      const res = await privateRequest.get(`district/${divisionId}`);
      setDistrict(res.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch upazilas based on selected district
  const handleUpazila = async (districtId) => {
    try {
      const res = await privateRequest.get(`upazila/${districtId}`);
      setUpazila(res.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch unions based on selected upazila
  const handleUnion = async (upazilaId) => {
    try {
      const res = await privateRequest.get(`union/${upazilaId}`);
      setUnion(res.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDivisionChange = (e) => {
    const divisionId = e.target.value;
    setFormData({ ...formData, division_id: divisionId, district_id: "", upazila_id: "", union_id: "" });
    handleDistrict(divisionId);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData({ ...formData, district_id: districtId, upazila_id: "", union_id: "" });
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
      const res = await privateRequest.get('user/address');
      setAddress(res.data?.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // Delete an address
  const handleDelete = async (id) => {
    try {
      const res = await privateRequest.delete(`user/address/${id}`);
      if (res.status === 200) {
        setAddress(prevAddresses => prevAddresses.filter(item => item.address_id !== id));
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
      <h1 className='text-2xl font-bold my-10'>Manage your address</h1>
      <hr className='border-2' />

      {/* Existing Addresses */}
      <div>
        <h3 className='text-xl font-semibold py-5'>Delivery Addresses</h3>
        {
          address?.map((item, index) => (
            <div key={item.address_id} className='grid grid-cols-3 justify-between items-center gap-10'>
              <div className='w-full gap-2 flex'>
                <p className='pb-2 font-light space-y-2 text-start text-lg leading-6'>
                  <strong className='font-medium whitespace-nowrap'>Address {index + 1}:</strong>
                  {item.address_line1} {item.address_line2} {item.union?.name} {item.upazila?.name}, {item.district?.name}, {item.division?.name}
                </p>
                <button onClick={() => handleEditModal(item)}>
                  <AiFillEdit className='text-[#AAAAAA] h-4 w-5' />
                </button>
              </div>
              <div className='flex w-full justify-center items-end gap-2'>
                <p className='flex gap-5 items-center'>
                  <FaCheckCircle className='text-primary me-2' /> Default Delivery Address
                </p>
              </div>
              <div className='flex justify-center'>
                <button onClick={() => handleDelete(item.address_id)} className='flex font-semibold items-center text-lg gap-5 text-red-700'>
                  <RiDeleteBin6Line className='font-semibold' /> Delete
                </button>
              </div>
            </div>
          ))
        }
      </div>

      {/* Add New Address Button */}
      <button onClick={handleAddressModal} className='flex my-10 items-center gap-2 border-primary border-2 rounded-lg px-5 text-xs py-2 text-primary'>
        <FaPlusCircle /> Add New
      </button>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Select Location</h2>
            <form onSubmit={handleSubmit}>
              {/* Address Type */}
              <div className="mb-4">
                <label className="block mb-2">Address Type</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="home"
                      checked={formData.type === 'home'}
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
                      checked={formData.type === 'office'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Office
                  </label>
                </div>
              </div>

              {/* Address Fields */}
              <div className="mb-4">
                <label className="block mb-2">Address Line 1</label>
                <input
                  type="text"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleChange}
                  className="w-full border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address Line 2</label>
                <input
                  type="text"
                  name="address_line2"
                  value={formData.address_line2}
                  onChange={handleChange}
                  className="w-full border p-2"
                />
              </div>

              {/* Division, District, Upazila, Union */}
              <div className="mb-4">
                <label className="block mb-2">Division</label>
                <select name="division_id" value={formData.division_id} onChange={handleDivisionChange} className="w-full border p-2" required>
                  <option value="">Select Division</option>
                  {division.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">District</label>
                <select name="district_id" value={formData.district_id} onChange={handleDistrictChange} className="w-full border p-2" required>
                  <option value="">Select District</option>
                  {district.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Upazila</label>
                <select name="upazila_id" value={formData.upazila_id} onChange={handleUpazilaChange} className="w-full border p-2" required>
                  <option value="">Select Upazila</option>
                  {upazila.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Union</label>
                <select name="union_id" value={formData.union_id} onChange={handleChange} className="w-full border p-2">
                  <option value="">Select Union</option>
                  {union.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              {/* Postal Code */}
              <div className="mb-4">
                <label className="block mb-2">Postal Code</label>
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  className="w-full border p-2"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button type="button" onClick={onClose} className="mr-4 bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                  {isEdit ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
