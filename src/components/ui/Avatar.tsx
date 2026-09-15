import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  initials?: string;
  className?: string;
  src?: string;
}

export const Avatar = ({ initials = "U", className, src, ...props }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt={initials}
        className={cn("avatar h-10 w-10 text-sm object-cover rounded-full", className)}
        {...(props as HTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  return (
    <div className={cn("avatar h-10 w-10 text-sm", className)} {...props}>
      {initials}
    </div>
  );
};
