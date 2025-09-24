import { image_url } from "@/config/Config";
import { Image, Flex, Box, Text, Heading, Button } from "@chakra-ui/react";
import rupee from "@/assets/rupee.png";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import "./CartItem.scss";
import { RootState } from "@/redux/store";
import { removeCart } from "@/redux/slices/cartSlice";
import axios from "axios";

const CartItem = ({ item }: any) => {
  const dispatch = useDispatch();

  const handlerRemoveCart = () => {
    dispatch(removeCart(item.itemId));

    // const res = await axios.delete("/api/");
  };

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
          <Image src={rupee?.src} alt="rupee" boxSize={3} />
          {item.price?.toFixed(2)}
        </Text>

        <Flex align="center" gap={2}>
          <Button size="sm" isDisabled={item.quantity === 1}>
            -
          </Button>
          <Text>{item.quantity}</Text>
          <Button size="sm">+</Button>
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
