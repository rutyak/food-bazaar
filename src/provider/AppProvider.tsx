"use client";

import { Provider } from "react-redux";
import store, { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalProvider } from "@/context/GlobalContext";
import { usePathname } from "next/navigation";
import MenuNavbar from "@/container/menu/menuNavbar/MenuNavbar";
import { AuthProviders } from "@/components/auth/session-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const showNavbar = pathName !== "/";

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor as any}>
        <ChakraProvider>
          <AuthProviders>
            <GlobalProvider>
              {showNavbar && <MenuNavbar />}
              {children}
            </GlobalProvider>
          </AuthProviders>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}
