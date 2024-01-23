import { render, screen } from "@testing-library/react";
import SocialIcon, { ISocialIcon } from "./SocialIcon";
import GitHubMockMedia from "../../../mocks/media/GitHubMockMedia";

const props: ISocialIcon = GitHubMockMedia;

describe("SocialIcon", () => {
  it("renders the component with the data from props", () => {
    render(<SocialIcon {...props} />);

    const socialIcon = screen.getByRole("link");

    expect(socialIcon).toHaveAttribute("href", props.url);
    expect(screen.getByAltText(props.title)).toBeInTheDocument();
    expect(socialIcon.firstElementChild).toHaveAttribute(
      "src",
      props.icon.fields.file?.url
    );
  });
  it("renders defaults values for width/height when not provided", () => {
    render(<SocialIcon {...props} />);

    const socialIcon = screen.getByRole("link");

    expect(socialIcon.firstElementChild).toHaveAttribute("width", "32");

    expect(socialIcon.firstElementChild).toHaveAttribute("height", "32");
  });

  it("renders prop values for width/height when provided", () => {
    const customProps: ISocialIcon = { ...props, width: 64, height: 64 };

    render(<SocialIcon {...customProps} />);

    const socialIcon = screen.getByRole("link");

    expect(socialIcon.firstElementChild).toHaveAttribute(
      "width",
      customProps.width!.toString()
    );
    expect(socialIcon.firstElementChild).toHaveAttribute(
      "height",
      customProps.height!.toString()
    );
  });
});
