import { image_url } from "@/config/Config";
import rating from "@/assets/rating-icon.png";
import "./Card.scss";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({
  name,
  cloudinaryImageId,
  imageId,
  action,
  grid,
  cuisines,
  avgRating,
  id,
}: any) => {
  const imageSrc = cloudinaryImageId
    ? `${image_url}/${cloudinaryImageId}`
    : `${image_url}/${imageId}`;


  console.log("action: ", action);
  
  return (
    <Link href={`/menu/${id}`} style={{textDecoration: "none"}}>
      <div
        className={action ? "top-carousal-card" : grid ? "grid-card" : "card"}
      >
        <div className="card-img">
          <Image
            src={imageSrc}
            width={100}
            height={100}
            layout="responsive"
            alt="card-image"
          />
        </div>
        {!action && (
          <div className="info">
            <h2 className="title">{name}</h2>
            <div className="rating">
              <Image src={rating?.src} width={15} height={15} alt="rating" />
              <p>{avgRating}</p>
            </div>
            <p className="cuisines">{cuisines?.join(", ")}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
