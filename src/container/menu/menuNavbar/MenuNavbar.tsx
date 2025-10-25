"use client";

import { Box, Button, Heading } from "@chakra-ui/react";
import "./MenuNavbar.scss";
import Login from "@/container/auth/Login";
import Drawer from "@/components/profile/Profie";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useErrorToast } from "@/toasts/CustomeToasts";
import MobileMenu from "@/components/mobileMenu/MobileMenu";

const MenuNavbar = () => {
  const carts = useSelector((state: RootState) => state.cart);
  const cartsSize: number = carts?.length;

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
    <Box className="menu-header">
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
        <Box
          display="flex"
          gap={{ base: "10px", md: "25px" }}
          alignItems="center"
          justifyContent="end"
        >
          <Box display={{ base: "none", md: "flex" }}>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => router.push("/")}
            >
              Home
            </Button>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={handleCartRedirect}
            >
              Cart ({cartsSize})
            </Button>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => router.push("/about")}
            >
              About
            </Button>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => router.push("/help")}
            >
              Help
            </Button>
          </Box>
          {session?.user ? <Drawer /> : <Login />}
          <MobileMenu />
        </Box>
      </div>
    </Box>
  );
};

export default MenuNavbar;
