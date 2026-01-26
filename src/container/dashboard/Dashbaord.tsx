"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Heading, Box, Skeleton, SkeletonText, VStack, Spinner, Text } from "@chakra-ui/react";
import "./Dashboard.scss";
import Filter from "@/components/filtermodal/FIlter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Card from "@/components/card/Card";
import { useGlobalContext } from "@/context/GlobalContext";
import Carousel from "@/components/carousel/Carousel";
import { RestaurantType } from "@/types/restaurant";
import axios from "axios";
import { addRestaurants, removeCards } from "@/redux/slices/restaurantSlice";
import NotFound from "@/components/notFound/NotFound";

const ShimmerCards = () => {
  return (
    <Box
      className="restaurant-grid-card"
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap="1.5rem"
    >
      {[...Array(4)].map((_, index) => (
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
            <NotFound
              title="No restaurants found"
              message="Try adjusting your filters or search criteria."
            />
          )}
        </Box>

        {loading && <ShimmerCards />}
      </Box>
    </Box>
  );
};

export default Dashboard;
