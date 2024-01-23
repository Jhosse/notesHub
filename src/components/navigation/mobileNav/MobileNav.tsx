import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { NestedObject } from "../../../@types/custom/utils";
import Paths from "../../../utils/paths";

interface IMobileNavProps {
  tagsObj: NestedObject;
}

const MobileNav = ({ tagsObj }: IMobileNavProps) => {
  const router = useRouter();
  const { asPath } = router;
  const isHomePage = asPath === Paths.Admin;

  return (
    <nav className="w-full bg-yellow">
      <ul>
        <li className="text-center">
          {isHomePage ? (
            <span className={""}>Homepage</span>
          ) : (
            <Link href={Paths.Admin} className={"w-full block"}>
              Homepage
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
