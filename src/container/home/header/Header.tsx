"use client";

import React from "react";
import { useState } from "react";
import "./Header.scss";
import { Heading, Text } from "@chakra-ui/react";
import foodIcon from "../../../../public/appIcon.png";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Search from "@/container/search/Search";
import MobileMenu from "@/components/mobileMenu/MobileMenu";

const Header = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="header">
      <div className="top">
        <div className="slogan">
          <Image src={foodIcon?.src} width={25} height={25} alt="foodIcon" />
          <Text
            color="#ffebcd"
            className="slogan-title"
            display={{ base: "none", lg: "block" }}
          >
            Good food, Good Monents
          </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap:"5px"}}>
          <Navbar />
          <MobileMenu />
        </div>
      </div>
      <div className="title">
        <Heading as="h2" fontSize={["3xl", "4xl", "5xl"]}>
          Food Bazaar
        </Heading>
        <Search setSearch={setSearch} search={search} />
      </div>
    </div>
  );
};

export default Header;
