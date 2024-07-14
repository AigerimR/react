import React from "react";
import classes from "./сard.module.scss";

interface Artwork {
  title: string;
  image_id: string;
  artist_display: string;
  description: string | null;
}

interface CardProp {
  key: number;
  content: Artwork;
}

const Card: React.FC<CardProp> = (props) => {
  const { title, image_id, artist_display } = props.content;

  return (
    <>
      <div className={classes.card}>
        <div className={classes.img_wr}>
          <img
            src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
          />
        </div>
        <div className={classes.text_wr}>
          <p className={classes.card_title}>{title}</p>
          <p>{artist_display}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
