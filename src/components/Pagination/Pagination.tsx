import React from "react";
import classes from "./pagination.module.scss";
import { useRouter } from "next/router";

interface PaginationProps {
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange }) => {
  const router = useRouter();
  const { page } = router.query;
  const currentPage = parseInt(page as string) || 1;

  const goToPage = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
    onPageChange(newPage);
  };

  return (
    <div className={`${classes.pagination} lightText`}>
      <button
        className={classes.prev}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      ></button>
      <p>{currentPage}</p>
      <button
        className={classes.next}
        onClick={() => goToPage(currentPage + 1)}
        aria-label="Next Page Btn"
      ></button>
    </div>
  );
};

export default Pagination;
