import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { getTags, getEntriesByTag } from "../../services/content-service";
import { IResourceEntry } from "../../@types/custom/contentful";
import AuthLayout from "../../components/layouts/authLayout/AuthLayout";
import EntryTeaser from "../../components/entryTeaser/EntryTeaser";
import {
  removeDuplicatedInArrOfStr,
  splitArrOfStrByDash,
  stringCapitalization,
  splitCamelCase,
} from "../../utils/functions";

interface IProtectedRoute {
  tags: string[];
  entries: IResourceEntry[];
  pageTag: string;
}

interface IProtectedRoutePaths {
  params: { ProtectedRoute: string[] };
}

const ProtectedRoute = ({ tags, entries, pageTag }: IProtectedRoute) => {
  return (
    <AuthLayout props={{ tags }}>
      <main role="main" className="w-full">
        <h1 className="page-title w-full">{`${splitCamelCase(
          stringCapitalization(pageTag)
        )} entries`}</h1>
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

export const getStaticPaths = (async () => {
  const tags: string[] = await getTags();

  const cleanArr: string[] = removeDuplicatedInArrOfStr(tags);
  const arrOfArrsFromTags: string[][] = splitArrOfStrByDash(cleanArr);

  const paths = (arr: string[][]): IProtectedRoutePaths[] => {
    return arr.map((item) => {
      return { params: { ProtectedRoute: item } };
    });
  };

  return {
    paths: paths(arrOfArrsFromTags),
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const tags: string[] = await getTags();

  const pagePathArr = () => {
    if (params && params.ProtectedRoute) {
      const { ProtectedRoute } = params;
      return typeof ProtectedRoute === "string"
        ? [ProtectedRoute]
        : ProtectedRoute;
    }
    return [""];
  };

  const createTagFromPathArr = (arr: string[]): string => {
    if (arr.length === 1) return arr[0];
    let response = "";

    arr.map((item, index) => {
      if (index === 0) response = item;
      else response += stringCapitalization(item);
    });

    return response;
  };

  const pageTag: string = createTagFromPathArr(pagePathArr());
  const entries = (await getEntriesByTag([pageTag])).flat();

  const cleanEntries = Array.from(
    new Map(entries.map((entry) => [entry.id, entry])).values()
  );

  return {
    props: {
      tags,
      entries: cleanEntries,
      pageTag,
    },
  };
}) satisfies GetStaticProps<IProtectedRoute>;

export default ProtectedRoute;
