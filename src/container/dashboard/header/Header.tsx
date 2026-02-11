"use client";

import React, { useState, useEffect } from "react";
import { Heading, Text, Box, Flex, Container } from "@chakra-ui/react";
import Search from "@/container/search/Search";
import "./Header.scss";
import BackgroundImage from "@/components/backgroundImage/BackgroundImage";
import NavbarContainer from "@/components/navbar/NavbarContainer";

const Header = () => {
  const [search, setSearch] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header-container">
      <BackgroundImage />

      <NavbarContainer
        isScrolled={isScrolled}
        setSearch={setSearch}
        search={search}
        dashboard={true}
      />

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
          pt={{ base: 10, md: "55px" }}
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
            maxW={{ base: 100, md: 200 }}
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
