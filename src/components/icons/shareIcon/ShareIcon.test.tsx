import { render, screen } from "@testing-library/react";
import ShareIcon from "./ShareIcon";

describe("shareIcon", () => {
  it("renders the right props values when provided", () => {
    render(<ShareIcon size={12} className="test" color="#FFF" />);

    const shareIcon = screen.getByRole("img");

    expect(shareIcon).toHaveStyle("width: 12px");
    expect(shareIcon).toHaveStyle("height: 12px");
    expect(shareIcon).toHaveAttribute("class", "test");
    expect(shareIcon.firstElementChild).toHaveAttribute("fill", "#FFF");
  });

  it("renders defaults values when not provided", () => {
    render(<ShareIcon />);

    const shareIcon = screen.getByRole("img");

    expect(shareIcon).toHaveStyle("width: 32px");
    expect(shareIcon).toHaveStyle("height: 32px");
    expect(shareIcon).toHaveAttribute("class", "");
    expect(shareIcon.firstElementChild).toHaveAttribute("fill", "#000");
  });
});
