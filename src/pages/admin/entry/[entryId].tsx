import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { CONTENT_TYPE } from "../../../@types/generated/contentful";
import { IResourceEntry } from "../../../@types/custom/contentful";
import {
  getEntryById,
  getEntriesByTypes,
  getTags,
} from "../../../services/content-service";
import AuthLayout from "../../../components/layouts/authLayout/AuthLayout";
import NotFound from "../../../components/notFound/NotFound";
import CodeResourceEntry from "../../../components/codeResourceEntry/CodeResourceEntry";
import LinkResourceEntry from "../../../components/linkResourceEntry/LinkResourceEntry";
import NotesEntry from "../../../components/notesEntry/NotesEntry";
import Paths from "../../../utils/paths";
import { getUrlMetadata } from "../../../utils/functions";
import { IUrlMetadata } from "../../../@types/custom/utils";

interface IEntryPage {
  entry: IResourceEntry;
  tags: string[];
  urlMetadata: IUrlMetadata | null;
}

interface IEntryPagePaths {
  params: { entryId: string };
}

const EntryPage = ({ entry, tags, urlMetadata }: IEntryPage) => {
  const contentTypeId = entry.contentTypeId as CONTENT_TYPE;
  const { tags: entryTags, updatedAt, fields } = entry;

  const getEntryComponent = () => {
    switch (contentTypeId) {
      case "codeResourceEntry":
        return (
          <CodeResourceEntry
            fields={fields}
            tags={entryTags}
            updatedAt={updatedAt}
          />
        );
      case "linkResourceEntry":
        return (
          <LinkResourceEntry
            fields={fields}
            tags={entryTags}
            updatedAt={updatedAt}
            urlMetadata={urlMetadata}
          />
        );
      case "notesEntry":
        return (
          <NotesEntry fields={fields} tags={entryTags} updatedAt={updatedAt} />
        );
      default:
        return (
          <main className="w-full h-screen flex justify-center items-center">
            <NotFound redirect={Paths.Admin} buttonText="Back to Admin" />
          </main>
        );
    }
  };

  return <AuthLayout props={{ tags }}>{getEntryComponent()}</AuthLayout>;
};

export const getStaticPaths = (async () => {
  const entriesNames: CONTENT_TYPE[] = [
    "codeResourceEntry",
    "linkResourceEntry",
    "notesEntry",
  ];
  const entries: IResourceEntry[] = await getEntriesByTypes(entriesNames);
  const paths = (entries: IResourceEntry[]): IEntryPagePaths[] => {
    return entries.map((entry) => ({
      params: { entryId: entry.id },
    }));
  };

  return {
    paths: paths(entries),
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const entryId = (): string => {
    if (params && params.entryId) {
      const { entryId } = params;
      return typeof entryId === "string" ? entryId : entryId[0];
    }
    return "";
  };
  const entry = await getEntryById(entryId());
  const tags: string[] = await getTags();
  let urlMetadata: IUrlMetadata | null = null;

  if (entry.contentTypeId === "linkResourceEntry") {
    urlMetadata = await getUrlMetadata(entry.fields.link);
  }

  return {
    props: {
      entry,
      tags,
      urlMetadata,
    },
  };
}) satisfies GetStaticProps<IEntryPage>;

export default EntryPage;
