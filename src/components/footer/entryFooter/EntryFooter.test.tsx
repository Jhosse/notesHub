import React from "react";
import { render, screen } from "@testing-library/react";
import EntryFooter, {
  IEntryFooterProps,
  IEntryFooterLinkProps,
} from "./EntryFooter";

const ENTRY_FOOTER_LINK_MOCK: IEntryFooterLinkProps = {
  address: "/some-link",
  linkText: "Resource",
  title: "Sample Title",
  openInNewTab: true,
};

const ENTRY_FOOTER_MOCK: IEntryFooterProps = {
  tags: ["tag1", "tag2"],
  updatedAt: "2023-11-02T13:07:14.803Z", // November 02, 2023
};

describe("EntryFooter", () => {
  it("renders tags and last touched date formatted", () => {
    render(
      <EntryFooter
        tags={ENTRY_FOOTER_MOCK.tags}
        updatedAt={ENTRY_FOOTER_MOCK.updatedAt}
      />
    );

    expect(screen.getByText(ENTRY_FOOTER_MOCK.tags[0])).toBeInTheDocument();
    expect(screen.getByText(ENTRY_FOOTER_MOCK.tags[1])).toBeInTheDocument();
    expect(screen.getByText("Last touched:")).toBeInTheDocument();
    expect(screen.getByText("November 02, 2023")).toBeInTheDocument();
  });

  it("renders link with link text and target attribute", () => {
    render(
      <EntryFooter
        tags={ENTRY_FOOTER_MOCK.tags}
        updatedAt={ENTRY_FOOTER_MOCK.updatedAt}
        link={ENTRY_FOOTER_LINK_MOCK}
      />
    );

    const link = screen.getByText(ENTRY_FOOTER_LINK_MOCK.linkText);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", ENTRY_FOOTER_LINK_MOCK.address);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("aria-label", "Read more about Sample Title");
  });

  it("renders the right target attribute in the link", () => {
    ENTRY_FOOTER_LINK_MOCK.openInNewTab = false;

    render(
      <EntryFooter
        tags={ENTRY_FOOTER_MOCK.tags}
        updatedAt={ENTRY_FOOTER_MOCK.updatedAt}
        link={ENTRY_FOOTER_LINK_MOCK}
      />
    );

    expect(screen.getByText(ENTRY_FOOTER_LINK_MOCK.linkText)).toHaveAttribute(
      "target",
      "_self"
    );
  });

  it("does not render a link when 'link' prop is not provided", () => {
    render(
      <EntryFooter
        tags={ENTRY_FOOTER_MOCK.tags}
        updatedAt={ENTRY_FOOTER_MOCK.updatedAt}
      />
    );

    expect(screen.queryByText(ENTRY_FOOTER_LINK_MOCK.linkText)).toBeNull();
  });
});
