import React from "react";
import Prism from "react-syntax-highlighter";
// TODO: Use stackoverflowDark when changing web theme to dark
import { stackoverflowLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import PageLayout from "../layouts/pageLayout/PageLayout";
import { ICodeResourceEntryFields } from "../../@types/generated/contentful";
import { IEntryFooterLinkProps } from "../footer/entryFooter/EntryFooter";

interface ICodeResourceEntryProps {
  tags: string[];
  updatedAt: string;
  fields: ICodeResourceEntryFields;
}

const CodeResourceEntry = ({
  tags,
  updatedAt,
  fields,
}: ICodeResourceEntryProps) => {
  const { title, description, codeBlock, codeLanguage, link } = fields;
  let linkProps: IEntryFooterLinkProps | undefined = undefined;

  if (link) {
    linkProps = {
      address: link,
      linkText: "Resource",
      title: title,
      openInNewTab: true,
    };
  }

  return (
    <PageLayout
      title={title}
      tags={tags}
      updatedAt={updatedAt}
      link={link}
      sectionClassName="overflow-hidden"
    >
      <>
        <p className="py-2">{description}</p>
        <div className="py-2">
          <h2 className="font-bold">Code sample:</h2>
          <Prism
            language={codeLanguage}
            style={stackoverflowLight}
            className="text-xs"
          >
            {codeBlock}
          </Prism>
        </div>
      </>
    </PageLayout>
  );
};

export default CodeResourceEntry;
