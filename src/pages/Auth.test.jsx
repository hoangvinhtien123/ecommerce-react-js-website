import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Auth from "./Auth";

describe("Auth", () => {
  it("renders without crashing", () => {
    render(<Auth />);
  });

  it("renders 'Auth page' text", () => {
    render(<Auth />);
    expect(screen.getByText(/Auth page/i)).toBeInTheDocument();
  });

  it("renders a div element as its root", () => {
    const { container } = render(<Auth />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });
});