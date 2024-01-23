import React from "react";
import { render } from "@testing-library/react";
import CustomImage, { ICustomImageProps } from "./CustomImage";

const PROPS_MOCK: ICustomImageProps = {
  src: "test-image.jpg",
  alt: "Test Image",
  caption: "This is a test image",
  title: "Test Title",
  width: "200px",
  height: "150px",
};

describe("CustomImage", () => {
  test("renders image with provided props", () => {
    const { getByAltText, getByText } = render(<CustomImage {...PROPS_MOCK} />);

    const image = getByAltText(PROPS_MOCK.alt as string);
    const caption = getByText(PROPS_MOCK.caption as string);
    const title = getByText(PROPS_MOCK.title as string);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", PROPS_MOCK.src);
    expect(caption).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(image).toHaveStyle({
      width: "200px",
      maxWidth: "100%",
      height: "150px",
    });
  });

  test("renders image with default alt text if alt is not provided", () => {
    const propsWithoutAlt = { ...PROPS_MOCK, alt: undefined };
    const { getByAltText } = render(<CustomImage {...propsWithoutAlt} />);

    const image = getByAltText("image");

    expect(image).toBeInTheDocument();
  });

  test("renders image without caption if caption is not provided", () => {
    const propsWithoutCaption = { ...PROPS_MOCK, caption: null };
    const { queryByText } = render(<CustomImage {...propsWithoutCaption} />);

    const caption = queryByText(PROPS_MOCK.caption as string);

    expect(caption).toBeNull();
  });

  test("renders image without title if title is not provided", () => {
    const propsWithoutTitle = { ...PROPS_MOCK, title: null };
    const { queryByText } = render(<CustomImage {...propsWithoutTitle} />);

    const title = queryByText(PROPS_MOCK.title as string);

    expect(title).toBeNull();
  });

  test("renders image with default styles if width and height are not provided", () => {
    const propsWithoutDimensions = {
      ...PROPS_MOCK,
      width: undefined,
      height: undefined,
    };
    const { getByRole } = render(<CustomImage {...propsWithoutDimensions} />);

    const image = getByRole("img");

    expect(image).toHaveStyle({
      width: "100%",
      maxWidth: "100%",
      height: "auto",
    });
  });
});
