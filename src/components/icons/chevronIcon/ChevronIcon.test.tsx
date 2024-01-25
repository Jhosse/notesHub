import { render, screen } from "@testing-library/react";
import ChevronIcon from "./ChevronIcon";

describe("ChevronIcon", () => {
  it("renders the right props values when provided", () => {
    render(<ChevronIcon size={12} className="test" color="#FFF" />);

    const chevronIcon = screen.getByRole("img");

    expect(chevronIcon).toHaveStyle("width: 12px");
    expect(chevronIcon).toHaveStyle("height: 12px");
    expect(chevronIcon).toHaveAttribute("class", "test");
    expect(chevronIcon.firstElementChild).toHaveAttribute("fill", "#FFF");
  });

  it("renders defaults values when not provided", () => {
    render(<ChevronIcon />);

    const chevronIcon = screen.getByRole("img");

    expect(chevronIcon).toHaveStyle("width: 32px");
    expect(chevronIcon).toHaveStyle("height: 32px");
    expect(chevronIcon).toHaveAttribute("class", "");
    expect(chevronIcon.firstElementChild).toHaveAttribute("fill", "#000");
  });
});
