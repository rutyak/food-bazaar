"use client";

import { useEffect, useState } from "react";
import Body from "../container/home/body/Body";
import Header from "../container/home/header/Header";
import Footer from "../container/footer/Footer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setRestaurants } from "@/redux/slices/restaurantSlice";
import { setMenu } from "@/redux/slices/menuSlice";
import { setCarts } from "@/redux/slices/cartSlice";

export default function Home() {
  const dispatch = useDispatch();

  async function getRestaurant() {
    try {
      const res = await axios.get(`/api/restaurant`);

      console.log("all data: ", res?.data?.restaurants);

      const restaurants = res?.data?.restaurants;

      dispatch(setRestaurants(restaurants));

      console.log("fetched restaurants::", restaurants);
    } catch (error) {
      console.error(error);
    }
  }

  async function getMenu() {
    try {
      const res = await axios.get("/api/menuItem");

      console.log("res getmenu home: ", res?.data?.allMenu);
      dispatch(setMenu(res?.data?.allMenu));
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async function getCarts() {
    try {
      const res = await axios.get("/api/cart");
      console.log("carts ^^^^^^^^^^: ", res?.data?.carts);
      dispatch(setCarts(res.data?.carts));
    } catch (error: any) {
      console.error(error?.error);
    }
  }

  useEffect(() => {
    getRestaurant();
    getMenu();
    getCarts();
  }, []);

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}
