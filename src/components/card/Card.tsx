import { image_url } from "@/config/Config";
import ratingImage from "@/assets/rating-icon.png";
import "./Card.scss";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({
  _id,
  name,
  description,
  image,
  location,
  categories,
  rating,
}: any) => {
  return (
    <Link href={`/menu/${_id}`} style={{ textDecoration: "none" }}>
      <div
        className={false ? "top-carousal-card" : true ? "grid-card" : "card"}
      >
        <div className="card-img">
          <Image
            src={image}
            width={250}
            height={182}
            layout="responsive"
            alt="card-image"
          />
        </div>
        {!false && (
          <div className="info">
            <h2 className="title">{name}</h2>
            <div className="rating">
              <Image
                src={ratingImage?.src}
                width={15}
                height={15}
                alt="rating"
              />
              <p>{rating}</p>
            </div>
            <p className="cuisines">{categories?.join(", ")}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
