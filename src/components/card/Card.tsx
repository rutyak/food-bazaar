import starIcon from "@/assets/star-icon.svg";
import "./Card.scss";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { RestaurantType } from "@/types/restaurant";

const Card = ({
  _id,
  name,
  description,
  image,
  location,
  categories,
  rating,
  onEdit,
  onDelete,
}: RestaurantType) => {
  return (
    <div className="grid-card">
      <Flex
        position="absolute"
        top="8px"
        right="8px"
        mt={2}
        mr={2}
        gap={2}
        zIndex={10}
      >
        <IconButton
          aria-label="Edit item"
          icon={<MdEdit size={16} />}
          size="sm"
          colorScheme="yellow"
          variant="solid"
          onClick={() => onEdit?.(_id as string)}
        />
        <IconButton
          aria-label="Delete item"
          icon={<MdDeleteOutline size={16} />}
          size="sm"
          colorScheme="red"
          variant="solid"
          onClick={() => onDelete?.(_id as string)}
        />
      </Flex>
      <Link href={`/menu/${_id}`} style={{ textDecoration: "none" }}>
        <div className="card-img">
          <Image
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
            <img src={starIcon?.src} alt="rating" style={{ width: "14px" }} />
            <Text fontSize="13px">{rating}</Text>
          </Flex>
          <p className="cuisines">{categories?.join(", ")}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
