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
import axios from "axios";

interface MenuQuery {
  id?: string;
}

const Menubody = () => {
  const query = useParams<any>();
  const [menu, setMenu] = useState<any>([]);
  const [menuOpt, setMenuOpt] = useState<any>([]);
  const { location } = useContext(VariableContext);

  useEffect(() => {
    if (query?.id) {
      getMenu(query?.id);
    }
  }, [query.id]);

  console.log("menu menu dta #############: ", menu);

  async function getMenu(restaurantId: string) {
    try {
      console.log("restaurantId on card click: ", restaurantId);

      const data = await axios.get(`/api/menu/${restaurantId}`);
      console.log("menu cards: ", data?.data?.menuItems);
      setMenu(data?.data?.menuItems);
      // const menuFetched =
      //   data?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      // setMenuOpt(menuFetched);
    } catch (error) {
      console.error("error: ", error);
    }
  }

  return menu?.length === 0 ? (
    <Shimmer menuShimmerStyle={menuShimmerStyle} />
  ) : (
    <>
      <div className="card-menu">
        <Heading as="h2" size="lg" className="title-restau">
          {menu[0]?.restaurantId?.name}
        </Heading>
        <Box mt="4" className="restau-desc">
          <Box mb="23px">
            <Heading size="md" className="title-of-card">
              <Image src={starIcon?.src} alt="rating" />
              {menu[0]?.restaurantId?.rating}
              {/* {menu[0]?.restaurantId?.totalRatingsString}) |{" "} */}
              {/* {menu[0]?.restaurantId?.costForTwoMessage} */}
            </Heading>
            <Text py="2" className="cuisine">
              {menu[0]?.restaurantId?.categories}
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
                  {menu[0]?.restaurantId?.location}
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
                45 - 50
              </Text>
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
            {menu?.map((item: any, index: number) => {
              return <MenuOptions key={item?._id} item={item} />;
            })}
          </>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default Menubody;
