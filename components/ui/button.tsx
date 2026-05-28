"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25",
        outline:
          "border-2 border-[#6C63FF] text-[#6C63FF] bg-transparent hover:bg-[#6C63FF] hover:text-white",
        secondary:
          "bg-[#F5F7FA] text-[#111827] hover:bg-gray-200 border border-gray-200",
        ghost:
          "hover:bg-indigo-50 text-[#111827] hover:text-[#6C63FF]",
        link:
          "text-[#6C63FF] underline-offset-4 hover:underline p-0 h-auto",
        white:
          "bg-white text-[#6C63FF] hover:bg-gray-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
