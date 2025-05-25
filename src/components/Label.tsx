import { cn } from "../utils/cn";
import type { LabelHTMLAttributes, FC } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label
      className={cn("mb-1 block text-sm font-medium text-gray-700", className)}
      {...props}
    >
      {children}
    </label>
  );
};
