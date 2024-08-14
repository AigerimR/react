import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./Pagination";
import { useRouter } from "next/router";

describe("Pagination", () => {
  it("component updates URL query parameter when page changes", () => {
    vi.mock("next/router", () => ({
      useRouter: vi.fn(),
    }));

    const handlePageChange = vi.fn();
    const pushMock = vi.fn();

    useRouter.mockReturnValue({
      query: { page: "1" },
      pathname: "/",
      push: pushMock,
    });
    render(<Pagination onPageChange={handlePageChange} />);

    const nextBtn = screen.getByLabelText(/next page btn/i);
    fireEvent.click(nextBtn);

    expect(handlePageChange).toHaveBeenCalledWith(2);
    expect(pushMock).toHaveBeenCalledWith({
      pathname: "/",
      query: { page: 2 },
    });
  });
});
