import React from "react";
import { render, screen } from "@testing-library/react";
import { IResourceEntry } from "../../@types/custom/contentful";
import EntryTeaser, { IEntryTeaserProps } from "./EntryTeaser";
import Paths from "../../utils/paths";

const ENTRY_MOCK: IResourceEntry = {
  id: "1",
  contentTypeId: "test",
  tags: ["tag1", "tag2"],
  updatedAt: "2023-11-02T13:07:14.803Z", // November 02, 2023
  fields: {
    title: "Sample Title",
    description: "Sample Description",
  },
};

describe("EntryTeaser", () => {
  it("renders the title and description", () => {
    render(<EntryTeaser entry={ENTRY_MOCK} isLastItem={false} />);

    expect(screen.getByText(ENTRY_MOCK.fields.title)).toBeInTheDocument();
    expect(screen.getByText(ENTRY_MOCK.fields.description)).toBeInTheDocument();
  });

  it("renders the 'Read more' link", () => {
    render(<EntryTeaser entry={ENTRY_MOCK} isLastItem={false} />);

    const readMoreLink = screen.getByText("Read more");
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink).toHaveAttribute(
      "href",
      `${Paths.Entry}${ENTRY_MOCK.id}`
    );
  });

  it("renders the separator line for non-last items", () => {
    render(<EntryTeaser entry={ENTRY_MOCK} isLastItem={false} />);

    expect(screen.getByTestId("entry-separator")).toBeInTheDocument();
  });

  it("does not renders the separator line for the last item", () => {
    render(<EntryTeaser entry={ENTRY_MOCK} isLastItem={true} />);

    expect(screen.queryByTestId("entry-separator")).toBeNull();
  });
});
