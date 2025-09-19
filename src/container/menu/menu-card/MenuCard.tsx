import { Box, Text, Heading, Image, Button, useToast } from "@chakra-ui/react";
import "./MenuCard.scss";
import starIcon from "@/assets/star-icon.png";
import rupee from "@/assets/rupee.png";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "@/slice/CartSlice";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";

const MenuCard = ({
  _id,
  category,
  description,
  image,
  isVeg,
  name,
  price,
  rating,
}: any) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSession();

  const toast = useToast();

  const cartData = useSelector((store: any) => store.cart.cartItems);

  const handleAddToCart = (id: any) => {
    if (status === "unauthenticated") {
      toast({
        title: "Please login to access the cart!!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      let itemQuantity = cartData?.find((item: any) => item.id === id);

      let currentQuantity = itemQuantity?.quantity ?? 0;

      // const itemDetails = {
      //   id,
      //   name,
      //   ratings,
      //   price,
      //   defaultPrice,
      //   imageId,
      //   quantity: currentQuantity + 1,
      // };
      // console.log(currentQuantity);
      // dispatch(addCart(itemDetails));

      setQuantity((prev) => prev + 1);
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
            <Heading as="h3" size="md">
              {name}
            </Heading>
            <Heading as="h3" size="md" className="item-card-price">
              <Image src={rupee?.src} alt="rupee" w="10px" />
              <Text>
                {Math.floor(price / 100)}
              </Text>
            </Heading>
          </Box>
          <Box className="item-rating" mb={2}>
            {Object.keys(rating).length !== 0 ? (
              <>
                <img src={starIcon?.src} alt="rating" />
                <Text fontSize="sm">
                  {rating}
                  {/* {ratings?.aggregatedRating?.ratingCountV2}) */}
                </Text>
              </>
            ) : (
              " "
            )}
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
        {image ? (
          <>
            <Box className="item-img-btn" position="relative">
              <Image
                src={image}
                alt="img-card-menu"
                boxSize="100px"
                objectFit="cover"
              />
              <Box className="add-btn">
                <Button colorScheme="teal" onClick={() => handleAddToCart(_id)}>
                  <Text>ADD ({quantity})</Text>
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Box className="add-btn-without-img">
            <Button colorScheme="teal" onClick={() => handleAddToCart(_id)}>
              ADD (<Text>{quantity}</Text>)
            </Button>
          </Box>
        )}
      </Box>
      <hr></hr>
    </>
  );
};

export default MenuCard;
