import { createContext, useContext } from "react";

interface ITagsNavContext {
  toggleTag: (id: string, className: string) => void;
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
