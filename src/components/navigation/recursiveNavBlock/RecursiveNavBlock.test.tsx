import React from "react";
import { render, fireEvent, getAllByTestId } from "@testing-library/react";
import RecursiveNavBlock, { Device } from "./RecursiveNavBlock";
import { USEROUTER_MOCKIMPLEMENTATION } from "../../../mocks";
import { NestedObject } from "../../../@types/custom/utils";
import TagsNavProvider from "../context/TagsNavProvider";
import Paths from "../../../utils/paths";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

jest.mock("../../icons", () => ({
  CircleArrowIcon: () => <div data-testid="circle-arrow-icon" />,
}));

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

describe("RecursiveNavBlock", () => {
  beforeAll(() => {
    useRouter.mockImplementation(() => USEROUTER_MOCKIMPLEMENTATION);
  });

  it("renders without errors, all levels", () => {
    const { getByText } = render(
      <TagsNavProvider>
        <RecursiveNavBlock
          tags={CONTENT_TAGS_MOCK}
          device={Device.Desktop}
          pathName=""
        />
      </TagsNavProvider>
    );
    expect(getByText("Css")).toBeTruthy();
    expect(getByText("Test5")).toBeTruthy();
    expect(getByText("Test7")).toBeTruthy();
  });

  it("renders the right path as data-attribute", () => {
    const { getByText } = render(
      <TagsNavProvider>
        <RecursiveNavBlock
          tags={CONTENT_TAGS_MOCK}
          device={Device.Desktop}
          pathName=""
        />
      </TagsNavProvider>
    );

    expect(getByText("Css")).toHaveAttribute(
      "data-navigation-path",
      `${Paths.Admin}/css`
    );

    expect(getByText("Test5")).toHaveAttribute(
      "data-navigation-path",
      `${Paths.Admin}/css/linkResource/test1/test5`
    );
    expect(getByText("Test7")).toHaveAttribute(
      "data-navigation-path",
      `${Paths.Admin}/js/linkResource/test7`
    );
  });

  it("renders as a link when path doesnt match", () => {
    const { getByText } = render(
      <TagsNavProvider>
        <RecursiveNavBlock
          tags={CONTENT_TAGS_MOCK}
          device={Device.Desktop}
          pathName=""
        />
      </TagsNavProvider>
    );

    expect(getByText("Css").className).toBe(
      `${Device.Desktop}-nav-single-item-header link`
    );
  });

  it("renders as a span when path match (active)", () => {
    const { getByText } = render(
      <TagsNavProvider>
        <RecursiveNavBlock
          tags={CONTENT_TAGS_MOCK}
          device={Device.Desktop}
          pathName={`${Paths.Admin}/css`}
        />
      </TagsNavProvider>
    );

    expect(getByText("Css").className).toBe(
      `${Device.Desktop}-nav-single-item-header-active custom-underline`
    );
  });

  it("should toggle class onClick", () => {
    const { getByText, getAllByTestId } = render(
      <TagsNavProvider>
        <RecursiveNavBlock
          tags={CONTENT_TAGS_MOCK}
          device={Device.Desktop}
          pathName={""}
        />
      </TagsNavProvider>
    );

    const [button] = getAllByTestId("circle-arrow-icon");
    const expandedBlock = getByText("Css").parentElement;

    expect(expandedBlock).toHaveClass("desktop-nav-block-expanded flex");
    fireEvent.click(button);
    expect(expandedBlock).toHaveClass("flex");
  });
});
