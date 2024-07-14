import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSingleFetch from "../../services/useSingleFetch";
import classes from "./carddetails.module.scss";

const CardDetails: React.FC = () => {
  const navigate = useNavigate();

  const closeCardDetails = () => {
    navigate(`/`);
  };

  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useSingleFetch(id ?? "");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className={classes.details}>
      <button onClick={closeCardDetails} className={classes.btn}></button>
      <p className={classes.title}>{data.title}</p>
      <p className={classes.subtitle}>{data.artist_display}</p>
      <div className={classes.img_wr}>
        <img
          src={`https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`}
        />
      </div>
      <div
        className={classes.description}
        dangerouslySetInnerHTML={{
          __html: data.description || "<p>No description available</p>",
        }}
      />
    </div>
  );
};

export default CardDetails;
