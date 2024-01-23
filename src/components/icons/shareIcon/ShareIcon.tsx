import React from "react";

interface IShareIcon {
  size?: number;
  color?: string;
  className?: string;
}

const ShareIcon = ({
  size = 32,
  color = "#000",
  className = "",
}: IShareIcon) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      role="img"
      aria-label="Share Icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={className}
    >
      <path
        d="M8 20c0 0 1.838-6 12-6v6l12-8-12-8v6c-8 0-12 4.99-12 10zM22 24h-18v-12h3.934c0.315-0.372 0.654-0.729 1.015-1.068 1.374-1.287 3.018-2.27 4.879-2.932h-13.827v20h26v-8.395l-4 2.667v1.728z"
        fill={color}
      />
    </svg>
  );
};

export default ShareIcon;
