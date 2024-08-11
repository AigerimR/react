import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import MyApp from "./_app";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

vi.mock("../../views/MainPage", () => ({
  default: () => <div>Main Component</div>,
}));
const MockComponent = () => <div>Main Component</div>;

const mockRouter = {
  pathname: "/",
  route: "/",
  query: {},
  asPath: "/",
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn().mockResolvedValue(undefined),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  basePath: "",
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
};
describe("app", () => {
  it("renders Main component", async () => {
    const pageProps = {};

    render(
      <RouterContext.Provider value={mockRouter}>
        <MyApp Component={MockComponent} pageProps={pageProps} />
      </RouterContext.Provider>,
    );
    await waitFor(() => {
      expect(screen.getByText("Main Component")).toBeInTheDocument();
    });
  });
});
