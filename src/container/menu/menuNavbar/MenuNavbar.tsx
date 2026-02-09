"use client";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import "./MenuNavbar.scss";
import Login from "@/container/auth/Login";
import Drawer from "@/components/profile/Profie";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useErrorToast } from "@/toasts/CustomeToasts";
import MobileMenu from "@/components/mobileMenu/MobileMenu";
import Navbar from "@/components/navbar/NavbarContainer";

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
          justifyContent="center"
          alignItems="center"
          py={3}
          onClick={() => router.push("/")}
        >
          <Heading
            as="h1"
            className="hero-title"
            fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
          >
            Food <span className="highlight">Bazaar</span>
          </Heading>
        </Box>
        <Flex align="center" gap={4}>
          <Navbar />
          <MobileMenu />
        </Flex>
      </div>
    </Box>
  );
};

export default MenuNavbar;
