import React from "react";
import { NestedObject, Device } from "../../../@types/custom/utils";
import { useTagsNavContext } from "../context/TagsNavContext";
import { useScreenSize } from "../../../hooks";
import Paths from "../../../utils/paths";
import { stringCapitalization } from "../../../utils/functions";
import NavSingleItem, {
  getSingleItemClass,
} from "../navSingleItem/NavSingleItem";
import { CircleArrowIcon, ChevronIcon } from "../../icons";
import styles from "./RecursiveNavBlock.module.css";

interface IRecursiveNavBlock {
  tags: NestedObject;
  pathName: string;
  device: Device;
  isParent?: boolean;
  parentTag?: string;
}

const RecursiveNavBlock = ({
  tags,
  pathName,
  device,
  isParent = false,
  parentTag = "",
}: IRecursiveNavBlock) => {
  const { toggleTag, collectRef } = useTagsNavContext();
  const { isDesktop } = useScreenSize();

  const ariaNavigationProps = {
    "aria-orientation": "vertical" as "vertical",
    role: "navigation",
    "aria-label": "Tags Navigation",
  };

  return (
    <ul
      className={`${styles[`${device}-nav-block`]} ${
        !isParent && isDesktop ? "pl-5" : ""
      }`}
      {...(isParent ? ariaNavigationProps : {})}
    >
      {Object.keys(tags).map((key, index) => {
        const tagPath = parentTag ? `${parentTag}/${key}` : key;
        const hasMoreChildren = Object.keys(tags[key]).length > 0;
        const isActive = pathName === `${Paths.Admin}/${tagPath}`;
        const capitalizedKey = stringCapitalization(key);

        return (
          <li key={`${device}-nav-block-item-${index}`}>
            {hasMoreChildren ? (
              <>
                <div
                  id={tagPath}
                  className={`${
                    isDesktop
                      ? styles["desktop-nav-block-expanded"]
                      : "bg-yellow-200  justify-center"
                  } flex`}
                  ref={(ref) => collectRef(tagPath, ref)}
                >
                  <button
                    onClick={() =>
                      toggleTag(
                        tagPath,
                        styles[`${device}-nav-block-expanded`],
                        device
                      )
                    }
                    className={styles[`${device}-nav-block-button`]}
                  >
                    {isDesktop ? (
                      <CircleArrowIcon
                        size={16}
                        color="#9ca3af"
                        className={styles["circle-arrow-icon"]}
                      />
                    ) : (
                      <ChevronIcon
                        size={24}
                        className={styles["chevron-arrow-icon"]}
                      />
                    )}
                  </button>
                  <NavSingleItem
                    name={capitalizedKey}
                    url={isActive ? undefined : `${Paths.Admin}/${tagPath}`}
                    cssStyles={
                      isActive
                        ? `${device}-nav-single-item-header-active`
                        : `${device}-nav-single-item-header`
                    }
                    classNames={`${getSingleItemClass(isActive, device)} ${
                      !isDesktop ? "pr-8" : ""
                    }`}
                  />
                </div>
                <RecursiveNavBlock
                  tags={tags[key]}
                  device={device}
                  pathName={pathName}
                  parentTag={tagPath}
                />
              </>
            ) : (
              <div
                className={`${styles[`${device}-nav-single-item-container`]}`}
              >
                <NavSingleItem
                  name={capitalizedKey}
                  url={isActive ? undefined : `${Paths.Admin}/${tagPath}`}
                  cssStyles={isActive ? `${device}-nav-single-item-active` : ""}
                  classNames={getSingleItemClass(isActive, device)}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default RecursiveNavBlock;
