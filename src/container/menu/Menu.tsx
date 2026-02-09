"use client";

import NavbarContainer from "@/components/navbar/NavbarContainer";
import "./Menu.scss";
import Menubody from "./menu-body/Menubody";

const Menu = () => {
  return (
    <div className="menu">
      <NavbarContainer isMenu={true} setSearch={() => {}} search="" />
      <Menubody />
    </div>
  );
};

export default Menu;
