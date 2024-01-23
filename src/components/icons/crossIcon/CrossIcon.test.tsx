import { render, screen } from "@testing-library/react";
import CrossIcon from "./CrossIcon";

describe("CrossIcon", () => {
  it("renders the right props values when provided", () => {
    render(<CrossIcon size={12} className="test" color="#FFF" />);

    const crossIcon = screen.getByRole("img");

    expect(crossIcon).toHaveStyle("width: 12px");
    expect(crossIcon).toHaveStyle("height: 12px");
    expect(crossIcon).toHaveAttribute("class", "test");
    expect(crossIcon.firstElementChild).toHaveAttribute("fill", "#FFF");
  });

  it("renders defaults values when not provided", () => {
    render(<CrossIcon />);

    const crossIcon = screen.getByRole("img");

    expect(crossIcon).toHaveStyle("width: 32px");
    expect(crossIcon).toHaveStyle("height: 32px");
    expect(crossIcon).toHaveAttribute("class", "");
    expect(crossIcon.firstElementChild).toHaveAttribute("fill", "#000");
  });
});
