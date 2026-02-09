"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Flex,
  Icon,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { RestaurantType } from "@/types/restaurant";
import {
  MdFilterList,
  MdOutlineStars,
  MdDirectionsRun,
  MdCurrencyRupee,
  MdEco,
} from "react-icons/md";

interface toggleBtnType {
  all: boolean;
  pureVeg: boolean;
  ratings: boolean;
  fast: boolean;
  lessThan200: boolean;
}

interface filteredCardType {
  setFilteredCard: React.Dispatch<React.SetStateAction<RestaurantType[]>>;
}

function Filter({ setFilteredCard }: filteredCardType) {
  const restaurants = useSelector((state: RootState) => state.restaurants);
  const activeBg = useColorModeValue("gray.800", "white");
  const activeColor = useColorModeValue("white", "gray.800");

  const [togglebtn, setToggleBtn] = useState<toggleBtnType>({
    all: true,
    pureVeg: false,
    ratings: false,
    fast: false,
    lessThan200: false,
  });

  const handleFilter = (type: keyof toggleBtnType) => {
    setToggleBtn({
      all: false,
      pureVeg: false,
      ratings: false,
      fast: false,
      lessThan200: false,
      [type]: true,
    });
  };

  useEffect(() => {
    let newFilteredCard: RestaurantType[] = [];
    if (togglebtn.all) {
      newFilteredCard = restaurants;
    } else if (togglebtn.pureVeg) {
      newFilteredCard = restaurants?.filter((card) => card?.veg === true);
    } else if (togglebtn.ratings) {
      newFilteredCard = restaurants?.filter(
        (card) => Number(card?.rating) >= 4,
      );
    } else if (togglebtn.fast) {
      newFilteredCard = restaurants?.filter(
        (card) =>
          card?.deliveryTime?.includes("15") ||
          card?.deliveryTime?.includes("20"),
      );
    } else if (togglebtn.lessThan200) {
      newFilteredCard = restaurants?.filter(
        (card) => Number(card?.pricefortwo) <= 150,
      );
    }
    setFilteredCard(newFilteredCard);
  }, [togglebtn, restaurants, setFilteredCard]);

  const FilterPill = ({
    label,
    id,
    icon,
  }: {
    label: string;
    id: keyof toggleBtnType;
    icon?: any;
  }) => {
    const isActive = togglebtn[id];
    return (
      <Button
        onClick={() => handleFilter(id)}
        size="sm"
        px={3}
        py={2}
        borderRadius="full"
        variant="outline"
        leftIcon={icon ? <Icon as={icon} /> : undefined}
        bg={isActive ? activeBg : "transparent"}
        color={isActive ? activeColor : "gray.600"}
        borderColor={isActive ? activeBg : "gray.200"}
        _hover={{
          bg: isActive ? activeBg : "gray.50",
          borderColor: "gray.300",
          transform: "translateY(-1px)",
        }}
        _active={{ transform: "scale(0.95)" }}
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        fontWeight="600"
        fontSize="13px"
        boxShadow={isActive ? "lg" : "sm"}
      >
        {label}
      </Button>
    );
  };

  return (
    <Box
      className="filter-wrapper"
      overflowX="auto"
      sx={{
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
      py={2}
    >
      <HStack spacing={3} px={1} display="flex" flexWrap="wrap">
        <FilterPill label="All" id="all" icon={MdFilterList} />
        <FilterPill label="Pure Veg" id="pureVeg" icon={MdEco} />
        <FilterPill label="Ratings 4.0+" id="ratings" icon={MdOutlineStars} />
        <FilterPill label="Fast Delivery" id="fast" icon={MdDirectionsRun} />
        <FilterPill
          label="Less than ₹150"
          id="lessThan200"
          icon={MdCurrencyRupee}
        />
      </HStack>
    </Box>
  );
}

export default Filter;
