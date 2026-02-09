"use client";

import React from "react";
import { Text, Box, Flex, Container, VStack, HStack } from "@chakra-ui/react";
import Image from "next/image";
import foodIcon from "../../../public/appIcon.png";
import Search from "@/container/search/Search";
import MobileMenu from "@/components/mobileMenu/MobileMenu";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useErrorToast } from "@/toasts/CustomeToasts";
import Login from "@/container/auth/Login";
import MyDrawer from "../profile/Profie";
import "./NavbarContainer.scss";

interface NavbarProps {
  isScrolled?: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  isMenu?: boolean;
}

const Navbar = () => {
  const carts = useSelector((state: RootState) => state.cart);
  const { data: session, status } = useSession();
  const errorToast = useErrorToast();
  const router = useRouter();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (status === "unauthenticated") {
      errorToast("Please login to access your cart");
      router.push("/");
    } else {
      router.push("/cart");
    }
  };

  return (
    <HStack as="nav" spacing={8} className="navbar-container">
      <HStack
        spacing={8}
        display={{ base: "none", lg: "flex" }}
        className="nav-links"
      >
        <Link href="/" className="nav-item">
          Home
        </Link>
        <Link href="/about" className="nav-item">
          About
        </Link>
        <Link href="/help" className="nav-item">
          Help
        </Link>

        <Link
          href="/cart"
          onClick={handleCartClick}
          className="nav-item cart-link"
        >
          Cart
          {carts?.length > 0 && (
            <span className="cart-count">{carts.length}</span>
          )}
        </Link>

        {session?.user?.role === "admin" && (
          <Link href="/admin" className="nav-item admin-link">
            Dashboard
          </Link>
        )}
      </HStack>

      <Box className="auth-section">
        {status === "authenticated" ? <MyDrawer /> : <Login />}
      </Box>
    </HStack>
  );
};

const NavbarContainer = ({
  isScrolled,
  setSearch,
  search,
  isMenu,
}: NavbarProps) => {
  const router = useRouter();

  return (
    <>
      <Box
        position={isScrolled || isMenu ? "fixed" : "relative"}
        top={0}
        left={0}
        right={0}
        zIndex={10}
        transition="all 0.3s ease"
        bg={
          isScrolled
            ? "rgba(0, 0, 0, 0.85)"
            : isMenu
              ? "rgba(0, 0, 0, 0.85)"
              : "transparent"
        }
        backdropFilter={isScrolled ? "blur(1px)" : "none"}
        borderBottom={isScrolled ? "1px solid rgba(255,255,255,0.1)" : "none"}
      >
        <Container maxW="container.xl" px={{ base: 5, sm: 6, lg: 12 }}>
          <Flex
            align="center"
            justify="space-between"
            py={isScrolled ? { base: 3, md: 4 } : { base: 3, md: 6 }}
          >
            <Flex
              align="center"
              gap={3}
              onClick={() => isMenu && router.push("/")}
              cursor="pointer"
            >
              <Box
                width={{ base: "32px", md: "38px",lg: "40px" }}
                position="relative"
                className="icon-box"
              >
                <Image
                  src={foodIcon}
                  alt="Logo"
                  priority
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
              <VStack
                align="flex-start"
                spacing={0}
                display={{ base: "none", sm: "flex" }}
              >
                <Text className="slogan-badge" fontSize="xs">
                  PREMIUM DELIVERY
                </Text>
                <Text className="slogan-text" fontSize="sm">
                  Good food, Good Moments
                </Text>
              </VStack>
            </Flex>

            {/* Search visible on scroll */}
            {isScrolled && (
              <Box
                flex={1}
                maxW="500px"
                mx={4}
                display={{ base: "none", lg: "block" }}
              >
                <Search setSearch={setSearch} search={search} />
              </Box>
            )}

            <Flex align="center" gap={{ base: 2, md: 5 }}>
              <Navbar />
              <MobileMenu />
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default NavbarContainer;
