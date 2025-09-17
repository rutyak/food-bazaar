"use client";

import { useState } from "react";
import Body from "../container/home/body/Body";
import Header from "../container/home/header/Header";
import Footer from "../container/footer/Footer";

export default function Home() {
  const [filteredCard, setFilteredCard] = useState<any>([]);
  const [search, setSearch] = useState<any>("");
  const [allCard, setAllCard] = useState<any>([]);

  return (
    <>
      <Header
        setFilteredCard={setFilteredCard}
        setSearch={setSearch}
        search={search}
        allCard={allCard}
      />
      <Body
        setFilteredCard={setFilteredCard}
        filteredCard={filteredCard}
        setSearch={setSearch}
        search={search}
        allCard={allCard}
        setAllCard={setAllCard}
      />
      <Footer />
    </>
  );
}
