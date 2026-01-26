"use client";

import React, { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGlobalContext } from "@/context/GlobalContext";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import { RestaurantType } from "@/types/restaurant";
import useFilter from "@/utils/useFilter";
import SearchList from "./searchlist/SearchList";
import CustomPopover from "@/components/popover/CustomPopover";
import styles from "./Search.module.scss";

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  cart?: boolean;
}

const locationApi = process.env.NEXT_PUBLIC_LOCATION_API ?? "";

const Search = ({ setSearch, search, cart }: SearchProps) => {
  const restaurants = useSelector((state: RootState) => state.restaurants);

  console.log("restaurants: ", restaurants);

  const { city, setCity } = useGlobalContext();
  const [resultList, setResultList] = useState<RestaurantType[]>([]);
  const [isLocating, setIsLocating] = useState(false);

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const filteredData = useFilter(searchValue, restaurants);
    console.log("filteredData: ", filteredData);
    setResultList(filteredData);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    if (e.key === "Enter") {
      const filteredData = useFilter(searchValue, restaurants);
      setResultList(filteredData);
      setSearch("");
    }
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          try {
            const response = await fetch(
              `${locationApi}?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
            );
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            const cityName = data?.city || data?.locality || "Unknown location";
            const state = data?.principalSubdivision || "Unknown state";
            setCity(`${cityName}, ${state}`);
            successToast("Location detected");
          } catch (error) {
            errorToast("Geocoding failed");
          } finally {
            setIsLocating(false);
          }
        },
        () => {
          errorToast("Location access denied");
          setIsLocating(false);
        },
      );
    }
  };
  console.log("seraching : ", search);

  return (
    <Box w="full" px={{ base: 4, md: 0 }} className={styles.search}>
      <Flex
        w="full"
        maxW="850px"
        justify="center"
        align="center"
        className={styles.searchBarWrapper}
      >
        <div className={styles.locationSection}>
          <CustomPopover
            text={isLocating ? "Locating..." : city || "Location"}
            onDetectLocation={handleDetectLocation}
            currentLocation={city}
          />
        </div>

        <Box className={styles.inputSection}>
          {!cart && (
            <InputGroup size={{ base: "md", md: "lg" }}>
              <InputLeftElement
                pointerEvents="none"
                h="full"
                px={{ base: 2, md: 4 }}
              >
                <GoSearch color="gray.400" size={18} />
              </InputLeftElement>
              <Input
                placeholder="Search for a restaurant..."
                onChange={handleSearch}
                onKeyDown={handleEnter}
                value={search}
              />
            </InputGroup>
          )}

          {search?.trim() && <SearchList resultList={resultList} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default Search;
