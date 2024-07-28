import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./carddetails.module.scss";
import api from "../../services/api";

const CardDetails: React.FC = () => {
  const navigate = useNavigate();

  const closeCardDetails = () => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page") || "1";
    navigate(`/?page=${page}`);
  };

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, isFetching } = api.useGetSingleItemQuery(
    id ?? "",
  );
  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error while fetching</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className={`${classes.details} lightText`}>
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
        aria-label="detail-description"
        dangerouslySetInnerHTML={{
          __html: data.description || "<p>No description available</p>",
        }}
      />
    </div>
  );
};

export default CardDetails;
