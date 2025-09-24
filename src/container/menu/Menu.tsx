"use client";

import "./Menu.scss";
import Menubody from "./menu-body/Menubody";
import MenuNavbar from "./menuNavbar/MenuNavbar";
import { useSelector } from "react-redux";

const Menu = () => {
  return (
    <div className="menu">
      <MenuNavbar cartLen={2} />
      <Menubody />
    </div>
  );
};

export default Menu;
