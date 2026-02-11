"use client";

import { Box, Flex, Heading } from "@chakra-ui/react";
import "./MenuNavbar.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useErrorToast } from "@/toasts/CustomeToasts";
import MobileMenu from "@/components/mobileMenu/MobileMenu";
import Navbar from "@/components/navbar/NavbarContainer";

const MenuNavbar = () => {
  const carts = useSelector((state: RootState) => state.cart);
  const cartsSize: number = carts?.length || 0;

  // Destructure status and data from a single useSession call
  const { data: session, status } = useSession();
  const router = useRouter();
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
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={3}
          onClick={() => router.push("/")}
          cursor="pointer"
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
          {/* Fixed the missing closing tag here */}
          <Navbar setSearch={() => {}} search="" />
          <MobileMenu />
        </Flex>
      </div>
    </Box>
  );
};

export default MenuNavbar;