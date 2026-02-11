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
import { FiShoppingBag, FiCreditCard, FiTruck, FiClock } from "react-icons/fi";
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

  const calculateSubtotal = () =>
    cart.reduce(
      (acc: number, item: CartType) => acc + item.price * item.quantity,
      0
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
      <NavbarContainer isScrolled={true} setSearch={() => {}} search="" />
      
      {/* Main Wrapper with Navbar offset */}
      <Box bg="gray.50" minH="100vh" pt={{ base: "80px", md: "100px" }} pb={10}>
        <Container maxW="container.xl">
          
          {/* Header Section */}
          <Flex 
            align="center" 
            justifyContent="space-between" 
            mb={8} 
            px={{ base: 2, md: 4 }}
          >
            <HStack spacing={3}>
              <Icon
                as={FiShoppingBag}
                w={{ base: 6, md: 8 }}
                h={{ base: 6, md: 8 }}
                color="teal.500"
              />
              <Heading size={{ base: "md", md: "lg" }} fontWeight="800">
                Your Orders
              </Heading>
            </HStack>
            <Badge
              colorScheme="teal"
              fontSize={{ base: "xs", md: "sm" }}
              borderRadius="full"
              px={4}
              py={1}
            >
              {cart.length} {cart.length === 1 ? "Item" : "Items"}
            </Badge>
          </Flex>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 6, lg: 10 }}>
            
            {/* Left Section: Items & Billing */}
            <Stack spacing={6} gridColumn={{ lg: "span 2" }}>
              
              {/* Cart Items List */}
              <Box
                bg="white"
                p={{ base: 4, md: 6 }}
                borderRadius="2xl"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.100"
              >
                <VStack align="stretch" spacing={5}>
                  {cart.length > 0 ? (
                    cart.map((item: CartType, index: number) => (
                      <React.Fragment key={item.itemId + index}>
                        <CartItem item={item} />
                        {index < cart.length - 1 && <Divider borderColor="gray.50" />}
                      </React.Fragment>
                    ))
                  ) : (
                    <Box py={10} textAlign="center">
                      <Text color="gray.500">Your cart is empty.</Text>
                    </Box>
                  )}
                </VStack>
              </Box>

              {/* Delivery Details Form */}
              <Box
                bg="white"
                p={{ base: 5, md: 8 }}
                borderRadius="2xl"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.100"
              >
                <Heading size="md" mb={6} display="flex" alignItems="center">
                  <Icon as={FiTruck} mr={3} color="teal.500" /> 
                  Delivery Details
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
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
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        focusBorderColor="teal.400"
                        variant="filled"
                        bg="gray.50"
                        _hover={{ bg: "gray.100" }}
                        onChange={handleInputChange}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </Stack>

            {/* Right Section: Sticky Summary */}
            <Box position={{ lg: "sticky" }} top="100px" height="fit-content">
              <VStack spacing={6} align="stretch">
                <Box
                  bg="white"
                  p={6}
                  borderRadius="2xl"
                  boxShadow="xl"
                  border="1px solid"
                  borderColor="teal.50"
                >
                  <Heading size="md" mb={6}>
                    Order Summary
                  </Heading>

                  <Stack spacing={4} mb={8}>
                    <Flex justify="space-between" color="gray.600">
                      <Text>Subtotal</Text>
                      <Text fontWeight="bold" color="gray.800">
                        ₹{calculateSubtotal().toFixed(2)}
                      </Text>
                    </Flex>
                    <Flex justify="space-between" color="gray.600">
                      <HStack spacing={1}>
                        <Icon as={FiTruck} boxSize={3} />
                        <Text>Delivery Fee</Text>
                      </HStack>
                      <Text fontWeight="bold" color="gray.800">
                        ₹{deliveryCharge.toFixed(2)}
                      </Text>
                    </Flex>
                    
                    <Flex
                      justify="space-between"
                      align="center"
                      color="teal.700"
                      bg="teal.50"
                      px={4}
                      py={3}
                      borderRadius="lg"
                    >
                      <HStack spacing={2}>
                        <Icon as={FiClock} />
                        <Text fontSize="sm" fontWeight="medium">Estimated Arrival</Text>
                      </HStack>
                      <Text fontWeight="bold" fontSize="sm">{estimatedTime} mins</Text>
                    </Flex>

                    <Divider py={2} />

                    <Flex justify="space-between" align="center">
                      <Text fontSize="lg" fontWeight="600">Total Amount</Text>
                      <Text fontSize="2xl" fontWeight="800" color="teal.600">
                        ₹{calculateTotal()}
                      </Text>
                    </Flex>
                  </Stack>

                  <Box mb={8}>
                    <Text fontWeight="bold" mb={4} fontSize="sm" color="gray.500" textTransform="uppercase">
                      Payment Method
                    </Text>
                    <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                      <Stack direction="row" spacing={6}>
                        <Radio value="creditCard" colorScheme="teal" size="lg">
                          <Text fontSize="sm" fontWeight="medium">Card</Text>
                        </Radio>
                        <Radio value="paypal" colorScheme="teal" size="lg">
                          <Text fontSize="sm" fontWeight="medium">PayPal</Text>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>

                  <Button
                    leftIcon={<Icon as={FiCreditCard} />}
                    colorScheme="teal"
                    size="lg"
                    width="100%"
                    height="60px"
                    fontSize="md"
                    onClick={handleCheckout}
                    isDisabled={cart.length === 0}
                    boxShadow="0 4px 14px 0 rgba(49, 151, 149, 0.39)"
                    _hover={{ 
                      transform: "translateY(-2px)", 
                      boxShadow: "0 6px 20px rgba(49, 151, 149, 0.45)" 
                    }}
                    _active={{ transform: "translateY(0)" }}
                    transition="all 0.2s"
                  >
                    Confirm & Pay
                  </Button>
                </Box>
              </VStack>
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