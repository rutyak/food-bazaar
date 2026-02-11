"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Heading,
  Box,
  VStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGlobalContext } from "@/context/GlobalContext";
import Carousel from "@/components/carousel/Carousel";
import { RestaurantType } from "@/types/restaurant";
import axios from "axios";
import { addRestaurants, removeCards } from "@/redux/slices/restaurantSlice";
import Restaurants from "./restaurants/Restaurants";

const Dashboard = () => {
  const restaurants = useSelector((state: RootState) => state.restaurants);
  const dispatch = useDispatch();

  const { city } = useGlobalContext();
  const currCity = city.split(",")[0];

  const [filteredCard, setFilteredCard] =
    useState<RestaurantType[]>(restaurants);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  // const lastCardRef = useCallback(
  //   (node: HTMLDivElement | null) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();

  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         setPage((prev) => prev + 1);
  //       }
  //     });

  //     if (node) observer.current.observe(node);
  //   },
  //   [loading, hasMore],
  // );

  async function getRestaurants(page: number) {
    try {
      setLoading(true);
      const res = await axios.get(`/api/restaurant?page=${page}&limit=8`);
      const newRestaurants = res?.data?.restaurants || [];
      setHasMore(res?.data?.hasMore);
      dispatch(addRestaurants(newRestaurants));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRestaurants(page);
  }, [page]);

  useEffect(() => {
    dispatch(removeCards());

    return () => {
      dispatch(removeCards());
    };
  }, []);

  return restaurants?.length === 0 ? (
    <VStack spacing={3} justify="center" align="center" h="100vh">
      <Spinner
        thickness="4px"
        speed="0.8s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
      <Text fontSize="20px" color="gray.600">
        Loading...
      </Text>
    </VStack>
  ) : (
    <Box className="home-page" bgColor="white">
      <Carousel suggestions={restaurants} title="Top Restaurants" />
      <Restaurants />
    </Box>
  );
};

export default Dashboard;
