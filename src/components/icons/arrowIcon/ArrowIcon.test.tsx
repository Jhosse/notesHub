import { render, screen } from "@testing-library/react";
import ArrowIcon from "./ArrowIcon";

describe("ArrowIcon", () => {
  it("renders the right props values when provided", () => {
    render(
      <ArrowIcon size={12} className="test" direction="up" color="#FFF" />
    );

    const arrowIcon = screen.getByRole("img");

    expect(arrowIcon).toHaveStyle("width: 12px");
    expect(arrowIcon).toHaveStyle("height: 12px");
    expect(arrowIcon).toHaveAttribute("class", "test");
    expect(arrowIcon).toHaveStyle("transform: rotate(270deg)");
    expect(arrowIcon.firstElementChild).toHaveAttribute("fill", "#FFF");
  });

  it("renders defaults values when not provided", () => {
    render(<ArrowIcon />);

    const arrowIcon = screen.getByRole("img");

    expect(arrowIcon).toHaveStyle("width: 32px");
    expect(arrowIcon).toHaveStyle("height: 32px");
    expect(arrowIcon).toHaveAttribute("class", "");
    expect(arrowIcon).toHaveStyle("transform: rotate(0deg)");
    expect(arrowIcon.firstElementChild).toHaveAttribute("fill", "#000");
  });
});
