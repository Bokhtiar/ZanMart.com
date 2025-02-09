import { Toastify } from "@/components/toastify";

export const networkErrorHandeller = (error) => {
    // console.log("error", error);
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errors
    ) {
        error.response.data.errors.map((item,index) => {
            return <span key={index} className="">{Toastify.Error( error?.response?.data?.errors[0])}</span>
        });
    } else {
        return Toastify.Error("Something going wrong, Try again.");
    }
};

