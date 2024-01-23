import React, { ReactElement } from "react";
import { ArrowIcon } from "../icons";

export enum ButtonVariation {
  Primary = "primary",
  Secondary = "secondary",
  Disabled = "disabled",
}

export const buttonVariations = {
  [ButtonVariation.Primary]:
    "bg-yellow hover:bg-yellow box-border border border-yellow hover:border-yellow transition-colors duration-100",
  [ButtonVariation.Secondary]:
    "bg-transparent box-border border border-black hover:border-yellow hover:text-yellow transition-colors duration-100",
  [ButtonVariation.Disabled]:
    "bg-blue-500 text-white opacity-50 cursor-not-allowed",
};

interface IButton {
  className?: string;
  variation: ButtonVariation;
  children: string | ReactElement<typeof ArrowIcon>;
  cb: () => void;
}

const Button = ({ className = "", variation, children, cb }: IButton) => {
  return (
    <button
      role="button"
      onClick={cb}
      className={`${buttonVariations[variation]} font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
