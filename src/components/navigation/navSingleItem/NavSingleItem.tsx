import React from "react";
import Link from "next/link";
import { Device } from "../../../@types/custom/utils";
import styles from "./NavSingleItem.module.css";

interface INavSingleItem {
  name: string;
  url?: string;
  cssStyles?: string;
  classNames?: string;
}

export const getSingleItemClass = (
  isActive: boolean,
  device: Device
): string => {
  if (device === Device.Desktop) {
    if (isActive) return "custom-underline";
    else return "link";
  } else {
    if (isActive) return `mr-4`;
    else return `mr-4 py-1 w-full`;
  }
};

const NavSingleItem = ({
  name,
  url,
  cssStyles = "",
  classNames = "",
}: INavSingleItem) => {
  return url ? (
    <Link
      href={url}
      className={`${styles[cssStyles]} ${classNames}`}
      data-navigation-path={url}
    >
      {name}
    </Link>
  ) : (
    <div className={`${styles[cssStyles]} ${classNames}`}>
      <span className={styles["nav-single-item-active-span"]}>{name}</span>
    </div>
  );
};

export default NavSingleItem;
