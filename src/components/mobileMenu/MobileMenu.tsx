import { RootState } from "@/redux/store";
import { useErrorToast } from "@/toasts/CustomeToasts";
import { HamburgerIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useSelector } from "react-redux";

function MobileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { data: session, status } = useSession();
  const carts = useSelector((state: RootState) => state.cart);

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
    <>
      <IconButton
        ref={btnRef}
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        variant="ghost"
        color="white"
        onClick={onOpen}
        display={{ base: "flex", sm: "none" }}
        mr={2}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Link href="/" onClick={onClose}>
                Home
              </Link>
              <Link href="/about" onClick={onClose}>
                About
              </Link>
              <Link href="/help" onClick={onClose}>
                Help
              </Link>
              <Link href="/cart" onClick={handleCartClick}>
                Cart ({carts?.length})
              </Link>
              {session?.user?.role === "admin" && (
                <Link href="/admin" onClick={onClose}>
                  Admin Dashboard
                </Link>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MobileMenu;
