"use client";

import { useEffect } from "react";
import Dashboard from "../container/dashboard/Dashbaord";
import Header from "../container/dashboard/header/Header";
import Footer from "../container/footer/Footer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMenu } from "@/redux/slices/menuSlice";
import { setCarts } from "@/redux/slices/cartSlice";
import BackgroundImage from "@/components/backgroundImage/BackgroundImage";

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
      <Dashboard />
      <Footer />
    </>
  );
}
