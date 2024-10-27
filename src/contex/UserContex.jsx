import React, { createContext, useState } from "react";

// Create the User context
const UserContext = createContext();

// Create the User provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Export context and provider
export { UserContext, UserProvider };
