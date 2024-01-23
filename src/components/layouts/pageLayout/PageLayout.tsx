import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import EntryFooter, {
  IEntryFooterLinkProps,
} from "../../footer/entryFooter/EntryFooter";
import Button, { ButtonVariation } from "../../button/Button";
import { ArrowIcon } from "../../icons";

interface IPageLayout {
  title: string;
  tags: string[];
  updatedAt: string;
  link?: string;
  sectionClassName?: string;
  children: ReactElement;
}

const PageLayout = ({
  title,
  tags,
  updatedAt,
  link,
  sectionClassName = "w-full",
  children,
}: IPageLayout) => {
  const router = useRouter();
  const [iconColor, setIconColor] = useState<string>("#000");

  const handleMouseEnter = () => setIconColor("#FDE047");
  const handleMouseLeave = () => setIconColor("#000");

  let linkProps: IEntryFooterLinkProps | undefined = undefined;

  if (link) {
    linkProps = {
      address: link,
      linkText: "Resource",
      title: title,
      openInNewTab: true,
    };
  }

  return (
    <section className={sectionClassName}>
      <header className="w-full mb-6 flex items-start justify-between">
        <h1 className="page-title">{title}</h1>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Button variation={ButtonVariation.Secondary} cb={router.back}>
            <ArrowIcon direction="left" size={16} color={iconColor} />
          </Button>
        </div>
      </header>
      {children}
      <EntryFooter link={linkProps} tags={tags} updatedAt={updatedAt} />
    </section>
  );
};

export default PageLayout;
