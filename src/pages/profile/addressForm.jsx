import { privateRequest } from "@/config/axios.config";
import React, { useEffect, useState } from "react";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "@/utils/helpers";
import ProfileLayout from "@/components/layouts/ProfileLayout/ProfileLayout";
import { useRouter } from "next/router";
const AddressForm = ({ onClose, isEdit, setModal, userAddresses }) => {
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [union, setUnion] = useState([]);
  const [formData, setFormData] = useState({
    country: "Bangladesh", // Default value
    type: "home", // Default value
  });

  const router=useRouter()
  const {modal,id}=router.query
  console.log(id)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          Toastify.Success("Address updated successfully!");
        }
      } else {
        const response = await privateRequest.post("user/address", formData);
        console.log(response.status);
        if (response.status == 201) {
          Toastify.Success(response.data.message);
          router.replace(modal? `/my-cart?modal=${true}`:'/profile/address')
          
        }
      }
    } catch (error) {
      networkErrorHandeller(error);
    }

    // Close the modal
  };

  // Fetch divisions
  const handleDivision = async () => {
    try {
      const res = await privateRequest.get("division");
      setDivision(res.data?.data);
    } catch (error) {}
  };

  // Fetch districts based on selected division
  const handleDistrict = async (divisionId) => {
    try {
      const res = await privateRequest.get(`district/${divisionId}`);
      setDistrict(res.data?.data);
    } catch (error) {}
  };

  // Fetch upazilas based on selected district
  const handleUpazila = async (districtId) => {
    try {
      const res = await privateRequest.get(`upazila/${districtId}`);
      setUpazila(res.data?.data);
    } catch (error) {}
  };

  // Fetch unions based on selected upazila
  const handleUnion = async (upazilaId) => {
    try {
      const res = await privateRequest.get(`union/${upazilaId}`);
      setUnion(res.data?.data);
    } catch (error) {}
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
  useEffect(() => {
    handleDivision();
  }, []);


   const handleEditModal = (address) => {
  
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
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-6 rounded-lgg w-full max-w-2xl">
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

          {/* Location Selects */}
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
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
  );
};
AddressForm.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default AddressForm;
