import React from "react";
import Link from "next/link";
import TagsLabel from "../../tagsLabel/TagsLabel";
import { ArrowIcon } from "../../icons";
import { dateFormatting } from "../../../utils/functions";

export interface IEntryFooterLinkProps {
  address: string;
  linkText: string;
  title: string;
  openInNewTab: boolean;
}

export interface IEntryFooterProps {
  tags: string[];
  updatedAt: string;
  link?: IEntryFooterLinkProps;
}

const EntryFooter = ({ tags, updatedAt, link }: IEntryFooterProps) => (
  <footer className="footnote">
    <TagsLabel tags={tags} />
    <div className="py-2 flex justify-between">
      <p>
        <span className="mr-2">Last touched:</span>
        <time dateTime={updatedAt}>{dateFormatting(updatedAt)}</time>
      </p>
      {link && (
        <Link
          href={link.address}
          className={`link flex items-center justify-end mr-4 `}
          aria-label={`Read more about ${link.title}`}
          target={link.openInNewTab ? "_blank" : "_self"}
        >
          {link.linkText} <ArrowIcon size={12} className="ml-1" />
        </Link>
      )}
    </div>
  </footer>
);

export default EntryFooter;
