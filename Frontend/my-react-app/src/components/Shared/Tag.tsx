import React from "react";
import clsx from "clsx";

interface TagProps {
  label: string;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, className }) => {
  return (
    <span
      className={clsx(
        "bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full font-medium",
        className
      )}
    >
      {label}
    </span>
  );
};
