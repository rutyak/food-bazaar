"use client";

import React, { useState } from "react";
import { Heading, Box } from "@chakra-ui/react";
import "./Body.scss";
import Filter from "@/components/filtermodal/FIlter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Card from "@/components/card/Card";
import { useGlobalContext } from "@/context/GlobalContext";
import Carousel from "@/components/carousel/Carousel";
import { RestaurantType } from "@/types/restaurant";

const Body = () => {
  const restaurants = useSelector((state: RootState) => state.restaurants);

  const { city } = useGlobalContext();
  const currCity = city.split(",")[0];

  const [filteredCard, setFilteredCard] =
    useState<RestaurantType[]>(restaurants);

  const dispatch = useDispatch();

  // const isToastActive = useRef(false);

  // if (!user && loc.state?.message && !isToastActive.current) {
  //   isToastActive.current = true;

  //   toast({
  //     title: "Please login to access the cart!!",
  //     status: "error",
  //     duration: 3000,
  //     isClosable: true,
  //     onCloseComplete: () => {
  //       isToastActive.current = false;
  //     },
  //   });
  // }

  // const handleInfiniteScroll = async () => {
  //   const scrollPosition =
  //     document.documentElement.scrollTop + window.innerHeight;
  //   const scrollHeight = document.documentElement.scrollHeight;

  //   if (scrollPosition + 1 >= scrollHeight) {
  //     removeEventListener("scroll", eventRef.current);
  //     return;
  //   }

  //   if (scrollPosition + 300 >= scrollHeight) {
  //     setIsLoading(true);
  //     try {
  //       const res = await fetch(
  //         `/api/restaurant?lat=${location.lat}&lng=${location.lng}`
  //       );

  //       const data = await res.json();

  //       const newCards =
  //         data?.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  //           ?.restaurants;

  //       setAllCard((prevCard: any) => [
  //         ...(prevCard || []),
  //         ...(newCards || []),
  //       ]);
  //       setFilteredCard((prevCard: any) => [
  //         ...(prevCard || []),
  //         ...(newCards || []),
  //       ]);
  //     } catch (error) {
  //       console.error("There was a problem with your fetch operation:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  // eventRef.current = debounce(handleInfiniteScroll, 100);

  // eventRef.current = (event: Event) => {
  // };

  // useEffect(() => {
  //   const handler = eventRef.current;
  //   addEventListener("scroll", handler);

  //   return () => removeEventListener("scroll", handler);
  // }, []);

  function onEdit() {
    console.log("On edit clicked");
  }

  function onDelete() {
    console.log("On delete clicked");
  }

  return restaurants?.length === 0 ? (
    "Loading..."
  ) : (
    <Box className="home-page">
      {/* {window.innerWidth > 885 &&
      data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info?.length >
        0 ? (
        <Carousel
          suggestions={
            data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
          }
          title={data?.cards[0]?.card?.card.header?.title}
        />
      ) : (
        " "
      )} */}

      <Carousel suggestions={restaurants} title="Top Restaurants" />
      <Box mt="1rem" className="grid-card-heading">
        <Heading as="h2" fontSize={["xl", "2xl"]} mb="1rem">
          Restaurants in {currCity}
        </Heading>
        <Filter setFilteredCard={setFilteredCard} />
        <Box className="restaurant-grid-card">
          {filteredCard?.length > 0 &&
            filteredCard?.map((data: RestaurantType) => {
              return (
                <Card
                  key={data?._id}
                  {...data}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default Body;
