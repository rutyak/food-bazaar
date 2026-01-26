"use client";

import React from "react";
import Link from "next/link";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useErrorToast } from "@/toasts/CustomeToasts";
import Login from "@/container/auth/Login";
import MyDrawer from "../profile/Profie";
import "./Navbar.scss";

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
        display={{ base: "none", md: "flex" }} 
        className="nav-links"
      >
        <Link href="/" className="nav-item">Home</Link>
        <Link href="/about" className="nav-item">About</Link>
        <Link href="/help" className="nav-item">Help</Link>
        
        <Link href="/cart" onClick={handleCartClick} className="nav-item cart-link">
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
        {status === "authenticated" ? (
          <MyDrawer />
        ) : (
          <Login />
        )}
      </Box>
    </HStack>
  );
};

export default Navbar;