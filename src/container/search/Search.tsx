"use client";

import React, { useState } from "react";
import { Box, Input, InputGroup, InputLeftElement, Flex } from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGlobalContext } from "@/context/GlobalContext";
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import { RestaurantType } from "@/types/restaurant";
import filterData from "@/utils/useFilter"; 
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
    const filtered = filterData(searchValue, restaurants);
    setResultList(filtered);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const filtered = filterData(search, restaurants);
      setResultList(filtered);
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
              `${locationApi}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
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
        }
      );
    }
  };

  return (
    <Flex className={styles.searchBarWrapper} mx="auto">
      <Box className={styles.locationSection}>
        <CustomPopover
          text={isLocating ? "Locating..." : city || "Location"}
          onDetectLocation={handleDetectLocation}
          currentLocation={city}
        />
      </Box>

      <Box className={styles.inputSection}>
        {!cart && (
          <InputGroup size={{ base: "md", md: "lg" }}>
            <InputLeftElement pointerEvents="none" h="full" px={{ base: 2, md: 4 }}>
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

        {/* The Result List Dropdown */}
        {search?.trim().length > 0 && (
          <Box 
            position="absolute" 
            top="100%" 
            left="0" 
            right="0" 
            zIndex="10000" 
            mt={2}
          >
            <SearchList resultList={resultList} />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Search;