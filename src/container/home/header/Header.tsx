import React, { useEffect } from "react";
import { useState } from "react";
import "./Header.scss";
import { Heading, Box, Text } from "@chakra-ui/react";
import foodIcon from "@/assets/restaurant.png";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Search from "@/container/search/Search";
import { HamburgerIcon } from "@chakra-ui/icons";

const Header = ({ setFilteredCard, setSearch, search, allCard }: any) => {
  const [cartLen, setCartLen] = useState();

  // const cartAll = useSelector((state: any) => state.cart.cartItems);

  // useEffect(() => {
  //   setCartLen(cartAll.length);
  // }, [cartLen]);

  return (
    <div className="header">
      <div className="top">
        <div className="slogan">
          <Image src={foodIcon?.src} width={25} height={25} alt="foodIcon" />
          <Text color="#ffebcd" className="slogan-title">
            Good food, Good Monents
          </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Navbar />
          <HamburgerIcon
            width={7}
            height={9}
            color="white"
            display={{ base: "block", md: "none" }}
            ml={1}
            mr={3}
            cursor="pointer"
          />
        </div>
      </div>
      <div className="title">
        <Heading as="h2" fontSize={["3xl", "4xl", "5xl"]}>
          Food Bazaar
        </Heading>
        <Search
          setFilteredCard={setFilteredCard}
          setSearch={setSearch}
          search={search}
          allCard={allCard}
        />
      </div>
    </div>
  );
};

export default Header;
