"use client";

import { Heading, Text, Box, Image, Divider } from "@chakra-ui/react";
import MenuOptions from "../menu-options/MenuOptions";
import starIcon from "@/assets/star-icon.svg";
import Footer from "@/container/footer/Footer";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CategoryType, MenuType } from "@/types/menu";
import { Params } from "next/dist/server/request/params";

// interface Params {
//   id: string;
// }
const Menubody = () => {
  const query = useParams<Params>();
  const menuData = useSelector((state: RootState) => state.menu);

  const menu = menuData?.filter(
    (data: MenuType) => data.restaurantId?.toString() === query?.id
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
              {menu?.[0]?.restaurant?.rating as number} | ₹
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
        </Box>
        <Box className="list-items">
          <>
            {console.log("menu[0]?.categories: ",menu[0]?.categories)}
            {menu[0]?.categories?.map((data: CategoryType, index: number) => {
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
