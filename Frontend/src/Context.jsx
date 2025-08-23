import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const contextValue = { count, setCount };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
