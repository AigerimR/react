import React from "react";
import { Link } from "react-router-dom";
import classes from "./cardlist.module.scss";
import Card from "../Card/Card";

interface Artwork {
  title: string;
  image_id: string;
  artist_display: string;
  description: string | null;
}

interface CardListProps {
  data: Artwork[];
  loading: boolean;
  error: Error | null;
}

const CardList: React.FC<CardListProps> = (props) => {
  const { data, loading, error } = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.length === 0) {
    return <div>Sorry nothing matched your search</div>;
  }

  const renderedCards = data.map((el, i) => (
    <Link key={i} to={`/card/${i}`}>
      <Card key={i} content={el} />
    </Link>
  ));

  return (
    <>
      <div className={classes.cardlist}>{renderedCards}</div>
    </>
  );
};

export default CardList;
