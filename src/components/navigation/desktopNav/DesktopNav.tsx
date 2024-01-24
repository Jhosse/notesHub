import React from "react";
import { useRouter } from "next/router";
import { CircleArrowIcon } from "../../icons";
import { NestedObject } from "../../../@types/custom/utils";
import RecursiveNavBlock, {
  Device,
} from "../recursiveNavBlock/RecursiveNavBlock";
import NavSingleItem from "../navSingleItem/NavSingleItem";
import Paths from "../../../utils/paths";
import styles from "./DesktopNav.module.css";

interface IDesktopNav {
  tags: NestedObject;
}
const DesktopNav = ({ tags }: IDesktopNav) => {
  const router = useRouter();
  const { asPath } = router;
  const homePageUrl = asPath === Paths.Admin ? undefined : Paths.Admin;

  return (
    <nav className={`${styles["desktop-nav"]} pr-4 mr-4`}>
      <ul>
        <li className="flex items-center">
          <CircleArrowIcon size={16} color="#9ca3af" className="mr-1" />
          <NavSingleItem
            name="Homepage"
            url={homePageUrl}
            styles={
              homePageUrl
                ? "desktop-nav-single-item-header"
                : "desktop-nav-single-item-header-active"
            }
            classNames={homePageUrl ? "link" : "custom-underline"}
          />
        </li>
      </ul>
      <RecursiveNavBlock
        tags={tags}
        isParent
        pathName={asPath}
        device={Device.Desktop}
      />
    </nav>
  );
};

export default DesktopNav;
