import React from "react";
import { render } from "@testing-library/react";
import DesktopTagsNav from "./DesktopTagsNav";
import { USEROUTER_MOCKIMPLEMENTATION } from "../../../mocks";
import { NestedObject } from "../../../@types/custom/utils";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

const CONTENT_TAGS_MOCK: NestedObject = {
  css: {
    codeResource: {},
    linkResource: {
      test1: {
        test5: {},
      },
    },
  },

  js: {
    codeResource: {},
    linkResource: {
      test7: {},
    },
  },
};

describe("DesktopTagsNav", () => {
  beforeAll(() => {
    useRouter.mockImplementation(() => USEROUTER_MOCKIMPLEMENTATION);
  });

  it("renders without errors or key duplications", () => {
    const { getByText } = render(
      <DesktopTagsNav tagsObj={CONTENT_TAGS_MOCK} />
    );
    expect(getByText("Css")).toBeTruthy();
  });

  it("renders nested items", () => {
    const { getByText, getAllByText } = render(
      <DesktopTagsNav tagsObj={CONTENT_TAGS_MOCK} />
    );
    expect(getAllByText("CodeResource")).toBeTruthy();
    expect(getByText("Test5")).toBeTruthy();
    expect(getByText("Test7")).toBeTruthy();
  });

  it("renders the right path as data-attribute", () => {
    const { getByText } = render(
      <DesktopTagsNav tagsObj={CONTENT_TAGS_MOCK} />
    );

    expect(getByText("Css")).toHaveAttribute("data-navigation-path", "css");

    expect(getByText("Test5")).toHaveAttribute(
      "data-navigation-path",
      "css/linkResource/test1/test5"
    );
    expect(getByText("Test7")).toHaveAttribute(
      "data-navigation-path",
      "js/linkResource/test7"
    );
  });
});
