import starIcon from "@/assets/star-icon.svg";
import "./Card.scss";

import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Flex, Image, Text } from "@chakra-ui/react";
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
          {/* Restaurant image → Next.js Image */}
          <NextImage
            src={image}
            width={250}
            height={182}
            alt={name}
            className="restaurant-img"
          />
        </div>
        <div className="info">
          <h2 className="title">{name}</h2>
          <Flex className="rating" gap={2} alignItems="center">
            {/* Star icon → Chakra Image is fine */}
            <img src={starIcon?.src} alt="rating" style={{ width: "14px" }} />
            <Text fontSize="13px">{rating}</Text>
          </Flex>
          <p className="cuisines">{categories?.join(", ")}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
