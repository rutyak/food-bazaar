import { Box, Text, Heading, Button, Image } from "@chakra-ui/react";
import "./MenuCard.scss";
import starIcon from "@/assets/star-icon.svg";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { addCart } from "@/redux/slices/cartSlice";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import { ItemsType } from "@/types/menu";

const MenuCard = ({
  _id,
  description,
  image,
  name,
  price,
  rating,
}: ItemsType) => {
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { status } = useSession();

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const handleAddToCart = async (_id: string) => {
    if (status === "unauthenticated") {
      errorToast("Please login to access the cart!!");
    } else {
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

        dispatch(addCart(res.data?.addedItem));

        successToast("Item added to cart successfully");
      } catch (error: any) {
        console.error(error.message);
        errorToast("Failed to add");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Box className="item-card" p={2} height="250px" mb={{ base: 5, md: 0 }}>
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
              ₹<Text>{price}</Text>
            </Heading>
          </Box>
          <Box className="item-rating" mb={2}>
            <>
              <img src={starIcon?.src} alt="rating" style={{ width: "16px" }} />
              <Text fontSize="sm">{rating}</Text>
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
