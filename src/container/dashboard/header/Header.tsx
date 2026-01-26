"use client";

import React, { useState } from "react";
import { Heading, Text, Box, Flex, Container, VStack } from "@chakra-ui/react";
import Image from "next/image";
import foodIcon from "../../../../public/appIcon.png";
import Navbar from "@/components/navbar/Navbar";
import Search from "@/container/search/Search";
import MobileMenu from "@/components/mobileMenu/MobileMenu";
import headerBg from "../../../assets/back-5.jpg"; 
import "./Header.scss";

const Header = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <header className="header-container">
      <Box className="bg-image-wrapper">
        <Image
          src={headerBg}
          alt="Background"
          fill
          priority
          quality={100}
          style={{ objectFit: "cover" }}
        />
      </Box>

      <div className="overlay-blur"></div>

      <Container
        maxW="container.xl"
        position="relative"
        zIndex={2}
        px={{ base: 5, sm: 6, lg: 16 }}
      >
        <Flex as="nav" align="center" justify="space-between" py={6}>
          <Flex align="center" gap={3} className="logo-group">
            <Box className="icon-box">
              <Image
                src={foodIcon}
                width={38}
                height={38}
                alt="Logo"
                priority
              />
            </Box>
            <VStack
              align="flex-start"
              spacing={0}
              display={{ base: "none", lg: "flex" }}
            >
              <Text className="slogan-badge">PREMIUM DELIVERY</Text>
              <Text className="slogan-text">Good food, Good Moments</Text>
            </VStack>
          </Flex>

          <Flex align="center" gap={{ base: 2, md: 5 }}>
            <Box display={{ base: "none", lg: "block" }}>
              <Navbar />
            </Box>
            <MobileMenu />
          </Flex>
        </Flex>

        <Flex
          direction="column"
          align="center"
          justify="center"
          pt={{ base: 12, md: 16 }}
          pb={14}
          textAlign="center"
        >
          <Heading
            as="h1"
            className="hero-title"
            fontSize={{ base: "4xl", sm: "6xl", lg: "8xl" }}
          >
            Food <span className="highlight">Bazaar</span>
          </Heading>

          <Text
            className="hero-subtitle"
            fontSize={{ base: "sm", md: "xl" }}
            mb={{ base: 8, md: 10 }}
          >
            Discover the best flavors delivered straight to your doorstep.
          </Text>

          <Box w="full" maxW="750px" className="search-outer-wrapper">
            <Search setSearch={setSearch} search={search} />
          </Box>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
