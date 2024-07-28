// NotFound.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

describe("Routing Tests", () => {
  it("renders NotFound when wrong url", () => {
    render(
      <MemoryRouter initialEntries={["/fhksjfh"]}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/OOPS THIS IS 404/i)).toBeInTheDocument();
  });
});
