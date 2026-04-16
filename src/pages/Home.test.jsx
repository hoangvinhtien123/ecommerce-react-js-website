import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { getProducts } from "../data/product";

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

describe("Home", () => {
  it("renders without crashing", () => {
    renderHome();
  });

  it("renders the hero section with the site title", () => {
    renderHome();
    expect(screen.getByText(/Welome to Shop Hub/i)).toBeInTheDocument();
  });

  it("renders the hero subtitle text", () => {
    renderHome();
    expect(
      screen.getByText(/Discover amazing products at great prices/i)
    ).toBeInTheDocument();
  });

  it("renders the 'Our Products' section heading", () => {
    renderHome();
    expect(screen.getByText("Our Products")).toBeInTheDocument();
  });

  it("renders a product card for each product from getProducts()", () => {
    renderHome();
    const products = getProducts();
    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it("renders the correct number of product cards", () => {
    renderHome();
    const products = getProducts();
    const addToCartButtons = screen.getAllByRole("button", { name: "Add To Cart" });
    expect(addToCartButtons).toHaveLength(products.length);
  });

  it("renders a product-grid container", () => {
    renderHome();
    const grid = document.querySelector(".product-grid");
    expect(grid).toBeInTheDocument();
  });

  it("renders the page with class 'page'", () => {
    renderHome();
    const page = document.querySelector(".page");
    expect(page).toBeInTheDocument();
  });

  it("renders the home-hero section", () => {
    renderHome();
    const hero = document.querySelector(".home-hero");
    expect(hero).toBeInTheDocument();
  });

  it("renders all product prices with dollar signs", () => {
    renderHome();
    const products = getProducts();
    products.forEach((product) => {
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    });
  });

  it("renders 'View Details' links for each product", () => {
    renderHome();
    const products = getProducts();
    const viewDetailsLinks = screen.getAllByText("View Details");
    expect(viewDetailsLinks).toHaveLength(products.length);
  });
});