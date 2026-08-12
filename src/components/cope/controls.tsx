import type { ReactNode } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToolbarButton({
  children,
  active,
  onClick,
  className,
  title,
}: {
  children: ReactNode;
  active?: boolean | undefined;
  onClick?: () => void;
  className?: string | undefined;
  title?: string | undefined;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded border px-2 text-[12px] font-medium transition-colors",
        active
          ? "border-primary/30 bg-info-soft text-primary"
          : "border-border bg-surface text-foreground hover:bg-muted",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar…",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string | undefined;
  className?: string | undefined;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-7 w-full rounded border border-input bg-surface pl-7 pr-7 text-[12.5px] outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-ring/20"
      />
      {value && (
        <button
          type="button"
          aria-label="Limpiar búsqueda"
          onClick={() => onChange("")}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  className?: string | undefined;
}) {
  return (
    <div
      role="tablist"
      className={cn("inline-flex h-7 items-center rounded border border-border bg-surface-2 p-0.5", className)}
    >
      {options.map((opt) => (
        <button
          key={opt}
          role="tab"
          aria-selected={value === opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "h-6 rounded-[3px] px-2 text-[12px] font-medium transition-colors",
            value === opt
              ? "bg-surface text-foreground shadow-[0_1px_1px_rgba(15,23,42,0.06)]"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="inline-flex h-7 items-center gap-1.5 rounded border border-border bg-surface pl-2 pr-1 text-[12px]">
      <span className="text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-6 bg-transparent pr-1 text-[12px] font-medium text-foreground outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FilterBar({
  children,
  right,
  className,
}: {
  children: ReactNode;
  right?: ReactNode | undefined;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 border-b border-border bg-surface px-5 py-2",
        className,
      )}
    >
      <SlidersHorizontal className="size-3.5 text-muted-foreground" aria-hidden />
      {children}
      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
    </div>
  );
}