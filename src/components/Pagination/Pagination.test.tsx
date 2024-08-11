import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./Pagination";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockImplementation((param) => {
      if (param === "page") return "1";
      return null;
    }),
    toString: vi.fn().mockReturnValue("page=1"),
  }),
  usePathname: () => "/path",
}));

describe("Pagination", () => {
  it("component updates URL query parameter when page changes", () => {
    const handlePageChange = vi.fn();

    render(<Pagination onPageChange={handlePageChange} />);

    const nextBtn = screen.getByLabelText(/next page btn/i);
    fireEvent.click(nextBtn);

    expect(handlePageChange).toHaveBeenCalledWith(2);
    expect(mockPush).toHaveBeenCalledWith("/path?page=2");
  });
});
