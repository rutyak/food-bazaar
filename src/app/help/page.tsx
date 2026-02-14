"use client";

import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Button,
  Divider,
  Icon,
  Container,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiMail, FiPhone, FiHelpCircle, FiShoppingBag, FiCreditCard } from "react-icons/fi";
import NavbarContainer from "@/components/navbar/NavbarContainer";

const Help = () => {
  const cardBg = "#f8f9fa";
  const borderColor = "#e2e8f0";
  const primaryGradient = "linear(to-r, #facc15, #f97316)";

  return (
    <>
      <NavbarContainer isScrolled={true} setSearch={() => {}} search="" isMenu={true} />

      <Box  mt={{ base: "80px", md: "100px", lg: "115px" }} mb="4" pb={20}>
        <Container maxW="1200px">
          {/* Hero Header */}
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
              Support Center
            </Box>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="extrabold"
              bgGradient={primaryGradient}
              bgClip="text"
              lineHeight="shorter"
            >
              How can we help?
            </Heading>
            <Text color="gray.600" fontSize="lg" maxW="600px">
              Find answers to frequently asked questions or get in touch with our dedicated support team.
            </Text>
          </VStack>

          {/* FAQ Section */}
          <Box
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor={borderColor}
            overflow="hidden"
            boxShadow="xl"
          >
            <Box p={8} borderBottom="1px solid" borderColor={borderColor} bg={cardBg}>
              <Flex align="center">
                <Icon as={FiHelpCircle} color="orange.500" boxSize={6} mr={3} />
                <Heading size="lg" color="gray.800">
                  Frequently Asked Questions
                </Heading>
              </Flex>
            </Box>

            <Accordion allowToggle>
              <AccordionItem border="none" borderBottom="1px solid" borderColor={borderColor}>
                <AccordionButton py={6} _hover={{ bg: "gray.50" }}>
                  <Icon as={FiShoppingBag} mr={4} color="gray.400" />
                  <Box flex="1" textAlign="left" color="gray.700" fontWeight="semibold" fontSize="lg">
                    How do I place an order?
                  </Box>
                  <AccordionIcon color="orange.500" />
                </AccordionButton>
                <AccordionPanel pb={6} px={14} color="gray.600" lineHeight="tall">
                  To place an order, browse the menu, add items to your cart, and proceed to checkout. 
                  You can track your delivery in real-time once the order is confirmed.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <AccordionButton py={6} _hover={{ bg: "gray.50" }}>
                  <Icon as={FiCreditCard} mr={4} color="gray.400" />
                  <Box flex="1" textAlign="left" color="gray.700" fontWeight="semibold" fontSize="lg">
                    What payment methods do you accept?
                  </Box>
                  <AccordionIcon color="orange.500" />
                </AccordionButton>
                <AccordionPanel pb={6} px={14} color="gray.600" lineHeight="tall">
                  We accept all major credit/debit cards, digital wallets, and other secure online 
                  payment gateways. Your transaction data is always encrypted and secure.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          <Divider my={20} borderColor={borderColor} />

          {/* Contact Section */}
          <Heading size="xl" mb={12} textAlign="center" color="gray.800" fontWeight="bold">
            Still need help? <Text as="span" color="orange.500">Reach out.</Text>
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {/* Email Card */}
            <Box
              p={10}
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              textAlign="center"
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
                bg="orange.50"
                borderRadius="full"
                align="center"
                justify="center"
                mx="auto"
                mb={6}
              >
                <Icon as={FiMail} color="orange.500" boxSize={8} />
              </Flex>
              <Heading size="md" mb={2} color="gray.800">
                Email Support
              </Heading>
              <Text color="gray.500" mb={8}>
                support@foodbazaar.com
              </Text>
              <Button
                w="full"
                size="lg"
                bgGradient={primaryGradient}
                color="white"
                fontWeight="bold"
                _hover={{ 
                  opacity: 0.9,
                  transform: "scale(1.02)"
                }}
              >
                Send an Email
              </Button>
            </Box>

            {/* Call Card */}
            <Box
              p={10}
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              textAlign="center"
              transition="all 0.4s ease"
              _hover={{
                transform: "translateY(-10px)",
                borderColor: "yellow.400",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              }}
            >
              <Flex
                w={16}
                h={16}
                bg="yellow.50"
                borderRadius="full"
                align="center"
                justify="center"
                mx="auto"
                mb={6}
              >
                <Icon as={FiPhone} color="yellow.600" boxSize={8} />
              </Flex>
              <Heading size="md" mb={2} color="gray.800">
                Call Support
              </Heading>
              <Text color="gray.500" mb={8}>
                +1 (123) 456-7890
              </Text>
              <Button
                w="full"
                size="lg"
                variant="outline"
                borderColor="yellow.500"
                color="yellow.600"
                fontWeight="bold"
                _hover={{ 
                  bg: "yellow.50",
                  transform: "scale(1.02)"
                }}
              >
                Call Us Now
              </Button>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default Help;