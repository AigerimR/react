import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { api } from "../../services/api";
import Flyout from "./Flyout";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import checkboxSliceReducer from "../../app/slices/checkboxSlice";

const mockStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    checkboxes: checkboxSliceReducer,
  },
  preloadedState: {
    checkboxes: [1, 2, 3],
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

describe("Flyout", () => {
  it("component displays the right data from store", () => {
    render(
      <Provider store={mockStore}>
        <Flyout />
      </Provider>,
    );

    expect(screen.getByText(/3 items are selected/i)).toBeInTheDocument();
  });
});
