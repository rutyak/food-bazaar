"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Heading, Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import "./Body.scss";
import Filter from "@/components/filtermodal/FIlter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Card from "@/components/card/Card";
import { useGlobalContext } from "@/context/GlobalContext";
import Carousel from "@/components/carousel/Carousel";
import { RestaurantType } from "@/types/restaurant";
import axios from "axios";
import { addRestaurants, removeCards } from "@/redux/slices/restaurantSlice";

const Body = () => {
  const restaurants = useSelector((state: RootState) => state.restaurants);
  const dispatch = useDispatch();

  const { city } = useGlobalContext();
  const currCity = city.split(",")[0];

  const [filteredCard, setFilteredCard] = useState<RestaurantType[]>(restaurants);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200 && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

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
    if (hasMore) getRestaurants(page);
  }, [page]);

  useEffect(() => {
    if (restaurants.length === 0) getRestaurants(1);
    else setFilteredCard(restaurants);
  }, [restaurants]);

  useEffect(() => {
    return () => {
      dispatch(removeCards());
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const ShimmerCards = () => {
    return (
      <Box
        className="restaurant-grid-card"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap="1.5rem"
      >
        {[...Array(8)].map((_, index) => (
          <Box
            key={index}
            p="4"
            borderRadius="2xl"
            boxShadow="md"
            bg="white"
            display="flex"
            flexDirection="column"
          >
            <Skeleton height="150px" borderRadius="xl" mb="4" />
            <SkeletonText mt="2" noOfLines={3} spacing="3" skeletonHeight="3" />
          </Box>
        ))}
      </Box>
    );
  };

  return restaurants?.length === 0 ? (
    <Box textAlign="center" color="gray" fontSize="20px">
      Loading...
    </Box>
  ) : (
    <Box className="home-page">
      <Carousel suggestions={restaurants} title="Top Restaurants" />
      <Box mt="1rem" className="grid-card-heading">
        <Heading as="h2" fontSize={["xl", "2xl"]} mb="1rem">
          Restaurants in {currCity}
        </Heading>
        <Filter setFilteredCard={setFilteredCard} />

        <Box className="restaurant-grid-card">
          {filteredCard?.length > 0 ? (
            filteredCard.map((data: RestaurantType, index: number) => {
              if (index === filteredCard.length - 1) {
                return (
                  <div ref={lastCardRef} key={data?._id}>
                    <Card {...data} />
                  </div>
                );
              } else {
                return <Card key={data?._id} {...data} />;
              }
            })
          ) : (
            <Box
              h="300px"
              w="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              color="gray.600"
              fontSize="xl"
              fontWeight="semibold"
              gap={3}
            >
              <Box fontSize="3xl" color="gray.400">
                🍽️
              </Box>
              <Box>No restaurants found</Box>
              <Box fontSize="sm" color="gray.500">
                Try adjusting your filters or search criteria.
              </Box>
            </Box>
          )}
        </Box>

        {/* 👇 Replace spinner with shimmer while loading more */}
        {loading && <ShimmerCards />}
      </Box>
    </Box>
  );
};

export default Body;
