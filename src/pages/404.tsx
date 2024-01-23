import React from "react";
import { useSession } from "next-auth/react";
import NotFound from "../components/notFound/NotFound";
import Paths from "../utils/paths";

const FourOhFour = () => {
  const { data: session } = useSession();
  let redirect: string = Paths.Home;

  if (session) redirect = Paths.Admin;

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <NotFound redirect={redirect} buttonText="Back to Home" />
    </main>
  );
};

export default FourOhFour;
