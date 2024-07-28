import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("check if renders App", () => {
    render(<App />);
    expect(screen.getByText(/twice to make an error/i)).toBeInTheDocument();
  });
});
