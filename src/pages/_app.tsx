import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ErrorBoundary from "../components/ErrorBoundary";
import ThemeContext from "../context/ThemeContext";
import { useState } from "react";
import "../styles/global.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState("light");

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default MyApp;
