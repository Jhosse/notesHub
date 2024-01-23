import React from "react";
import { signOut } from "next-auth/react";
import Button, { ButtonVariation } from "../../button/Button";
import Paths from "../../../utils/paths";

const AdminHeader = () => {
  return (
    <header role="banner" className="shadow-sm">
      <div className="max-w-4xl my-0 mx-auto p-4 flex items-center justify-between">
        <h1 className="header-title">Admin area</h1>
        <Button
          variation={ButtonVariation.Secondary}
          cb={() => signOut({ callbackUrl: Paths.Home })}
        >
          Sign out
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
