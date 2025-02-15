import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
}
export default function Label({
  className = "",
  htmlFor,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`inline-block text-md-14px-medium md:text-lg-16px-medium text-gray-800 mb-[10px] ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
