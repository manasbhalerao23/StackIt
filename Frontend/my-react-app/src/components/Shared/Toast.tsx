import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
}

export const Toast = ({ message, type = "success", duration = 3000 }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const bg = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 text-white rounded shadow ${bg} z-50`}
    >
      {message}
    </div>
  );
};
