import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardDetails from "./CardDetails";
import { api } from "../../services/api";

describe("CardDetails", () => {
  it("Check that a loading indicator is displayed while fetching data", () => {
    vi.mock("next/navigation", () => ({
      useRouter: () => ({
        replace: vi.fn(),
      }),
      useParams: () => ({
        id: "456456",
      }),
      usePathname: () => "/path",
    }));

    vi.mock("../../services/api");

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
