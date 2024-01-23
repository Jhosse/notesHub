import React from "react";
import { GetStaticProps } from "next";
import { CONTENT_TYPE } from "../../@types/generated/contentful";
import { IResourceEntry } from "../../@types/custom/contentful";
import { getTags, getEntriesByTypes } from "../../services/content-service";
import AuthLayout from "../../components/layouts/authLayout/AuthLayout";
import EntryTeaser from "../../components/entryTeaser/EntryTeaser";

interface IAuthProps {
  tags: string[];
  entries: IResourceEntry[];
}

const AdminHome = ({ tags, entries }: IAuthProps) => {
  return (
    <AuthLayout props={{ tags }}>
      <main role="main">
        <h1 className="page-title w-full">Latest entries added</h1>
        {entries.map((entry, index) => {
          return (
            <EntryTeaser
              entry={entry}
              key={`entry-${entry.id}`}
              isLastItem={entries.length - 1 === index}
            />
          );
        })}
      </main>
    </AuthLayout>
  );
};

export const getStaticProps = (async () => {
  const tags: string[] = await getTags();
  const entriesNames: CONTENT_TYPE[] = [
    "codeResourceEntry",
    "linkResourceEntry",
    "notesEntry",
  ];
  const entries: IResourceEntry[] = await getEntriesByTypes(entriesNames, 20);

  return {
    props: {
      tags,
      entries,
    },
  };
}) satisfies GetStaticProps<IAuthProps>;

export default AdminHome;
