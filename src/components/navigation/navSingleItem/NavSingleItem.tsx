import React from "react";
import Link from "next/link";
import { useScreenSize } from "../../../hooks";
import style from "./NavSingleItem.module.css";

interface INavSingleItem {
  name: string;
  url?: string;
  styles?: string;
  classNames?: string;
}

const NavSingleItem = ({
  name,
  url,
  styles = "",
  classNames = "",
}: INavSingleItem) => {
  const { isDesktop } = useScreenSize();

  return url ? (
    <Link
      href={url}
      className={`${style[styles]} ${classNames}`}
      data-navigation-path={url} // ADD ${Paths.Admin} TO THE TEST
    >
      {name}
    </Link>
  ) : (
    <span className={`${style[styles]} ${classNames}`}>{name}</span>
  );
};

export default NavSingleItem;
