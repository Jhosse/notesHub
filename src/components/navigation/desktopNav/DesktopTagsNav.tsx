import React, { createContext, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CircleArrowIcon } from "../../icons";
import { NestedObject } from "../../../@types/custom/utils";
import Paths from "../../../utils/paths";
import { stringCapitalization } from "../../../utils/functions";
import styles from "./DesktopTagsNav.module.css";

const TOGGLE_CLASS = "tags-ul-expanded";

interface IDesktopTagsNavProps {
  tagsObj: NestedObject;
}
interface ITagsBlockProps {
  tags: NestedObject;
  pathname: string;
  isParent?: boolean;
  parentTag?: string;
}

type IDesktopTagsNavContext = {
  toggleTag: (id: string) => void;
  collectRef: (id: string, ref: HTMLDivElement | null) => void;
};

const DesktopTagsNavContext = createContext<IDesktopTagsNavContext | null>(
  null
);

function useDesktopTagsNavContext() {
  const context = React.useContext(DesktopTagsNavContext);
  if (!context) {
    throw new Error(
      `DesktopTagsNav compound component cannot be rendered outside the DesktopTagsNav component`
    );
  }
  return context;
}

const DesktopTagsNavBlock = ({
  tags,
  pathname,
  isParent = false,
  parentTag = "",
}: ITagsBlockProps) => {
  const { toggleTag, collectRef } = useDesktopTagsNavContext();

  const ariaNavigationProps = {
    "aria-orientation": "vertical" as "vertical",
    role: "navigation",
    "aria-label": "Tags Navigation",
  };

  const handleToggle = (tagPath: string) => toggleTag(tagPath);

  return (
    <ul
      className={`${styles["tags-ul"]} ${!isParent && "pl-5"}`}
      {...(isParent ? ariaNavigationProps : {})}
    >
      {Object.keys(tags).map((key, index) => {
        const tagPath = parentTag ? `${parentTag}/${key}` : key;
        const hasMoreChildren = Object.keys(tags[key]).length > 0;
        const isActive = pathname === `${Paths.Admin}/${tagPath}`;
        const capitalizedKey = stringCapitalization(key);

        return (
          <li key={`sidebar-tags-nav-item-${index}`}>
            {hasMoreChildren ? (
              <>
                <div
                  id={tagPath}
                  className={`${styles["tags-ul-expanded"]} flex`}
                  ref={(ref) => collectRef(tagPath, ref)}
                >
                  <button
                    onClick={() => handleToggle(tagPath)}
                    className="mr-1"
                  >
                    <CircleArrowIcon
                      size={16}
                      color="#9ca3af"
                      className={styles["circle-arrow-icon"]}
                    />
                  </button>
                  {isActive ? (
                    <span
                      className={`${styles["li-nav-header-active"]} custom-underline`}
                    >
                      {capitalizedKey}
                    </span>
                  ) : (
                    <Link
                      href={`${Paths.Admin}/${tagPath}`}
                      className={`${styles["li-nav-header"]} link`}
                      data-navigation-path={tagPath}
                    >
                      {capitalizedKey}
                    </Link>
                  )}
                </div>

                <DesktopTagsNavBlock
                  tags={tags[key]}
                  pathname={pathname}
                  parentTag={tagPath}
                />
              </>
            ) : (
              <div className={`${styles["li-nav-item-container"]}`}>
                {isActive ? (
                  <span
                    className={`${styles["li-nav-item-active"]} custom-underline`}
                  >
                    {capitalizedKey}
                  </span>
                ) : (
                  <Link
                    href={`${Paths.Admin}/${tagPath}`}
                    className="link"
                    data-navigation-path={tagPath}
                  >
                    {capitalizedKey}
                  </Link>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const DesktopTagsNav = ({ tagsObj }: IDesktopTagsNavProps) => {
  const router = useRouter();
  const { asPath } = router;

  const tagRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  // const ulChildrenHeights: { [key: string]: number } = useMemo(() => {
  //   return {};
  // }, []);

  const toggleTag = useCallback(
    (id: string) => {
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
        // Add toggle class
        currentTagRef.classList.toggle(styles[TOGGLE_CLASS]);
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
    <nav className={`${styles["tags-nav"]} pr-4 mr-4`}>
      <ul>
        <li className="flex items-center">
          <CircleArrowIcon size={16} color="#9ca3af" className="mr-1" />
          {asPath === Paths.Admin ? (
            <span
              className={`${styles["li-nav-header-active"]} custom-underline`}
            >
              Homepage
            </span>
          ) : (
            <Link
              href={Paths.Admin}
              className={`${styles["li-nav-header"]} link`}
            >
              Homepage
            </Link>
          )}
        </li>
      </ul>
      <DesktopTagsNavContext.Provider value={value}>
        <DesktopTagsNavBlock tags={tagsObj} isParent pathname={asPath} />
      </DesktopTagsNavContext.Provider>
    </nav>
  );
};

export default DesktopTagsNav;
