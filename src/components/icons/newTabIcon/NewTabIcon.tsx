import React from "react";

interface INewTabIcon {
  size?: number;
  color?: string;
  className?: string;
}

const NewTabIcon = ({
  size = 32,
  color = "#000",
  className = "",
}: INewTabIcon) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      role="img"
      aria-label="New Tab Icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={className}
    >
      <path
        d="M6 2v24h24v-24h-24zM28 24h-20v-20h20v20zM4 28v-21l-2-2v25h25l-2-2h-21z"
        fill={color}
      />
      <path d="M11 8l5 5-6 6 3 3 6-6 5 5v-13z" fill={color} />
    </svg>
  );
};

export default NewTabIcon;
