import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardDetails from "./CardDetails";
import { api } from "../../services/api";
import { useRouter } from "next/router";

describe("CardDetails", () => {
  it("Check that a loading indicator is displayed while fetching data", () => {
    vi.mock("next/router", () => ({
      useRouter: vi.fn(),
    }));
    vi.mock("../../services/api");

    (useRouter as vi.Mock).mockReturnValue({
      query: { id: "123" },
    });

    api.useGetSingleItemQuery.mockReturnValue({
      data: {
        title: "Artwork Title",
        artist_display: "Artist Name",
        image_id: "image_id",
        description: "Artwork Description",
      },
      isLoading: true,
      isFetching: true,
      isError: false,
    });

    render(<CardDetails />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
  it("card component correctly displays the detailed card data", () => {
    (useRouter as vi.Mock).mockReturnValue({
      query: { id: "123" },
    });

    vi.mock("../../services/api");
    api.useGetSingleItemQuery.mockReturnValue({
      data: {
        title: "Artwork Title",
        artist_display: "Artist Name",
        image_id: "image_id",
        description: "Artwork Description",
      },
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    render(<CardDetails />);
    expect(screen.getByText(/Artwork Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Artist Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Artwork Description/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
