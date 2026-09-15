import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "outline" | "ghost" | "marigold" | "danger";
  size?: "default" | "sm" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "btn",
          (variant === "default" || variant === "primary") && "btn-primary",
          variant === "outline" && "btn-outline",
          variant === "ghost" && "btn-ghost",
          variant === "marigold" && "btn-marigold",
          variant === "danger" && "btn-danger",
          size === "sm" && "btn-sm",
          size === "lg" && "btn-lg",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
