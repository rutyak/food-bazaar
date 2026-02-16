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
  Badge,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { RootState } from "@/redux/store";
import { useErrorToast } from "@/toasts/CustomeToasts";
import { FiMenu, FiHome, FiInfo, FiHelpCircle, FiShoppingCart, FiShield } from "react-icons/fi";

const MobileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { data: session, status } = useSession();
  const carts = useSelector((state: RootState) => state.cart);
  const errorToast = useErrorToast();
  const router = useRouter();
  const pathname = usePathname();

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

  const NavLink = ({ href, icon: Icon, children, onClick, activeColor = "orange.400" }: any) => {
    const isActive = pathname === href;
    
    return (
      <Box as={Link} href={href} onClick={onClick} w="full" style={{ textDecoration: 'none' }}>
        <HStack 
          spacing={4} 
          w="full" 
          py={4} 
          px={4} 
          borderRadius="lg"
          bg={isActive ? "rgba(255, 204, 0, 0.1)" : "transparent"}
          color={isActive ? "#ffcc00" : "white"}
          transition="all 0.3s"
          _hover={{ bg: "rgba(255,255,255,0.05)" }}
        >
          <Icon size={22} />
          <Text fontSize="lg" fontWeight={isActive ? "700" : "500"}>
            {children}
          </Text>
        </HStack>
      </Box>
    );
  };

  return (
    <>
      <IconButton
        ref={btnRef}
        aria-label="Open menu"
        icon={<FiMenu size={26} />}
        onClick={onOpen}
        variant="unstyled"
        display={{ base: "flex", xl: "none" }}
        color="white" 
        _focus={{ boxShadow: "none" }}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay backdropFilter="blur(8px)" />
        <DrawerContent bg="#1A202C" color="white" maxW="300px"> 
          <DrawerCloseButton color="white" top="20px" size="lg" />
          
          <DrawerHeader pt={12} pb={6} px={6}>
            <Text fontSize="3xl" fontWeight="800">
              FoodBazaar<span style={{ color: "#ffcc00" }}>.</span>
            </Text>
          </DrawerHeader>

          <DrawerBody px={4}>
            <VStack align="start" spacing={1}>
              <NavLink href="/" icon={FiHome} onClick={() => { router.push("/"); onClose(); }}>
                Home
              </NavLink>
              
              <NavLink href="/about" icon={FiInfo} onClick={() => { router.push("/about"); onClose(); }}>
                About Us
              </NavLink>
              
              <NavLink href="/help" icon={FiHelpCircle} onClick={() => { router.push("/help"); onClose(); }}>
                Help Center
              </NavLink>

              <Box w="full" position="relative">
                <HStack 
                  as={Link} 
                  href="/cart" 
                  onClick={handleCartClick}
                  spacing={4} 
                  w="full" 
                  py={4} 
                  px={4} 
                  borderRadius="lg"
                  color={pathname === "/cart" ? "#ffcc00" : "white"}
                  _hover={{ bg: "rgba(255,255,255,0.05)" }}
                >
                  <FiShoppingCart size={22} />
                  <Text fontSize="lg" fontWeight="500">Cart</Text>
                  {carts?.length > 0 && (
                    <Badge 
                      ml="auto" 
                      colorScheme="yellow" 
                      borderRadius="full" 
                      px={2} 
                      fontSize="0.8em"
                    >
                      {carts.length}
                    </Badge>
                  )}
                </HStack>
              </Box>

              {session?.user?.role === "admin" && (
                <>
                  <Divider borderColor="rgba(255,255,255,0.1)" my={4} />
                  <NavLink href="/admin" icon={FiShield} onClick={onClose}>
                    <Text color="#ffcc00">Admin Panel</Text>
                  </NavLink>
                </>
              )}
            </VStack>

            <Box mt="auto" pt={10} pb={6} px={4}>
              <Text fontSize="xs" color="gray.500">
                © 2026 FoodBazaar Delivery
              </Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;