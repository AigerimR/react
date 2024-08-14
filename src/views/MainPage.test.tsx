import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./MainPage";
import { api } from "../services/api";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import checkboxSliceReducer from "../store/slices/checkboxSlice";
import { useRouter } from "next/router";

export interface Artwork {
  id: number;
  title: string;
  image_id: string;
  artist_display: string;
  description: string | null;
}

const mockStore = configureStore({
  reducer: {
    checkboxes: checkboxSliceReducer,
  },
});

describe("Main", () => {
  it("renders Main component", () => {
    const mockData: Artwork[] = [
      {
        id: 1,
        title: "Title 1",
        image_id: "image1",
        artist_display: "Artist 1",
        description: "Description 1",
      },
    ];
    const mockQueryResult = {
      data: mockData,
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    };
    vi.mock("../services/api");

    api.useGetListByPageQuery.mockReturnValue(mockQueryResult);

    vi.mock("next/router", () => ({
      useRouter: vi.fn(),
    }));
    const pushMock = vi.fn();
    useRouter.mockReturnValue({
      query: { page: "1" },
      pathname: "/",
      push: pushMock,
    });

    render(
      <Provider store={mockStore}>
        <Main />
      </Provider>,
    );

    expect(screen.getByText("Artist 1")).toBeInTheDocument();
  });
});
