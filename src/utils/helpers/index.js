import { Toastify } from "@/components/toastify";
import Cookies from 'js-cookie';
/* Set token */
export const setToken = async (token) => {
    Cookies.set('token', token, { expires: 7, path: '/' }); // Set token with expiration (7 days) and path
    return true;
};

/* Get token */
export const getToken = () => {
    if (typeof window !== 'undefined') {
        return Cookies.get('token'); // Retrieve token from cookie
    }
};

/* Remove token */
export const removeToken = () => {
    Cookies.remove('token');
    return true;
};


/* Phone number valid check */
export const isValidPhone = () => {
    const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/i;
    return regex;
};

/* E-mail valid check */
export const isValidEmail = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex;
};



/* Global network error handeller */
export const networkErrorHandeller = (error) => {
   
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
