interface TextInputProps {
  placeholder: string;
  isPassword?: boolean;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

/**
 * A reusable text input component with customizable properties.
 *
 * @param {Object} props - The component props.
 * @param {string} props.placeholder - The input placeholder text.
 * @param {boolean} [props.isPassword=false] - Whether the input is for password entry.
 * @param {string} [props.className] - Additional CSS classes for styling.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - Callback function triggered on input change.
 * @returns {JSX.Element} The rendered TextInput component.
 *
 * Features:
 * - Supports both text and password input types
 * - Allows additional CSS classes for flexible styling
 */
export function TextInput({
  placeholder,
  isPassword = false,
  className,
  value,
  onChange,
}: TextInputProps): JSX.Element {
  return (
    <input
      type={isPassword ? "password" : "text"}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={placeholder}
      aria-required="true"
      className={`max-w-80  h-10 p-5 bg-[#F4F6F8] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 placeholder:text-sm placeholder:text-[#848F9D]/60 text-black/70 ${className}`}
    />
  );
}
