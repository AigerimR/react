import React, { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import CardList from "../components/CardList/CardList";
import useFetch from "../services/api";
import Pagination from "../components/Pagination/Pagination";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Outlet } from "react-router-dom";

const Main: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>("inputValue", "");

  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(searchTerm, page);

  const callFetch = (inputValue: string) => {
    setSearchTerm(inputValue);
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <div className="top">
        <SearchBar onSearch={callFetch} />
      </div>
      <div className="bottom">
        <Outlet />

        <Pagination onPageChange={changePage} />
        <CardList data={data} loading={loading} error={error} />
      </div>
    </>
  );
};

export default Main;
