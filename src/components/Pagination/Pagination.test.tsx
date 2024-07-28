import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("component updates URL query parameter when page changes", () => {
    const handlePageChange = vi.fn();

    render(
      <BrowserRouter>
        <Pagination onPageChange={handlePageChange} />
      </BrowserRouter>,
    );

    const nextBtn = screen.getByLabelText(/next page btn/i);
    fireEvent.click(nextBtn);

    expect(handlePageChange).toHaveBeenCalledWith(2);
    expect(window.location.search).toContain("page=2");
  });
});
