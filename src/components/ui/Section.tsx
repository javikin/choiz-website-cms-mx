"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: "white" | "gray" | "primary" | "dark";
  spacing?: "sm" | "md" | "lg" | "xl";
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { className, background = "white", spacing = "lg", children, ...props },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          // Background
          {
            "bg-white": background === "white",
            "bg-gray-50": background === "gray",
            "bg-primary-50": background === "primary",
            "bg-gray-900 text-white": background === "dark",
          },
          // Spacing
          {
            "py-8 md:py-12": spacing === "sm",
            "py-12 md:py-16": spacing === "md",
            "py-16 md:py-24": spacing === "lg",
            "py-20 md:py-32": spacing === "xl",
          },
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
