import starIcon from "@/assets/star-icon.svg";
import "./Card.scss";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { RestaurantType } from "@/types/restaurant";
import { useSession } from "next-auth/react";
import EditModal from "../customeModal/EditModal";
import DeleteAlert from "../customeModal/DeleteAlert";

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
  const { data: sessesion, status } = useSession();

  return (
    <div className="grid-card">
      {sessesion?.user.role === "admin" && (
        <Flex
          position="absolute"
          top="8px"
          right="8px"
          mt={2}
          mr={2}
          gap={2}
          zIndex={10}
        >
          <EditModal modalTitle="Edit Restaurant" id={_id as string} />
          <DeleteAlert id={_id as string} type="restaurant" />
        </Flex>
      )}
      <Link href={`/menu/${_id}`} style={{ textDecoration: "none" }}>
        <div className="card-img">
          <Image
            src={image as string}
            width={250}
            height={182}
            alt={name as string}
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
