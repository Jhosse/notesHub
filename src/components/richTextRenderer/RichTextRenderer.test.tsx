import { render, screen } from "@testing-library/react";
import { RenderNode } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import RichTextRenderer from "./RichTextRenderer";
import { RICH_TEXT_MOCK } from "../../mocks";

interface IRichTextContentRecursiveMock {
  nodeType: string;
  data?: object;
  content?: IRichTextContentRecursiveMock[];
  value?: string;
}

describe("RichTextRenderer Component", () => {
  test("renders rich text content", () => {
    render(<RichTextRenderer richTextContent={RICH_TEXT_MOCK} />);

    const recursiveFunc = (obj: IRichTextContentRecursiveMock) => {
      if (obj.content) {
        for (let content of obj.content) {
          recursiveFunc(content);
        }
      } else {
        const value = obj.value;
        if (value) {
          expect(screen.getByText(value)).toBeInTheDocument();
        }
      }
    };

    recursiveFunc(RICH_TEXT_MOCK);
  });

  test("renders images", () => {
    const nodeType: string = "embedded-asset-block";

    render(<RichTextRenderer richTextContent={RICH_TEXT_MOCK} />);

    (() => {
      for (let content of RICH_TEXT_MOCK.content) {
        if (content.nodeType === nodeType) {
          const { fields } = content.data.target;

          const image = screen.getByAltText(fields.description);
          expect(image).toBeInTheDocument();
          expect(image).toHaveAttribute("src", `https:${fields.file.url}`);

          expect(screen.getByText(fields.title)).toBeInTheDocument();
          expect(screen.getByText(fields.description)).toBeInTheDocument();
        }
      }
    })();
  });

  test("render default header options", () => {
    render(<RichTextRenderer richTextContent={RICH_TEXT_MOCK} />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveClass(
      "text-2xl mb-4 mt-6 font-semibold underline"
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveClass(
      "text-lg mb-2 mt-4 font-semibold underline"
    );
  });

  test("render default link options", () => {
    render(<RichTextRenderer richTextContent={RICH_TEXT_MOCK} />);

    expect(screen.getByRole("link")).toHaveClass(
      "text-blue-700 font-medium underline"
    );
  });

  test("render default paragraph options", () => {
    render(<RichTextRenderer richTextContent={RICH_TEXT_MOCK} />);

    const paragraphs = screen.getAllByRole("paragraph");

    for (const p of paragraphs) {
      expect(p).toHaveClass("my-2");
    }
  });

  test("render default lists options", () => {
    render(<RichTextRenderer richTextContent={RICH_TEXT_MOCK} />);

    const OLFirstChildTextContent = "order list one";
    const ULFirstChildTextContent = "unorder list one";

    const ULListNodeType = screen
      .getAllByRole("list")
      .filter((list) => list.tagName === "UL");
    const OLListNodeType = screen
      .getAllByRole("list")
      .filter((list) => list.tagName === "OL");

    expect(ULListNodeType[0]).toBeInTheDocument();
    expect(ULListNodeType[0]).toHaveClass("list-disc ml-4");
    expect(ULListNodeType[0].firstChild).toHaveTextContent(
      ULFirstChildTextContent
    );

    expect(OLListNodeType[0]).toBeInTheDocument();
    expect(OLListNodeType[0]).toHaveClass("list-decimal ml-4");
    expect(OLListNodeType[0].firstChild).toHaveTextContent(
      OLFirstChildTextContent
    );
  });

  test("applies custom options overwriting defaults", () => {
    const testId = "this-is-a-custom-options-test-id";
    const customOptions: RenderNode = {
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 data-testid={testId}>{children}</h2>
      ),
    };

    render(
      <RichTextRenderer
        richTextContent={RICH_TEXT_MOCK}
        customOptions={customOptions}
      />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
