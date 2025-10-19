import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
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
import { useErrorToast, useSuccessToast } from "@/toasts/CustomeToasts";
import { RestaurantType } from "@/types/restaurant";
import styles from "./Search.module.scss";
const locationApi = process.env.NEXT_PUBLIC_LOCATION_API ?? "";

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  cart?: boolean;
}

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
          setIsLocating(false);

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

            successToast("Location detected");
          } catch (error) {
            console.error("Reverse geocoding error:", error);
            errorToast("Geocoding failed");
          }
        },
        (error) => {
          setIsLocating(false);
          console.error("Location error:", error);

          errorToast("Location error");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setIsLocating(false);
      errorToast("Geolocation not supported");
    }
  };

  return (
    <div className={styles.search}>
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
