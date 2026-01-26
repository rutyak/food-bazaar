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
  const { city, setCity } = useGlobalContext();
  const [resultList, setResultList] = useState<RestaurantType[]>([]);
  const [isLocating, setIsLocating] = useState(false);

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const filteredData = useFilter(searchValue, restaurants);
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
          setIsLocating(false);
          errorToast("Location error");
        },
      );
    }
  };

  return (
    <Box w="full" maxW="750px" className={styles.search}>
      <Flex
        w="full"
        justify="center"
        align="center"
        gap={0}
        className={styles.searchBarWrapper}
      >
        <div className={styles.locationSection}>
          <CustomPopover
            text={isLocating ? "Locating..." : "Location"}
            onDetectLocation={handleDetectLocation}
            currentLocation={city}
          />
        </div>

        <Box position="relative" className={styles.inputSection}>
          {!cart && (
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none" h="full" px={4}>
                <GoSearch color="gray.500" size={20} />
              </InputLeftElement>
              <Input
                placeholder="Search for a restaurant..."
                onChange={handleSearch}
                onKeyDown={handleEnter}
                value={search}
              />
            </InputGroup>
          )}

          {search?.trim() && (
            <Box className={styles.dropdownContainer}>
              <SearchList resultList={resultList} />
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Search;
