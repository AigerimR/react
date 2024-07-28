import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CardList from "./CardList";
import checkboxSliceReducer from "../../app/slices/checkboxSlice";
import api from "../../services/api";

const mockStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    checkboxes: checkboxSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
const mockData = [
  {
    id: 1,
    title: "Title 1",
    image_id: "image1",
    artist_display: "Artist 1",
    description: "Description 1",
  },
  {
    id: 2,
    title: "Title 2",
    image_id: "image2",
    artist_display: "Artist 2",
    description: "Description 2",
  },
];

describe("CardList", () => {
  it("renders right number of cards", () => {
    render(
      <Provider store={mockStore}>
        <CardList
          data={mockData}
          loading={false}
          error={false}
          onCardClick={handleCardClick}
        />
      </Provider>,
    );
    expect(screen.getAllByTestId("card-wr").length).toBe(2);
  });
  it("shows message if no cards", () => {
    render(
      <Provider store={mockStore}>
        <CardList
          data={[]}
          loading={false}
          error={false}
          onCardClick={handleCardClick}
        />
      </Provider>,
    );
    expect(
      screen.getByText(/Sorry nothing matched your search/i),
    ).toBeInTheDocument();
  });
});
function handleCardClick(cardId: number): void {
  console.log("clicked", cardId);
}
