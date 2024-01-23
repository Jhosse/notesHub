import {
  EntriesQueries,
  Entry,
  EntrySkeletonType,
  createClient,
} from "contentful";
import {
  CONTENT_TYPE,
  ISocialIconEntryFields,
} from "../@types/generated/contentful";
import { IResourceEntry } from "../@types/custom/contentful";
import { config } from "dotenv";

/*
 * We tell TypeScript that those environment variables are always defined.
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_SPACE_ID: string;
      CONTENTFUL_ACCESS_TOKEN: string;
    }
  }
}

config();

const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE_ID,
});

const getEntryById = async (id: string): Promise<IResourceEntry> => {
  const entry = await client.getEntry(id);

  return {
    id: entry.sys.id,
    contentTypeId: entry.sys.contentType.sys.id,
    tags: entry.metadata.tags.map((tag) => tag.sys.id),
    updatedAt: entry.sys.updatedAt,
    fields: { ...entry.fields },
  };
};

const getEntriesByType = async (
  contentType: CONTENT_TYPE
): Promise<Entry<EntrySkeletonType, undefined, string>[]> => {
  return (
    await client.getEntries({
      content_type: contentType,
    })
  ).items;
};

const getEntriesByTypes = async (
  contentTypes: CONTENT_TYPE[],
  limit?: number
): Promise<IResourceEntry[]> => {
  const allEntries: IResourceEntry[] = [];

  for (const contentType of contentTypes) {
    let options: EntriesQueries<EntrySkeletonType, undefined> = {
      content_type: contentType,
    };
    if (limit) options = { ...options, limit };

    const entries = (await client.getEntries(options)).items.map((item) => {
      return {
        id: item.sys.id,
        contentTypeId: item.sys.contentType.sys.id,
        tags: item.metadata.tags.map((tag) => tag.sys.id),
        updatedAt: item.sys.updatedAt,
        fields: item.fields,
      };
    });

    allEntries.push(...entries);
  }

  return allEntries;
};

const getTags = async (): Promise<string[]> => {
  return await (await client.getTags()).items.map((i) => i.name);
};

const getEntriesByTag = async (tags: string[]): Promise<IResourceEntry[]> => {
  const entries: IResourceEntry[] = (
    await client.getEntries({
      "metadata.tags.sys.id[all]": tags,
    })
  ).items.map((item) => {
    return {
      id: item.sys.id,
      contentTypeId: item.sys.contentType.sys.id,
      tags: item.metadata.tags.map((tag) => tag.sys.id),
      updatedAt: item.sys.updatedAt,
      fields: item.fields,
    };
  });
  return entries;
};

const getEntriesByTags = async (
  tags: string[]
): Promise<IResourceEntry[][]> => {
  const contentPromises = tags.map(async (tag) => getEntriesByTag([tag]));
  return await Promise.all(contentPromises);
};

const getSocialEntries = async (): Promise<ISocialIconEntryFields[]> => {
  return (await getEntriesByType("socialIconEntry")).map((entry) => {
    const { title, url, icon } = entry.fields;
    return { title, url, icon } as ISocialIconEntryFields;
  });
};

export {
  getEntryById,
  getEntriesByTypes,
  getTags,
  getEntriesByTag,
  getEntriesByTags,
  getSocialEntries,
};
