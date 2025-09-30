import {
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Text,
  useDisclosure,
  WrapItem,
  VStack,
  Divider,
  HStack,
  Icon,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useRef } from "react";
import { signOut } from "next-auth/react";
import { FiLogOut, FiUser, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface OrderCardTypes {
  name: string;
  price: number;
  image: string;
}

function OrderCard({ name, price, image }: OrderCardTypes) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={3}
      boxShadow="md"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
      transition="all 0.2s"
    >
      <Flex alignItems="center" gap="10px">
        <Image
          src={image}
          alt={name}
          borderRadius="md"
          w="70px"
          h="70px"
          objectFit="cover"
        />
        <Text fontWeight="semibold" fontSize="14px" mb={1}>
          {name}
        </Text>
      </Flex>
      <Text color="gray.600">₹{price}</Text>
    </Flex>
  );
}

const Profie = () => {
  const orders = useSelector((state: RootState) => state.order);

  console.log("orders: ", orders);

  const { data: session } = useSession();
  const user = session?.user;

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false,
        callbackUrl: "/",
      });

      successToast("Logged out successfully");

      onClose();
      router.push("/");
    } catch (error) {
      errorToast("Logout failed");
    }
  };

  return (
    <>
      <WrapItem>
        <Avatar
          fontSize="8px"
          boxSize={{ base: "9", md: "10" }}
          ref={btnRef}
          onClick={onOpen}
          name={user?.name || ""}
          src={user?.image || ""}
          cursor="pointer"
          _hover={{ transform: "scale(1.1)", transition: "transform 0.2s" }}
        />
      </WrapItem>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay backdropFilter="blur(5px)" />
        <DrawerContent bg="gray.50" overflow="hidden">
          <DrawerCloseButton size="lg" color="white" zIndex={2} />

          <DrawerHeader
            bg="teal.600"
            color="white"
            pt={16}
            pb={8}
            position="relative"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              height="100%"
              bgGradient="linear(to-b, teal.500, teal.700)"
              zIndex={1}
            />

            <Center position="relative" zIndex={2}>
              <Avatar
                size="xl"
                name={user?.name || ""}
                src={user?.image || ""}
                border="4px solid white"
                boxShadow="md"
              />
            </Center>

            <VStack spacing={1} mt={4} position="relative" zIndex={2}>
              <Heading fontSize="2xl" textAlign="center">
                {user?.name || "User"}
              </Heading>
              <Text fontSize="sm" color="teal.100">
                {user?.email}
              </Text>
            </VStack>
          </DrawerHeader>

          <DrawerBody p={6}>
            <VStack spacing={4} align="stretch">
              <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
                <HStack spacing={3}>
                  <Icon as={FiUser} color="teal.500" boxSize={5} />
                  <Text fontWeight="medium">Profile Information</Text>
                </HStack>
                <Divider my={3} />
                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <Text color="gray.500">Full Name</Text>
                    <Text fontWeight="medium">{user?.name || "-"}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="gray.500">Email</Text>
                    <Text fontWeight="medium">{user?.email || "-"}</Text>
                  </HStack>
                </VStack>
              </Box>

              <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
                <HStack spacing={3}>
                  <Icon as={FiShoppingCart} color="teal.500" boxSize={5} />
                  <Text fontWeight="medium">My Orders</Text>
                </HStack>
                <Divider my={3} />
                <Text color="gray.500">
                  {orders.length > 0
                    ? orders.map((item) => (
                        <Box key={item.itemId} mb={4}>
                          <OrderCard
                            name={item.name}
                            price={item.price}
                            image={item.image}
                          />
                        </Box>
                      ))
                    : "No orders found"}{" "}
                </Text>
              </Box>
            </VStack>
          </DrawerBody>

          <DrawerFooter
            borderTopWidth="1px"
            borderTopColor="gray.200"
            bg="white"
          >
            <Button
              leftIcon={<FiLogOut />}
              colorScheme="red"
              variant="outline"
              onClick={handleLogout}
              w="full"
              size="lg"
            >
              Sign Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Profie;
