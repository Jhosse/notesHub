import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ISocialIconEntryFields } from "../../../@types/generated/contentful";
import styles from "./SocialIcon.module.css";

export interface ISocialIcon extends ISocialIconEntryFields {
  width?: number;
  height?: number;
}

const SocialIcon = ({
  title,
  icon,
  url,
  width = 32,
  height = 32,
}: ISocialIcon) => {
  return (
    <Link href={url} className={styles["social-icon"]} target="_blank">
      <Image
        unoptimized={true}
        src={(icon?.fields?.file?.url as string) || ""}
        alt={title}
        width={width}
        height={height}
      />
    </Link>
  );
};

export default SocialIcon;
