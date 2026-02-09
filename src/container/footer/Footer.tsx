"use client";

import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Icon,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container maxW="container.xl" py={{ base: 10, md: 16 }}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: 10, md: 8 }}
        >
          {/* Brand Section */}
          <Stack spacing={4}>
            <Box>
              <Text className={styles.brandTitle}>
                Food <span className={styles.highlight}>Bazaar</span>
              </Text>
              <Text 
                className={styles.brandDescription}
                fontSize={{ base: "xs", md: "sm" }}
              >
                India's fastest delivery app. Enjoy premium meals, earn rewards, 
                and get free delivery on orders of 2+ items.
              </Text>
            </Box>
            <Flex gap={4}>
              <Icon as={FaFacebook} className={styles.socialIcon} />
              <Icon as={FaTwitter} className={styles.socialIcon} />
              <Icon as={FaInstagram} className={styles.socialIcon} />
              <Icon as={FaLinkedin} className={styles.socialIcon} />
            </Flex>
          </Stack>

          {/* Quick Links */}
          <VStack align="flex-start" spacing={4}>
            <Text className={styles.columnHeader}>Company</Text>
            <Stack 
              spacing={2} 
              className={styles.linkList}
              fontSize={{ base: "xs", md: "sm" }}
            >
              <Text as="a" href="#">About Us</Text>
              <Text as="a" href="#">Our Kitchens</Text>
              <Text as="a" href="#">Rewards Program</Text>
              <Text as="a" href="#">Career</Text>
            </Stack>
          </VStack>

          {/* Services Section */}
          <VStack align="flex-start" spacing={4}>
            <Text className={styles.columnHeader}>Services</Text>
            <Stack 
              spacing={2} 
              className={styles.linkList}
              fontSize={{ base: "xs", md: "sm" }}
            >
              <Text as="a" href="#">Premium Delivery</Text>
              <Text as="a" href="#">Event Catering</Text>
              <Text as="a" href="#">Corporate Meals</Text>
              <Text as="a" href="#">Gift Vouchers</Text>
            </Stack>
          </VStack>

          {/* Contact Section */}
          <VStack align="flex-start" spacing={4}>
            <Text className={styles.columnHeader}>Contact Us</Text>
            <Stack spacing={{ base: 3, md: 4 }}>
              <Flex align="center" gap={3}>
                <Icon as={MdEmail} color="#4be7e7" boxSize={{ base: 3, md: 4 }} />
                <Text fontSize={{ base: "xs", md: "sm" }}>foodbazaar.official@gmail.com</Text>
              </Flex>
              <Flex align="center" gap={3}>
                <Icon as={MdPhone} color="#4be7e7" boxSize={{ base: 3, md: 4 }} />
                <Text fontSize={{ base: "xs", md: "sm" }}>+91 123-456-7890</Text>
              </Flex>
              <Flex align="center" gap={3}>
                <Icon as={MdLocationOn} color="#4be7e7" boxSize={{ base: 3, md: 4 }} />
                <Text fontSize={{ base: "xs", md: "sm" }}>Mumbai, Maharashtra, India</Text>
              </Flex>
            </Stack>
          </VStack>
        </SimpleGrid>

        <Divider my={10} borderColor="rgba(255,255,255,0.1)" />

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="xs" color="gray.500">
            &copy; 2026 Food Bazaar. All rights reserved.
          </Text>
          <Flex gap={6} fontSize="xs" color="gray.500">
            <Text as="a" href="#">Privacy Policy</Text>
            <Text as="a" href="#">Terms of Service</Text>
            <Text as="a" href="#">Cookie Policy</Text>
          </Flex>
        </Flex>
      </Container>
    </footer>
  );
};

export default Footer;