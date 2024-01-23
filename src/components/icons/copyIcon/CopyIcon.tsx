import React from "react";

interface ICopyIcon {
  size?: number;
  color?: string;
  className?: string;
}

const CopyIcon = ({ size = 32, color = "#000", className = "" }: ICopyIcon) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      role="img"
      aria-label="Copy Icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={className}
    >
      <path
        d="M20 8v-8h-14l-6 6v18h12v8h20v-24h-12zM6 2.828v3.172h-3.172l3.172-3.172zM2 22v-14h6v-6h10v6l-6 6v8h-10zM18 10.828v3.172h-3.172l3.172-3.172zM30 30h-16v-14h6v-6h10v20z"
        fill={color}
      />
    </svg>
  );
};

export default CopyIcon;