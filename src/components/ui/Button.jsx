import React from "react";

const Button = ({
  children,
  type = "button",
  onClick = () => {},
  variant = "primary",
  className = "",
  ...props
}) => {
  let styles =
    "px-4 rounded font-medium transition duration-200 focus:outline-none ";

  if (variant === "primary") {
    styles +=
      "bg-[#f97316] text-white px-4 py-2 rounded-md text-sm hover:bg-[#ea580c]";
  } else if (variant === "secondary") {
    styles +=
      "bg-[#fdf6ee] text-[#1a1a1a] border border-orange-200 hover:bg-orange-100";
  } else if (variant === "outline") {
    styles += "border border-[#f97316] py-1 text-[#f97316] hover:bg-orange-100";
  } else if (variant === "danger") {
    styles += "bg-red-600 text-white hover:bg-red-500";
  } else {
    styles += "bg-gray-200 text-black";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
