import React, { useCallback, useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import CardList from "../components/CardList/CardList";
import Pagination from "../components/Pagination/Pagination";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { api } from "../services/api";
import Flyout from "../components/Flyout/Flyout";

const Main: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const [searchTerm, setSearchTerm] = useLocalStorage<string>("inputValue", "");

  const [page, setPage] = useState(1);
  const [cardDetailsState, setCardDetailsState] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const { data, isLoading, isError, isFetching } = api.useGetListByPageQuery({
    searchTerm,
    page,
  });

  const dataFetched = data ?? [];
  const navigate = useNavigate();
  const location = useLocation();

  const callFetch = useCallback(
    (inputValue: string) => {
      setSearchTerm(inputValue);
    },
    [setSearchTerm],
  );
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search") || "";
    const pageParam = searchParams.get("page") || "1";
    const cardId = searchParams.get("cardId");

    if (searchTerm !== query) setSearchTerm(query);
    if (page !== Number(pageParam)) setPage(Number(pageParam));
    if (cardId && selectedCardId !== Number(cardId))
      setSelectedCardId(Number(cardId));

    callFetch(searchTerm);
  }, [
    location.search,
    searchTerm,
    page,
    selectedCardId,
    setSearchTerm,
    callFetch,
  ]);

  useEffect(() => {
    if (cardDetailsState) {
      navigate(`/card/${selectedCardId}?page=${page}`, { replace: true });
    } else {
      navigate(`/?page=${page}`, { replace: true });
    }
  }, [cardDetailsState, selectedCardId, navigate, page]);

  useEffect(() => {
    if (location.pathname === "/") {
      setCardDetailsState(false);
      setSelectedCardId(null);
    }
  }, [location]);

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
    }
  };

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <div className={theme} role="theme">
        <button className="switcher" onClick={changeTheme}>
          Switch Theme
        </button>
        <div className="top">
          <SearchBar onSearch={callFetch} />
        </div>
        <div className={cardDetailsState ? "bottom split" : "bottom"}>
          <div>
            <Pagination onPageChange={changePage} />
            <CardList
              data={dataFetched}
              loading={isLoading || isFetching}
              error={isError}
              onCardClick={handleCardClick}
            />
          </div>
          <Outlet />
        </div>
        <Flyout />
      </div>
    </>
  );
};

export default Main;
