"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Heading,
  Box,
  VStack,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import "./Restaurants.scss";
import Filter from "@/components/filtermodal/FIlter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Card from "@/components/card/Card";
import { useGlobalContext } from "@/context/GlobalContext";
import { RestaurantType } from "@/types/restaurant";
import axios from "axios";
import { addRestaurants, removeCards } from "@/redux/slices/restaurantSlice";
import NotFound from "@/components/notFound/NotFound";

const ShimmerCards = () => (
  <Box
    className="restaurant-grid-card"
    display="grid"
    gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
    gap="2rem"
  >
    {[...Array(4)].map((_, index) => (
      <Box key={index} borderRadius="2xl" overflow="hidden" bg="white" p="4">
        <Skeleton height="180px" borderRadius="xl" mb="4" />
        <SkeletonText noOfLines={3} spacing="3" />
      </Box>
    ))}
  </Box>
);

const Restaurants = () => {
  const restaurants = useSelector((state: RootState) => state.restaurants);
  const dispatch = useDispatch();
  const { city } = useGlobalContext();
  const currCity = city?.split(",")[0] || "Your Area";

  const [filteredCard, setFilteredCard] = useState<RestaurantType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  // Sync filteredCard with Redux store
  useEffect(() => {
    setFilteredCard(restaurants);
  }, [restaurants]);

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
    [loading, hasMore],
  );

  const getRestaurants = async (pageNumber: number) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/restaurant?page=${pageNumber}&limit=8`);
      const newRestaurants = res?.data?.restaurants || [];
      setHasMore(res?.data?.hasMore);
      dispatch(addRestaurants(newRestaurants));
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestaurants(page);
  }, [page]);

  useEffect(() => {
    return () => {
      dispatch(removeCards());
    };
  }, [dispatch]);

  return (
    <Box mt="16px">
      <VStack align="flex-start" spacing={1} mb="15px">
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="800"
          letterSpacing="tight"
          lineHeight="1.2"
          color="gray.800"
        >
          Restaurants in{" "}
          <Text
            as="span"
            bgGradient="linear(to-r, orange.400, red.500)"
            bgClip="text"
          >
            {currCity}
          </Text>
        </Heading>
        <Box
          h="4px"
          w="60px"
          bgGradient="linear(to-r, orange.400, red.500)"
          borderRadius="full"
        />
      </VStack>

      <Filter setFilteredCard={setFilteredCard} />

      <Box mt="32px">
        {filteredCard?.length > 0 ? (
          <Box className="restaurant-grid-card">
            {filteredCard.map((data: RestaurantType, index: number) => {
              if (index === filteredCard.length - 1) {
                return (
                  <Box
                    className="this you want"
                    ref={lastCardRef}
                    key={data?._id || index}
                  >
                    <Card {...data} />
                  </Box>
                );
              }
              return <Card key={data?._id || index} {...data} />;
            })}
          </Box>
        ) : (
          !loading && (
            <NotFound
              title="No restaurants found"
              message="Try adjusting your filters or search criteria."
            />
          )
        )}
      </Box>

      {loading && (
        <Box mt={6}>
          <ShimmerCards />
        </Box>
      )}
    </Box>
  );
};

export default Restaurants;
