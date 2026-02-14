"use client";

import NavbarContainer from "@/components/navbar/NavbarContainer";
import "./Menu.scss";
import Menubody from "./menu-body/Menubody";

const Menu = () => {
  return (
    <div className="menu">
      <NavbarContainer setSearch={() => {}} search="" isMenu={true} />
      <Menubody />
    </div>
  );
};

export default Menu;
