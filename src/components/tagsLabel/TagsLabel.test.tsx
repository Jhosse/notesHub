import React from "react";
import { render, screen } from "@testing-library/react";
import TagsLabel from "./TagsLabel";

const TAGS_MOCK = ["test1", "test2", "test3"];

describe("TagsLabel", () => {
  it("renders as many items as tags are passed", async () => {
    render(<TagsLabel tags={TAGS_MOCK} />);
    expect(document.querySelectorAll("li").length).toBe(TAGS_MOCK.length);
    expect(screen.findAllByText(TAGS_MOCK[0])).toBeInTheDocument;
  });
});
