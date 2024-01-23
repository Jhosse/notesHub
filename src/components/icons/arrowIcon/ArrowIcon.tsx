import React from "react";

type Direction = "up" | "down" | "right" | "left";

export interface IArrowIcon {
  size?: number;
  color?: string;
  className?: string;
  direction?: Direction;
}

const ArrowIcon = ({
  size = 32,
  color = "#000",
  className = "",
  direction = "right",
}: IArrowIcon) => {
  const rotationDegree = (dir: Direction): number => {
    switch (dir) {
      case "up":
        return 270;
      case "down":
        return 90;
      case "left":
        return 180;
      default:
        return 0;
    }
  };

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      role="img"
      aria-label="Arrow Icon"
      data-testid="arrow-svg-icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotationDegree(direction)}deg)`,
      }}
      className={className}
    >
      <path
        d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowIcon;
