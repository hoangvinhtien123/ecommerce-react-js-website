import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

function renderNavbar(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar />
    </MemoryRouter>
  );
}

describe("Navbar", () => {
  it("renders without crashing", () => {
    renderNavbar();
  });

  it("renders the brand name 'Shop Hub'", () => {
    renderNavbar();
    expect(screen.getByText("Shop Hub")).toBeInTheDocument();
  });

  it("brand 'Shop Hub' links to the home page '/'", () => {
    renderNavbar();
    const brandLink = screen.getByText("Shop Hub").closest("a");
    expect(brandLink).toHaveAttribute("href", "/");
  });

  it("renders a 'Home' navigation link", () => {
    renderNavbar();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("'Home' link points to '/'", () => {
    renderNavbar();
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders a 'Cart' navigation link", () => {
    renderNavbar();
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });

  it("'Cart' link points to '/checkout'", () => {
    renderNavbar();
    const cartLink = screen.getByText("Cart").closest("a");
    expect(cartLink).toHaveAttribute("href", "/checkout");
  });

  it("renders a 'Login' button", () => {
    renderNavbar();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("'Login' link points to '/auth'", () => {
    renderNavbar();
    const loginLink = screen.getByText("Login").closest("a");
    expect(loginLink).toHaveAttribute("href", "/auth");
  });

  it("renders a 'Sign up' button", () => {
    renderNavbar();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("'Sign up' link points to '/auth'", () => {
    renderNavbar();
    const signupLink = screen.getByText("Sign up").closest("a");
    expect(signupLink).toHaveAttribute("href", "/auth");
  });

  it("renders a nav element with class 'navbar'", () => {
    renderNavbar();
    const nav = document.querySelector("nav.navbar");
    expect(nav).toBeInTheDocument();
  });

  it("renders the navbar-auth section with Login and Sign up", () => {
    renderNavbar();
    const authDiv = document.querySelector(".navbar-auth");
    expect(authDiv).toBeInTheDocument();
    expect(authDiv).toHaveTextContent("Login");
    expect(authDiv).toHaveTextContent("Sign up");
  });

  it("Login link has btn-secondary class", () => {
    renderNavbar();
    const loginLink = screen.getByText("Login").closest("a");
    expect(loginLink).toHaveClass("btn-secondary");
  });

  it("Sign up link has btn-primary class", () => {
    renderNavbar();
    const signupLink = screen.getByText("Sign up").closest("a");
    expect(signupLink).toHaveClass("btn-primary");
  });
});