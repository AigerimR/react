import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import CardList from "../components/CardList/CardList";
import useFetch from "../services/api";
import Pagination from "../components/Pagination/Pagination";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>("inputValue", "");

  const [page, setPage] = useState(1);
  const [cardDetailsState, setCardDetailsState] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const { data, loading, error } = useFetch(searchTerm, page);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (cardDetailsState) {
      navigate(`/card/${selectedCardId}?page=${page}`);
    } else {
      navigate(`/?page=${page}`);
    }
  }, [cardDetailsState, selectedCardId, navigate, page]);

  useEffect(() => {
    if (location.pathname === "/") {
      setCardDetailsState(false);
      setSelectedCardId(null);
    }
  }, [location]);

  const callFetch = (inputValue: string) => {
    setSearchTerm(inputValue);
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  const handleCardClick = (cardId: number) => {
    if (selectedCardId === cardId) {
      setCardDetailsState(false);
      setSelectedCardId(null);
    } else {
      setCardDetailsState(true);
      setSelectedCardId(cardId);
      setSelectedCardId(cardId);
    }
  };

  return (
    <>
      <div className="top">
        <SearchBar onSearch={callFetch} />
      </div>
      <div className={cardDetailsState ? "bottom split" : "bottom"}>
        <div>
          <Pagination onPageChange={changePage} />
          <CardList
            data={data}
            loading={loading}
            error={error}
            onCardClick={handleCardClick}
          />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Main;
