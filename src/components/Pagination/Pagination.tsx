import React from "react";
import classes from "./pagination.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page") || "1";

  const currentPage = parseInt(page as string) || 1;

  const goToPage = (newPage: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", newPage.toString());

    router.push(`${pathname}?${currentParams.toString()}`);
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
