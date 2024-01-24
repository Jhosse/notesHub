import React from "react";
import { NestedObject } from "../../../@types/custom/utils";
import { useTagsNavContext } from "../context/TagsNavContext";
import Paths from "../../../utils/paths";
import { stringCapitalization } from "../../../utils/functions";
import NavSingleItem from "../navSingleItem/NavSingleItem";
import { CircleArrowIcon } from "../../icons";
import styles from "./RecursiveNavBlock.module.css";

export enum Device {
  Desktop = "desktop",
  Mobile = "mobile",
}

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

  const ariaNavigationProps = {
    "aria-orientation": "vertical" as "vertical",
    role: "navigation",
    "aria-label": "Tags Navigation",
  };

  return (
    <ul
      className={`${styles[`${device}-nav-block`]} ${!isParent && "pl-5"}`} //${styles["tags-ul"]}
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
                  className={`${styles[`${device}-nav-block-expanded`]} flex`}
                  ref={(ref) => collectRef(tagPath, ref)}
                >
                  <button
                    onClick={() =>
                      toggleTag(tagPath, styles[`${device}-nav-block-expanded`])
                    }
                    className="mr-1"
                  >
                    <CircleArrowIcon
                      size={16}
                      color="#9ca3af"
                      className={styles["circle-arrow-icon"]}
                    />
                  </button>
                  <NavSingleItem
                    name={capitalizedKey}
                    url={`${Paths.Admin}/${tagPath}`}
                    styles={
                      isActive
                        ? `${device}-nav-single-item-header-active`
                        : `${device}-nav-single-item-header`
                    }
                    classNames={isActive ? "custom-underline" : "link"}
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
                  url={`${Paths.Admin}/${tagPath}`}
                  styles={isActive ? `${device}-nav-single-item-active` : ""}
                  classNames={isActive ? "custom-underline" : "link"}
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
