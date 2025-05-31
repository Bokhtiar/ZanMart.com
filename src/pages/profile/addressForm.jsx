import { privateRequest } from "@/config/axios.config";
import React, { useEffect, useState } from "react";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "@/utils/helpers";
import ProfileLayout from "@/components/layouts/ProfileLayout/ProfileLayout";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner";
import { SingleSelect, TextInput } from "@/components/input";
import { useForm } from "react-hook-form";
import { addressFormData } from "@/components/Profile/addressFormData";

const AddressForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger,
    setValue,
    watch,
  } = useForm();

  const [formData, setFormData] = useState({
    country: "Bangladesh",
    type: "home",
  });

  const [showExample, setShowExample] = useState(false); // NEW
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { modal } = router.query;
  const id = router.query.id;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fatchDetailAddress = async () => {
    if (!id) return;
    try {
      const res = await privateRequest.get(`user/address/${id}`);
      if (res.status == 200) {
        const address = res.data.data;
        const fields = ["name", "phone", "address_line1", "postal_code"];
        fields.forEach((field) => {
          setValue(field, address?.[field] || "");
        });
        setFormData({
          country: address?.country || "Bangladesh",
          type: address?.type || "home",
        });
      }
    } catch (error) { }
  };

  useEffect(() => {
    if (id) {
      fatchDetailAddress();
    }
  }, [id]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updatedFormData = {
        ...data,
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
        }
      } else {
        const response = await privateRequest.post(
          "user/address",
          updatedFormData
        );
        if (response.status == 201) {
          Toastify.Success(response.data.message);
          router.replace(modal ? `/my-cart?modal=${true}` : "/profile/address");
        }
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  const [localLocationId, setLocalLocationId] = useState({});

  const locationDataFetch = (name) => {
    const map = {
      division_id: [], // Replace with actual data
      district_id: [],
      upazila_id: [],
      union_id: [],
    };
    return (map[name] || []).map((item) => ({
      ...item,
      label: item?.name,
      value: item?.id,
    }));
  };

  return (
    <div className="bg-gray-50 rounded-lg flex items-center justify-center px-2 py-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Select Location</h2>
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

          <div className="grid grid-cols-1 gap-2">
            {addressFormData.map((item, idx) => (
              <div key={idx}>
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
                      // onFocus={props.onFocus}
                      // onBlur={props.onBlur}
                      control={control}
                      label={
                        <div className="flex gap-2 pb-1 pl-3.5 text-black">
                          {item?.label}
                        </div>
                      }
                      rules={{
                        required: `${item?.rules}`,
                      }}
                      error={errors?.[item?.name]?.message}
                      placeholder={item?.placeholder}
                      trigger={trigger}
                      onFocus={() => {
                        if (item.name == "address_line1") setShowExample(true);
                      }}
                      onBlur={() => {
                        if (item.name == "address_line1") setShowExample(false);
                      }}
                    />
                    {item.name == "address_line1" && showExample && (
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
