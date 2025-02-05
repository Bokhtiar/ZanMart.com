import { getToken } from "@/utils/helpers";
import React, { createContext, useState } from "react";

// Create the User context
const UserContext = createContext();

// Create the User provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(getToken() ? true : false);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser,token,setToken }}>
      {children}
    </UserContext.Provider>
  );
};

// Export context and provider
export { UserContext, UserProvider };
