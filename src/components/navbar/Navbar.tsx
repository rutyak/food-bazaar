import React from "react";
import "./Navbar.scss";
import Link from "next/link";
import Login from "@/container/auth/Login";
import { Box, Toast, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import MyDrawer from "../drawer/Drawer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const cartAll = useSelector((state: any) => state.cart.cartItems);
  const { data: session, status } = useSession();
  const toast = useToast();
  const router = useRouter();

  function handleCartClick(e: React.MouseEvent) {
    e.preventDefault();
    if (status === "unauthenticated") {
      toast({
        title: "Login Required",
        description: "Please login to access your cart",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      router.push("/");
    } else {
      router.push("/cart");
    }
  }
  return (
    <ul className="navbar">
      <Box
        sx={{
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        display={{ base: "none", md: "flex" }}
      >
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/about">
          <li>About</li>
        </Link>
        <Link href="/help">
          <li>Help</li>
        </Link>
        <Link href="/cart" onClick={handleCartClick}>
          <li>Cart ({cartAll.length})</li>
        </Link>
        <Link href="/adminDashboard">
          <li>Admin Dashboard</li>
        </Link>
      </Box>

      {status === "authenticated" ? (
        <MyDrawer user={session.user} />
      ) : (
        <li>
          <Login />
        </li>
      )}
    </ul>
  );
};

export default Navbar;
