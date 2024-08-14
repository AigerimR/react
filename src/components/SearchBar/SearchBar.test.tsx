import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "./SearchBar";

vi.mock("@uidotdev/usehooks", async () => {
  const module =
    await vi.importActual<typeof import("@uidotdev/usehooks")>(
      "@uidotdev/usehooks",
    );
  return {
    ...module,
    useLocalStorage: vi.fn(),
  };
});

describe("SearchBar", () => {
  it("clicking the Search button saves the entered value to the local storage", async () => {
    const { useLocalStorage } = await import("@uidotdev/usehooks");
    const chechikngValue = "balcony";

    const mockSetLocalStorage = vi.fn();
    useLocalStorage.mockReturnValue([chechikngValue, mockSetLocalStorage]);

    const handleOnSearch = vi.fn();

    render(<SearchBar onSearch={handleOnSearch} />);
    const input = screen.getByRole("textbox");
    const serachBtn = screen.getByLabelText(/serach btn/i);

    fireEvent.change(input, { target: { value: chechikngValue } });
    fireEvent.click(serachBtn);

    expect(handleOnSearch).toHaveBeenCalledWith(chechikngValue);
    expect(mockSetLocalStorage).toHaveBeenCalledWith(chechikngValue);
  }),
    it("component retrieves the value from the local storage upon mounting", async () => {
      const { useLocalStorage } = await import("@uidotdev/usehooks");
      const chechikngValue = "sea";
      const mockSetLocalStorage = vi.fn();
      useLocalStorage.mockReturnValue([chechikngValue, mockSetLocalStorage]);

      render(<SearchBar onSearch={vi.fn()} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue(chechikngValue);
    });
});
