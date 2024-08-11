import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ClientOnly } from "./client";

vi.mock("../../views/MainPage", () => ({
  default: () => <div>Main Component</div>,
}));

describe("ClientOnly", () => {
  it("renders Main component", async () => {
    render(<ClientOnly />);
    await waitFor(() => {
      expect(screen.getByText("Main Component")).toBeInTheDocument();
    });
  });
});
