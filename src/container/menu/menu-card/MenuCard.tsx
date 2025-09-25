import { Box, Text, Heading, Image, Button, useToast } from "@chakra-ui/react";
import "./MenuCard.scss";
import starIcon from "@/assets/star-icon.png";
import rupee from "@/assets/rupee.png";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { addCart } from "@/redux/slices/cartSlice";

const MenuCard = ({ _id, description, image, name, price, rating }: any) => {
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { status } = useSession();

  const toast = useToast();

  // const cartData = useSelector((store: any) => store.cart.cartItems);

  const handleAddToCart = async (_id: any) => {
    if (status === "unauthenticated") {
      toast({
        title: "Please login to access the cart!!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // let itemQuantity = cartData?.find((item: any) => item.id === id);

      // let currentQuantity = itemQuantity?.quantity ?? 0;

      const itemDetails = {
        itemId: _id,
        name,
        price,
        image,
        quantity: 1,
      };

      try {
        setLoading(true);

        const res = await axios.post("/api/cart", itemDetails);

        console.log("res from cart redux: ", res.data.addedItem);

        dispatch(addCart(res.data?.addedItem));

        toast({
          title: "Item added to cart successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } catch (error: any) {
        console.error(error.message);
        toast({
          title: "Failed to add",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Box className="item-card" p={2} overflow="hidden" height="224px">
        <Box className="card-text" mb={4}>
          <Box mb={2}>
            <Text fontSize="md" fontWeight="bold" color="#DD6B20">
              {/* {isBestseller ? "Bestseller" : ""} */}
            </Text>
          </Box>
          <Box mb={2} className="item-title">
            <Heading as="h3" size="lg">
              {name}
            </Heading>
            <Heading as="h3" size="lg" className="item-card-price">
              <Image src={rupee?.src} alt="rupee" w="10px" />
              <Text>{price}</Text>
            </Heading>
          </Box>
          <Box className="item-rating" mb={2}>
            <>
              <img src={starIcon?.src} alt="rating" />
              <Text fontSize="sm">
                {rating}
                {/* {ratings?.aggregatedRating?.ratingCountV2}) */}
              </Text>
            </>
          </Box>
          <Box
            className="cuisine-menu-card"
            mb={4}
            fontSize="14px"
            color="gray"
          >
            <Text>
              {isExpanded ? description : description?.substring(0, 40)}
            </Text>
            {description?.length > 90 && (
              <Text
                color="blue.500"
                cursor="pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Read less" : "Read more"}
              </Text>
            )}
          </Box>
        </Box>
        <Box className="item-img-btn" position="relative">
          <Image
            src={image}
            alt="img-card-menu"
            boxSize="100px"
            objectFit="cover"
          />
          <Button
            position="absolute"
            bottom="-18px"
            left="50%"
            transform="translateX(-50%)"
            colorScheme="teal"
            onClick={() => handleAddToCart(_id)}
          >
            <Text>{loading ? "Adding..." : "ADD"}</Text>
          </Button>
        </Box>
      </Box>
      <hr></hr>
    </>
  );
};

export default MenuCard;
