import { Image, Flex, Box, Text, Heading, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import "./CartItem.scss";
import {
  decreaseQuantity,
  increaseQuantity,
  removeCart,
} from "@/redux/slices/cartSlice";
import axios from "axios";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import { CartType } from "@/types/cart";

const CartItem = ({ item }: { item: CartType }) => {

  const dispatch = useDispatch();

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const handlerRemoveCart = async () => {
    try {
      dispatch(removeCart(item.itemId));

      await axios.delete(`/api/cart/${item.itemId}`);

      successToast("Item removed successfully");
    } catch (error: any) {
      console.error(error.message);
      errorToast("Failed to remove item");
    }
  };

  async function handleQuantityDec() {
    try {
      dispatch(decreaseQuantity(item.itemId));

      const res = await axios.post(`/api/cart/decrease/${item.itemId}`);

      successToast(res?.data?.message);
    } catch (error: any) {
      console.error(error.message);
      errorToast(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong"
      );
    }
  }

  async function handleQuantityInc() {
    try {
      dispatch(increaseQuantity(item.itemId));

      const res = await axios.post(`/api/cart/increase/${item.itemId}`);

      successToast(res?.data?.message);
    } catch (error: any) {
      console.error(error?.message);

      errorToast(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong"
      );
    }
  }

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      p={4}
      borderWidth={1}
      borderRadius="md"
      mb={4}
      bg="white"
      boxShadow="sm"
      className="cart-item"
      gap={4}
    >
      <Image
        src={item.image}
        alt={item.name}
        objectFit="cover"
        borderRadius="md"
        boxSize={{ base: "80px", md: "100px" }}
      />

      <Box flex="1" ml={{ base: 0, md: 4 }} className="cart-item-name">
        <Heading as="h3" size="md" color="#0b0a20e0">
          {item.name}
        </Heading>
      </Box>

      <Box
        color="orange"
        display="flex"
        alignItems="center"
        width="100%"
        justifyContent={"space-between"}
        gap={3}
        mt={{ base: 2, md: 0 }}
        flex="1"
      >
        <Text display="flex" alignItems="center" gap="3px">
          ₹{item.price?.toFixed(2)}
        </Text>

        <Flex align="center" gap={2}>
          <Button
            size="sm"
            isDisabled={item.quantity === 1}
            onClick={handleQuantityDec}
          >
            -
          </Button>
          <Text>{item.quantity}</Text>
          <Button size="sm" onClick={handleQuantityInc}>
            +
          </Button>
        </Flex>

        <Button
          colorScheme="teal"
          variant="ghost"
          onClick={handlerRemoveCart}
          alignSelf={{ base: "flex-end", md: "center" }}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </Flex>
  );
};

export default CartItem;
