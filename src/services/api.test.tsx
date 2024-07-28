import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import { api } from "../services/api";
import { configureStore } from "@reduxjs/toolkit";

describe("MainPage", () => {
  it("Check that api call gets right values for fetching all list", async () => {
    const store = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    });

    const action = api.endpoints.getListByPage.initiate({
      searchTerm: "",
      page: 1,
    });
    const result = await store.dispatch(action).unwrap();
    expect(result).toEqual([
      {
        id: 23700,
        title: "Artwork Title",
        artist_display: "Artist Name",
        image_id: "image_id",
        description: "Artwork Description",
      },
    ]);
  });
  it("Check that api call gets right values for single fetch", async () => {
    const store = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    });

    const action = api.endpoints.getSingleItem.initiate("23700");
    const result = await store.dispatch(action).unwrap();
    expect(result).toEqual({
      id: 23700,
      title: "Artwork Title",
      artist_display: "Artist Name",
      image_id: "image_id",
      description: "Artwork Description",
    });
  });
});
