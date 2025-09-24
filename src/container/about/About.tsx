import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  VStack,
  Stack,
  Icon,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHeart, FaTruck, FaUtensils } from "react-icons/fa";
import foodBazaar from "@/assets/foodBazaarTeam.png";

const About = () => {
  const bgGradient = useColorModeValue(
    "linear(to-r, teal.500, green.500)",
    "linear(to-r, teal.200, green.200)"
  );
  const bgCard = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      p={8}
      maxW="1200px"
      mx="auto"
      bgGradient={bgGradient}
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading as="h1" mb={8} textAlign="center" fontSize="4xl" color="white">
        About foodBazaar
      </Heading>
      <Flex
        direction={["column", "row"]}
        align="center"
        justify="space-between"
        mb={8}
      >
        <Box
          flex="1"
          mb={[4, 0]}
          p={4}
          bg={bgCard}
          borderRadius="md"
          boxShadow="lg"
        >
          <Image
            src={foodBazaar?.src}
            alt="Our Team"
            borderRadius="md"
            objectFit="cover"
          />
        </Box>
        <VStack
          flex="2"
          spacing={4}
          align="start"
          pl={[0, 8]}
          bg={bgCard}
          p={4}
          borderRadius="md"
          boxShadow="lg"
        >
          <Text fontSize="lg" color={textColor}>
            Welcome to FoodBaazar, your number one source for all things food.
            We're dedicated to giving you the very best of meals, with a focus
            on quality, customer service, and uniqueness.
          </Text>
          <Text fontSize="lg" color={textColor}>
            Founded in 2023 by a group of food enthusiasts, FoodBaazar has come
            a long way from its beginnings in a small kitchen. When we first
            started out, our passion for delicious and convenient meals drove us
            to quit our day jobs, do tons of research, and turn hard work and
            inspiration into a booming online store.
          </Text>
          <Text fontSize="lg" color={textColor}>
            We now serve customers all over the city and are thrilled to be a
            part of the fast-paced wing of the food industry. We hope you enjoy
            our meals as much as we enjoy offering them to you.
          </Text>
        </VStack>
      </Flex>

      <Divider my={8} borderColor="whiteAlpha.700" />

      <Heading as="h2" size="lg" mb={8} textAlign="center" color="white">
        Why Choose FoodBazaar?
      </Heading>
      <Stack direction={["column", "row"]} spacing={8} justify="center">
        <Box
          textAlign="center"
          p={6}
          bg={bgCard}
          borderRadius="md"
          boxShadow="lg"
        >
          <Icon as={FaHeart} w={10} h={10} color="teal.400" mb={2} />
          <Heading as="h3" size="md" mb={2} color={textColor}>
            Passionate Team
          </Heading>
          <Text fontSize="md" color={textColor}>
            Our team is passionate about delivering the best food experiences to
            your doorstep.
          </Text>
        </Box>
        <Box
          textAlign="center"
          p={6}
          bg={bgCard}
          borderRadius="md"
          boxShadow="lg"
        >
          <Icon as={FaTruck} w={10} h={10} color="teal.400" mb={2} />
          <Heading as="h3" size="md" mb={2} color={textColor}>
            Fast Delivery
          </Heading>
          <Text fontSize="md" color={textColor}>
            We ensure quick and efficient delivery so that your food arrives
            fresh and hot.
          </Text>
        </Box>
        <Box
          textAlign="center"
          p={6}
          bg={bgCard}
          borderRadius="md"
          boxShadow="lg"
        >
          <Icon as={FaUtensils} w={10} h={10} color="teal.400" mb={2} />
          <Heading as="h3" size="md" mb={2} color={textColor}>
            Quality Ingredients
          </Heading>
          <Text fontSize="md" color={textColor}>
            We use only the highest quality ingredients to prepare our meals.
          </Text>
        </Box>
      </Stack>

      <Divider my={8} borderColor="whiteAlpha.700" />

      <Heading as="h2" size="lg" mb={8} textAlign="center" color="white">
        Our Vision and Mission
      </Heading>
      <Flex
        direction={["column", "row"]}
        align="center"
        justify="space-between"
      >
        <VStack
          flex="1"
          spacing={4}
          align="start"
          p={4}
          bg={bgCard}
          borderRadius="md"
          boxShadow="lg"
        >
          <Heading as="h3" size="md" color={textColor}>
            Our Vision
          </Heading>
          <Text fontSize="lg" color={textColor}>
            At FoodBaazar, our vision is to become the leading food delivery
            service by providing exceptional meals and outstanding customer
            service. We aim to create a community where food lovers can enjoy
            their favorite dishes conveniently and reliably.
          </Text>
        </VStack>
        <VStack
          flex="1"
          spacing={4}
          align="start"
          pl={[0, 8]}
          p={4}
          bg={bgCard}
          borderRadius="md"
          boxShadow="lg"
        >
          <Heading as="h3" size="md" color={textColor}>
            Our Mission
          </Heading>
          <Text fontSize="lg" color={textColor}>
            Our mission is to revolutionize the food delivery industry by
            offering a wide variety of delicious meals prepared with the finest
            ingredients, delivered promptly to your doorstep. We are committed
            to sustainability, innovation, and excellence in everything we do.
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default About;
