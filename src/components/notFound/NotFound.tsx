import React from "react";
import { useRouter } from "next/router";
import Button, { ButtonVariation } from "../button/Button";

interface INotFound {
  redirect: string;
  buttonText: string;
}

const NotFound = ({ redirect, buttonText }: INotFound) => {
  const router = useRouter();

  return (
    <section className="text-center">
      <h1 className="page-title">404 - Page Not Found</h1>
      <Button
        className="mt-10"
        variation={ButtonVariation.Secondary}
        cb={() => router.push(redirect)}
      >
        {buttonText}
      </Button>
    </section>
  );
};

export default NotFound;
