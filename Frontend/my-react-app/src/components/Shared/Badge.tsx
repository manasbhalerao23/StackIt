import clsx from "clsx";

interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
}

export const Badge = ({ label, variant = "default", className }: BadgeProps) => {
  const baseStyle = "px-2 py-0.5 text-xs font-semibold rounded-full";

  const variantStyles = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={clsx(baseStyle, variantStyles[variant], className)}>
      {label}
    </span>
  );
};
