import React, { ReactElement } from "react";
import { ISocialIconEntryFields } from "../../../@types/generated/contentful";
import Footer from "../../footer/pageFooter/Footer";
import HomeHeader from "../../headers/homeHeader/homeHeader";

interface IMainLayoutProps {
  socialIcons: ISocialIconEntryFields[];
  children: ReactElement;
}

const MainLayout = ({ socialIcons, children }: IMainLayoutProps) => {
  return (
    <>
      <HomeHeader />
      {children}
      <Footer socialIcons={socialIcons} />
    </>
  );
};
export default MainLayout;
