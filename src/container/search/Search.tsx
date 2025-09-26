import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import useFilter from "@/utils/useFilter";
import SearchList from "./searchlist/SearchList";
import * as searchStyles from "./Search.module.scss";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import CustomPopover from "@/components/popover/CustomPopover";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGlobalContext } from "@/context/GlobalContext";
const locationApi = process.env.NEXT_PUBLIC_LOCATION_API ?? "";

interface SearchProps {
  setSearch: any;
  search: any;
  cart?: boolean;
}

const Search = ({ setSearch, search, cart }: SearchProps) => {
  const restaurants = useSelector((state: RootState) => state.restaurants);

  const { city, setCity } = useGlobalContext();

  const [resultList, setResultList] = useState<any[]>([]);
  const [isLocating, setIsLocating] = useState(false);

  const styles: any = searchStyles;

  const toast = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    console.log("search value:", searchValue);
    console.log("restaurants: ", restaurants);

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
          setIsLocating(false);

          console.log("latitude: ", lat);
          console.log("longitude: ", lng);

          try {
            const response = await fetch(
              `${locationApi}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
            );

            if (!response.ok) {
              throw new Error("Failed to fetch location data");
            }

            const data = await response.json();
            const city = data?.city || data?.locality || "Unknown location";
            const state = data?.principalSubdivision || "Unknown state";

            setCity(`${city + ", " + state}`);

            toast({
              title: "Location detected",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } catch (error) {
            console.error("Reverse geocoding error:", error);
            toast({
              title: "Geocoding failed",
              description: "Unable to retrieve city name",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        },
        (error) => {
          setIsLocating(false);
          console.error("Location error:", error);

          toast({
            title: "Location error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setIsLocating(false);
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className={styles["search"]}>
      <div style={{ border: "20px 0px 0px 20px" }}>
        <CustomPopover
          text="Location"
          onDetectLocation={handleDetectLocation}
          currentLocation={city}
        />
      </div>

      <Box position="relative">
        {!cart && (
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<GoSearch color="gray.500" />}
              style={{ paddingLeft: "8px" }}
            />
            <Input
              placeholder="Search for a restaurant..."
              size="md"
              onChange={handleSearch}
              onKeyDown={handleEnter}
              value={search}
              className="search"
              pl="32px"
            />
          </InputGroup>
        )}

        {search && search !== " " && <SearchList resultList={resultList} />}
      </Box>
    </div>
  );
};

export default Search;
