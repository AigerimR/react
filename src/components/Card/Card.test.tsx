import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import checkboxSliceReducer from "../../store/slices/checkboxSlice";
import api from "../../services/api";
import Card from "./Card";

const mockStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    checkboxes: checkboxSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
const mockData = {
  id: 1,
  title: "Title 1",
  image_id: "image1",
  artist_display: "Artist 1",
  description: "Description 1",
};

describe("Card", () => {
  it("card component shows right data", () => {
    render(
      <Provider store={mockStore}>
        <Card key={mockData.id} content={mockData} />
      </Provider>,
    );
    expect(screen.getByText(/Title 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Artist 1/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
});
