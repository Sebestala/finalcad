import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

/**
 * A reusable Button component with customizable properties.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the button.
 * @param {Function} props.onClick - The click event handler.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {string} [props.ariaLabel] - Aria label for accessibility.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @returns {JSX.Element} The rendered Button component.
 *
 * Features:
 * - Customizable appearance through className prop
 * - Disabled state support
 */
export function Button({
  children,
  onClick,
  className = "",
  ariaLabel = "",
  disabled = false,
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300  ${className}`}
      aria-pressed="false"
      role="button"
      disabled={disabled}
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
