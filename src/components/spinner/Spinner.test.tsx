import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner, { SpinnerSizes } from "./Spinner";

describe("Spinner", () => {
  it("should generate the right classes for the right sizes", () => {
    for (const key in SpinnerSizes) {
      if (SpinnerSizes.hasOwnProperty(key)) {
        const value = SpinnerSizes[key as keyof typeof SpinnerSizes]; // Type assertion

        render(<Spinner size={value} />);

        const selector = `[data-testid="spinner-svg"][class*="${value}"]`;
        const svgElement = document.querySelector(selector);

        expect(svgElement).toBeInTheDocument();
      }
    }
  });
  it("should render the small size and be centered if props are not passed", () => {
    render(<Spinner />);
    expect(screen.getByTestId("spinner-container")).toHaveClass(
      "flex h-screen justify-center items-center"
    );
    expect(screen.getByTestId("spinner-svg")).toHaveClass(
      `${SpinnerSizes.Small}`
    );
  });
  it("should be centered if the prop is passed as true", () => {
    render(<Spinner isCentered />);
    expect(screen.getByTestId("spinner-container")).toHaveClass(
      "flex h-screen justify-center items-center"
    );
  });
});
