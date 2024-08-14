import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MainNext from "./index";

vi.mock("../views/MainPage", () => ({
  default: () => <div>Main Component</div>,
}));

describe("MainNext", () => {
  it("renders the Main component", async () => {
    render(<MainNext />);

    await waitFor(() => {
      expect(screen.getByText("Main Component")).toBeInTheDocument();
    });
  });
});
