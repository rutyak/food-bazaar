"use client";

import "./Menu.scss";
import Menubody from "./menu-body/Menubody";
import MenuNavbar from "./menuNavbar/MenuNavbar";
import { useSelector } from "react-redux";

const Menu = () => {

  const cartAll = useSelector((state: any) => state.cart?.cartItems);

  return (
    <div className="menu">
      <MenuNavbar cartLen={cartAll?.length} />
      <Menubody />
    </div>
  );
};

export default Menu;
