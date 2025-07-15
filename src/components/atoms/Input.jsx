import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;