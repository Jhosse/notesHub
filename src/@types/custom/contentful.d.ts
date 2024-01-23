import {
  ISocialIconFields,
  ICodeResourceEntryFields,
  ILinkResourceEntryFields,
  CONTENT_TYPE,
} from "../generated/contentful";

export type ISocialIconEntry = {
  contentTypeId: "socialIcon";
  fields: ISocialIconFields;
};

export type IResourceEntry = {
  id: string;
  // contentTypeId: "codeResourceEntry" | "linkResourceEntry";
  contentTypeId: string;
  tags: string[];
  updatedAt: string;
  fields: Entry<ILinkResourceEntryFields> | Entry<ILinkResourceEntryFields>;
};
