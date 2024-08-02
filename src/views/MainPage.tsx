import React, { useCallback, useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import CardList from "../components/CardList/CardList";
import Pagination from "../components/Pagination/Pagination";
import { useLocalStorage } from "@uidotdev/usehooks";
import ThemeContext from "../context/ThemeContext";
import { api } from "../services/api";
import Flyout from "../components/Flyout/Flyout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const CardDetails = dynamic(
  () => import("../components/CardDetails/CardDetails"),
  { ssr: false },
);

const Main: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = router.query;
  const { theme, setTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useLocalStorage<string>("inputValue", "");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = api.useGetListByPageQuery({
    searchTerm,
    page,
  });

  const dataFetched = data ?? [];

  const callFetch = useCallback(
    (inputValue: string) => {
      setSearchTerm(inputValue);
    },
    [setSearchTerm],
  );
  useEffect(() => {
    const querySearch = query.search || "";
    const queryPage = query.page || "1";

    if (searchTerm !== querySearch) setSearchTerm(querySearch as string);
    if (page !== Number(queryPage)) setPage(Number(queryPage));

    callFetch(searchTerm as string);
  }, [query, searchTerm, page, setSearchTerm, callFetch]);

  const changePage = (page: number) => {
    setPage(page);
  };

  const handleCardClick = (cardId: number) => {
    const currentId = query.id as string | undefined;
    const queryString = new URLSearchParams(
      query as Record<string, string>,
    ).toString();
    if (cardId.toString() === currentId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...remainingQueryParams } = query;

      const queryString = new URLSearchParams(
        remainingQueryParams as Record<string, string>,
      ).toString();
      const newUrl = `/?${queryString}`;
      router.push(newUrl);
    } else {
      const newUrl = `/card/${cardId}${queryString ? `?${queryString}` : ""}`;
      router.push(newUrl);
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
        <div className={id ? "bottom split" : "bottom"}>
          <div>
            <Pagination onPageChange={changePage} />
            <CardList
              data={dataFetched}
              loading={isLoading || isFetching}
              error={isError}
              onCardClick={handleCardClick}
            />
          </div>
          {id && <CardDetails />}
        </div>
        <Flyout />
      </div>
    </>
  );
};

export default Main;
