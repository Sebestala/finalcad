interface TextInputProps {
  placeholder: string;
  isPassword?: boolean;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

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
