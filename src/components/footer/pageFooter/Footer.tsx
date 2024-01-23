import React from "react";
import { ISocialIconEntryFields } from "../../../@types/generated/contentful";
import { SocialIcon } from "../../icons";

export interface IFooter {
  socialIcons?: ISocialIconEntryFields[];
}

const Footer = ({ socialIcons }: IFooter) => {
  return (
    <footer className="absolute bottom-4 right-4">
      {socialIcons && (
        <div data-testid="social-icons" className="flex justify-end">
          {socialIcons.map((icon) => (
            <SocialIcon {...icon} key={icon.title} />
          ))}
        </div>
      )}
    </footer>
  );
};

export default Footer;
