"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  useDisclosure,
  Text,
  Box,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useErrorToast } from "@/toasts/CustomeToasts";
import { FiMenu, FiHome, FiInfo, FiHelpCircle, FiShoppingCart, FiShield } from "react-icons/fi";
import "./MobileMenu.scss";

const MobileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { data: session, status } = useSession();
  const carts = useSelector((state: RootState) => state.cart);
  const errorToast = useErrorToast();
  const router = useRouter();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (status === "unauthenticated") {
      errorToast("Please login to access your cart");
      router.push("/");
    } else {
      router.push("/cart");
    }
  };

  const NavLink = ({ href, icon: Icon, children, onClick }: any) => (
    <Link href={href} onClick={onClick} className="mobile-nav-link">
      <HStack spacing={4} w="full" py={3}>
        <Box className="icon-wrapper">
          <Icon size={20} />
        </Box>
        <Text fontSize="lg" fontWeight="600">{children}</Text>
      </HStack>
    </Link>
  );

  return (
    <>
      <IconButton
        ref={btnRef}
        aria-label="Open menu"
        icon={<FiMenu size={24} />}
        onClick={onOpen}
        variant="unstyled"
        display={{ base: "flex", lg: "none" }}
        className="mobile-hamburger-btn"
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay backdropFilter="blur(8px)" />
        <DrawerContent className="mobile-drawer-content">
          <DrawerCloseButton color="white" top="20px" />
          
          <DrawerHeader borderBottomWidth="0" pt={10}>
            <Text fontSize="2xl" fontWeight="800" color="white">
              Navigation<span style={{ color: "#ffcc00" }}>.</span>
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <VStack align="start" spacing={2} mt={4}>
              <NavLink href="/" icon={FiHome} onClick={onClose}>Home</NavLink>
              <NavLink href="/about" icon={FiInfo} onClick={onClose}>About Us</NavLink>
              <NavLink href="/help" icon={FiHelpCircle} onClick={onClose}>Help Center</NavLink>
              
              <Box w="full" position="relative">
                <NavLink href="/cart" icon={FiShoppingCart} onClick={handleCartClick}>
                  Cart
                </NavLink>
                {carts?.length > 0 && (
                  <Box className="mobile-cart-badge">
                    {carts.length}
                  </Box>
                )}
              </Box>

              {session?.user?.role === "admin" && (
                <>
                  <Divider borderColor="rgba(255,255,255,0.1)" my={4} />
                  <NavLink href="/admin" icon={FiShield} onClick={onClose}>
                    <Text color="#ffcc00">Admin Dashboard</Text>
                  </NavLink>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;