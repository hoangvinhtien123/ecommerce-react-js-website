import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// App uses BrowserRouter via main.jsx, so we wrap with MemoryRouter here
// and skip the outer BrowserRouter by mocking App's router context
function renderApp(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );
}

describe("App routing", () => {
  it("renders without crashing on the home route", () => {
    renderApp("/");
  });

  it("renders the Navbar on all routes", () => {
    renderApp("/");
    expect(screen.getByText("Shop Hub")).toBeInTheDocument();
  });

  it("renders the Home page on the '/' route", () => {
    renderApp("/");
    expect(screen.getByText(/Welome to Shop Hub/i)).toBeInTheDocument();
  });

  it("renders the Auth page on the '/auth' route", () => {
    renderApp("/auth");
    expect(screen.getByText(/Auth page/i)).toBeInTheDocument();
  });

  it("renders the Checkout page on the '/checkout' route", () => {
    renderApp("/checkout");
    expect(screen.getByText(/Checkout page/i)).toBeInTheDocument();
  });

  it("renders the Navbar on the '/auth' route", () => {
    renderApp("/auth");
    expect(screen.getByText("Shop Hub")).toBeInTheDocument();
  });

  it("renders the Navbar on the '/checkout' route", () => {
    renderApp("/checkout");
    expect(screen.getByText("Shop Hub")).toBeInTheDocument();
  });

  it("does not render the Home page content on the '/auth' route", () => {
    renderApp("/auth");
    expect(screen.queryByText(/Welome to Shop Hub/i)).not.toBeInTheDocument();
  });

  it("does not render the Home page content on the '/checkout' route", () => {
    renderApp("/checkout");
    expect(screen.queryByText(/Welome to Shop Hub/i)).not.toBeInTheDocument();
  });

  it("root div has class 'app'", () => {
    renderApp("/");
    const appDiv = document.querySelector(".app");
    expect(appDiv).toBeInTheDocument();
  });
});