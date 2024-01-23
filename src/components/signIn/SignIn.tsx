import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Button, { ButtonVariation } from "../button/Button";
import Paths from "../../utils/paths";

const SignIn = () => {
  const router = useRouter();

  return (
    <section className="p-4" data-testid="sign-in">
      <h1 className="page-title text-center">Password-Protected Zone</h1>
      <p className="text-center">
        Oops! Looks like you&apos;ve stumbled upon a restricted area.
      </p>
      <div className="mt-20 flex justify-center">
        <Button
          className="mx-2"
          variation={ButtonVariation.Primary}
          cb={() => signIn()}
        >
          Sign in
        </Button>
        <Button
          className="mx-2"
          variation={ButtonVariation.Secondary}
          cb={() => router.push(Paths.Home)}
        >
          Back to Home
        </Button>
      </div>
    </section>
  );
};

export default SignIn;
