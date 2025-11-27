"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          // Variants
          {
            "bg-primary text-white hover:bg-primary-dark active:scale-[0.98]":
              variant === "primary",
            "bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-[0.98]":
              variant === "secondary",
            "border-2 border-primary text-primary bg-transparent hover:bg-primary-50 active:scale-[0.98]":
              variant === "outline",
            "text-gray-600 hover:text-gray-900 hover:bg-gray-100":
              variant === "ghost",
          },
          // Sizes
          {
            "h-9 px-4 text-sm rounded-lg": size === "sm",
            "h-12 px-6 text-base rounded-xl": size === "md",
            "h-16 px-8 text-lg rounded-xl": size === "lg",
          },
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
