import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Select from "react-select";
import { publicRequest } from "@/config/axios.config";
import { Toastify } from "@/components/toastify";
import ProductDetailsSkeleton from "@/components/loader/productDetailSkeleton";

const OrderPage = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Address fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country] = useState("Bangladesh");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState("Home");

  // Dropdowns
  const [divisions, setDivisions] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  // Errors
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const { id } = router.query;

  // Fetch product
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get(`product/${id}`);
      setProduct(res?.data?.data || {});
    } catch {
      Toastify.Error("Product load failed!");
    }
    setLoading(false);
  };

  // Fetch divisions, cities, areas
  const fetchDivisions = async () => {
    try {
      const res = await publicRequest.get("division");
      const data = res?.data?.data || [];
      setDivisions(data.map((d) => ({ value: d.id, label: d.name })));
    } catch {
      Toastify.Error("Division load failed");
    }
  };

  const fetchCities = async (divisionId) => {
    try {
      const res = await publicRequest.get(`district/${divisionId}`);
      const data = res?.data?.data || [];
      setCities(data.map((c) => ({ value: c.id, label: c.name })));
    } catch {
      Toastify.Error("City load failed");
    }
  };

  const fetchAreas = async (cityId) => {
    try {
      const res = await publicRequest.get(`upazila/${cityId}`);
      const data = res?.data?.data || [];
      setAreas(data.map((a) => ({ value: a.id, label: a.name })));
    } catch {
      Toastify.Error("Area load failed");
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
    fetchDivisions();
  }, [id]);

  // Validation
  const validatePhone = (phone) =>
    /^01[3-9]\d{8}$/.test(phone.replace(/\s|-/g, ""));
  const validateZip = (zip) => /^\d{4}$/.test(zip);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Recipient name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(phone)) newErrors.phone = "Invalid BD phone number";
    if (!selectedDivision) newErrors.division = "Select a division";
    if (!selectedCity) newErrors.city = "Select a city";
    if (!selectedArea) newErrors.area = "Select an area";
    // if (!zip.trim()) newErrors.zip = "Post code is required";
    // else if (!validateZip(zip)) newErrors.zip = "Post code must be 4 digits";
    if (!address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handlers with real-time error removal
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };
  const handleZipChange = (e) => {
    setZip(e.target.value);
    if (errors.zip) setErrors((prev) => ({ ...prev, zip: "" }));
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    if (errors.address) setErrors((prev) => ({ ...prev, address: "" }));
  };
  const handleDivisionChange = (division) => {
    setSelectedDivision(division);
    setSelectedCity(null);
    setSelectedArea(null);
    setCities([]);
    setAreas([]);
    if (errors.division) setErrors((prev) => ({ ...prev, division: "" }));
    if (division) fetchCities(division.value);
  };
  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedArea(null);
    setAreas([]);
    if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
    if (city) fetchAreas(city.value);
  };
  const handleAreaChange = (area) => {
    setSelectedArea(area);
    if (errors.area) setErrors((prev) => ({ ...prev, area: "" }));
  };

  // Order submit
  const handleOrder = () => {
    if (!validateForm()) return;

    const orderItem = {
      product_id: product.product_id,
      title: product.title,
      qty: quantity,
      price: product.sell_price,
      thumbnail: product.thumbnail_image,
      customer: {
        name,
        phone,
        country,
        division: selectedDivision.label,
        city: selectedCity.label,
        area: selectedArea.label,
        zip,
        address,
        deliveryType,
      },
    };
    handleOrderPlace(orderItem);
  };

  const handleOrderPlace = async (orderItem) => {
    const newMyOrder = {
      cart_items: [orderItem],
      shipping_address: { ...orderItem.customer },
      billing_address: { ...orderItem.customer },
      customer: { ...orderItem.customer },
    };

    try {
      const res = await publicRequest.post("user/orders", newMyOrder);
      if (res?.status === 200 || res?.status === 201) {
       
        Toastify.Success("Order successful! We will contact you soon.");
        router.push({pathname:"/congrats",
          query:{product: JSON.stringify(product)}
          
        })
      }
    } catch {
      Toastify.Error("Order Place Failed");
    }
  };

  if (loading) return <ProductDetailsSkeleton />;

  const subtotal = product.sell_price * quantity;
  const discount = product.flat_discount  || 0;
  const total = subtotal ;

  const inputClass = (field) =>
    `border p-2 rounded w-full ${
      errors[field] ? "border-red-500" : "border-gray-300 outline-none"
    }`;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Form */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-bold text-xl mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Recipient Name"
                  value={name}
                  onChange={handleNameChange}
                  className={inputClass("name")}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={inputClass("phone")}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* Division */}
              <div className="flex flex-col">
                <Select
                  value={selectedDivision}
                  onChange={handleDivisionChange}
                  options={divisions}
                  placeholder="Select Division"
                  isClearable
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: errors.division
                        ? "red"
                        : provided.borderColor,
                      "&:hover": {
                        borderColor: errors.division
                          ? "red"
                          : provided.borderColor,
                      },
                      boxShadow: state.isFocused
                        ? errors.division
                          ? "0 0 0 1px red"
                          : provided.boxShadow
                        : "none",
                    }),
                  }}
                />
                {errors.division && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.division}
                  </span>
                )}
              </div>

              {/* City */}
              <div className="flex flex-col">
                <Select
                  value={selectedCity}
                  onChange={handleCityChange}
                  options={cities}
                  placeholder="Select City/District"
                  isClearable
                  isDisabled={!selectedDivision}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: errors.city ? "red" : provided.borderColor,
                      "&:hover": {
                        borderColor: errors.city ? "red" : provided.borderColor,
                      },
                      boxShadow: state.isFocused
                        ? errors.city
                          ? "0 0 0 1px red"
                          : provided.boxShadow
                        : "none",
                    }),
                  }}
                />
                {errors.city && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.city}
                  </span>
                )}
              </div>

              {/* Area */}
              <div className="flex flex-col">
                <Select
                  value={selectedArea}
                  onChange={handleAreaChange}
                  options={areas}
                  placeholder="Select Area/Thana"
                  isClearable
                  isDisabled={!selectedCity}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: errors.area ? "red" : provided.borderColor,
                      "&:hover": {
                        borderColor: errors.area ? "red" : provided.borderColor,
                      },
                      boxShadow: state.isFocused
                        ? errors.area
                          ? "0 0 0 1px red"
                          : provided.boxShadow
                        : "none",
                    }),
                  }}
                />
                {errors.area && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.area}
                  </span>
                )}
              </div>

              {/* Zip */}
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Post Code"
                  value={zip}
                  onChange={handleZipChange}
                  className={inputClass("zip")}
                />
                {errors.zip && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.zip}
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col sm:col-span-2">
                <textarea
                  placeholder="Address"
                  value={address}
                  onChange={handleAddressChange}
                  className={inputClass("address")}
                  rows={3}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.address}
                  </span>
                )}
              </div>
            </div>

            {/* Delivery Type */}
            <div className="mt-4 flex items-center gap-6">
              <label>
                <input
                  type="radio"
                  checked={deliveryType === "Home"}
                  onChange={() => setDeliveryType("Home")}
                  className="mr-1"
                />
                Home
              </label>
              <label>
                <input
                  type="radio"
                  checked={deliveryType === "Office"}
                  onChange={() => setDeliveryType("Office")}
                  className="mr-1"
                />
                Office
              </label>
            </div>
          </div>

          {/* Product Items */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-bold text-xl mb-4">Product Items</h2>
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="relative w-24 h-24">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_SERVER}${product.thumbnail_image}`}
                  alt={product.title}
                  fill
                  className="object-contain rounded"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{product.title}</p>
                <p>Unit Price: ৳ {product.sell_price}</p>
                <p>
                  Amount: ৳ {subtotal}{" "}
                  {discount > 0 && (
                    <span className="text-red-500 line-through ml-2">
                      { discount  }
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Bill */}
        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
          <h2 className="font-bold text-xl">Your Bill</h2>
          <div className="flex justify-between">
            <span>Sub-Total</span>
            <span>৳ {subtotal}</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Discount Price</span>
            <span>৳ {discount}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>৳ {total}</span>
          </div>
          <button
            onClick={handleOrder}
            className="mt-4 bg-green-600 text-white font-bold text-xl py-3 rounded hover:bg-green-700 transition"
          >
            Continue to Shipping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
