import { createContext } from "react";

interface VariableContextType {
  location: {
    lat: number;
    lng: number;
  };
  setLocation: (location: { lat: number; lng: number }) => void;
  user: any;
  setUser: (user: any | null) => void;
}

const VariableContext = createContext<VariableContextType>({
  location: {
    lat: 13.0081,
    lng: 77.5648,
  },
  setLocation: () => {},
  user: null,
  setUser: () => {}
});

export default VariableContext;
