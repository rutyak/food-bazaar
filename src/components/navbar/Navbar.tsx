import React from "react";
import "./Navbar.scss";
import Link from "next/link";
import Login from "@/container/auth/Login";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import MyDrawer from "../profile/Profie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useErrorToast } from "@/toasts/CustomeToasts";

const Navbar = () => {
  const carts = useSelector((state: RootState) => state.cart);

  const { data: session, status } = useSession();

  const errorToast = useErrorToast();

  const router = useRouter();

  function handleCartClick(e: React.MouseEvent) {
    e.preventDefault();
    if (status === "unauthenticated") {
      errorToast("Please login to access your cart");
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
          <li>Cart ({carts?.length})</li>
        </Link>
        {session?.user?.role === "admin" && (
          <Link href="/admin">
            <li>Admin Dashboard</li>
          </Link>
        )}
      </Box>

      {status === "authenticated" ? (
        <MyDrawer />
      ) : (
        <li>
          <Login />
        </li>
      )}
    </ul>
  );
};

export default Navbar;
