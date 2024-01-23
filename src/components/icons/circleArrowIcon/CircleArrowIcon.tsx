import React from "react";

interface ICircleArrowIcon {
  size?: number;
  color?: string;
  className?: string;
}

const CircleArrowIcon = ({
  size = 32,
  color = "#000",
  className = "",
}: ICircleArrowIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 32 32`}
      width="32"
      height="32"
      role="img"
      aria-label="Cross Icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={className}
    >
      <path
        d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"
        fill={color}
      />
      <path
        d="M11.086 22.086l2.829 2.829 8.914-8.914-8.914-8.914-2.828 2.828 6.086 6.086z"
        fill={color}
      />
    </svg>
  );
};

export default CircleArrowIcon;
