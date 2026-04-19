"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/55 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-60",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-sm hover:bg-primary-600",
        outline:
          "border border-gray-200 bg-white text-gray-800 hover:border-primary/40 hover:text-primary",
        ghost: "text-gray-700 hover:bg-gray-100",
        link: "text-primary underline-offset-4 hover:underline",
        "on-dark":
          "bg-white text-primary hover:bg-blue-50 focus-visible:ring-offset-primary",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-10 px-4 text-xs",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
