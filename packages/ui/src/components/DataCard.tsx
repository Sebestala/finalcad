interface DataCardProps {
  label?: string;
  value?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

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
