import React, { useState } from "react";

export const SearchContext = React.createContext<{
  production: string;
  type: string;
  year: string;
  setSearch: (production: string, type: string, year: string) => void;
  resetForm: () => void;
}>({
  production: "",
  type: "any",
  year: undefined,
  setSearch: () => {},
  resetForm: () => {},
});

const SearchContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [production, setProduction] = useState<string>("");
  const [type, setType] = useState<string | undefined>("any");
  const [year, setYear] = useState<string | undefined>("");

  const setSearchHandler = (production: string, type: string, year: string) => {
    resetFormHandler();
    setProduction(production);
    setType(type);
    setYear(year);
  };

  const resetFormHandler = () => {
    setProduction("");
    setType("any");
    setYear("");
  };

  return (
    <SearchContext.Provider
      value={{
        production: production,
        type: type,
        year: year,
        setSearch: setSearchHandler,
        resetForm: resetFormHandler,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
export default SearchContextProvider;
