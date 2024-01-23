import React from "react";
import { useSession } from "next-auth/react";
import type { LayoutProps } from "../../../@types/custom/layout";
import Spinner, { SpinnerSizes } from "../../spinner/Spinner";
import SignIn from "../../signIn/SignIn";
import AdminHeader from "../../headers/adminHeader/AdminHeader";
import TagsNav from "../../navigation/tagsNav/TagsNav";
import { useScreenSize } from "../../../hooks";

interface IAuthLayoutProps {
  tags: string[];
}

type AuthLayoutProps = LayoutProps<IAuthLayoutProps>;

const AuthLayout: AuthLayoutProps = ({ children, props }) => {
  const { data: session } = useSession();
  const { isDesktop } = useScreenSize();
  const tags = props?.tags;

  if (session === null) {
    return (
      <main role="main">
        <SignIn />
      </main>
    );
  }

  if (session)
    return (
      <>
        <AdminHeader />
        <section
          className={`p-4 ${
            isDesktop && "flex flex-row max-w-4xl my-0 mx-auto"
          }`}
        >
          {tags && (
            <aside role="complementary">
              <TagsNav tags={tags} isDesktop={isDesktop} />
            </aside>
          )}
          {children}
        </section>
      </>
    );

  return (
    <main role="main">
      <Spinner size={SpinnerSizes.Medium} />
    </main>
  );
};

export default AuthLayout;
