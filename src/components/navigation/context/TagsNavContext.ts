import { createContext, useContext } from "react";
import { Device } from "../../../@types/custom/utils";

interface ITagsNavContext {
  toggleTag: (id: string, className: string, device: Device) => void;
  collectRef: (id: string, ref: HTMLDivElement | null) => void;
}

const TagsNavContext = createContext<ITagsNavContext | null>(null);

export const useTagsNavContext = () => {
  const context = useContext(TagsNavContext);
  if (!context) {
    throw new Error(
      `TagsNav compound component cannot be rendered outside the TagsNav component`
    );
  }
  return context;
};

export default TagsNavContext;
