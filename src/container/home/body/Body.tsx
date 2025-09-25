"use client";

import React, { useEffect, useState, useRef } from "react";
import Carousel from "../../../components/carousel/Carousel";
import { Heading, Box } from "@chakra-ui/react";
import "./Body.scss";
import Filter from "@/components/filtermodal/FIlter";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setRestaurants } from "@/redux/slices/restaurantSlice";
import Card from "@/components/card/Card";

interface restaurant {
  _id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  categories: string[];
  rating: number;
  priceForTwo: number;
}

const Body = ({ setFilteredCard, filteredCard, allCard }: any) => {
  const restaurants = useSelector((state: RootState) => state.restaurants);
  const menuItems = useSelector((state: RootState) => state.menu);

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const eventRef = useRef<any>(null);

  const dispatch = useDispatch();

  // const toast = useToast();
  // const loc = useLocation();

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

  //       console.log();
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

  useEffect(() => {
    addEventListener("scroll", eventRef.current);

    return () => removeEventListener("scroll", eventRef.current);
  }, []);

  return allCard?.length === 0 ? (
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
          Restaurants
        </Heading>
        <Filter
          setFilteredCard={setFilteredCard}
          filteredCard={filteredCard}
          allCard={allCard}
        />
        <Box className="restaurant-grid-card">
          {restaurants?.length > 0 &&
            restaurants?.map((data: any) => {
              return <Card key={data?._id} {...data} grid="grid" />;
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default Body;
