import React from "react";
import Link from "next/link";
import { ILinkResourceEntryFields } from "../../@types/generated/contentful";
import PageLayout from "../layouts/pageLayout/PageLayout";
import CustomImage from "../customImage/CustomImage";
import { IUrlMetadata } from "../../@types/custom/utils";

interface ILinkResourceEntryProps {
  tags: string[];
  updatedAt: string;
  fields: ILinkResourceEntryFields;
  urlMetadata: IUrlMetadata | null;
}

const LinkResourceEntry = ({
  tags,
  updatedAt,
  fields,
  urlMetadata,
}: ILinkResourceEntryProps) => {
  const { title, link, description } = fields;

  return (
    <PageLayout title={title} tags={tags} updatedAt={updatedAt} link={link}>
      <>
        {urlMetadata && urlMetadata.ogImage && (
          <Link href={link} target="_blank">
            <CustomImage
              src={urlMetadata.ogImage}
              caption={urlMetadata.ogDescription}
              title={urlMetadata.ogTitle}
              alt="Preview image from reference link"
            />
          </Link>
        )}
        <p className="py-2">{description}</p>
      </>
    </PageLayout>
  );
};

export default LinkResourceEntry;
