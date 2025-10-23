"use client";

import { useEffect } from "react";
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

  async function getMenu() {
    try {
      const res = await axios.get("/api/menuItem");

      dispatch(setMenu(res?.data?.allMenu));
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async function getCarts() {
    try {
      const res = await axios.get("/api/cart");
      dispatch(setCarts(res.data?.carts));
    } catch (error: any) {
      console.error(error?.error);
    }
  }

  useEffect(() => {
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
