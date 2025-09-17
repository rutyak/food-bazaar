import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import useFilter from "@/utils/useFilter";
import SearchList from "./searchlist/SearchList";
import * as searchStyles from "./Search.module.scss";
import { useContext, useState } from "react";
import VariableContext from "@/context/VariableContext";
import { GoSearch } from "react-icons/go";
import CustomPopover from "@/components/popover/CustomPopover";
import React from "react";
import { stringify } from "node:querystring";
const locationApi = process.env.NEXT_PUBLIC_LOCATION_API_URL;

interface SearchProps {
  setFilteredCard: (data: any[]) => void;
  setSearch: (value: string) => void;
  search: string;
  allCard: any[];
  cart?: boolean;
}

const Search = ({
  setFilteredCard,
  setSearch,
  search,
  allCard,
  cart,
}: SearchProps) => {
  const [resultList, setResultList] = useState<any[]>([]);
  const [isLocating, setIsLocating] = useState(false);
  const [city, setCity] = useState("");

  const { setLocation } = useContext(VariableContext);
  const styles: any = searchStyles;

  const toast = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    const filteredData = useFilter(searchValue, allCard);
    setResultList(filteredData);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;

    if (e.key === "Enter") {
      const filteredData = useFilter(searchValue, allCard);
      setResultList([]);
      setSearch("");
      setFilteredCard(filteredData);
    }
  };

  const handleDetectLocation = () => {
    setIsLocating(true);

    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          localStorage.setItem("location", JSON.stringify({ lat, lng }));
          setLocation({ lat, lng });
          setIsLocating(false);

          console.log(`Detected location: Latitude ${lat}, Longitude ${lng}`);

          try {
            const response = await fetch(
              `${locationApi}&q=${lat},${lng}&aqi=yes`
            );
            const data = await response.json();
            // const city =
            //   data.results[0]?.components?.city ||
            //   data.results[0]?.components?.town ||
            //   data.results[0]?.components?.village ||
            //   "Unknown location";

            console.log("City:", data.results[0]?.components?.city);

            setCity(data.results[0]?.components?.city);

            toast({
              title: "Location detected",
              // description: `City: ${city}`,
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
              placeholder="Search your food..."
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
