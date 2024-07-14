import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [inputValue, setInputValue] = useLocalStorage<string>("inputValue", "");
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (counter === 2) {
      throw new Error("I crashed!");
    }
  }, [counter]);

  const search = () => {
    props.onSearch(inputValue);
    setInputValue(inputValue);
  };

  const initError = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="grid">
      <div className="inputContainer">
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={search}>search</button>
      </div>

      <button onClick={initError}>Click twice to make an error</button>
    </div>
  );
};

export default SearchBar;
