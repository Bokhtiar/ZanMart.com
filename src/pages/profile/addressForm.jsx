import { privateRequest } from "@/config/axios.config";
import React, { useEffect, useState } from "react";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "@/utils/helpers";
import ProfileLayout from "@/components/layouts/ProfileLayout/ProfileLayout";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner";
import { SingleSelect, TextInput } from "@/components/input";
import { useForm } from "react-hook-form";
import { addressFormData } from "./components/addressForm";
import useLocationFetch from "@/hooks/api/useLocationApiFetch";
const AddressForm = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    trigger,
    setValue,
    watch,
  } = useForm();
  const [formData, setFormData] = useState({
    country: "Bangladesh", // Default value
    type: "home", // Default value
  });
  console.log(watch("division_id")?.name);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { modal } = router.query;
  const id = router.query.id;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // fetch details address
  const fatchDetailAddress = async () => {
    if (!id) return;
    try {
      const res = await privateRequest.get(`user/address/${id}`);
      if (res.status == 200) {
        const address = res.data.data;
        const fields = [
          "name",
          "email",
          "phone",
          "address_line1",
          "address_line2",
          "postal_code",
        ];
        fields.forEach((field) => {
          setValue(field, address?.[field] || "");
        });
        const locationFields = ["union", "district", "division", "upazila"];
        locationFields.forEach((field) => {
          setValue(
            `${field}_id`,
            address?.[field]
              ? { ...address[field], label: address[field]?.name }
              : ""
          );
        });
        setFormData({
          country: address?.country || "Bangladesh",
          type: address?.type || "home",
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (id) {
      fatchDetailAddress();
    }
  }, [id]);

  // submit address
  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const updatedFormData = {
        ...data,
        division_id: data?.division_id?.id || "",
        district_id: data?.district_id?.id || "",
        upazila_id: data?.upazila_id?.id || "",
        union_id: data?.union_id?.id,
        type: formData.type || "",
        country: "Bangladesh",
      };

      if (id) {
        const res = await privateRequest.post(`user/address/${id}`, {
          ...updatedFormData,
          _method: "PUT",
        });

        if (res.status === 200) {
          Toastify.Success(res?.data?.message);
          router.replace("/profile/address");
          setLoading(false);
        }
      } else {
        const response = await privateRequest.post(
          "user/address",
          updatedFormData
        );
        console.log(response.status);
        if (response.status == 201) {
          Toastify.Success(response.data.message);
          router.replace(modal ? `/my-cart?modal=${true}` : "/profile/address");
          setLoading(false);
        }
      }
    } catch (error) {
      networkErrorHandeller(error);
      setLoading(false);
    }
  };
  // division find
  const { loading: divisionLoading, data: divisionData } =
    useLocationFetch("division");
  // Fetch districts based on selected division
  const [localLocationId, setLocalLocationId] = useState({});
  const [localAreaData, setLocalAreaData] = useState({
    district: [],
    union: [],
    upazila: [],
  });
  const fetchLocalLocation = async (url) => {
    try {
      const response = await privateRequest.get(url);
      const { data } = response?.data;
      switch (localLocationId?.key) {
        case "division_id":
          setLocalAreaData((prev) => ({ ...prev, district: data }));
          break;
        case "district_id":
          setLocalAreaData((prev) => ({ ...prev, upazila: data }));
          break;
        case "upazila_id":
          setLocalAreaData((prev) => ({ ...prev, union: data }));
          break;
      }
    } catch (error) {}
  };
  // fetch zila upazila union
  useEffect(() => {
    if (!localLocationId?.id || !localLocationId?.key) return;
    const urlMap = {
      division_id: `district/${localLocationId?.id}`,
      district_id: `upazila/${localLocationId?.id}`,
      upazila_id: `union/${localLocationId?.id}`,
    };
    if (urlMap[localLocationId?.key]) {
      fetchLocalLocation(urlMap[localLocationId?.key]);
    }
  }, [localLocationId]);
  // location data fetch
  const locationDataFetch = (name) => {
    const map = {
      division_id: divisionData,
      district_id: localAreaData?.district,
      upazila_id: localAreaData?.upazila,
      union_id: localAreaData?.union,
    };
    return (map[name] || []).map((item) => ({
      ...item,
      label: item?.name,
      value: item?.id,
    }));
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="  p-6 rounded-lgg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Select Location</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3  ">
          {/* Address Type */}
          <div>
            <span className="block mb-2 font-semibold">Address Type</span>
            <div className="flex items-center gap-4">
              {["home", "office"].map((item, idx) => (
                <label className="flex items-center uppercase " key={idx}>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {" "}
            {/* Address Fields */}
            {addressFormData.map((item, idx) => (
              <div key={idx} className="">
                {item?.type == "select" ? (
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
                  <TextInput
                    name={item?.name}
                    type={item?.type}
                    control={control}
                    label={
                      <div className="flex gap-2 pb-1 pl-3.5 text-black">
                        {item?.label}
                      </div>
                    }
                    rules={{
                      required: `${item?.rules}`,
                    }}
                    error={errors?.[`${item?.name}`]?.message}
                    placeholder={item?.placeholder}
                    trigger={trigger}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 rounded"
            >
              {loading ? <Spinner /> : id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
AddressForm.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default AddressForm;
