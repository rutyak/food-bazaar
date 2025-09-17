"use client";

import { useContext, useState } from "react";
import VariableContext from "./VariableContext";

export const useVariables = () => {
  return useContext(VariableContext);
};

export const VariableProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [location, setLocation] = useState(() => {
    if (typeof window !== "undefined") {
      let storedLocation = localStorage.getItem("location");
      return storedLocation
        ? JSON.parse(storedLocation)
        : {
            lat: 13.0081,
            lng: 77.5648,
          };
    }
  });

  return (
    <VariableContext.Provider value={{ location, setLocation, user, setUser }}>
      {children}
    </VariableContext.Provider>
  );
};
