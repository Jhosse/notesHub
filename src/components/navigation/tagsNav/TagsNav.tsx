import React from "react";
import DesktopTagsNav from "../desktopNav/DesktopTagsNav";
import MobileNav from "../mobileNav/MobileNav";
import { NestedObject } from "../../../@types/custom/utils";
import { prepareTagsForNav } from "../utils";

interface ITagsNavProps {
  tags: string[];
  isDesktop: boolean;
}

const TagsNav = ({ tags, isDesktop }: ITagsNavProps) => {
  const tagsReadyForNav: NestedObject = prepareTagsForNav(tags);

  if (isDesktop) {
    return <DesktopTagsNav tagsObj={tagsReadyForNav} />;
  } else {
    return <MobileNav tagsObj={tagsReadyForNav} />;
  }
};

export default TagsNav;
