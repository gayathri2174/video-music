// AppContext.js
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState(null);

  return (
    <AppContext.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </AppContext.Provider>
  );
};
