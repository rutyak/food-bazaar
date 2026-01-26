"use client";

import React from "react";
import { Box, Flex, Image, Text, VStack, Badge } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import { RestaurantType } from "@/types/restaurant";
import "./SearchList.scss";

const SearchList = ({ resultList }: { resultList: RestaurantType[] }) => {
  return (
    <Box className="searchList" zIndex={100}>
      {resultList?.length === 0 ? (
        <Box p={6} textAlign="center">
          <Text color="gray.500" fontWeight="500">
            No restaurants found
          </Text>
        </Box>
      ) : (
        <VStack align="stretch" spacing={0}>
          {resultList?.map((list: RestaurantType) => (
            <Link 
              key={list?._id} 
              href={`/menu/${list?._id}`} 
              className="search-item-link"
            >
              <Flex className="search-item-content">
                <Image
                  src={list?.image as string}
                  alt={list?.name}
                  boxSize="60px"
                  borderRadius="10px"
                  objectFit="cover"
                  fallbackSrc="https://via.placeholder.com/60"
                />
                
                <Flex direction="column" flex="1" gap="2px">
                  <Text className="restaurant-name">
                    {list?.name}
                  </Text>
                  
                  <Flex align="center" gap="8px">
                    <Flex align="center" gap="1" color="orange.400" fontSize="xs" fontWeight="bold">
                      <AiFillStar /> {list?.rating || "N/A"}
                    </Flex>
                    <Text fontSize="xs" color="gray.500" isTruncated>
                      • {list?.categories}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Link>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default SearchList;