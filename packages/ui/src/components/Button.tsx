import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export function Button({
  children,
  onClick,
  className = "",
  ariaLabel = "",
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300  ${className}`}
      aria-pressed="false"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
