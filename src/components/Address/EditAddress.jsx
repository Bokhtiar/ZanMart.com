import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { privateRequest } from "@/config/axios.config";
import { Toastify } from "@/components/toastify";
import { networkErrorHandeller } from "@/utils/helpers";
import Spinner from "@/components/spinner";
import { SingleSelect, TextInput } from "@/components/input";
import { addressFormData } from "./data";
const EditAddress = ({
  isOrder = false,
  setOpenDrawer = () => {},
  refetch = () => {},
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger,
    setValue,
  } = useForm();
  const [formData, setFormData] = useState({
    country: "Bangladesh",
    type: "home",
  });

  const [showExample, setShowExample] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const id = router.query.id;

  const [locationOptions, setLocationOptions] = useState({
    divisions: [],
    districts: [],
    upazilas: [],
    unions: [],
  });

  const [localLocationId, setLocalLocationId] = useState({});
  // Fetch divisions on component mount
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const res = await privateRequest.get(`/division`);
        setLocationOptions((prev) => ({
          ...prev,
          divisions: res.data?.data || [],
        }));
      } catch (error) {
        networkErrorHandeller(error);
      }
    };
    fetchDivisions();
  }, []);

  // Fetch districts when division_id changes
  useEffect(() => {
    const fetchDistricts = async (divisionId) => {
      try {
        const res = await privateRequest.get(`/district/${divisionId}`);
        setLocationOptions((prev) => ({
          ...prev,
          districts: res.data?.data || [],
        }));
      } catch (error) {
        networkErrorHandeller(error);
      }
    };
    if (localLocationId.division_id) {
      fetchDistricts(localLocationId.division_id);
    }
  }, [localLocationId.division_id]);

  // Fetch upazilas when district_id changes
  useEffect(() => {
    const fetchUpazilas = async (districtId) => {
      try {
        const res = await privateRequest.get(`/upazila/${districtId}`);
        setLocationOptions((prev) => ({
          ...prev,
          upazilas: res.data?.data || [],
        }));
      } catch (error) {
        networkErrorHandeller(error);
      }
    };
    if (localLocationId.district_id) {
      fetchUpazilas(localLocationId.district_id);
    }
  }, [localLocationId.district_id]);

  // Fetch existing address details for editing
  useEffect(() => {
    const fetchDetailAddress = async () => {
      if (!id) return;
      try {
        const res = await privateRequest.get(`user/address/${id}`);
        if (res.status === 200) {
          const address = res.data.data;
          const fields = [
            "name",
            "email",
            "phone",
            "address_line1",
            "address_line2",
            "postal_code",
            "division_id",
            "district_id",
            "upazila_id",
            "union_id",
          ];
          fields.forEach((field) => {
            setValue(field, address?.[field] || "");
          });
          setFormData({
            country: address?.country || "Bangladesh",
            type: address?.type || "home",
          });
          setValue("division_id", {
            label: address.division?.name, // make sure API provides this
            value: address.division_id,
          });
          setValue("district_id", {
            label: address.district?.name,
            value: address.district_id,
          });
          setValue("upazila_id", {
            label: address.upazila?.name,
            value: address.upazila_id,
          });
          setLocalLocationId({
            division_id: address?.division_id,
            district_id: address?.district_id,
            upazila_id: address?.upazila_id,
            // union_id: address?.union_id,
          });
        }
      } catch (error) {
        networkErrorHandeller(error);
      }
    };
    if (id) {
      fetchDetailAddress();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updatedFormData = {
        ...data,
        type: formData.type || "",
        country: "Bangladesh",
        division_id: data?.division_id?.value,
        district_id: data?.district_id?.value,
        upazila_id: data?.upazila_id?.value,
      };

      const res = await privateRequest.post(`user/address/${id}`, {
        ...updatedFormData,
        _method: "PUT",
      });

      if (res.status === 200) {
        Toastify.Success(res.data.message);
        setOpenDrawer(false);
        refetch();
        const updatedQuery = { ...router.query };
        delete updatedQuery.id;
        isOrder &&
          router.push({
            pathname: router.pathname,
            query: updatedQuery,
          });
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  const locationDataFetch = (name) => {
    const map = {
      division_id: locationOptions.divisions,
      district_id: locationOptions.districts,
      upazila_id: locationOptions.upazilas,
    };
    return (map[name] || []).map((item) => ({
      label: item?.name,
      value: item?.id,
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [isAddress, setIsAddress] = useState([]);
  const userAddresses = async () => {
    try {
      const res = await privateRequest.get("user/address");
      setIsAddress(res?.data?.data?.length);
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  useEffect(() => {
    userAddresses();
  }, []);
  return (
    <div className="  rounded-lg   flex items-center justify-center px-2   ">
      <div className="w-full max-w-2xl ">
        <h2 className="text-xl font-bold  ">Select Location</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Address Type */}
          <div>
            <span className="block mb-2 font-semibold">Address Type</span>
            <div className="flex items-center gap-4">
              {["home", "office"].map((item, idx) => (
                <label className="flex items-center uppercase" key={idx}>
                  <input
                    type="radio"
                    name="type"
                    value={item}
                    checked={formData.type === item}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1   gap-2">
            {addressFormData.map((item, idx) => (
              <div
                key={idx}
                // className={`${
                //   item?.className ? item?.className : "col-span-1 md:col-span-1"
                // }`}
              >
                {item?.type === "select" ? (
                  <SingleSelect
                    label={item?.label}
                    name={item?.name}
                    error={errors[item?.name] && errors[item?.name].message}
                    control={control}
                    isClearable={true}
                    placeholder={item?.placeholder}
                    options={locationDataFetch(item?.name)}
                    rules={{ required: item?.rules }}
                    onSelected={(items) => {
                      setLocalLocationId({
                        [item?.name]: items?.value,
                        id: items?.value,
                        key: item?.name,
                      });
                    }}
                  />
                ) : (
                  <>
                    <TextInput
                      name={item?.name}
                      type={item?.type}
                      control={control}
                      label={
                        <div className="flex gap-2 pb-1   text-gray-500">
                          {item?.label}
                        </div>
                      }
                      rules={{
                        required: item?.rules,
                      }}
                      error={errors?.[item?.name]?.message}
                      placeholder={item?.placeholder}
                      trigger={trigger}
                      onFocus={() => {
                        if (item.name === "address_line1") setShowExample(true);
                      }}
                      onBlur={() => {
                        if (item.name === "address_line1")
                          setShowExample(false);
                      }}
                    />
                    {item.name === "address_line1" && showExample && (
                      <p className="text-sm text-gray-500 pl-3">
                        e.g., House 123, Road 10, Dhanmondi
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            {/* <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setOpenDrawer(false)}
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="bg-secondary text-white w-20 h-10  rounded"
            >
              {loading ? <Spinner /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
