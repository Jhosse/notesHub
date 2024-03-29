import React from "react";

interface IChevronIcon {
  size?: number;
  className?: string;
  color?: string;
}

const ChevronIcon = ({
  size = 32,
  className = "",
  color = "#000",
}: IChevronIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width="30"
      height="30"
      role="img"
      aria-label="Chevron Icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={className}
    >
      <path
        d="M6.616 12.134l7.5 7.5c0.489 0.489 1.28 0.489 1.768 0l7.5-7.5c0.489-0.489 0.489-1.28 0-1.768s-1.28-0.489-1.768 0l-6.616 6.616-6.616-6.616c-0.489-0.489-1.28-0.489-1.768 0s-0.489 1.28 0 1.768z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronIcon;
