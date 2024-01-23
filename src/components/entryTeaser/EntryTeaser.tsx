import React from "react";
import { IResourceEntry } from "../../@types/custom/contentful";
import { CONTENT_TYPE } from "../../@types/generated/contentful";
import Paths from "../../utils/paths";
import EntryFooter, {
  IEntryFooterLinkProps,
} from "../footer/entryFooter/EntryFooter";
import { truncateText } from "../../utils/functions";

export interface IEntryTeaserProps {
  entry: IResourceEntry;
  isLastItem: boolean;
}

const NOTES_ENTRY: CONTENT_TYPE = "notesEntry";

const EntryTeaser = ({ entry, isLastItem }: IEntryTeaserProps) => {
  const { contentTypeId, id, tags, updatedAt, fields } = entry;
  const { title, description } = fields;

  const linkProps: IEntryFooterLinkProps = {
    address: Paths.Entry + id,
    linkText: "Read more",
    title: title,
    openInNewTab: false,
  };

  return (
    <>
      <article className={`py-4 my-4`} role="article">
        <h2 className="h2-title underline">{title} </h2>
        <p className="my-2">
          {contentTypeId === NOTES_ENTRY
            ? "Quick peek into my coding notes – a stash of ideas, solutions, and brain sparks."
            : truncateText(description)}
        </p>
        <EntryFooter link={linkProps} tags={tags} updatedAt={updatedAt} />
      </article>
      {!isLastItem && (
        <span
          data-testid="entry-separator"
          className="w-full h-[1px] bg-gray-200 block"
        />
      )}
    </>
  );
};

export default EntryTeaser;
