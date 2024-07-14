import "./App.css";
import CardDetail from "./components/CardDetails/CardDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import Main from "./views/MainPage";
import NotFound from "./views/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="/card/:id" element={<CardDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
