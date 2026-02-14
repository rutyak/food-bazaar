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
    cart.reduce((acc: number, item: CartType) => acc + item.price * item.quantity, 0);

  const calculateTotal = () => (calculateSubtotal() + deliveryCharge).toFixed(2);

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
      <NavbarContainer isScrolled={true} setSearch={() => {}} search="" isMenu={true} />

      <Box pt={{ base: "90px", md: "120px" }}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }} pb={{ base: 8, xl: 10 }}>
          <Flex
            direction={{ base: "column", sm: "row" }}
            align={{ base: "start", sm: "center" }}
            justify="space-between"
            mb={{ base: 6, md: 10 }}
            gap={4}
          >
            <HStack spacing={4}>
              <Flex
                w={{ base: 10, md: 12 }}
                h={{ base: 10, md: 12 }}
                bg="orange.50"
                borderRadius="full"
                align="center"
                justify="center"
              >
                <Icon as={FiShoppingBag} color="orange.500" boxSize={{ base: 5, md: 6 }} />
              </Flex>
              <VStack align="start" spacing={0}>
                <Heading size={{ base: "md", md: "lg" }} fontWeight="extrabold" color="gray.800">
                  Your Checkout
                </Heading>
                <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
                  Review items and delivery details
                </Text>
              </VStack>
            </HStack>
            <Badge
              bgGradient={primaryGradient}
              color="white"
              fontSize={{ base: "xs", md: "sm" }}
              borderRadius="full"
              px={4}
              py={1.5}
            >
              {cart.length} {cart.length === 1 ? "Item" : "Items"}
            </Badge>
          </Flex>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 6, md: 10 }} alignItems="start">
            {/* Left Column: Items and Form */}
            <Stack spacing={{ base: 6, md: 8 }} gridColumn={{ lg: "span 2" }}>
              {/* Order Items Box */}
              <Box
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                boxShadow="sm"
                overflow="hidden"
              >
                <Box p={{ base: 4, md: 6 }} bg={cardBg} borderBottom="1px solid" borderColor={borderColor}>
                  <Heading size="md" color="gray.700">Order Items</Heading>
                </Box>
                <VStack align="stretch" spacing={0} p={{ base: 2, md: 4 }}>
                  {cart.length > 0 ? (
                    cart.map((item: CartType, index: number) => (
                      <React.Fragment key={item.itemId + index}>
                        <Box py={4}>
                          <CartItem item={item} />
                        </Box>
                        {index < cart.length - 1 && <Divider borderColor="gray.100" />}
                      </React.Fragment>
                    ))
                  ) : (
                    <Box py={10} textAlign="center">
                      <Text color="gray.400">Your cart is empty</Text>
                    </Box>
                  )}
                </VStack>
              </Box>

              {/* Delivery Details Box */}
              <Box
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                boxShadow="sm"
                overflow="hidden"
              >
                <Box p={{ base: 4, md: 6 }} bg={cardBg} borderBottom="1px solid" borderColor={borderColor}>
                  <Heading size="md" color="gray.700" display="flex" alignItems="center">
                    <Icon as={FiTruck} mr={3} color="orange.500" /> Delivery Details
                  </Heading>
                </Box>
                <Box p={{ base: 4, md: 8 }}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
                    {["name", "email", "address", "city", "zipCode", "country"].map((field) => (
                      <Box key={field}>
                        <Text fontSize="xs" fontWeight="bold" color="gray.400" mb={2} textTransform="uppercase">
                          {field}
                        </Text>
                        <Input
                          name={field}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          focusBorderColor="orange.400"
                          bg="gray.50"
                          onChange={handleInputChange}
                          h={{ base: "45px", md: "50px" }}
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </Box>
            </Stack>

            <Box position={{ lg: "sticky" }} top={{ lg: "120px" }}>
              <Box
                bg="white"
                p={{ base: 6, md: 8 }}
                borderRadius="2xl"
                border="2px solid"
                borderColor="orange.100"
                boxShadow="xl"
              >
                <Heading size="md" mb={6} color="gray.800" textAlign="center">
                  Order Summary
                </Heading>

                <VStack spacing={4} mb={6}>
                  <Flex justify="space-between" w="full">
                    <Text color="gray.500">Subtotal</Text>
                    <Text fontWeight="bold">₹{calculateSubtotal().toFixed(2)}</Text>
                  </Flex>
                  <Flex justify="space-between" w="full">
                    <Text color="gray.500">Delivery</Text>
                    <Text fontWeight="bold">₹{deliveryCharge.toFixed(2)}</Text>
                  </Flex>
                  <Flex justify="space-between" w="full" bg="yellow.50" p={3} borderRadius="lg" color="yellow.700">
                    <HStack spacing={2}><Icon as={FiClock} /><Text fontSize="xs" fontWeight="bold">Time</Text></HStack>
                    <Text fontWeight="bold" fontSize="xs">{estimatedTime} mins</Text>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" w="full">
                    <Text fontSize="lg" fontWeight="bold">Total</Text>
                    <Text fontSize="xl" fontWeight="extrabold" color="orange.500">₹{calculateTotal()}</Text>
                  </Flex>
                </VStack>

                <Box mb={8}>
                  <Text fontWeight="bold" mb={3} fontSize="xs" color="gray.400" textTransform="uppercase">
                    Payment
                  </Text>
                  <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                    <Stack direction={{ base: "column", sm: "row", lg: "column", xl: "row" }} spacing={4}>
                      <Radio value="creditCard" colorScheme="orange">Card</Radio>
                      <Radio value="paypal" colorScheme="orange">PayPal</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>

                <Button
                  w="full"
                  size="lg"
                  h="55px"
                  bgGradient={primaryGradient}
                  color="white"
                  onClick={handleCheckout}
                  isDisabled={cart.length === 0}
                  _hover={{ opacity: 0.9 }}
                >
                  Confirm Order
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