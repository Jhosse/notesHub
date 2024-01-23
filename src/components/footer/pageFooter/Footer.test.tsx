import { render, screen } from "@testing-library/react";
import Footer, { IFooter } from "./Footer";
import GitHubMockMedia from "../../../mocks/media/GitHubMockMedia";
import LinkedInMockMedia from "../../../mocks/media/LinkedInMockMedia";

const props: IFooter = {
  socialIcons: [GitHubMockMedia, LinkedInMockMedia],
};

describe("Footer", () => {
  it("renders the right amount of icons when provided", () => {
    render(<Footer {...props} />);

    const socialIconsDiv = screen.getByTestId("social-icons");

    expect(socialIconsDiv.childElementCount).toBe(props.socialIcons?.length);
    props.socialIcons!.map((icon) =>
      expect(screen.getByAltText(icon.title)).toBeInTheDocument()
    );
  });
  it("it renders no icons when not provided", () => {
    render(<Footer />);

    const socialIcons = screen.queryByTestId("social-icons");

    expect(socialIcons).toBeNull();
  });
});
