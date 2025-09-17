"use client";

import React, { useEffect, useState, useContext, useRef } from "react";
import Card from "../../../components/card/Card";
import Carousel from "../../../components/carousel/Carousel";
import Shimmer from "../../../components/shimmer-effect/Shimmer";
import Search from "@/container/search/Search";
import { Heading, Box } from "@chakra-ui/react";
import "./Body.scss";
import Filter from "@/components/filtermodal/FIlter";
import { debounce } from "lodash";
import VariableContext from "@/context/VariableContext";
import { v4 } from "uuid";

const Body = ({
  setFilteredCard,
  filteredCard,
  setSearch,
  search,
  allCard,
  setAllCard,
}: any) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const { location } = useContext<any>(VariableContext);
  const eventRef = useRef<any>(null);

  console.log("lat: ", location?.lat, "long: ", location?.lng);

  const uniqueId = v4();
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

  useEffect(() => {
    getData();
  }, [location?.lat, location?.lng]);

  const handleInfiniteScroll = async () => {
    const scrollPosition =
      document.documentElement.scrollTop + window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollPosition + 1 >= scrollHeight) {
      removeEventListener("scroll", eventRef.current);
      return;
    }

    if (scrollPosition + 300 >= scrollHeight) {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/restaurant?lat=${location.lat}&lng=${location.lng}`
        );

        console.log(res);
        const data = await res.json();

        const newCards =
          data?.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;

        setAllCard((prevCard: any) => [
          ...(prevCard || []),
          ...(newCards || []),
        ]);
        setFilteredCard((prevCard: any) => [
          ...(prevCard || []),
          ...(newCards || []),
        ]);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  eventRef.current = debounce(handleInfiniteScroll, 100);

  useEffect(() => {
    addEventListener("scroll", eventRef.current);

    return () => removeEventListener("scroll", eventRef.current);
  }, []);

  async function getData() {

    console.log("lat: ", location.lat, "lng: ", location.lng);
    
    try {
      const res = await fetch(
        `api/restaurant?lat=${location.lat}&lng=${location.lng}`
      );
      const data = await res.json();

      setData(data?.data?.data);
      console.log("data in body %%%%%%%%%: ", data?.data?.data);

      const restaurants =
        data?.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      setAllCard(restaurants);
      setFilteredCard(restaurants);

      console.log("fetched restaurants::", restaurants);
    } catch (error) {
      console.error(error);
    }
  }

  return allCard?.length === 0 ? (
    <Shimmer />
  ) : (
    <Box className="home-page">
      {window.innerWidth > 885 &&
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
      )}
      {window.innerWidth > 885 &&
      data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        ?.length > 0 ? (
        <Carousel
          suggestions={
            data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
          }
          title={data?.cards[1]?.card?.card.header?.title}
        />
      ) : (
        " "
      )}
      <Box mt="1rem" className="grid-card-heading">
        <Heading as="h2" fontSize={["xl","2xl"]} mb="1rem">
          {data?.cards[2]?.card?.card?.title}
        </Heading>
        <Filter
          setFilteredCard={setFilteredCard}
          filteredCard={filteredCard}
          allCard={allCard}
        />
        <Box className="restaurant-grid-card">
          {filteredCard?.length > 0 &&
            filteredCard?.map((data: any, index: any) => {
              return (
                <Card
                  key={data?.info?.name + " " + index}
                  {...data?.info}
                  grid="grid"
                />
              );
            })}
          {isLoading && <Shimmer newLoad="newLoad" />}
        </Box>
      </Box>
    </Box>
  );
};

export default Body;
