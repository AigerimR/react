import React from "react";
import classes from "./pagination.module.scss";
import { useSearchParams, useNavigate } from "react-router-dom";

interface PaginationProps {
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = parseInt(searchParams.get("page") ?? "1");

  const goToPage = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    navigate(`/?${searchParams.toString()}`);
    onPageChange(newPage);
  };

  return (
    <div className={classes.pagination}>
      <button
        className={classes.prev}
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
      ></button>
      <p>{page}</p>
      <button
        className={classes.next}
        onClick={() => goToPage(page + 1)}
      ></button>
    </div>
  );
};

export default Pagination;
