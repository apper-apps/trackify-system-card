import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    primary: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200",
    secondary: "bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    active: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    pending: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "on-hold": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;