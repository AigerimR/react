import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

vi.mock("./client", () => ({
  ClientOnly: () => <div>ClientOnly Component</div>,
}));

describe("Page", () => {
  it("renders ClientOnly component", () => {
    render(<Page />);

    expect(screen.getByText("ClientOnly Component")).toBeInTheDocument();
  });
});
