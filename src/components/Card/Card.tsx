import React, { useEffect, useState } from "react";
import classes from "./сard.module.scss";
import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";

import {
  addToCheckboxList,
  removeFromCheckboxList,
} from "../../app/slices/checkboxSlice";

interface Artwork {
  id: number;
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
  const checkboxes = useSelector((state: RootState) => state.checkboxes);
  const dispatch = useDispatch();

  const { id, title, image_id, artist_display } = props.content;

  useEffect(() => {
    setIsChecked(checkboxes.includes(id));
  }, [checkboxes, id]);

  function toggleStateInStore(cardId: number): void {
    if (checkboxes.includes(cardId)) {
      dispatch(removeFromCheckboxList(cardId));
    } else {
      dispatch(addToCheckboxList(cardId));
    }
    // console.log(checkboxes);

    // console.log(cardId);
  }

  const [isChecked, setIsChecked] = useState(checkboxes.includes(id));

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
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => toggleStateInStore(id)}
        ></input>
      </div>
    </>
  );
};

export default Card;
