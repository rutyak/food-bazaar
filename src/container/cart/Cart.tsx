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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cartItem/CartItem";
import "./Cart.scss";
import MenuNavbar from "../menu/menuNavbar/MenuNavbar";
import { RootState } from "@/redux/store";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import { CartType } from "@/types/cart";
import axios from "axios";
import { addOrder } from "@/redux/slices/orderSlice";
import { removeAllCart } from "@/redux/slices/cartSlice";
import PaymentModal from "@/components/customeModal/PaymentModal";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
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
    cart.reduce((acc: number, item: CartType) => acc + item.price * item.quantity, 0);

  const calculateTotal = () => (calculateSubtotal() + deliveryCharge).toFixed(2);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    const { name, email, address, city, zipCode, country } = billingDetails;
    if (!name || !email || !address || !city || !zipCode || !country) {
      errorToast("Billing Details Incomplete");
      return;
    }
    onOpen();
  };

  const handleConfirmPay = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("api/order", cart);
      await axios.delete("api/cart/delete");

      const orders = data?.allOrders?.items;
      dispatch(addOrder(orders));
      dispatch(removeAllCart());
      successToast("Payment successful");
      onClose();
    } catch (error: any) {
      errorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MenuNavbar />

      <Box
        p={6}
        m="auto"
        bg="gray.50"
        borderRadius="md"
        boxShadow="md"
        maxW="700px"
        className="cart-container"
      >
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Your Cart
        </Heading>

        <Stack spacing={4}>
          {cart.map((item: CartType, index: number) => (
            <CartItem key={item.itemId + index} item={item} />
          ))}
        </Stack>

        {/* Billing Details */}
        <Box mt={8} p={4} bg="white" borderRadius="md" boxShadow="sm">
          <Heading as="h3" size="md" mb={4}>
            Billing Details
          </Heading>
          <Stack spacing={4}>
            {["name", "email", "address", "city", "zipCode", "country"].map((field, idx) => (
              <Input
                key={idx}
                name={field}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                bg="gray.100"
                onChange={handleInputChange}
              />
            ))}
          </Stack>
        </Box>

        {/* Payment Method */}
        <Box mt={8} p={4} bg="white" borderRadius="md" boxShadow="sm">
          <Heading as="h3" size="md" mb={4}>
            Payment Method
          </Heading>
          <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
            <Stack spacing={3}>
              <Radio value="creditCard">Credit Card</Radio>
              <Radio value="paypal">PayPal</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        {/* Summary */}
        <Box mt={8} p={4} bg="white" borderRadius="md" boxShadow="sm">
          <Flex justify="space-between">
            <Text>Delivery Charge:</Text>
            <Text fontWeight="bold">₹{deliveryCharge.toFixed(2)}</Text>
          </Flex>
          <Flex justify="space-between" mt={2}>
            <Text>Estimated Time:</Text>
            <Text fontWeight="bold">{estimatedTime} mins</Text>
          </Flex>
        </Box>

        <Divider my={6} />

        <Flex justify="space-between" mb={2}>
          <Text fontSize="lg">Subtotal:</Text>
          <Text fontWeight="bold">₹{calculateSubtotal().toFixed(2)}</Text>
        </Flex>

        <Flex justify="space-between" mb={4}>
          <Text fontSize="xl">Total:</Text>
          <Text fontSize="xl" fontWeight="bold">
            ₹{calculateTotal()}
          </Text>
        </Flex>

        <Button colorScheme="teal" size="lg" width="100%" onClick={handleCheckout}>
          Pay
        </Button>

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
      </Box>
    </>
  );
};

export default Cart;
