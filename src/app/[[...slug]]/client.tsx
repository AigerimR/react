"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import ThemeContext from "../../context/ThemeContext";

import dynamic from "next/dynamic";
import ErrorBoundary from "../../components/ErrorBoundary";
const Main = dynamic(() => import("../../views/MainPage"), { ssr: false });

export function ClientOnly() {
  const [theme, setTheme] = useState("light");

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
      </ThemeContext.Provider>
    </Provider>
  );
}
