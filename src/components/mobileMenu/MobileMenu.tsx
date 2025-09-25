import { RootState } from "@/redux/store";
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
import { useRef } from "react";
import { useSelector } from "react-redux";

function MobileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { data: session } = useSession();
  const carts = useSelector((state: RootState) => state.cart);

  return (
    <>
      {/* Hamburger button */}
      <IconButton
        ref={btnRef}
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        variant="ghost"
        color="gray.500"
        onClick={onOpen}
        display={{ base: "flex", md: "none" }} 
        mr={2}
      />

      {/* Drawer */}
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
              <Link href="/cart" onClick={onClose}>
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
