import { Button, Box } from "@chakra-ui/react";
import "./Filter.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { RestaurantType } from "@/types/restaurant";

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

  const [togglebtn, setToggleBtn] = useState<toggleBtnType>({
    all: false,
    pureVeg: false,
    ratings: false,
    fast: false,
    lessThan200: false,
  });

  const handleFilter = (type: string) => {
    setToggleBtn({
      all: false,
      pureVeg: false,
      ratings: false,
      fast: false,
      lessThan200: false,
      [type]: !(togglebtn as any)[type],
    });

    let newFilteredCard: RestaurantType[] = [];

    switch (type) {
      case "all":
        newFilteredCard = restaurants;
        break;
      case "pureVeg":
        newFilteredCard = restaurants.filter((card: RestaurantType) => card?.veg === true);
        break;
      case "ratings":
        newFilteredCard = restaurants.filter((card: RestaurantType) => card?.rating > 4);
        break;
      case "fast":
        newFilteredCard = restaurants.filter((card: RestaurantType) => {
          if (card?.deliveryTime === "15-20 mins") {
            return card;
          }
        });
        break;
      case "lessThan200":
        newFilteredCard = restaurants.filter(
          (card: RestaurantType) => card?.pricefortwo < 200
        );
        break;
    }
    setFilteredCard(newFilteredCard);
  };

  return (
    <>
      <Box className="restaurant-grid-filter">
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => handleFilter("all")}
          bgColor={togglebtn.all ? "black" : "white"}
        >
          All
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => handleFilter("pureVeg")}
          bgColor={togglebtn.pureVeg ? "black" : "white"}
        >
          Pure Veg
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => handleFilter("ratings")}
          bgColor={togglebtn.ratings ? "black" : "white"}
        >
          Ratings 4.0+
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => handleFilter("fast")}
          bgColor={togglebtn.fast ? "black" : "white"}
        >
          Fast Delivery
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => handleFilter("lessThan200")}
          bgColor={togglebtn.lessThan200 ? "black" : "white"}
        >
          Less than Rs.200
        </Button>
      </Box>
    </>
  );
}

export default Filter;
