import React from "react";
import DesktopNav from "../desktopNav/DesktopNav";
import MobileNav from "../mobileNav/MobileNav";
import TagsNavProvider from "../context/TagsNavProvider";
import { NestedObject } from "../../../@types/custom/utils";
import { prepareTagsForNav } from "../utils";
import { useScreenSize } from "../../../hooks";

interface ITagsNav {
  tags: string[];
}

const TagsNav = ({ tags }: ITagsNav) => {
  const { isDesktop } = useScreenSize();
  const tagsReadyForNav: NestedObject = prepareTagsForNav(tags);

  return (
    <TagsNavProvider>
      {isDesktop ? (
        <DesktopNav tags={tagsReadyForNav} />
      ) : (
        <MobileNav tags={tagsReadyForNav} />
      )}
    </TagsNavProvider>
  );
};

export default TagsNav;
