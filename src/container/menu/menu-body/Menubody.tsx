"use client";

import { Heading, Text, Box, Image, Divider } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import MenuOptions from "../menu-options/MenuOptions";
import starIcon from "@/assets/star.png";
import Footer from "@/container/footer/Footer";
import * as menuFooter from "./MenuFooter.module.scss";
import Shimmer from "@/components/shimmer-effect/Shimmer";
import * as menuShimmerStyle from "@/components/shimmer-effect/MenuShimmer.module.scss";
import VariableContext from "@/context/VariableContext";
import { useParams } from "next/navigation";
import React from "react";
import { v4 } from "uuid";

interface MenuQuery {
  id?: string;
}

const Menubody = () => {
  const query = useParams<any>();
  const [menu, setMenu] = useState<any>([]);
  const [menuOpt, setMenuOpt] = useState<any>([]);
  const { location } = useContext(VariableContext);
  const uniqueId = v4();

  useEffect(() => {
    if (query?.id && location?.lat && location?.lng) {
      getMenumenu(query?.id, location.lat, location.lng);
    }
  }, [query.id, location]);

  console.log("menu menu dta #############: ", menu);

  async function getMenumenu(restaurantId: string, lat: number, lng: number) {
    try {
      console.log("restaurantId, lat, lng", restaurantId, lat, lng);

      const res = await fetch(
        `/api/menu/${restaurantId}?lat=${lat}&lng=${lng}`
      );
      const data = await res?.json();
      console.log("menu cards: ", data);
      setMenu(data?.data?.data?.cards);
      const menuFetched =
        data?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      setMenuOpt(menuFetched);
      console.log(
        "menu card",
        data?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
      );
    } catch (error) {
      console.error("error: ", error);
    }
  }

  return menuOpt?.length === 0 ? (
    <Shimmer menuShimmerStyle={menuShimmerStyle} />
  ) : (
    <>
      <div className="card-menu">
        <Heading as="h2" size="lg" className="title-restau">
          {/* {menu[0]?.card?.card?.text} */}
        </Heading>
        <Box mt="4" className="restau-desc">
          <Box mb="23px">
            <Heading size="md" className="title-of-card">
              <Image src={starIcon?.src} alt="rating" />
              {menu[2]?.card?.card?.info?.avgRating} (
              {menu[2]?.card?.card?.info?.totalRatingsString}) |{" "}
              {menu[2]?.card?.card?.info?.costForTwoMessage}
            </Heading>
            <Text py="2" className="cuisine">
              {menu[2]?.card?.card?.info?.labels?.[2]?.message}
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
                  {menu[2]?.card?.card?.info?.areaName}
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
              <Text fontSize="14px">
                {menu[2]?.card?.card?.info?.sla?.slaString}
              </Text>
            </Box>
          </Box>
          <Divider my="4" borderColor="gray.200" />{" "}
          <Box>
            <Text className="dist-fees">
              {" "}
              {menu[2]?.card?.card?.info?.expectationNotifiers?.[0]?.enrichedText?.replace(
                /<[^>]*>/g,
                ""
              )}
            </Text>
          </Box>
        </Box>
        <Box className="list-items">
          <>
            {console.log("menuoptions: ", menuOpt)}
            {menuOpt?.map((item: any, index: number) => {
              if (item?.card?.card?.itemCards) {
                return (
                  <MenuOptions
                    key={item?.card?.card?.categoryId || index}
                    options={item?.card?.card}
                  />
                );
              }
            })}
          </>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default Menubody;
