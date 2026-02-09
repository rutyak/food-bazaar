"use client";

import React, { useState, useEffect } from "react";
import { Heading, Text, Box, Flex, Container, VStack } from "@chakra-ui/react";
import Image from "next/image";
import foodIcon from "../../../../public/appIcon.png";
import Navbar from "@/components/navbar/Navbar";
import Search from "@/container/search/Search";
import MobileMenu from "@/components/mobileMenu/MobileMenu";
import "./Header.scss";
import BackgroundImage from "@/components/backgroundImage/BackgroundImage";

const Header = () => {
  const [search, setSearch] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header-container">
      <BackgroundImage />

      {/* Sticky Top Bar */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={10}
        transition="all 0.3s ease"
        bg={isScrolled ? "rgba(0, 0, 0, 0.85)" : "transparent"}
        backdropFilter={isScrolled ? "blur(1px)" : "none"}
        borderBottom={isScrolled ? "1px solid rgba(255,255,255,0.1)" : "none"}
      >
        <Container maxW="container.xl" px={{ base: 5, sm: 6, lg: 12 }}>
          <Flex align="center" justify="space-between" py={isScrolled ? 3 : 6}>
            <Flex align="center" gap={3}>
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
                display={{ base: "none", sm: "flex" }}
              >
                <Text className="slogan-badge" fontSize="xs">
                  PREMIUM DELIVERY
                </Text>
                <Text className="slogan-text" fontSize="sm">
                  Good food, Good Moments
                </Text>
              </VStack>
            </Flex>

            {/* Search visible on scroll */}
            {isScrolled && (
              <Box
                flex={1}
                maxW="500px"
                mx={4}
                display={{ base: "none", lg: "block" }}
              >
                <Search setSearch={setSearch} search={search} />
              </Box>
            )}

            <Flex align="center" gap={{ base: 2, md: 5 }}>
              <Navbar />
              <MobileMenu />
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container
        maxW="container.xl"
        position="relative"
        zIndex={2}
        px={{ base: 5, sm: 6, lg: 12 }}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          pt={{ base: 32, md: 40 }}
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
