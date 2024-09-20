interface DataCardProps {
  label?: string;
  value?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders a data card component displaying a label and value.
 *
 * @param {DataCardProps} props - The component props.
 * @param {string} [props.label="null"] - The label text.
 * @param {string|number} [props.value="null"] - The value to display.
 * @param {string} [props.className=""] - Additional CSS classes for the value.
 * @param {React.CSSProperties} [props.style={}] - Inline styles for the value.
 * @returns {JSX.Element} The rendered DataCard component.
 *
 * Features:
 * - Displays a label and value in a structured layout
 * - Supports custom styling through className and style props
 */
export function DataCard({
  label = "null",
  value = "null",
  className = "",
  style = {},
}: DataCardProps) {
  return (
    <div className="flex flex-col border-slate-200 border-b pb-1 gap-1">
      <p className="flex w-full font-light text-xs text-slate-700/50">{label}</p>
      <p
        className={`flex w-full text-slate-700 ${className}`}
        style={style}
      >
        {value}
      </p>
    </div>
  );
}
