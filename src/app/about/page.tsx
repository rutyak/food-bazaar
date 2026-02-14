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
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaHeart, FaTruck, FaUtensils } from "react-icons/fa";
import foodBazaar from "@/assets/foodBazaarTeam.png";
import NavbarContainer from "@/components/navbar/NavbarContainer";

const About = () => {
  const cardBg = "#f8f9fa";
  const borderColor = "#e2e8f0";
  const primaryGradient = "linear(to-r, #facc15, #f97316)";

  return (
    <>
      <NavbarContainer
        isScrolled={true}
        setSearch={() => {}}
        search=""
        isMenu={true}
      />

      <Box pt={{ base: "100px", md: "120px" }} pb={20}>
        <Container maxW="1200px">
          <VStack spacing={4} mb={16} textAlign="center">
            <Box
              bgGradient={primaryGradient}
              px={4}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="bold"
              color="white"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              Our Story
            </Box>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="extrabold"
              bgGradient={primaryGradient}
              bgClip="text"
              lineHeight="shorter"
            >
              About FoodBazaar
            </Heading>
            <Text color="gray.600" fontSize="lg" maxW="700px">
              Founded in 2023, we've grown from a small kitchen idea into a thriving 
              food brand serving customers across the city.
            </Text>
          </VStack>

          <Flex
            direction={{ base: "column", lg: "row" }}
            align="stretch"
            gap={10}
            mb={20}
          >
            <Box flex="1" borderRadius="2xl" overflow="hidden" boxShadow="xl">
              <Image
                src={foodBazaar?.src}
                alt="Our Team"
                objectFit="cover"
                w="100%"
                h={{ base: "300px", lg: "100%" }}
              />
            </Box>

            <VStack
              flex="1"
              spacing={6}
              align="start"
              justify="center"
              bg="white"
              p={{ base: 8, md: 10 }}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              boxShadow="lg"
            >
              <Text fontSize="xl" color="gray.700" fontWeight="semibold">
                Your number one source for all things food.
              </Text>
              <Text fontSize="lg" color="gray.600" lineHeight="relaxed">
                We’re dedicated to giving you the very best meals with a focus on
                quality, customer satisfaction, and uniqueness. 
              </Text>
              <Text fontSize="lg" color="gray.600" lineHeight="relaxed">
                We hope you enjoy our meals as much as we enjoy delivering them to
                you. Every dish is prepared with the utmost care and passion.
              </Text>
            </VStack>
          </Flex>

          <Divider my={20} borderColor={borderColor} />

          <Heading size="xl" mb={12} textAlign="center" color="gray.800" fontWeight="bold">
            Why Choose <Text as="span" color="orange.500">FoodBazaar?</Text>
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={20}>
            {[
              {
                icon: FaHeart,
                title: "Passionate Team",
                text: "Our team is passionate about delivering the best food experiences.",
                accent: "orange.50"
              },
              {
                icon: FaTruck,
                title: "Fast Delivery",
                text: "Quick and efficient delivery so your food arrives fresh and hot.",
                accent: "yellow.50"
              },
              {
                icon: FaUtensils,
                title: "Quality Ingredients",
                text: "We use only the highest quality ingredients in every meal.",
                accent: "orange.50"
              },
            ].map((feature, index) => (
              <Box
                key={index}
                textAlign="center"
                p={10}
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                transition="all 0.4s ease"
                _hover={{
                  transform: "translateY(-10px)",
                  borderColor: "orange.400",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                }}
              >
                <Flex
                  w={16}
                  h={16}
                  bg={feature.accent}
                  borderRadius="full"
                  align="center"
                  justify="center"
                  mx="auto"
                  mb={6}
                >
                  <Icon as={feature.icon} color="orange.500" boxSize={8} />
                </Flex>
                <Heading size="md" mb={4} color="gray.800">
                  {feature.title}
                </Heading>
                <Text color="gray.600" lineHeight="relaxed">
                  {feature.text}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          <Divider my={20} borderColor={borderColor} />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box
              p={10}
              bg={cardBg}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
            >
              <Heading size="lg" color="gray.800" mb={4}>
                Our Vision
              </Heading>
              <Text color="gray.600" fontSize="lg" lineHeight="relaxed">
                To become the leading food delivery service by offering
                exceptional meals and outstanding customer experiences that 
                bring people together.
              </Text>
            </Box>

            <Box
              p={10}
              bg={cardBg}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
            >
              <Heading size="lg" color="gray.800" mb={4}>
                Our Mission
              </Heading>
              <Text color="gray.600" fontSize="lg" lineHeight="relaxed">
                To revolutionize food delivery through quality ingredients, prompt
                service, and continuous innovation for every customer.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default About;