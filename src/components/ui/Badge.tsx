"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "success" | "primary";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-gray-100 text-gray-700": variant === "default",
          "border border-gray-300 text-gray-600 bg-white": variant === "outline",
          "bg-green-100 text-green-700": variant === "success",
          "bg-primary-100 text-primary-dark": variant === "primary",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
