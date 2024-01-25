import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RecursiveNavBlock from "../recursiveNavBlock/RecursiveNavBlock";
import { CircleArrowIcon } from "../../icons";
import NavSingleItem, {
  getSingleItemClass,
} from "../navSingleItem/NavSingleItem";
import TagsNavProvider from "../context/TagsNavProvider";
import { NestedObject, Device } from "../../../@types/custom/utils";
import { prepareTagsForNav } from "../utils";
import { useScreenSize } from "../../../hooks";
import Paths from "../../../utils/paths";
import styles from "./TagsNav.module.css";

interface ITagsNav {
  tags: string[];
}

const TagsNav = ({ tags }: ITagsNav) => {
  const { isDesktop } = useScreenSize();
  const [device, setDevice] = useState<Device>(
    isDesktop ? Device.Desktop : Device.Mobile
  );
  const router = useRouter();
  const { asPath } = router;
  const homePageUrl = asPath === Paths.Admin ? undefined : Paths.Admin;

  const tagsReadyForNav: NestedObject = prepareTagsForNav(tags);

  useEffect(() => {
    setDevice(isDesktop ? Device.Desktop : Device.Mobile);
  }, [isDesktop]);

  return (
    <TagsNavProvider>
      <nav
        className={`${styles[`${device}-nav`]} ${isDesktop ? "pr-4 mr-4" : ""}`}
      >
        <ul className={`${!isDesktop ? "w-full text-center" : ""}`}>
          <li
            className={`flex items-center ${!isDesktop ? "bg-yellow-200" : ""}`}
          >
            {isDesktop && (
              <CircleArrowIcon size={16} color="#9ca3af" className="mr-1" />
            )}
            <NavSingleItem
              name="Homepage"
              url={homePageUrl}
              cssStyles={
                homePageUrl
                  ? `${device}-nav-single-item-header`
                  : `${device}-nav-single-item-header-active`
              }
              classNames={`${getSingleItemClass(!homePageUrl, device)} ${
                !isDesktop ? "mx-4" : ""
              }`}
            />
          </li>
        </ul>
        <RecursiveNavBlock
          tags={tagsReadyForNav}
          isParent
          pathName={asPath}
          device={device}
        />
      </nav>
    </TagsNavProvider>
  );
};

export default TagsNav;
