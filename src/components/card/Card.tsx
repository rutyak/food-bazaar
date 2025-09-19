import { image_url } from "@/config/Config";
import rating from "@/assets/rating-icon.png";
import "./Card.scss";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({ _id, name, description, image, location, categories }: any) => {
  return (
    <Link href={`/menu/${_id}`} style={{ textDecoration: "none" }}>
      <div
        className={false ? "top-carousal-card" : true ? "grid-card" : "card"}
      >
        <div className="card-img">
          <Image
            src={image}
            width={100}
            height={100}
            layout="responsive"
            alt="card-image"
          />
        </div>
        {!false && (
          <div className="info">
            <h2 className="title">{name}</h2>
            <div className="rating">
              <Image src={rating?.src} width={15} height={15} alt="rating" />
              <p>4.5</p>
            </div>
            <p className="cuisines">{categories?.join(", ")}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
