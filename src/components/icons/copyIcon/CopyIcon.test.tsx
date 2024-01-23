import { render, screen } from "@testing-library/react";
import CopyIcon from "./CopyIcon";

describe("CopyIcon", () => {
  it("renders the right props values when provided", () => {
    render(<CopyIcon size={12} className="test" color="#FFF" />);

    const copyIcon = screen.getByRole("img");

    expect(copyIcon).toHaveStyle("width: 12px");
    expect(copyIcon).toHaveStyle("height: 12px");
    expect(copyIcon).toHaveAttribute("class", "test");
    expect(copyIcon.firstElementChild).toHaveAttribute("fill", "#FFF");
  });

  it("renders defaults values when not provided", () => {
    render(<CopyIcon />);

    const copyIcon = screen.getByRole("img");

    expect(copyIcon).toHaveStyle("width: 32px");
    expect(copyIcon).toHaveStyle("height: 32px");
    expect(copyIcon).toHaveAttribute("class", "");
    expect(copyIcon.firstElementChild).toHaveAttribute("fill", "#000");
  });
});
