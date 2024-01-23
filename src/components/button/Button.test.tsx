import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonVariation, buttonVariations } from "./Button";
import { ArrowIcon } from "../icons";

const TEXT = "test-text";
const CLASSNAME = "test-classname";

describe("Button", () => {
  it("should render the right variarion", () => {
    for (const key in ButtonVariation) {
      if (ButtonVariation.hasOwnProperty(key)) {
        const value = ButtonVariation[key as keyof typeof ButtonVariation]; // Type assertion

        render(
          <Button variation={value} cb={() => {}}>
            {`${TEXT}-${value}`}
          </Button>
        );

        expect(screen.getByText(`${TEXT}-${value}`)).toHaveClass(
          `${`${buttonVariations[value]}`}`
        );
      }
    }
  });

  it("should render the right text", () => {
    render(
      <Button variation={ButtonVariation.Primary} cb={() => {}}>
        {TEXT}
      </Button>
    );

    expect(screen.getByRole("button")).toHaveTextContent(TEXT);
  });

  it("should render the icon", () => {
    render(
      <Button variation={ButtonVariation.Primary} cb={() => {}}>
        <ArrowIcon />
      </Button>
    );

    expect(screen.getByTestId("arrow-svg-icon")).toBeInTheDocument;
  });

  it("should render the classname if passed down", () => {
    render(
      <Button
        variation={ButtonVariation.Primary}
        cb={() => {}}
        className={CLASSNAME}
      >
        {TEXT}
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass(CLASSNAME);
  });

  it("should trigger the cb onClick", () => {
    const mockCallback = jest.fn();

    render(
      <Button variation={ButtonVariation.Primary} cb={mockCallback}>
        {TEXT}
      </Button>
    );

    fireEvent.click(screen.getByText(TEXT));

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
