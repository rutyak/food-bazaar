"use client";

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
import NavbarContainer from "@/components/navbar/NavbarContainer";

const About = () => {
  const bgGradient = useColorModeValue(
    "linear(to-r, teal.500, green.500)",
    "linear(to-r, teal.200, green.200)",
  );
  const bgCard = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <>
      <NavbarContainer isScrolled={true} setSearch={() => {}} search="" />

      <Box
        p={{ base: 6, md: 10 }}
        maxW="1350px"
        mx="auto"
        mb={{ base: "none", xl: "20px" }}
        mt={{ base: "none", xl: "20px" }}
        bgGradient={bgGradient}
        borderRadius={{ base: "none", xl: "lg" }}
        boxShadow="2xl"
        mt={{ base: "80px", md: "100px" }}
        mb="4"
      >
        <Heading
          as="h1"
          mb={10}
          textAlign="center"
          fontSize={{ base: "3xl", md: "4xl" }}
          color="white"
        >
          About FoodBazaar
        </Heading>

        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={8}
          mb={10}
        >
          <Box flex="1" borderRadius="md" boxShadow="xl" overflow="hidden">
            <Image
              src={foodBazaar?.src}
              alt="Our Team"
              borderRadius="md"
              objectFit="cover"
              w="100%"
              h={{ base: "250px", md: "100%" }}
            />
          </Box>

          <VStack
            flex="1"
            spacing={5}
            align="start"
            bg={bgCard}
            p={{ base: 4, md: 6 }}
            borderRadius="md"
            boxShadow="lg"
          >
            <Text fontSize="lg" color={textColor}>
              Welcome to FoodBazaar, your number one source for all things food.
              We're dedicated to giving you the very best of meals, with a focus
              on quality, customer service, and uniqueness.
            </Text>
            <Text fontSize="lg" color={textColor}>
              Founded in 2023 by a group of food enthusiasts, FoodBazaar has
              come a long way from its beginnings in a small kitchen. Our
              passion for delicious and convenient meals drove us to turn hard
              work and inspiration into a thriving food brand.
            </Text>
            <Text fontSize="lg" color={textColor}>
              We now serve customers all over the city and are thrilled to be
              part of the fast-paced wing of the food industry. We hope you
              enjoy our meals as much as we enjoy offering them to you.
            </Text>
          </VStack>
        </Flex>

        <Divider my={10} borderColor="whiteAlpha.700" />

        <Heading
          as="h2"
          size="lg"
          mb={8}
          textAlign="center"
          color="black"
          position="relative"
          zIndex={10}
        >
          Why Choose FoodBazaar?
        </Heading>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={8}
          justify="center"
          align="stretch"
          px={{ base: 2, md: 8 }}
        >
          {[
            {
              icon: FaHeart,
              title: "Passionate Team",
              text: "Our team is passionate about delivering the best food experiences to your doorstep.",
            },
            {
              icon: FaTruck,
              title: "Fast Delivery",
              text: "We ensure quick and efficient delivery so that your food arrives fresh and hot.",
            },
            {
              icon: FaUtensils,
              title: "Quality Ingredients",
              text: "We use only the highest quality ingredients to prepare our meals.",
            },
          ].map((feature, index) => (
            <Box
              key={index}
              textAlign="center"
              p={6}
              bg={bgCard}
              borderRadius="md"
              boxShadow="lg"
              _hover={{ transform: "scale(1.03)", transition: "0.2s" }}
            >
              <Icon as={feature.icon} w={10} h={10} color="teal.400" mb={3} />
              <Heading as="h3" size="md" mb={2} color={textColor}>
                {feature.title}
              </Heading>
              <Text fontSize="md" color={textColor}>
                {feature.text}
              </Text>
            </Box>
          ))}
        </Stack>

        <Divider my={10} borderColor="whiteAlpha.700" />

        <Heading
          as="h2"
          size="lg"
          mb={8}
          textAlign="center"
          color="black"
          position="relative"
          zIndex={10}
        >
          Our Vision and Mission
        </Heading>

        <Flex
          direction={{ base: "column", md: "row" }}
          align="stretch"
          justify="space-between"
          gap={8}
        >
          <VStack
            flex="1"
            spacing={4}
            align="start"
            p={6}
            bg={bgCard}
            borderRadius="md"
            boxShadow="lg"
          >
            <Heading as="h3" size="md" color={textColor}>
              Our Vision
            </Heading>
            <Text fontSize="lg" color={textColor}>
              At FoodBazaar, our vision is to become the leading food delivery
              service by providing exceptional meals and outstanding customer
              service. We aim to create a community where food lovers can enjoy
              their favorite dishes conveniently and reliably.
            </Text>
          </VStack>

          <VStack
            flex="1"
            spacing={4}
            align="start"
            p={6}
            bg={bgCard}
            borderRadius="md"
            boxShadow="lg"
          >
            <Heading as="h3" size="md" color={textColor}>
              Our Mission
            </Heading>
            <Text fontSize="lg" color={textColor}>
              Our mission is to revolutionize the food delivery industry by
              offering a wide variety of delicious meals prepared with the
              finest ingredients, delivered promptly to your doorstep. We are
              committed to sustainability, innovation, and excellence in
              everything we do.
            </Text>
          </VStack>
        </Flex>
      </Box>
    </>
  );
};

export default About;
