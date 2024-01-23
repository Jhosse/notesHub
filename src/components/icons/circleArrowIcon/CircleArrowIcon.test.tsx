import { render, screen } from "@testing-library/react";
import CircleArrowIcon from "./CircleArrowIcon";

describe("CircleArrowIcon", () => {
  it("renders the right props values when provided", () => {
    render(<CircleArrowIcon size={12} className="test" color="#FFF" />);

    const circleArrowIcon = screen.getByRole("img");

    expect(circleArrowIcon).toHaveStyle("width: 12px");
    expect(circleArrowIcon).toHaveStyle("height: 12px");
    expect(circleArrowIcon).toHaveAttribute("class", "test");
    expect(circleArrowIcon.firstElementChild).toHaveAttribute("fill", "#FFF");
  });

  it("renders defaults values when not provided", () => {
    render(<CircleArrowIcon />);

    const circleArrowIcon = screen.getByRole("img");

    expect(circleArrowIcon).toHaveStyle("width: 32px");
    expect(circleArrowIcon).toHaveStyle("height: 32px");
    expect(circleArrowIcon).toHaveAttribute("class", "");
    expect(circleArrowIcon.firstElementChild).toHaveAttribute("fill", "#000");
  });
});
