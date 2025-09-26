"use client";

import { Box, Button, Heading } from "@chakra-ui/react";
import "./MenuNavbar.scss";
import Login from "@/container/auth/Login";
import { useContext } from "react";
import Drawer from "@/components/drawer/Drawer";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useErrorToast } from "@/toasts/CustomeToasts";

const MenuNavbar = ({ cart, cartLen }: any) => {
  // const { user } = useContext(VariableContext);
  const carts = useSelector((state: RootState) => state.cart);

  const { data: session } = useSession();
  const router = useRouter();
  const { status } = useSession();
  const errorToast = useErrorToast();

  function handleCartRedirect() {
    if (status === "unauthenticated") {
      errorToast("Please login to access cart");
    } else {
      router.push("/cart");
    }
  }

  return (
    <Box className="menu-header" mb={{ base: "0px", md: "30px" }}>
      <div className="menu-inner-header">
        <Box
          className="menu-title"
          display={{ base: "none", md: "flex" }}
          justifyContent="center"
          alignItems="center"
          py={3}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            letterSpacing="widest"
            color="teal.500"
            textAlign="center"
            onClick={() => router.push("/")}
            sx={{ cursor: "pointer" }}
          >
            Food
            <Box as="span" color="green.500">
              Bazaar
            </Box>
          </Heading>
        </Box>
        <Box display="flex" gap="25px" alignItems="center" justifyContent="end">
          {!cart && (
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={handleCartRedirect}
            >
              Cart ({carts?.length})
            </Button>
          )}
          <Button
            colorScheme="teal"
            variant="ghost"
            onClick={() => router.push("/help")}
          >
            Help
          </Button>
          {session?.user ? <Drawer /> : <Login />}
        </Box>
      </div>
    </Box>
  );
};

export default MenuNavbar;
