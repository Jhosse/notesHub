export type NestedObject = { [key: string]: NestedObject };

export interface IUrlMetadata {
  ogImage: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
}
