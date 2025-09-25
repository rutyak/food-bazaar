"use client";

import { Heading, Text, Box, Image, Divider } from "@chakra-ui/react";
import MenuOptions from "../menu-options/MenuOptions";
import starIcon from "@/assets/star-icon.svg";
import Footer from "@/container/footer/Footer";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Menubody = () => {
  const query = useParams<any>();
  const menuData = useSelector((state: RootState) => state.menu);

  const menu = menuData?.filter(
    (data: any) => data.restaurantId?.toString() === query?.id
  );

  return menu?.length === 0 ? (
    "Loading..."
  ) : (
    <>
      <div className="card-menu">
        <Heading as="h2" size="lg" className="title-restau">
          {menu[0]?.restaurant?.name}
        </Heading>
        <Box mt="4" className="restau-desc">
          <Box mb="23px">
            <Heading size="md" className="title-of-card">
              <Image src={starIcon?.src} alt="rating" />
              {menu?.[0]?.restaurant?.rating as any} | ₹
              {menu?.[0]?.restaurant?.pricefortwo} for two
            </Heading>
            <Text py="2" className="cuisine">
              {menu?.[0]?.restaurant?.categories}
            </Text>
          </Box>
          <Box mt="-30px" mb="-10px" ml="-5px">
            <Box display="flex" alignItems="center" mb="10px">
              <Box
                width="10px"
                height="10px"
                borderRadius="50%"
                bg="teal.500"
                mr="8px"
              />
              <Box fontSize="14px">
                <Text fontSize="14px" mb="1px">
                  Outlet
                </Text>
                <Text fontWeight="500" fontSize="14px" color="gray.300">
                  {menu?.[0]?.restaurant?.location}
                </Text>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box
                width="10px"
                height="10px"
                borderRadius="50%"
                bg="teal.500"
                mr="8px"
              />
              <Text fontSize="14px">45 - 50</Text>
            </Box>
          </Box>
          <Divider my="4" borderColor="gray.200" />{" "}
          {/* <Box>
            <Text className="dist-fees">
              {" "}
              {menu[2]?.card?.card?.info?.expectationNotifiers?.[0]?.enrichedText?.replace(
                /<[^>]*>/g,
                ""
              )}
            </Text>
          </Box> */}
        </Box>
        <Box className="list-items">
          <>
            {menu[0]?.categories?.map((data: any, index: number) => {
              return (
                <MenuOptions
                  key={data?.category + index}
                  category={data.category}
                  items={data.items}
                />
              );
            })}
          </>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default Menubody;
