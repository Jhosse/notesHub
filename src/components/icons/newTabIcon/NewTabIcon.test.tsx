import React from "react";
import { render, screen } from "@testing-library/react";
import NewTabIcon from "./NewTabIcon";

describe("NewTabIcon", () => {
  it("renders the right props values when provided", () => {
    render(<NewTabIcon size={12} className="test" color="#FFF" />);

    const newTabIcon = screen.getByRole("img");

    expect(newTabIcon).toHaveStyle("width: 12px");
    expect(newTabIcon).toHaveStyle("height: 12px");
    expect(newTabIcon).toHaveAttribute("class", "test");
    expect(newTabIcon.firstElementChild).toHaveAttribute("fill", "#FFF");
  });

  it("renders defaults values when not provided", () => {
    render(<NewTabIcon />);

    const newTabIcon = screen.getByRole("img");

    expect(newTabIcon).toHaveStyle("width: 32px");
    expect(newTabIcon).toHaveStyle("height: 32px");
    expect(newTabIcon).toHaveAttribute("class", "");
    expect(newTabIcon.firstElementChild).toHaveAttribute("fill", "#000");
  });
});
