"use client";

import { Provider } from "react-redux";
import store, { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalProvider } from "@/context/GlobalContext";
import { usePathname } from "next/navigation";
import { AuthProviders } from "@/components/auth/session-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor as any}>
        <ChakraProvider>
          <AuthProviders>
            <GlobalProvider>
              {children}
            </GlobalProvider>
          </AuthProviders>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}
