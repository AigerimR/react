import { useState } from "react";
import "./App.css";
import CardDetails from "./components/CardDetails/CardDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import ThemeContext from "./context/ThemeContext";
import Main from "./views/MainPage";
import NotFound from "./views/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Main />}>
                <Route path="/card/:id" element={<CardDetails />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
