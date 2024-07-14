import React from "react";
import classes from "./cardlist.module.scss";
import Card from "../Card/Card";

interface Artwork {
  id: number;
  title: string;
  image_id: string;
  artist_display: string;
  description: string | null;
}

interface CardListProps {
  data: Artwork[];
  loading: boolean;
  error: Error | null;
  onCardClick: (cardId: number) => void;
}

const CardList: React.FC<CardListProps> = (props) => {
  const { data, loading, error, onCardClick } = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.length === 0) {
    return <div>Sorry nothing matched your search</div>;
  }

  const renderedCards = data.map((el) => (
    <div key={el.id} onClick={() => onCardClick(el.id)}>
      <Card key={el.id} content={el} />
    </div>
  ));

  return (
    <>
      <div className={classes.cardlist}>{renderedCards}</div>
    </>
  );
};

export default CardList;
