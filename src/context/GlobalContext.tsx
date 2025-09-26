"use client";

import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";

interface GlobalContextType {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [city, setCity] = useState("");

  useEffect(() => {
    const savedCity = localStorage.getItem("city");
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  useEffect(() => {
    if (city) {
      localStorage.setItem("city", city);
    }
  }, [city]);

  return (
    <GlobalContext.Provider value={{ city, setCity }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within GlobalProvider");
  return context;
};

export default GlobalContext;
