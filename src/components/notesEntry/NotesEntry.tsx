import React from "react";
import Prism from "react-syntax-highlighter";
// TODO: Use stackoverflowDark when changing web theme to dark
import { stackoverflowLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { INotesEntryFields } from "../../@types/generated/contentful";
import PageLayout from "../layouts/pageLayout/PageLayout";
import RichTextRenderer from "../richTextRenderer/RichTextRenderer";
import CustomImage from "../customImage/CustomImage";

interface INotesEntryProps {
  tags: string[];
  updatedAt: string;
  fields: INotesEntryFields;
}

const NotesEntry = ({ tags, updatedAt, fields }: INotesEntryProps) => {
  const {
    title,
    description,
    codeBlock,
    codeLanguage,
    attachments,
    relatedNotes,
    conclusion,
  } = fields;
  return (
    <PageLayout title={title} tags={tags} updatedAt={updatedAt}>
      <>
        {description && <RichTextRenderer richTextContent={description} />}
        {codeBlock && (
          <Prism
            language={codeLanguage || "javascript"}
            style={stackoverflowLight}
            className="text-xs"
          >
            {codeBlock}
          </Prism>
        )}
        {attachments &&
          attachments.map((attachment) => (
            <CustomImage
              key={attachment.sys.id}
              src={
                attachment.fields.file?.url?.toString() ||
                "https://placehold.co/600x400"
              }
              caption={
                attachment.fields.description?.toString() || "Image description"
              }
              title={attachment.fields.title?.toString() || "Image title"}
              alt="Image"
            />
          ))}
        {relatedNotes && <p className="py-2">{relatedNotes}</p>}
        {conclusion && <p className="py-2">{conclusion}</p>}
      </>
    </PageLayout>
  );
};

export default NotesEntry;
