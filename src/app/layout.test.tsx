import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders children within the root div", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
    expect(screen.getByRole("document")).toHaveTextContent("Test Child");
  });
});
