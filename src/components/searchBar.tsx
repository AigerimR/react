import React from "react";

type MyState = {
  inputValue: string;
  counter: number;
};

class SearchBar extends React.Component<unknown, MyState> {
  state: MyState = {
    inputValue: localStorage.getItem("inputValue") || "",
    counter: 0,
  };

  componentDidUpdate(prevState: MyState) {
    if (prevState.inputValue !== this.state.inputValue) {
      localStorage.setItem("inputValue", this.state.inputValue);
    }
  }

  saveToLS = () => {
    localStorage.setItem("inputValue", this.state.inputValue);
  };

  initError = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  render(): React.ReactNode {
    if (this.state.counter === 2) {
      throw new Error("I crashed!");
    }
    return (
      <>
        <div className="inputContainer">
          <input
            type="text"
            className="input"
            onChange={(e) => this.setState({ inputValue: e.target.value })}
          />
          <button onClick={this.saveToLS}>search</button>

          <button onClick={this.initError}>Click twice to make an error</button>
        </div>
      </>
    );
  }
}

export default SearchBar;
