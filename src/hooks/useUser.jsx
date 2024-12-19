import { UserContext } from "@/contex/UserContex";
import { useContext } from "react";


// Create a custom hook to use the UserContext
const useUser = () => {
  const context = useContext(UserContext);
 
  return context;
};

export { useUser };
