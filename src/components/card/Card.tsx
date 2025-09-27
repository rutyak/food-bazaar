import starIcon from "@/assets/star-icon.svg";
import "./Card.scss";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";
import { RestaurantType } from "@/types/restaurant";

const Card = ({
  _id,
  name,
  description,
  image,
  location,
  categories,
  rating,
}: RestaurantType) => {
  
  return (
    <Link href={`/menu/${_id}`} style={{ textDecoration: "none" }}>
      <div className="grid-card">
        <div className="card-img">
          <Image src={image} width={250} height={182} alt="card-image" />
        </div>
        {!false && (
          <div className="info">
            <h2 className="title">{name}</h2>
            <Flex className="rating" gap={5} alignItems="center">
              <Image src={starIcon} width={15} height={15} alt="rating" />
              <Text fontSize={13}>{rating}</Text>
            </Flex>
            <p className="cuisines">{categories?.join(", ")}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
