"use client";

import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Divider,
  useDisclosure,
  SimpleGrid,
  Icon,
  Container,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingBag, FiTruck, FiClock } from "react-icons/fi";
import CartItem from "./cartItem/CartItem";
import { RootState } from "@/redux/store";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import { CartType } from "@/types/cart";
import axios from "axios";
import { addOrder } from "@/redux/slices/orderSlice";
import { removeAllCart } from "@/redux/slices/cartSlice";
import PaymentModal from "@/components/customeModal/PaymentModal";
import { useSession } from "next-auth/react";
import NavbarContainer from "@/components/navbar/NavbarContainer";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  const deliveryCharge = 40;
  const estimatedTime = 30;

  const cardBg = "#f8f9fa";
  const borderColor = "#e2e8f0";
  const primaryGradient = "linear(to-r, #facc15, #f97316)";

  const calculateSubtotal = () =>
    cart.reduce(
      (acc: number, item: CartType) => acc + item.price * item.quantity,
      0,
    );

  const calculateTotal = () =>
    (calculateSubtotal() + deliveryCharge).toFixed(2);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    const { name, email, address, city, zipCode, country } = billingDetails;
    if (!name || !email || !address || !city || !zipCode || !country) {
      errorToast("Please complete all billing fields");
      return;
    }
    onOpen();
  };

  const handleConfirmPay = async () => {
    setLoading(true);
    try {
      if (!session?.user?.id) throw new Error("User not logged in.");
      const orders = cart.map((item) => ({ ...item, userId: session.user.id }));
      await axios.post("/api/order", orders);
      await axios.delete("/api/cart/delete");
      dispatch(addOrder(orders));
      dispatch(removeAllCart());
      successToast("Order placed successfully!");
      onClose();
    } catch (error: any) {
      errorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarContainer
        isScrolled={true}
        setSearch={() => {}}
        search=""
        isMenu={true}
      />

      <Box mt={{ base: "80px", md: "100px" }} mb="4">
        <Container maxW="container.xl">
          <Flex
            align="center"
            justifyContent="space-between"
            mb={7}
            px={{ base: 2, md: 4 }}
          >
            <HStack spacing={4}>
              <Flex
                w={12}
                h={12}
                bg="orange.50"
                borderRadius="full"
                align="center"
                justify="center"
              >
                <Icon as={FiShoppingBag} color="orange.500" boxSize={6} />
              </Flex>
              <VStack align="start" spacing={0}>
                <Heading size="lg" fontWeight="extrabold" color="gray.800">
                  Your Checkout
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  Review items and delivery details
                </Text>
              </VStack>
            </HStack>
            <Badge
              bgGradient={primaryGradient}
              color="white"
              fontSize="sm"
              borderRadius="full"
              px={5}
              py={1.5}
              boxShadow="md"
            >
              {cart.length} {cart.length === 1 ? "Item" : "Items"}
            </Badge>
          </Flex>

          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            spacing={{ base: 8, lg: 10 }}
          >
            <Stack
              spacing={8}
              gridColumn={{ lg: "span 2" }}
              overflowY="auto"
              height={{ base: "auto" }}
              pr={4}
              css={{
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-thumb": {
                  background: "#cbd5e0",
                  borderRadius: "10px",
                },
              }}
              pb={7}
            >
              <Box
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                boxShadow="xl"
                overflow="hidden"
              >
                <Box
                  p={6}
                  bg={cardBg}
                  borderBottom="1px solid"
                  borderColor={borderColor}
                >
                  <Heading size="md" color="gray.700">
                    Order Items
                  </Heading>
                </Box>
                <VStack align="stretch" spacing={0} p={2}>
                  {cart.length > 0 ? (
                    cart.map((item: CartType, index: number) => (
                      <React.Fragment key={item.itemId + index}>
                        <Box p={4}>
                          <CartItem item={item} />
                        </Box>
                        {index < cart.length - 1 && (
                          <Divider borderColor="gray.100" />
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <Box py={20} textAlign="center">
                      <Text color="gray.400" fontSize="lg">
                        Your cart is feeling light...
                      </Text>
                    </Box>
                  )}
                </VStack>
              </Box>

              <Box
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                boxShadow="xl"
                overflow="hidden"
              >
                <Box
                  p={6}
                  bg={cardBg}
                  borderBottom="1px solid"
                  borderColor={borderColor}
                >
                  <Heading
                    size="md"
                    color="gray.700"
                    display="flex"
                    alignItems="center"
                  >
                    <Icon as={FiTruck} mr={3} color="orange.500" /> Delivery
                    Details
                  </Heading>
                </Box>
                <Box p={8}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {[
                      "name",
                      "email",
                      "address",
                      "city",
                      "zipCode",
                      "country",
                    ].map((field) => (
                      <Box key={field}>
                        <Text
                          fontSize="xs"
                          fontWeight="bold"
                          color="gray.400"
                          mb={2}
                          textTransform="uppercase"
                          letterSpacing="wider"
                        >
                          {field}
                        </Text>
                        <Input
                          name={field}
                          placeholder={
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }
                          focusBorderColor="orange.400"
                          variant="filled"
                          bg="gray.50"
                          _hover={{ bg: "gray.100" }}
                          onChange={handleInputChange}
                          h="50px"
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </Box>
            </Stack>

            <Box position={{ lg: "sticky" }} top="120px" height="fit-content">
              <Box
                bg="white"
                p={7}
                borderRadius="2xl"
                border="2px solid"
                borderColor="orange.100"
                boxShadow="2xl"
              >
                <Heading size="md" mb={8} color="gray.800" textAlign="center">
                  Payment Summary
                </Heading>

                <VStack spacing={5} mb={6}>
                  <Flex justify="space-between" w="full">
                    <Text color="gray.500">Subtotal</Text>
                    <Text fontWeight="bold" color="gray.800">
                      ₹{calculateSubtotal().toFixed(2)}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" w="full">
                    <Text color="gray.500">Delivery Fee</Text>
                    <Text fontWeight="bold" color="gray.800">
                      ₹{deliveryCharge.toFixed(2)}
                    </Text>
                  </Flex>
                  <Flex
                    justify="space-between"
                    w="full"
                    bg="yellow.50"
                    p={3}
                    borderRadius="lg"
                    color="yellow.700"
                  >
                    <HStack spacing={2}>
                      <Icon as={FiClock} />
                      <Text fontSize="sm" fontWeight="bold">
                        Arrival Time
                      </Text>
                    </HStack>
                    <Text fontWeight="bold" fontSize="sm">
                      {estimatedTime} mins
                    </Text>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" w="full" align="center">
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">
                      Total
                    </Text>
                    <Text
                      fontSize="2xl"
                      fontWeight="extrabold"
                      color="orange.500"
                    >
                      ₹{calculateTotal()}
                    </Text>
                  </Flex>
                </VStack>

                <Box mb={10}>
                  <Text
                    fontWeight="bold"
                    mb={4}
                    fontSize="xs"
                    color="gray.400"
                    textTransform="uppercase"
                  >
                    Payment Method
                  </Text>
                  <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                    <Stack direction="row" spacing={6}>
                      <Radio value="creditCard" colorScheme="orange">
                        Card
                      </Radio>
                      <Radio value="paypal" colorScheme="orange">
                        PayPal
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>

                <Button
                  w="full"
                  size="lg"
                  h="60px"
                  bgGradient={primaryGradient}
                  color="white"
                  fontWeight="bold"
                  boxShadow="lg"
                  onClick={handleCheckout}
                  isDisabled={cart.length === 0}
                  _hover={{ opacity: 0.9, transform: "translateY(-2px)" }}
                  _active={{ transform: "translateY(0)" }}
                >
                  Pay ₹{calculateTotal()}
                </Button>
              </Box>
            </Box>
          </SimpleGrid>

          <PaymentModal
            isOpen={isOpen}
            onClose={onClose}
            loading={loading}
            handleConfirmPay={handleConfirmPay}
            billingDetails={billingDetails}
            paymentMethod={paymentMethod}
            deliveryCharge={deliveryCharge}
            estimatedTime={estimatedTime}
            calculateSubtotal={calculateSubtotal}
            calculateTotal={calculateTotal}
          />
        </Container>
      </Box>
    </>
  );
};

export default Cart;
