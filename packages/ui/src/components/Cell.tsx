interface CellProps {
  label: string;
  isBold?: boolean;
  isHeader?: boolean;
  colorText?: string;
}

export function Cell({
  label,
  isBold = false,
  isHeader = false,
  colorText,
}: CellProps): JSX.Element {
  return (
    <div
      className={`flex flex-1 pl-4 items-center border-[#F4F6F8] border-b rounded- ${isBold ? "font-medium" : "font-normal"} ${isHeader ? "h-14 bg-[#F4F6F8]" : "h-16"}`}
    >
      <p
        className={`text-sm font-normal`}
        style={{ color: colorText ? colorText : isBold ? "#172134" : "#848F9D" }}
      >
        {label ? label.charAt(0).toUpperCase() + label.slice(1) : "N/A"}
      </p>
    </div>
  );
}
