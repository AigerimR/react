import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

vi.mock("../app/not-found", () => ({
  default: () => <div>Not Found</div>,
}));

describe("ErrorBoundary", () => {
  it("renders error message when an error is thrown", () => {
    const ThrowError = () => {
      throw new Error("Test Error");
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Test Error/i)).toBeInTheDocument();
  });
});
