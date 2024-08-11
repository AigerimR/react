import React, { useCallback, useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import CardList from "../components/CardList/CardList";
import Pagination from "../components/Pagination/Pagination";
import { useLocalStorage } from "@uidotdev/usehooks";
import ThemeContext from "../context/ThemeContext";
import { api } from "../services/api";
import Flyout from "../components/Flyout/Flyout";
import dynamic from "next/dynamic";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
const CardDetails = dynamic(
  () => import("../components/CardDetails/CardDetails"),
  { ssr: false },
);

const Main: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

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
    const querySearch = searchParams.get("search") || "";
    const queryPage = searchParams.get("page") || "1";

    if (searchTerm !== querySearch) setSearchTerm(querySearch as string);
    if (page !== Number(queryPage)) setPage(Number(queryPage));

    callFetch(searchTerm as string);
  }, [searchParams, searchTerm, page, setSearchTerm, callFetch]);
  const changePage = (page: number) => {
    setPage(page);
  };

  const handleCardClick = (cardId: number) => {
    const currentId = params.id as string | undefined;
    if (cardId.toString() === currentId) {
      router.push(pathname);
    } else {
      const newUrl = `/card/${cardId}${searchParams.get("search") ? `?${searchParams.get("search")}` : ""}`;
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
        <div className={params.id ? "bottom split" : "bottom"}>
          <div>
            <Pagination onPageChange={changePage} />
            <CardList
              data={dataFetched}
              loading={isLoading || isFetching}
              error={isError}
              onCardClick={handleCardClick}
            />
          </div>
          {params.id && <CardDetails />}
        </div>
        <Flyout />
      </div>
    </>
  );
};

export default Main;
