import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

vi.mock("../app/not-found", () => ({
  default: () => <div>Not Found</div>,
}));

describe("Pagination", () => {
  it('renders NotFound component on "Not Found" error', () => {
    const ThrowError = () => {
      throw new Error("Not Found");
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });
});
