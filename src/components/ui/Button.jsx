import React from "react";

const Button = ({
  children,
  type = "button",
  onClick = () => { },
  variant = "primary",
  className = "",
  ...props
}) => {
  let styles =
    "px-3 rounded-full font-medium transition duration-200 focus:outline-none cursor-pointer ";

  if (variant === "primary") {
    styles +=
      "bg-[#f97316] text-white px-4 py-2 text-sm hover:bg-[#ea580c]";
  } else if (variant === "secondary") {
    styles +=
      "px-3 py-1.5 bg-orange-100 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors text-orange-600";
  } else if (variant === "outline") {
    styles += "border border-[#f97316] py-1 text-[#f97316] hover:bg-orange-100";
  } else if (variant === "danger") {
    styles += "bg-red-500 py-1.5 text-white hover:bg-red-500";
  } else {
    styles +=
      "px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors";
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
