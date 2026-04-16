import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Checkout from "./Checkout";

describe("Checkout", () => {
  it("renders without crashing", () => {
    render(<Checkout />);
  });

  it("renders 'Checkout page' text", () => {
    render(<Checkout />);
    expect(screen.getByText(/Checkout page/i)).toBeInTheDocument();
  });

  it("renders a div element as its root", () => {
    const { container } = render(<Checkout />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });
});