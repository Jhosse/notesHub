import React, {
  ReactNode,
  useMemo,
  useCallback,
  useRef,
  useState,
} from "react";
import TagsNavContext from "./TagsNavContext";

interface ITagsNavProvider {
  children: ReactNode;
}

const TagsNavProvider = ({ children }: ITagsNavProvider) => {
  const [setIsExpandedExpanded] = useState<boolean>(false);
  const tagRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleTag = useCallback(
    (id: string, className: string) => {
      const currentTagRef = tagRefs.current[id];
      if (currentTagRef) {
        // TODO:: Setting heights dynamically has a bug when collapsing
        // a parent list when inners lists are already collapsed.
        // Get back at it when find the energy for it.
        //
        // Set height to child of ul for the css transition to work.
        // const ul = currentTagRef.nextElementSibling as HTMLElement;
        // if (!currentTagRef.className.includes(TOGGLE_CLASS)) {
        //   ul.style.maxHeight = `${ulChildrenHeights[id]}px`;
        // } else {
        //   ul.style.maxHeight = `${ulChildrenHeights[id]}px`;
        //   ulChildrenHeights[id] = ul.offsetHeight;
        //   ul.style.maxHeight = "0";
        // }
        //
        //
        // Add toggle class
        // currentTagRef.classList.toggle("styles[TOGGLE_CLASS]"); // TODO: ADD THE RIGHT CLASS
        // const TOGGLE_CLASS = "tags-ul-expanded";
        currentTagRef.classList.toggle(className);
      }
    },
    [tagRefs]
  );

  const collectRef = useCallback(
    (id: string, ref: HTMLDivElement | null) => {
      if (ref) {
        tagRefs.current[id] = ref;
      }
    },
    [tagRefs]
  );

  const value = useMemo(
    () => ({ toggleTag, collectRef }),
    [toggleTag, collectRef]
  );

  return (
    <TagsNavContext.Provider value={value}>{children}</TagsNavContext.Provider>
  );
};

export default TagsNavProvider;
