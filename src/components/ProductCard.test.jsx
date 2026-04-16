import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCart from "./ProductCard";

const mockItem = {
  id: 1,
  name: "Wireless Headphones",
  price: 99.99,
  image: "https://example.com/headphones.jpg",
  description: "Premium wireless headphones with noise cancellation.",
};

function renderProductCard(item = mockItem) {
  return render(
    <MemoryRouter>
      <ProductCart item={item} />
    </MemoryRouter>
  );
}

describe("ProductCard", () => {
  it("renders without crashing", () => {
    renderProductCard();
  });

  it("renders the product name", () => {
    renderProductCard();
    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
  });

  it("renders the product price formatted with a dollar sign", () => {
    renderProductCard();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("renders the product image with the correct src", () => {
    renderProductCard();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockItem.image);
  });

  it("renders the product image with the product-card-image class", () => {
    renderProductCard();
    const img = screen.getByRole("img");
    expect(img).toHaveClass("product-card-image");
  });

  it("renders a 'View Details' link", () => {
    renderProductCard();
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });

  it("'View Details' link points to '/'", () => {
    renderProductCard();
    const viewDetailsLink = screen.getByText("View Details").closest("a");
    expect(viewDetailsLink).toHaveAttribute("href", "/");
  });

  it("renders an 'Add To Cart' button", () => {
    renderProductCard();
    expect(screen.getByRole("button", { name: "Add To Cart" })).toBeInTheDocument();
  });

  it("'Add To Cart' button has btn-primary class", () => {
    renderProductCard();
    const button = screen.getByRole("button", { name: "Add To Cart" });
    expect(button).toHaveClass("btn-primary");
  });

  it("renders with a different product's data correctly", () => {
    const anotherItem = {
      id: 4,
      name: "Mechanical Keyboard",
      price: 129.99,
      image: "https://example.com/keyboard.jpg",
      description: "RGB backlit mechanical keyboard.",
    };
    renderProductCard(anotherItem);
    expect(screen.getByText("Mechanical Keyboard")).toBeInTheDocument();
    expect(screen.getByText("$129.99")).toBeInTheDocument();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", anotherItem.image);
  });

  it("renders the product card container with class 'product-card'", () => {
    renderProductCard();
    const card = document.querySelector(".product-card");
    expect(card).toBeInTheDocument();
  });

  it("renders the name inside an h3 element", () => {
    renderProductCard();
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Wireless Headphones");
  });

  it("renders price as zero when price is 0", () => {
    const freeItem = { ...mockItem, price: 0 };
    renderProductCard(freeItem);
    expect(screen.getByText("$0")).toBeInTheDocument();
  });
});