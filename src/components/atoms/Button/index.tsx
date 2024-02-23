import clsx from "clsx";
import React, { PropsWithChildren } from "react";

type ButtonSize = "small" | "medium";

interface ButtonProps extends PropsWithChildren {
  style: string;
  size?: ButtonSize;
  // NOTE : 클릭 효과 여부
  isClickEffect?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  style,
  size = "medium",
  children,
  isClickEffect = true,
  onClick,
}) => {
  let sizeStyle = "";

  switch (size) {
    case "small":
      sizeStyle = "text-button-s px-4 py-2";
      break;
    case "medium":
      sizeStyle = "text-button-m px-6 py-3";
      break;
    default:
      break;
  }

  const defaultStyle = clsx(
    `rounded-md transition-colors duration-300 ease-in-out text-black `,
    isClickEffect &&
      "hover:text-white hover:outline-none hover:ring-2 hover:ring-slate-600 hover:ring-opacity-50",
    isClickEffect &&
      "active:bg-slate-700 active:text-white active:outline-none active:ring-2 active:ring-slate-700 active:ring-opacity-50"
  );
  return (
    <button className={clsx(defaultStyle, sizeStyle, style)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
