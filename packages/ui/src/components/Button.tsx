import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export function Button({ children, onClick, className = "" }: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300  ${className}`}
    >
      {children}
    </button>
  );
}
