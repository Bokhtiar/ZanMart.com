import { MyContext } from "@/contex/ProductsContex";
import { useContext } from "react";

const useProduct = () => {
    const context = useContext(MyContext);
    return context;
};
export { MyContext, useProduct };
