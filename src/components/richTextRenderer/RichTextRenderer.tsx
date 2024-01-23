import React from "react";
import Link from "next/link";
import { Document, BLOCKS } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options,
  RenderNode,
} from "@contentful/rich-text-react-renderer";
import CustomImage from "../customImage/CustomImage";
import { NewTabIcon } from "../icons";

interface IRichTextRendererProps {
  richTextContent: Document;
  customOptions?: RenderNode;
}

const renderNode: RenderNode = {
  [BLOCKS.EMBEDDED_ASSET]: (node) => {
    const { title, description, file } = node.data.target.fields;

    return (
      <div className="p-2">
        <CustomImage
          src={`https:${file.url}`}
          alt={description || "Image"}
          title={title}
          caption={description}
        />
      </div>
    );
  },
  [BLOCKS.HEADING_2]: (node, children) => (
    <h2 className="text-2xl mb-4 mt-6 font-semibold underline">{children}</h2>
  ),
  [BLOCKS.HEADING_3]: (node, children) => (
    <h3 className="text-lg mb-2 mt-4 font-semibold underline">{children}</h3>
  ),
  paragraph: (node, children) => (
    <p className="my-2" role="paragraph">
      {children}
    </p>
  ),
  [BLOCKS.UL_LIST]: (node, children) => (
    <ul className="list-disc ml-4">{children}</ul>
  ),
  [BLOCKS.OL_LIST]: (node, children) => (
    <ol className="list-decimal ml-4">{children}</ol>
  ),
  [BLOCKS.LIST_ITEM]: (node, children) => <li className="ml-2">{children}</li>,
  hyperlink: (node, children) => (
    <Link
      className="text-blue-700 font-medium underline flex items-center"
      href={node.data.uri}
      target="_blank"
      aria-label={`Link to ${children}`}
    >
      <NewTabIcon color="#1D4ED8" size={16} className="mr-1" />
      {children}
    </Link>
  ),
};

const RichTextRenderer = ({
  richTextContent,
  customOptions = {},
}: IRichTextRendererProps) => {
  const finalOptions: Options = {
    renderNode: {
      ...renderNode,
      ...customOptions,
    },
  };

  return (
    <div className="mb-8">
      {documentToReactComponents(richTextContent, finalOptions)}
    </div>
  );
};

export default RichTextRenderer;
