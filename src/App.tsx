import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import SearchBar from "./components/searchBar";

function App() {
  return (
    <>
      <ErrorBoundary>
        <div className="top">
          <SearchBar />
        </div>
        <div className="bottom"></div>
      </ErrorBoundary>
    </>
  );
}

export default App;
